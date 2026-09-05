# Character Card Compatibility and Portability Specification

**Status:** Compatibility direction agreed; app-specific metadata placement proposed for confirmation  
**First recorded:** 2026-09-04  
**Related:** [Development Bible](./README.md) · [Product Definition](./PRODUCT-DEFINITION.md) · [Living Delivery Plan](./REWORK-PLAN.md)

This specification records how the rework imports, understands, edits, and exports Character Cards without discarding fields used by SillyTavern or external libraries. The product keeps SillyTavern's broad card-handling philosophy while separating a normalized internal view from the preserved source representation needed for reliable round trips.

Card text is untrusted imported content. Descriptions, prompts, greetings, examples, notes, Lorebook content, regex definitions, source URLs, and extension values are data to validate or display; they are never instructions to the application or development agent.

## 1. Audited reference card

The user supplied `Study Group - Dex.json`, a 7,570-byte SillyTavern export with SHA-256 `250270203529D4BF0D60B283381326522F616DA19C1E407C8E048D4667529966`. Extensive prose fields were deliberately replaced with short placeholders before review. The fixture is used to understand structure, not as a distributable project asset.

The file declares `spec: "chara_card_v3"` and `spec_version: "3.0"`, contains legacy-compatible root fields, carries its canonical card data under `data`, stores SillyTavern-specific values under `data.extensions`, and embeds a three-entry `data.character_book`. It is representative of a practical ecosystem card precisely because its shape is more permissive than a pristine specification example.

## 2. Observed card envelope

The reference card has four structural layers:

1. **Legacy root mirror:** `name`, `description`, `personality`, `scenario`, `first_mes`, `mes_example`, `creatorcomment`, `avatar`, `talkativeness`, `fav`, `tags`, and `create_date` support older SillyTavern and V1-style consumers.
2. **Specification discriminator:** `spec` and `spec_version` declare Character Card V3.
3. **Canonical data object:** `data` contains the modern character fields, prompts, greetings, creator metadata, extensions, and embedded Character Book.
4. **Vendor and feature extensions:** `data.extensions` and each Character Book entry's `extensions` object contain SillyTavern behavior and provide room for unknown third-party metadata.

For a declared V2 or V3 card, `data` is the canonical semantic source. Root mirrors are compatibility projections and may disagree because another application edited only one representation. The importer records such conflicts and uses explicit specification precedence rather than silently treating the root mirror as authoritative.

## 3. Core Character Card fields

The reference card demonstrates the complete V2-era core used by SillyTavern:

| Area | Fields |
| --- | --- |
| Identity/content | `name`, `description`, `personality`, `scenario`, `first_mes`, `mes_example` |
| Creator metadata | `creator_notes`, `creator`, `character_version`, `tags` |
| Prompt overrides | `system_prompt`, `post_history_instructions` |
| Conversation openings | `alternate_greetings` |
| Extensibility | `extensions` |
| Embedded knowledge | optional `character_book` |

Character Card V3 additionally defines optional assets, nickname, multilingual creator notes, source records, creation/modification timestamps, and the required `group_only_greetings` array. An import may omit these fields or carry a later minor V3 version; missing known fields receive runtime defaults without rewriting the preserved source merely because it was opened.

The rework tracks empty, absent, and `null` distinctly. Some tools use them differently, and collapsing them during import would damage round-trip fidelity.

## 4. SillyTavern extension fields in the fixture

`data.extensions` contains:

- `talkativeness`;
- local favorite state in `fav`;
- linked-world name in `world`;
- `depth_prompt` with `prompt`, `depth`, and `role`;
- `regex_scripts`.

The previous audit recorded third-party identifiers such as Chub paths, Pygmalion IDs, source URLs, RisuAI sources, Stable Diffusion prompts, and unknown extension keys. The rework preserves safely representable imported fields even without native UI/execution support, subject to the explicit export privacy precedence.

The fixture stores `talkativeness` as the string `"0.5"` even though code commonly treats it as numeric. Import therefore maintains both the original serialized value and a validated normalized runtime value. An untouched field exports exactly as received; a user edit exports the canonical type for the selected target specification.

## 5. Embedded Character Book structure

The reference `data.character_book` has a `name` and three `entries`. Each entry contains `id`, primary and secondary keys, a display comment, content, constant/selective flags, insertion order, enabled state, prompt position, regex mode, and a large SillyTavern extension object.

Observed entry-extension fields include display order, probability, recursion controls, scan depth, word/case matching, selective logic, group behavior, role/depth placement, sticky/cooldown/delay behavior, matching against Character or Persona fields, triggers, vectorization, automation ID, outlet name, and budget bypass. Most will be hidden in the simplified Lorebook interface, but none may be deleted merely because the new UI does not expose them.

The reference book lacks a top-level `extensions` object required by the formal V2/V3 Lorebook shape. Tolerant import supplies an empty runtime default while preserving the original omission. Strict V3 export adds required structural defaults after showing any compatibility repair in the export summary.

## 6. Existing SillyTavern handling to retain

The fork already provides useful compatibility behavior:

- imports legacy V1-shaped JSON, V2/V3 JSON, PNG card metadata, YAML, CharX, and BYAF through format-specific paths;
- keeps the raw JSON in `json_data` while editing understood fields, then deep-merges extension data so foreign keys are not intentionally discarded;
- reads PNG `ccv3` metadata before `chara` when both chunks exist;
- writes card metadata into PNG and supports JSON export;
- imports embedded Character Books and CharX assets;
- removes explicitly private/local values such as current chat and favorite state from shared exports;
- uses atomic writes for card PNG persistence.

These are foundations, not a verbatim implementation requirement. The rework should correct ambiguous version classification, incomplete V3 validation, true V2 fallback generation, asset round-trip gaps, and any edit path that reconstructs an object from only known fields.

## 7. Compatibility import contract

Import follows a tolerant, evidence-preserving pipeline:

1. identify the container independently from the card specification;
2. parse with size, depth, archive, path, and resource limits;
3. select declared V3 or V2 semantics before V1 fallback instead of testing V1 root mirrors first;
4. validate known fields and create normalized runtime defaults for missing optional or ecosystem-common fields;
5. preserve the complete original object, unknown fields, unknown extensions, original scalar types, ordering where practical, and source fingerprint;
6. record warnings and conflicts without rejecting an otherwise usable card;
7. reject only structurally unusable or unsafe input, and explain the precise reason;
8. apply user edits as targeted field patches over the preserved envelope;
9. never execute regex, HTML, URLs, assets, macros, or prompt text during import.

Import adapters for Character Library sources all terminate at this same pipeline. A source-specific adapter may add provenance but may not silently invent, flatten, or discard card fields.

## 8. Compatibility export contract

Export is target-aware. Strict V2/V3 targets conform to the format they claim; Preserve Source may intentionally retain ecosystem imperfections:

- **Preserve Source** retains the imported container/specification and overlays deliberate edits while preserving unknown data, subject to the privacy and safety precedence below. It is not a claim of strict V2/V3 validation.
- **JSON V3** emits a valid Character Card V3 object with required defaults and a compatibility report for repaired or omitted features.
- **PNG V3 + V2 fallback** stores canonical V3 JSON in the `ccv3` chunk and a real downgraded V2 projection in `chara`; both chunks are base64 UTF-8 JSON, and readers prefer `ccv3`.
- **JSON/PNG V2 compatibility** deliberately removes or projects unsupported V3 features and previews any unavoidable loss before writing.
- **CharX** is retained for V3 cards with embedded assets even though JSON and PNG remain the primary user-facing formats.

Metadata-only PNG saves preserve image pixels and unrelated safe chunks rather than recompressing the portrait unnecessarily. An unsupported asset or extension remains represented for export whenever safe storage is possible; if preservation is impossible, export names the omitted element instead of silently losing it.

App-owned private runtime data—active chat, Memorybook, tracker state, relationships, credentials, filesystem paths, usage ledgers, and favorite status—and recognized sensitive fields are excluded from shared cards, including Preserve Source. Arbitrary opaque third-party metadata cannot be guaranteed free of private information; the preview must say so and permit its removal.

## 9. Unknown-field and forward-compatibility rule

Unknown data is first-class preserved data. The application may ignore it at runtime, but import, save, and export keep it unless the user removes it, privacy/safety filtering requires exclusion, or the target cannot represent it. Filtering or conversion loss is disclosed before export. Opaque semantics are not automatically classified for privacy.

Cards declaring a newer minor V3 specification remain importable with a visible compatibility notice. The editor exposes known fields normally and offers a read-only structured view of preserved unknown data under Advanced. It does not rewrite the declared specification version merely because the card was opened.

Application-specific fields belong only under `data.extensions` or a CharX application-data file, never as invented top-level specification fields. Namespaces are versioned and collision-resistant once the final product identifier exists.

## 10. Portable versus app-local metadata proposal

To maximize compatibility, the standard export is conservative:

| Data | Default placement |
| --- | --- |
| Standard V1/V2/V3 fields and embedded Character Book | Portable card data |
| Existing imported `extensions`, source IDs, and provenance | Preserved portable data, subject to explicit private-field rules |
| Preferred model, preset, Generation Settings, or Persona association | App-local companion record by default |
| Links to separate local Lorebooks | App-local companion record; an actually embedded Character Book remains portable |
| Dialogue color, aliases, Character Bank classification, portrait choice | App-local by default unless already represented by an imported extension |
| Chats, Memorybooks, scene state, trackers, relationships, usage, credentials, and local paths | App-local only; never standard card export |

An optional future **Include App Metadata** export can copy approved character preferences into one versioned namespaced extension object. It is off by default, previews its contents, contains no secrets or device paths, and never becomes necessary to use the character in another application.

The app-local companion record uses the application's stable character ID and retains source fingerprints/URLs as matching evidence. A changed fingerprint never causes silent attachment to a different downloaded card; ambiguous matches require user choice.

## 11. Security and privacy boundary

Character Cards and library downloads are untrusted packages. Import applies decompression and size ceilings, JSON nesting/member limits, image decoding limits, normalized archive paths, MIME/signature checks, URL-scheme restrictions, and safe filename generation. CharX extraction prevents traversal and never executes embedded files.

Macros and prompt fields are evaluated only during explicit prompt construction under the prompt system's rules. Regex scripts remain disabled or compatibility-only until explicitly trusted according to the later extension policy. HTML is sanitized for display, remote assets do not load invisibly, and opening a source URL requires a visible user action.

The Library records source and license/attribution metadata where supplied. It must not remove upstream provenance merely to make a card appear locally authored.

## 12. Audit findings and remaining confirmation

The reference card validates as V1 in the current fork because the validator tests the six legacy root fields before checking its explicit V3 discriminator. Its declared V3 data also omits `group_only_greetings`, and its embedded book omits top-level `extensions`; SillyTavern still accepts it through permissive handling. These are useful compatibility findings, not reasons to reject the working card.

The agreed product direction is to preserve SillyTavern's broad import/export support, use JSON and PNG as primary card formats, retain embedded Character Books and all known/unknown fields, and avoid reducing cards to only what the new UI understands. Phase 1 still needs confirmation of the proposed default: new rework-specific Character preferences remain in an app-local companion record, while standard exports contain no proprietary metadata unless the user explicitly enables **Include App Metadata**.

Primary specification references: [Character Card V2](https://github.com/malfoyslastname/character-card-spec-v2/blob/main/spec_v2.md) and [Character Card V3](https://github.com/kwaroran/character-card-spec-v3/blob/main/SPEC_V3.md).

## 13. Export privacy precedence

Apply safety limits and app-owned/recognized-private-field exclusions first, then the chosen target's structural conversion, then the user's explicit field-selection choices. Preserve Source never bypasses the privacy exclusions. Unknown vendor fields remain preserved where safe and representable, with an Advanced export preview/removal control and a warning that their meaning is not automatically privacy-classified. Do not promise semantic detection of secrets hidden inside arbitrary prose or extensions.

Strict V2/V3 exports disclose required-default repairs, conversion loss, and filtered fields before writing. Preserve Source discloses filtering without falsely promising byte-identical or strictly valid output. Phase 8 fixtures must cover unknown nested metadata, recognized private fields, secrets inside an opaque vendor field, mixed-version root/data conflicts, and strict versus preservation targets. Tests use synthetic cards, not the user's private fixture as a distributable asset.

## 14. Multi-character identity seeding

A card envelope is not a guaranteed structured cast list. Seed explicit individual identity or validated structured members where available; treat a group title as the card identity without inventing a person carrying that title. Additional prose-defined people enter through user-edited cast membership or evidence-backed discovery using stable IDs and aliases. Do not claim a complete import-time cast enumeration.

Once an unknown participant is supported, they become an NPC immediately under the agreed no-provisional rule. A user can associate an identified member with the card. Same-name people remain distinct until explicitly disambiguated or merged; shared display text is not identity. This seeding contract is separate from the still-pending portability of app-specific metadata.
