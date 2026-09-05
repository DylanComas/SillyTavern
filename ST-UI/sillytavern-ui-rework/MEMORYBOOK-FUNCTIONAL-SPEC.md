# Memorybook Functional Specification

**Status:** In definition  
**Started:** 2026-08-31  
**Foundations:** [Memorybook Foundation Audit](./MEMORYBOOK-FOUNDATION-AUDIT.md), [Scene State and Tracker Foundation Audit](./TRACKER-FOUNDATION-AUDIT.md), and [Scene State and Visual Tracker Functional Specification](./SCENE-STATE-TRACKER-SPEC.md)  
**Related:** [Product Definition](./PRODUCT-DEFINITION.md) · [Development Bible](./README.md) · [Living Delivery Plan](./REWORK-PLAN.md)

## 1. Purpose

This document defines the user-visible behavior of the native Memorybook before its interface and implementation are designed. It is a living specification: agreed behavior is recorded as a decision, while unresolved behavior remains explicitly open.

The Memorybook combines two complementary systems inside one chat-owned feature:

- **Short Memory** supplies compact, replaceable continuity derived from recent conversation history.
- **Long Memory** stores durable, attributable records that are not automatically rewritten.

## 2. Configuration principle

Every user-facing Memorybook behavior must have an explicit setting rather than an unexplained hard-coded value. This includes thresholds, buffers, automation, prompts, generation profiles, injection limits, review behavior, retrieval behavior, and retention history where those controls are safe to expose.

This does not make data-integrity and security safeguards optional. Stable source identity, branch isolation, stale-write rejection, credential protection, recoverable writes, and raw-message preservation are system invariants rather than preferences.

The ordinary interface will present understandable defaults and concise modes. Detailed controls belong in a collapsed **Advanced** area so configurability does not become visual clutter. Settings may be inherited from the application default, overridden by a reusable Memorybook configuration, and overridden for one chat. The active value and its source must be inspectable.

## 3. Short Memory

Short Memory is the chat's temporary, aggressively compressed continuity layer. It preserves recent narrative meaning within a bounded token budget and is periodically replaced as newer conversation batches are summarized.

### 3.1 Role

Short Memory periodically compresses eligible raw conversation into a summary that is injected into later model context. It is derived and replaceable. Its purpose is continuity, not permanent archival.

Raw chat messages remain unchanged and available as the source of truth. Replacing a Short Memory summary never deletes its source messages.

### 3.2 Automatic trigger modes

Short Memory supports two selectable automatic trigger modes:

| Mode | Threshold example | Trigger basis |
| --- | --- | --- |
| Token interval | Every 24,000 tokens | Accumulated eligible source tokens since the last successful Short Memory boundary |
| Turn interval | Every 10 turns | Numbered roleplay turns started by committed model messages since the last successful Short Memory boundary |

The mode and threshold are configurable. Automatic summarization can also be disabled so that summarization is manual only.

Crossing a threshold makes a batch eligible; it does not require the newest active turn to be summarized immediately. The recent-context buffer determines the safe eligible range. A partial or failed generation cannot advance the processed boundary. The boundary advances only after the generated summary is successfully validated and saved to the same chat revision that produced it.

The token threshold refers to unsummarized eligible conversation content, not the total prompt, model context limit, or tokens already represented only by older memory. Exact tokenizer selection and fallback estimation remain to be specified.

### 3.3 Canonical roleplay-turn model

A roleplay turn is anchored by a committed model message:

1. The first committed model message starts **Turn 1**.
2. User messages following that model message belong to the same turn.
3. The next committed model message starts the next turn.
4. A model message generated through **Continue**, even when the user has not replied, starts the next turn.

Therefore:

```text
Turn 1: Model message → User reply/replies
Turn 2: Model message → User reply/replies
Turn 3: Model message → ...
```

and a continuation sequence is:

```text
Turn 1: Model message
Turn 2: Continued model message
Turn 3: Continued model message
```

This deliberately makes the model message—not a user/model pair count—the turn increment. The user side belongs to the preceding model-led turn.

### 3.4 Counting rules

- Each newly committed model message increments the roleplay-turn count once.
- One or several user messages after it remain part of that same turn and do not increment the count.
- Consecutive committed model messages increment the count separately, including Continue generations.
- A regeneration or swipe alternative replaces the model output for its existing turn and does not create another turn merely because alternatives were generated.
- Editing a message does not create another turn.
- Deleting, rewinding, or branching the transcript causes affected turn assignments and derived-memory boundaries to be recalculated from stable generation-segment identity before memory can be injected. Continue segments may share a displayed message; message IDs alone are insufficient. See [generation identity](./IMPLEMENTATION-CONTRACTS.md#1-generation-and-continuation-identity).
- System messages, hidden prompt instructions, tool events, memory injections, and Lorebook activations do not create roleplay turns.
- User messages before the first committed model reply are included in the first eligible source range but do not independently increment the turn count.

These rules describe logical roleplay turns. They remain independent from display grouping and from provider-specific API message arrays.

### 3.5 Summaryception verbatim baseline

The default verbatim behavior adopts the proven Summaryception values:

- keep a ceiling of **10 canonical roleplay turns** in raw verbatim context;
- process the **3 oldest eligible turns** in one Short Memory batch when the turn-based verbatim ceiling is exceeded.

In ordinary turn-based operation this creates a small hysteresis window: raw verbatim context grows to 10 turns, and after the next model turn makes compression eligible, the oldest batch is processed so approximately 8 turns remain raw. It then grows toward 10 again. This preserves the behavior experienced in Summaryception while avoiding a summarization request for every single old turn.

Both values are configurable. Ten turns and three turns are product defaults, not storage constraints. The 10-turn verbatim protection also remains the default when token-based triggering is selected; the precise interaction between a token threshold and an unusually large protected turn window remains part of the next design decision.

Summaryception's other defaults—20 snippets per layer, 3 snippets per promotion, and 5 layers—are not adopted yet. They describe its specific recursive implementation, including limitations identified in the audit. Equivalent defaults will be chosen only after the new bounded compression and provenance model is defined.

### 3.6 Batch safety

- A batch records stable IDs and fingerprints for every source message it represents.
- The currently active conversation edge may remain verbatim according to a configurable recent-context buffer.
- A Short Memory job cannot commit to a different chat, branch, source revision, or Memorybook revision.
- If a source message is edited, replaced, deleted, or moved onto another branch, dependent Short Memory is marked stale before the next model request.
- Failed or cancelled summarization leaves both the previous valid summary and the processed boundary intact.
- Users can inspect, manually run, regenerate, edit, disable, pin, and restore recent revisions of Short Memory.

## 4. Configuration surface established so far

The following settings are required, although their exact defaults and screen placement are not yet decided:

| Setting | Required choices or behavior |
| --- | --- |
| Automatic Short Memory | On or off |
| Trigger mode | Token interval or turn interval |
| Trigger threshold | Configurable positive token or turn count |
| Recent-context buffer | Configurable amount of newest conversation kept verbatim; default is 10 canonical turns |
| Turn compression batch | Configurable number of oldest eligible turns processed together; default is 3 |
| Manual summarization | Available regardless of automatic mode |
| Summarization generation profile | Uses a selectable shared NanoGPT Generation Settings profile without duplicating credentials |
| Summarization prompt | Editable under Advanced, with a restorable product default |
| Injection budget and placement | Configurable under Advanced and visible in the context inspector |
| Revision retention | Configurable history for replaced summaries, within safe storage limits |

Changing a trigger mode or threshold must not silently discard existing summaries or move a processed boundary. The application will preview the effect and either continue from the existing valid boundary or offer an explicit rebuild.

## 5. Decisions recorded

| ID | Decision | Status |
| --- | --- | --- |
| `MEM-001` | Short Memory is derived, compact, injected, and replaceable; Long Memory is durable and not silently rewritten. | Agreed |
| `MEM-002` | Memorybook settings are configurable, use clear defaults, and place detailed controls under Advanced. | Agreed |
| `MEM-003` | Automatic Short Memory supports token-interval and roleplay-turn-interval modes. | Agreed |
| `MEM-004` | Every committed model message starts/increments a turn; following user messages belong to that turn. | Agreed |
| `MEM-005` | Continue generations create new turns; regeneration and swipe alternatives retain the existing turn identity. | Agreed interpretation |
| `MEM-006` | Threshold progress advances only after a valid summary is safely committed. | Agreed foundation invariant |
| `MEM-007` | The default verbatim ceiling is 10 canonical turns and the default turn-compression batch is 3, preserving Summaryception's approximately 8–10-turn rolling raw window. | Agreed |
| `MEM-008` | Summaryception's recursive layer-count defaults are not inherited until the replacement compression model is defined and bounded. | Agreed |

## 6. Next decisions

The next Short Memory design pass must establish:

Audit A07 confirmed that this is a Phase 1 behavior gap, not merely later tuning. The [baseline proposal](./IMPLEMENTATION-CONTRACTS.md#9-short-memory-baseline-proposal) consolidates the choices below; the [shared prompt planner](./IMPLEMENTATION-CONTRACTS.md#8-shared-prompt-budgeting) supplies mandatory no-silent-loss and overflow requirements. Confirm rolling versus layered compression and pressure behavior before the exit review.

1. whether the active trigger applies globally, through reusable configurations, per chat, or all three through inheritance;
2. the default trigger mode and threshold;
3. whether Advanced settings may change the recent raw-message buffer from its default turn measurement to tokens;
4. how token-triggered processing behaves when the protected 10-turn window itself exceeds the selected token threshold;
5. whether threshold crossing starts immediately, waits until idle, or asks for approval;
6. whether Short Memory uses one rolling summary, multiple bounded layers, or another bounded structure;
7. how many overwritten summary revisions are retained;
8. how token usage and NanoGPT cost are previewed and reported.

The Short Memory lifecycle remains in definition, but Long Memory and scene-continuity requirements can now be developed alongside it as long as their ownership remains separate.

## 7. Long Memory retrieval direction

Long Memory is a durable collection of fixed, editable Memorybook entries retrieved automatically through bounded tags and typed relationships. It complements Short Memory by preserving richer scene history without placing the entire archive in every prompt.

### 7.1 Durable entry shape

Each Long Memory entry will act like a private, chat-owned Lorebook entry without being stored in the Character/Persona Lorebook system. It requires:

- a configurable longform memory body;
- a tiny recall card containing the minimum useful gist;
- direct activation tags describing when the entry is initially relevant;
- emitted tags that become retrieval cues after the entry is activated;
- typed links to related memories, such as `caused-by`, `continued-in`, `contradicts`, `reveals`, `same-character`, `same-location`, or `same-object`;
- chronology, importance, involved entities, and optional Scene/Arc/Chapter membership;
- stable source-message provenance and generation/edit history.

Tag matching and link traversal happen locally against metadata and do not consume NanoGPT context tokens. Only the final memory text and recall cards selected for prompt injection consume model context.

### 7.2 Bounded recursive retrieval

Long Memory recursion is permitted only inside explicit limits. The retrieval engine:

1. finds direct candidates from the current conversation and tracked scene state;
2. evaluates their tiny recall cards locally;
3. expands emitted tags and typed links for a configurable number of hops;
4. scores candidates using direct relevance, continuity, importance, chronology, active entities, link depth, and redundancy;
5. injects full longform text for the strongest candidates and recall cards for useful supporting candidates;
6. stops when any configured depth, branch, entry-count, or token-budget limit is reached.

The same entry cannot be injected twice in one request. Each recursive hop receives a relevance penalty. Discovery may identify more related memories than the prompt can afford; exceeding the injection budget never permits the engine to overflow the reserved context.

#### 7.2.1 Recall depth modes

Ordinary users choose one understandable mode rather than configuring a graph traversal:

| Mode | Expansion behavior | Default final payload ceiling |
| --- | --- | --- |
| **Light** | Direct activation only; no emitted-tag or typed-link hop. At most one full Long Memory entry is injected. | Lesser of 4,096 tokens or 8% of available input context |
| **Default** | Up to two recursive hops after direct activation. | Lesser of 8,192 tokens or 15% of available input context |
| **Deep** | Up to three recursive hops after direct activation. | Lesser of 12,288 tokens or 20% of available input context |
| **Custom** | Advanced controls define depth and every subordinate ceiling. | User-defined within application safety bounds |

Default is the initial product mode. The ordinary selector explains Light as focused, Default as associative, and Deep as broad; it does not expose graph terminology unless the user opens Advanced details. Custom is shown only when Advanced Settings is enabled.

#### 7.2.2 Recursive safety ceilings

Hop depth is a discovery limit, not permission to inject every discovered entry. Default may inspect at most 16 unique candidates and inject at most two longform entries plus six supporting Tiny Recall cards. Deep may inspect at most 32 unique candidates and inject at most three longform entries plus ten supporting Tiny Recall cards. Light inspects and injects only its strongest direct match.

Custom initially permits zero to five recursive hops, one to 64 inspected candidates, zero to eight full entries, zero to 32 supporting cards, and a 1,024-to-32,768-token payload ceiling. The application-level hard bounds remain in force even if a configuration file is edited manually. The smallest of the depth, candidate, entry, Tiny Recall, configured-token, context-percentage, total-context, and response-reserve limits always wins.

Local traversal over IDs, tags, links, and Tiny Recall metadata consumes no model tokens. Only the final selected payload counts toward the roleplay request. The Context Inspector shows the activation root, each followed link, depth penalty, rejected candidates, injected form, and final token cost.

### 7.3 Long Memory extraction triggers

Long Memory supports three complementary extraction triggers:

- **Scene boundary:** an explicit boundary ends the current source range and starts background extraction for that scene.
- **Safety interval:** a configurable turn or token interval creates a durable checkpoint during unusually long scenes.
- **Automatic scene-boundary candidate:** the optional State Worker may identify and propose a boundary according to its configured detection mode.

A safety checkpoint does not pretend that the scene ended. It extracts the eligible range while keeping the same scene identity, then links later checkpoint entries with typed continuation relationships. Triggering extraction never deletes or hides raw messages and does not block the conversation.

Manual **Remember This** is intentionally not a Long Memory extraction trigger. It belongs exclusively to Persistent Scene Memory and operates on one message at a time.

### 7.4 Manual scene boundary

The conversation timeline provides an **End Scene Here** control at the gap between messages. On desktop it appears when the gap receives pointer hover or keyboard focus; touch layouts provide the equivalent **End Scene After This Message** action without relying on hover.

Activating it:

1. inserts a visible but quiet scene-divider event at that exact stable message boundary;
2. closes the source range beginning after the preceding scene boundary or safety checkpoint;
3. queues Long Memory extraction for that range;
4. shows extraction state and offers a direct route to the resulting active entry, or the explicit Pending—Needs Retry state if extraction failed;
5. begins the next scene range without automatically clearing facts that may continue across the boundary.

The marker is part of chat history and follows branch semantics. Undoing, moving, or deleting a boundary must preview which generated entries will become stale and offer explicit regeneration rather than silently rewriting durable memory.

### 7.5 Direct entry creation and activation

Successful extraction has no draft, approval, or pre-activation review stage. The extraction job produces one complete durable Memorybook entry containing:

- a stable entry ID and exact source range;
- **Scene Details**, containing the extracted scene summary, time, date, participants, and location plus any enabled optional facets;
- a longform summary of the source messages that is intentionally much longer and more detailed than Short Memory;
- a Tiny Recall card containing the smallest useful reminder of the entry;
- activation tags;
- emitted tags;
- typed relationships to other entries;
- importance, entity, provenance, source fingerprints, and generation-version metadata.

The longform summary preserves narrative sequence, motivations, relationships, discoveries, promises, consequences, unresolved threads, and details likely to matter later rather than imitating Short Memory's aggressive compression.

#### 7.5.1 Longform size baseline

Long Memory keeps the proven Memory Books generation baseline: a configurable **4,000 output-token maximum** for extraction, using a detailed beat-by-beat narrative-memory prompt. This is a ceiling, not a required length; short scenes should produce shorter entries and must not be padded. An Advanced control may set another maximum or choose **Use generation profile limit**, corresponding to Memory Books' zero/unset behavior without exposing a cryptic numeric sentinel.

The default prompt remains editable and versioned. It preserves chronology, attribution, knowledge boundaries, concrete actions, relationship developments, consequences, unresolved threads, notable details, and useful quotations without repeating the source verbatim. Structured Scene Details, Tiny Recall, tags, links, entities, and provenance are generated alongside the body but remain separately validated fields rather than prose embedded inside it.

#### 7.5.2 Tiny Recall format

Tiny Recall is a deliberately small retrieval card, not a miniature longform summary. It uses simple subject–verb–descriptive/object statements in present-tense recall form:

- one short line for the active Persona;
- one short line for each principal non-user character, up to three individual character lines;
- background participants are omitted or combined only when a group action materially matters;
- names are explicit; pronouns never make the subject ambiguous;
- no headings, quotations, flourish, tag lists, metadata labels, or unsupported inference.

The default target is two to four sentences, roughly 20–80 words, with an absolute 128-token ceiling. A typical card may read: `User attends Potions class. Harry argues with Snape. Hermione brews a potion. Ron tries not to laugh.` If more than three principal non-user characters matter, the generator prioritizes the most consequential and leaves full detail in the longform entry.

#### 7.5.3 Extraction retry policy

Every extraction is bound to an immutable source snapshot and one idempotency key derived from chat, branch, source IDs/fingerprints, schema version, prompt version, and extraction generation. Raw source and the pending boundary remain intact until a complete valid entry commits.

Transient transport failures—network interruption, timeout, HTTP 408/425/429, and retryable 5xx responses—receive at most two automatic retries after the initial call. Backoff starts at two seconds, doubles with jitter, caps at 30 seconds, honors a valid `Retry-After`, and is abortable when the job becomes stale or the user cancels it. Permanent authentication, permission, quota, invalid-model, invalid-request, unsupported-schema, invalid-source, and configuration failures do not retry automatically.

A returned response that is complete but fails structured parsing or field validation receives one deterministic repair request containing the same frozen source plus only the validation errors and required schema. Truncated output may use that repair path if the provider reports or the parser proves truncation. No partial Scene Details, body, Tiny Recall, tags, or links are saved. A logical extraction is limited to four automatic model calls total across transport retries and repair.

After exhaustion, the entry remains **Pending—Needs Retry** rather than retrying on every new chat turn. It resumes when the user selects Retry, the relevant provider returns to healthy state, or the app restarts with automatic background retry enabled. Only one retry cycle may begin within 30 minutes unless explicitly requested. Success atomically creates and activates exactly one entry; repeated delivery of the same idempotency key returns the existing result.

#### Scene Details base schema

The confirmed Scene Details base contains:

| Field | Required behavior |
| --- | --- |
| Scene Summary | Exactly one concise sentence for user-facing display only; excluded from retrieval and model context |
| Time of day | One approximate phase from the active day cycle; the default is Dawn, Morning, Late Morning, Noon, Afternoon, Evening, Night, Midnight, or Deep Night |
| Date | Date, month, and year where known; unknown or partial values remain explicit rather than guessed |
| Characters present | Every character materially present at any point in the extracted scene, stored with stable identity and display name |
| Location | Either one location label or an ordered hierarchy of location segments |

The ongoing Scene State cast means characters present **now**. The extracted Scene Details participant list means characters present at any material point during the completed source range. Arrivals and departures can remain in the longform summary unless a later design requires structured attendance.

Time stores no advancing minute-level timestamp. The default phase ranges define meaning and visual placement only; custom fictional cycles remain supported. The visual clock's forward-only Time Skip HUD commits its target phase and any calendar-boundary result as one state change. Date supports approximate values, unknown components, relative day advances, and fictional calendars; crossing midnight never causes the application to invent missing date components. A material move to a different location should normally create a new scene boundary; minor movement can remain inside the same hierarchical location.

Per-character mood, current activity, clothing, disguise, and visible condition are optional Scene Details candidates and are recorded only when explicit or narratively relevant. The live chat now owns a Story Continuity Profile—primary Fandom, optional Crossover with a second Fandom, Era, and AU—but whether all of that profile is copied into fixed Scene Details remains open.

Scene Summary is presentation metadata for the user. It may appear in Memorybook lists, cards, search results, and navigation, but it is excluded from activation matching, emitted tags, embeddings, relevance scoring, recursive retrieval, prompt injection, and roleplay-model context. Editing it changes only the displayed label. Tiny Recall remains an independent retrieval-oriented field and cannot reuse or depend on Scene Summary merely because their text happens to be similar.

The application validates the complete structure, source revision, IDs, links, and required fields. A valid result is committed atomically to the chat's Memorybook as an active entry and becomes eligible for retrieval on the next prompt construction. An invalid, failed, cancelled, or stale result creates no partial entry, leaves the extraction boundary pending, and follows the configured retry policy without blocking chat.

There is no normal maintenance requirement after creation. Entries remain inspectable and manually editable, but automatic generation supplies their tags, links, Scene Details, summary, and recall card.

### 7.6 Automatic activation and hopping

An active Long Memory entry automatically becomes a retrieval candidate when one of its activation tags is mentioned or otherwise matched by an allowed retrieval cue. After selection:

1. its emitted tags may activate related candidates;
2. its typed relationships may propose linked candidates;
3. each additional hop is rescored and penalized by depth;
4. the bounded retrieval planner chooses full longform entries or Tiny Recall cards according to relevance and remaining budget;
5. the context inspector records the complete activation chain.

Only explicit emitted tags and typed links propagate recursion. The engine does not repeatedly scan the full text of every recalled memory for arbitrary new triggers. This preserves associative chains without uncontrolled token expansion. Once configured, tag activation, hopping, selection, and injection run automatically; manual intervention is reserved for optional correction, pinning, or advanced tuning.

## 8. Persistent Scene Memory

Persistent Scene Memory is the compact live-state layer that remains active across the current scene. It carries current location, time phase, present cast, selected pinned messages, and other validated continuity needed before a scene is extracted into Long Memory.

### 8.1 Purpose

Persistent Scene Memory is a compact active working set that runs parallel to Short Memory. It is not another permanent source of truth. It has two clearly separated contents:

- **Dynamic scene cards**, managed from current tracked state and replaced or retired through semantic lifecycle rules.
- **Pinned messages**, added explicitly through Remember This and retained until the user removes them.

The dynamic portion keeps the recall cards needed for the current scene continuously available, initially including:

- current Story Continuity Profile where applicable;
- current location and optional sub-location;
- characters currently present in the scene;
- the durable memories explicitly pinned to the active scene.

Live Scene State is confined to ongoing tracking and Persistent Scene Memory. Its confirmed base is current time/date, current location, characters present now, and the chat-owned Story Continuity Profile. The profile contains primary Fandom, optional Crossover with a second Fandom, Era, and AU. Relationships, intentions, important objects, consequences, and unresolved threads remain in narrative memory unless separately promoted by a later tracker decision. Visual presentation, Character Bank behavior, model-delivery modes, weather, and dialogue coloring are specified in the separate [Scene State and Visual Tracker Functional Specification](./SCENE-STATE-TRACKER-SPEC.md).

When tracked scene state changes, the retrieval engine adds newly relevant dynamic cards and retires cards that are no longer relevant. Users can inspect, correct, pin, or remove every active card. Persistent Scene Memory receives its own small injection budget and cannot consume the Short Memory or response reserve silently.

#### 8.1.1 Persistence without time decay

Persistent means the active scene state survives ordinary turns, Short Memory compression, context trimming, application restarts, and movement through the current chat until evidence or the user changes it. It does **not** mean values weaken with age. Persistent Scene Memory has no turn-count, clock-time, relevance-score, or probabilistic decay.

Current Fandom/Crossover/Era/AU, time/date, location, present cast, and other enabled current-state values remain stable until superseded, explicitly cleared, or invalidated by a source edit or branch change. A new scene boundary does not automatically erase facts that can continue into the next scene. Pinned messages are user-owned and persist across scene boundaries until explicitly unpinned.

#### 8.1.2 Semantic replacement and retirement

“Retirement” applies only when a dynamic card stops describing current state. A location card is replaced when the location changes. A character-presence card retires on a supported departure. Scene-bound mood, activity, clothes, visible condition, or salient-object state changes only through evidence, manual correction, or boundary reconciliation; it never fades merely because several turns passed.

At a scene boundary, the application performs a reconciliation pass. Globally persistent and progressive facts carry forward. Current time/date and location carry forward unless the boundary or following evidence changes them. Scene-bound and volatile fields are revalidated and may become Unknown rather than retaining an unsupported stale value. Retired cards remain in the event history and may already exist in the extracted Long Memory, but they stop being injected as present state.

### 8.2 Remember This

Every ordinary user or model message has a **Remember This** action. It applies to that individual message only:

- selecting message ranges is not supported by this action;
- it does not create a Long Memory entry or force a scene extraction;
- it pins a stable reference to the exact message content into Persistent Scene Memory;
- the pinned message remains active across scene changes until explicitly unpinned;
- editing, regenerating, deleting, swiping, or branching its source invokes the same provenance and stale-state protections as other derived memory;
- its context-token cost is visible before persistent pins exceed their configured budget.

Pinned messages have stronger retention than dynamic scene cards. They are never silently compressed, displaced, or dropped to satisfy the budget. If pins cannot fit, the application must warn the user and offer an explicit resolution.

#### 8.2.1 Pinned-message budget

Pinned verbatim messages have two configurable budget modes:

- **Message Count — default:** allow up to 10 pinned messages per chat. The limit is customizable in normal Memorybook settings.
- **Token Budget — Advanced:** allow pinned-message injection up to a customizable 2,000-token default, calculated from the exact serialized prompt representation—speaker/role wrapper plus verbatim content—using the active roleplay model's tokenizer where available.

Changing the model recalculates the token budget. When an exact tokenizer is unavailable, the interface labels the count **Estimated**, applies a configurable 10% safety margin, and never presents it as exact. The user may return to Message Count mode if estimated accounting is not acceptable.

Trying to add a pin beyond the selected limit is refused before state changes and opens Manage Pins with the current usage and required space. Existing pins are never automatically evicted. If a model/context change makes existing pins exceed their limit or the context reserve, sending is paused with direct choices to unpin messages, raise the permitted budget where safe, change model/context, or cancel; the application never silently omits a pin that promises verbatim injection.

### 8.3 State Worker contract

A low-level model may assist with scene tracking, but it does not communicate directly with the roleplay model. The application mediates the complete flow:

```text
Previous validated scene state + newest committed turn
                         ↓
                 optional State Worker
                         ↓
       schema-validated state change with evidence
                         ↓
        local tracker and Memorybook retrieval engine
                         ↓
       compact Persistent Scene Memory injection
                         ↓
                   roleplay model
```

The worker receives a narrow input: the previous validated state, the newest committed turn or configured batch, and only the recall cards needed to disambiguate it. It returns a structured change rather than prose. At minimum, every change identifies:

- the fields being added, changed, or removed;
- source message IDs supporting the change;
- confidence or ambiguity;
- any proposed activation/emitted tags or entry links.

The application validates the schema, IDs, revision, and allowed values before committing it. Omission alone cannot silently remove a character or location. Low-confidence contradictions are flagged for review. A failed, late, or invalid worker result leaves the last valid scene state intact and never blocks chat generation.

The authoritative native representation consists of a typed current-state snapshot, a validated state-event ledger, and periodic recovery checkpoints. Each job is bound to its originating chat, branch, source revision, schema version, and expected state revision. Stable message and entity IDs replace numerical message positions and free-form names as identity.

The first-release live schema is intentionally narrow: current time/date, hierarchical location, characters present now, the Story Continuity Profile, and the confirmed Cast fields. Rules-driven DnD mechanics are not part of the default Scene State schema.

When Long Memory extraction runs, source messages and validated state reconstructed at that source range's cutoff inform a separate fixed Scene Details record. Never pass a later scene's current snapshot into an older extraction. Include only corrections applicable to that range on the same branch. The entry never stores the live snapshot, state-event ledger, or tracker history. Scene State continues independently inside Persistent Scene Memory and ongoing tracking. See [cutoff-state extraction](./IMPLEMENTATION-CONTRACTS.md#3-historical-scene-extraction).

### 8.4 Automatic scene-boundary detection

The State Worker may add a structured scene-transition assessment to its ordinary tracking result. It evaluates signals such as:

- explicit time jumps or narrative cuts;
- movement to a materially different location;
- Fandom, crossover, Era, AU, reality, or dream transitions;
- resolution of one scene followed by a new objective or situation;
- a substantial cast and activity change when supported by narrative evidence.

A character entering or leaving, a location merely being mentioned, a brief flashback, or a topic change is not sufficient by itself. The result includes a boundary recommendation, confidence, reason codes, and supporting message IDs.

Detection modes are configurable:

- **Off:** only manual scene dividers and safety intervals are used;
- **Suggest:** the worker displays a subtle proposed divider that the user can confirm or dismiss;
- **Automatic:** a validated high-confidence result inserts the divider and starts extraction, with an immediate undo action.

Suggest is the intended initial default for model-assisted detection. Automatic mode cannot become a recommended default until a versioned prompt and multiple candidate models pass a labeled scene-boundary evaluation covering varied roleplay styles, continuations, group scenes, location mentions, flashbacks, dreams, time skips, ambiguous transitions, and false-positive traps. Confidence must be measured against that evaluation rather than trusted only because the model emitted a number.

#### 8.4.1 Boundary placement contract

The worker does not merely return `scene changed`. A candidate contains the exact stable message ID after which the previous scene ended, a reason code, supporting message IDs, and an uncertainty classification. It may place a boundary within the most recent three canonical turns so a transition can be recognized one turn late without attaching the divider to the wrong message.

The application verifies that the target gap still exists on the active branch, does not duplicate an existing boundary or safety checkpoint, and leaves at least one eligible source message on the appropriate side. Character entrance/exit, location mention without movement, topic change, brief flashback, OOC text, or Continue alone remain negative examples rather than sufficient evidence.

#### 8.4.2 Labeled evaluation corpus and gates

Each versioned boundary prompt and worker-model version is tested against at least 400 labeled transition windows drawn from at least 40 varied chats. The initial corpus contains at least 100 true boundaries and 300 difficult non-boundaries across single-character and group roleplay, `Name:` and Novel Dialogue, Continue-heavy passages, hard cuts, time and location changes, dream/flashback entry and return, new objectives, cast changes, OOC interruptions, ordinary topic shifts, and misleading place or time mentions.

Automatic mode requires at least 98% boundary precision, 85% recall, 98% exact inter-message placement among correctly detected boundaries, no more than one false automatic boundary per 200 negative windows, and zero stale or cross-branch commits. Precision is deliberately prioritized because a missed boundary is covered by the Safety Interval or manual divider, whereas a false boundary fragments durable memory.

Suggest mode may be evaluated at a lower threshold because the user confirms the divider, but suggestions still require evidence and useful placement. Metrics use externally labeled truth; the model's self-reported confidence is never treated as proof.

#### 8.4.3 Automatic detection safeguards

Suggest remains the first model-assisted default. Automatic is unavailable for a prompt/model pair until its evaluation gate passes and becomes visible as **Experimental** during early releases. Updating the worker model, quantization, boundary prompt, schema, or relevant parser invalidates that qualification and returns affected chats to Suggest until the new version passes.

In Automatic mode, an explicit structural signal supported by evidence—such as a clear narrative cut, material relocation, or time jump—may commit immediately. An ambiguous transition requires confirmation in the next worker pass. The default automatic minimum scene length is three canonical turns; clear structural evidence may bypass it. Every automatic divider exposes immediate Undo, and extraction obeys the same source-revision and idempotency guards as a manual boundary.

### 8.5 Deployment direction

The State Worker is a configurable capability, not a dependency of Memorybook correctness. Initial setup requires an explicit inference source or explicit disabling of its model-managed functions. Its selectable modes are:

- **Off/manual:** the user or deterministic application events maintain scene state;
- **Main-model extraction request:** an explicit backup uses the active roleplay model in a separate, isolated request; it is not a same-response sidecar;
- **Use API model:** a separate worker profile selects any compatible SillyTavern provider and model, including NanoGPT;
- **Local model:** a managed hidden `llama.cpp` runtime uses the verified default 2B-class GGUF or a compatible file selected with Browse.

The first implementation supports both Local and API behind the same adapter. Onboarding offers Local first, then API if Local is declined, then returns to Local or explicit Disable if API is declined. The application owns local delivery, health, updates, license notices, and recovery without opening a terminal. Final managed-model selection waits for in-context comparison of Qwen3.5-2B, Qwen3-1.7B, and SmolLM2-1.7B.

The exact hosted model is not hard-coded. It is selected from the configured compatible provider's catalogue and must pass a tracking evaluation for structured-output reliability, entity continuity, contradiction handling, latency, and cost before it can be recommended in the UI. The [worker capability matrix](./IMPLEMENTATION-CONTRACTS.md#5-worker-capabilities-and-cost) governs all modes, including Disabled. Disabling the worker does not disable separately configured Short/Long Memory generation jobs or manual scene-boundary extraction.

## 9. Long Memory decisions recorded

| ID | Decision | Status |
| --- | --- | --- |
| `MEM-009` | Durable entries include a longform body, tiny recall card, direct activation tags, emitted tags, typed links, entity metadata, and stable provenance. | Agreed direction |
| `MEM-010` | Recursive discovery operates locally over tags, cards, and links; only the bounded final payload consumes roleplay-model context. | Agreed direction |
| `MEM-011` | Persistent Scene Memory runs parallel to Short Memory and keeps Story Continuity Profile, location, present-character, and pinned-scene recall cards active. | Agreed direction |
| `MEM-012` | A model-assisted State Worker communicates with the roleplay model only through validated application state and prompt injection. | Recommended; validation required |
| `MEM-013` | First implementation supports managed local `llama.cpp`, any compatible API worker profile, and explicit Disable behind one worker interface; final local model selection requires in-context evaluation. | Agreed; model validation required |
| `MEM-014` | Long Memory extraction is triggered by explicit scene boundaries and configurable safety intervals; a safety checkpoint does not end the scene. | Agreed |
| `MEM-015` | Remember This pins exactly one message into Persistent Scene Memory and never creates a Long Memory entry. | Agreed |
| `MEM-016` | End Scene Here is an inter-message divider that closes a source range and triggers background Long Memory extraction. | Agreed direction |
| `MEM-017` | State Worker scene detection supports Off, Suggest, and Automatic modes; Suggest is the initial model-assisted default and Automatic requires evaluation evidence. | Agreed direction |
| `MEM-018` | A valid extraction atomically creates and immediately activates a complete durable entry; there is no draft, approval, or pre-activation review stage. | Agreed |
| `MEM-019` | Each extracted entry includes Scene Details, a detailed longform summary, Tiny Recall card, activation and emitted tags, typed relationships, and provenance. | Agreed |
| `MEM-020` | Tag activation and bounded hopping run automatically after setup; manual interaction is exceptional correction or tuning. | Agreed |
| `MEM-021` | Scene State uses a clean typed native implementation: Horae-inspired qualitative domains, Multihog-inspired State Worker safety/history, and no main-response tags or rolling text memo as the source of truth. | Agreed direction |
| `MEM-022` | Scene State is confined to ongoing tracking and Persistent Scene Memory; Long Memory stores only independently extracted, fixed Scene Details. | Agreed |
| `MEM-023` | DnD-specific trackers and simulation are deferred to an optional Playing Mode after the first final release. | Agreed |
| `MEM-024` | Scene Details require a one-sentence summary, time of day, date/month/year where known, all scene participants, and a simple or hierarchical location. | Agreed |
| `MEM-025` | Scene Summary is display-only user metadata. It never participates in retrieval, activation, embeddings, scoring, prompt injection, or model context; Tiny Recall remains separate. | Agreed |
| `MEM-026` | Persistent Scene Memory has no time- or turn-based decay; current values persist until evidence, manual action, source invalidation, or semantic lifecycle replacement/retirement changes them. | Agreed |
| `MEM-027` | Remember This defaults to a configurable 10-message limit; Advanced Token Budget defaults to 2,000 tokens and counts the actual serialized pin representation where the active tokenizer is available. | Agreed baseline |
| `MEM-028` | Pins are never silently evicted, compressed, or omitted; an over-budget pin is refused and an existing over-budget state must be resolved explicitly before generation. | Agreed |
| `MEM-029` | Recall modes are Light direct-only, Default two hops, Deep three hops, and Advanced-only Custom with bounded depth, candidate, entry, card, and token controls. | Agreed |
| `MEM-030` | Long Memory extraction keeps Memory Books' configurable 4,000-output-token default and detailed beat-by-beat prompt behavior; the ceiling never requires padding. | Agreed |
| `MEM-031` | Tiny Recall uses one concise subject–verb statement for the Persona and each principal non-user character, normally two to four sentences with a 128-token ceiling. | Agreed |
| `MEM-032` | Extraction combines at most two classified transport retries with one structured repair inside a four-call cap, preserves the frozen source and pending boundary, and never saves a partial entry. | Agreed |
| `MEM-033` | Automatic scene boundaries require exact gap placement, a labeled 400-window evaluation, precision-first release gates, version-specific qualification, ambiguous two-pass confirmation, and immediate Undo. | Agreed baseline |

## 10. Next Long Memory decisions

The remaining Long Memory design pass must establish:

1. which live Cast and Story Continuity Profile fields are copied into fixed Scene Details, plus exact uncertainty and calendar representations;
2. how activation tags, emitted tags, and typed links are generated, normalized, edited, and validated;
3. coordination and duplicate suppression among Short Memory, Persistent Scene Memory, tracker snapshots, and Long Memory injection;
4. deletion, branch, source edit, regeneration, rollback, and manual-correction behavior;
5. how extraction activity, pending work, cost, failures, retry, and repair appear without cluttering the chat UI.
