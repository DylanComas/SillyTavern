# SillyTavern Rework — Living Delivery Plan

**Status:** Active  
**Current stage:** Product definition — closure questions  
**Last updated:** 2026-09-04  
**Companion document:** [Development Bible](./README.md)

This is the operational plan from the current concept baseline through official deployment. The Development Bible records what the product is and why; this plan records what happens next, in what order, and how completion is judged.

## 1. How this plan is maintained

This file is a living project control document, not a one-time estimate.

- Update the status dashboard whenever work begins, becomes blocked, changes scope, or is completed.
- Add product and architectural decisions to the Development Bible; reflect their delivery impact here.
- Give implementation work a phase and a track before starting it.
- Record newly discovered work instead of silently expanding an active milestone.
- Do not advance through a phase gate while required evidence is missing.
- Keep deferred ideas visible in the backlog, but outside the committed release scope.
- Record dates when a phase or release gate changes status.

### Status vocabulary

| Status | Meaning |
| --- | --- |
| Not started | No committed work has begun. |
| Defining | Requirements or design are being resolved. |
| Ready | Scope and dependencies are clear enough to begin. |
| In progress | Implementation or validation is active. |
| Blocked | A named dependency or decision prevents progress. |
| Validating | Work is implemented and under review or testing. |
| Complete | Exit criteria are met and evidence is recorded. |
| Deferred | Deliberately outside the current release. |

## 2. Current position

This section is the plan's live status checkpoint. Its child notes separate completed foundations from the immediate objective so future work begins from the latest agreed state rather than replaying earlier discussions.

### Completed foundations

- Initial repository and UI architecture audit.
- Electron selected for the desktop application.
- Android APK established as a product target, with Capacitor as the current packaging direction.
- NanoGPT selected as the primary hosted AI provider.
- Creative roleplay remains API-first; a local `llama.cpp` State Worker is now an explicit supported setup path.
- Desktop and mobile visual directions selected.
- Light and dark appearance modes established.
- In-app console requirement established; packaged desktop builds must not leave a terminal visible.
- Development Bible created as the product source of truth.

### Immediate objective

Define the complete functional scope before choosing the final frontend migration strategy or implementing the visual rework.

The first inventory is now recorded in [Product Definition](./PRODUCT-DEFINITION.md). Chat restoration, new-chat inheritance, optional Character-preferred generation, combination auto-load, Memorybook/Lorebook ownership, protected Default Settings, core generation controls, the progressive Generation panel, Memorybook, Scene State, and visual tracker product directions are resolved. Phase 1 remains in **Defining** status only while its five closure questions and exit review remain open.

The Summaryception and Memory Books code audit is complete in [Memorybook Foundation Audit](./MEMORYBOOK-FOUNDATION-AUDIT.md), including a focused retry follow-up. The [Memorybook Functional Specification](./MEMORYBOOK-FUNCTIONAL-SPEC.md) is now in definition. Short Memory establishes configurable token/turn triggers, canonical roleplay turns, and Summaryception's 10-turn/3-turn-batch default. Long Memory now has metadata-first recursive recall, Light/Default/Deep/Custom traversal modes, manual scene boundaries, safety checkpoints, immediate active entry creation, non-decaying semantic Persistent Scene Memory, bounded verbatim pins, Memory Books-sized longform extraction, Tiny Recall formatting, classified retries, and a precision-first Automatic boundary gate.

The Horae, Multihog, and MeguminSuite capability audit is complete in [Scene State and Tracker Foundation Audit](./TRACKER-FOUNDATION-AUDIT.md). The selected direction is a typed native Scene State engine: Horae informs compact live state, Multihog informs isolated State Worker execution and recovery, and MeguminSuite informs Character Bank discovery, field lifetimes, change-only updates, and undo. The [Scene State and Visual Tracker Functional Specification](./SCENE-STATE-TRACKER-SPEC.md) now defines native ambient visuals, model-delivery policies, the Character Bank, and renderer-owned dialogue colors. DnD Playing Mode is explicitly deferred until after the first final release.

The State Worker technical baseline is now agreed and the reusable SillyTavern plumbing is documented in the [State Worker Reliability Foundation Audit](./STATE-WORKER-FOUNDATION-AUDIT.md). Setup requires Local, API, or explicit Disable; the managed Local path uses hidden `llama.cpp`, supports Browse for another GGUF, and will compare Qwen3.5-2B, Qwen3-1.7B, and SmolLM2-1.7B in the working interface. Cadence is asynchronous and never blocks chat. Limits, the 80% Warning threshold, and the 90% Protection threshold are configurable. The 60-million-token weekly fixture applies only to a detected active NanoGPT subscription, while other providers use capability-based accounting.

The next definition pass closes settings versioning, Character Card metadata portability, Lorebook compatibility, internet research, and exact desktop/Android v1 scope. Detailed model evaluation, retry tuning, source mutation, cross-layer deduplication, weather performance, visual design, and other implementation mechanics now belong to later architecture, UX, data, or validation phases unless the exit review reveals a missing product decision.

## 3. Delivery dashboard

| Phase | Outcome | Status |
| --- | --- | --- |
| 0. Foundation and governance | Shared direction, source-of-truth documents, working rules | Complete |
| 1. Product definition | Agreed workflows, UI delta, extensions, and release scope | Defining |
| 2. Architecture validation | Proven desktop, mobile, security, and migration architecture | Not started |
| 3. UX and interaction specification | Complete desktop/mobile behavior before broad implementation | Not started |
| 4. Design system foundation | Accessible tokens and reusable component primitives | Not started |
| 5. Application platform foundation | Shared frontend foundation and production-grade Electron shell | Not started |
| 6. Core desktop experience | End-to-end desktop conversation product | Not started |
| 7. NanoGPT and generation experience | Reliable provider, models, streaming, and generation controls | Not started |
| 8. Data, settings, and compatibility | Safe persistence, import, migration, and recovery | Not started |
| 9. Native extension integration | Prioritized extension capabilities integrated coherently | Not started |
| 10. Android application | Installable, touch-native APK with resolved backend topology | Not started |
| 11. Hardening and release readiness | Security, accessibility, performance, and test gates met | Not started |
| 12. Preview, alpha, and beta | Real-world validation and migration confidence | Not started |
| 13. Official deployment | Signed release, documentation, support, and rollback readiness | Not started |
| 14. Post-launch operations | Stable updates, triage, telemetry policy, and follow-up roadmap | Not started |

## 4. Phase 1 — Product definition

**Goal:** establish what the rework must do before deciding exactly how it will be built.

### 4.1 Core workflow inventory

Review and prioritize at least the following areas:

- first launch and NanoGPT connection;
- API credential management and connection testing;
- model discovery, selection, favorites, and model-specific capabilities;
- character browsing, creation, editing, import, export, and duplication;
- personas and user identity;
- one-to-one conversations;
- group conversations;
- message editing, deletion, continuation, regeneration, and impersonation;
- alternate responses/swipes and branch creation;
- prompt construction and prompt inspection;
- generation presets and per-chat overrides;
- lorebooks/world information, activation, and inspection;
- chat search, organization, renaming, pinning, and deletion;
- attachments, images, audio, and other supported media;
- token/context visibility and session diagnostics;
- backgrounds, themes, accessibility, and display controls;
- data backup, restore, import, export, and migration;
- extension discovery, configuration, execution, and failure states;
- application updates, troubleshooting, and the embedded console.

Each workflow receives:

- priority: Must, Should, Could, or Later;
- platform: Desktop, Android, or Both;
- user entry point;
- expected result;
- required data and dependencies;
- empty, loading, error, offline, and recovery states;
- compatibility implications;
- acceptance criteria.

### 4.2 Original UI delta ledger

Every meaningful existing surface or interaction is assigned one disposition:

| Disposition | Meaning |
| --- | --- |
| Keep | Existing behavior is already appropriate; restyle or relocate only if needed. |
| Rework | Preserve the capability but redesign its interaction. |
| Replace | Introduce a different workflow that fulfills the same need. |
| Remove | Eliminate behavior that is obsolete, redundant, or actively harmful. |
| Defer | Preserve compatibility temporarily, but exclude redesign from the first release. |

The ledger must identify hidden dependencies so that removing a button or drawer does not remove an undocumented capability.

### 4.3 Extension integration register

For every extension under consideration, record:

- name and current source;
- user value and workflows enabled;
- current UI surfaces and backend dependencies;
- whether it is actively maintained;
- desktop and mobile relevance;
- permission, privacy, network, and secret-handling needs;
- integration classification;
- target release wave;
- migration and compatibility concerns.

Integration classifications:

| Classification | Meaning |
| --- | --- |
| Native core | Capability becomes a maintained part of the reworked product. |
| First-party module | Ships with the app but remains independently bounded. |
| Adapted extension | Existing extension is supported through a new standardized surface. |
| Compatibility only | Must continue to function, but is not redesigned initially. |
| Retire/replace | Existing extension is superseded by a native workflow. |
| Deferred | Not part of the first release. |

### 4.4 Release scope

Use the three inventories to define:

- the minimum complete desktop release;
- the minimum complete Android release;
- extension integration wave 1;
- compatibility commitments;
- explicitly deferred capabilities;
- release-blocking versus follow-up defects.

### 4.5 Phase 1 closure sequence

No additional top-level product theme is required before the Phase 1 exit review. The remaining questions are closed in dependency order:

1. **Settings versioning:** application/schema/default revision identities, current-file Save behavior, portable Export, recovery, and the precise boundary among application defaults, Character Defaults, Persona Defaults, Generation Settings, Preset Configurations, and chat state.
2. **Character Card metadata:** decide which preferences travel portably in namespaced card data, which remain app-local, how imports merge them, and how unsupported applications preserve or ignore them safely.
3. **Lorebook compatibility:** retain the necessary SillyTavern data and activation semantics behind the simplified interface, define lossless import/export, and settle explicit Memorybook-to-Lorebook promotion ownership.
4. **Internet research:** select user-facing activation modes, provider and privacy boundaries, evidence/citation behavior, cache/freshness rules, and token/cost disclosure.
5. **Exact desktop and Android v1 scope:** approve the platform feature matrices, Wave 1 integrations, compatibility commitments, deferrals, and release-blocking criteria.

The Phase 1 exit review follows immediately after the fifth decision. If a closure topic exposes a genuinely new product question, it is recorded explicitly; implementation detail alone does not reopen product definition.

### 4.6 Assigned later validation

Questions that require running code, provider responses, device measurements, legal terms, or detailed screen design do not block Phase 1 when their intended product behavior and validation owner are clear. These include State Worker model selection, exact NanoGPT price/usage-field verification, relationship extraction thresholds, long-chat token benchmarks, OpenWeather license and attribution confirmation, external character-library API feasibility, Android backend topology, frontend framework choice, and precise accessibility/performance budgets.

The exit review must assign each item to Phase 2 architecture validation, Phase 3 UX specification, Phase 8 data and compatibility, Phase 9 native integration, Phase 10 Android, or the appropriate release gate. A failed later spike may revise scope through the normal decision process without pretending that an unevaluated technical assumption is already proven.

### Phase 1 exit gate

- Core workflows are inventoried and prioritized.
- Original UI delta ledger is reviewed.
- Extension register is ranked and classified.
- Desktop v1 and Android v1 scopes are explicit.
- No Must-have capability lacks an intended home in the new information architecture.
- Open product decisions have owners or a planned validation method.

## 5. Phase 2 — Architecture validation

**Goal:** prove the difficult technical choices with small prototypes before committing the whole rework to them.

### Required decisions and spikes

These spikes resolve the highest-risk platform assumptions before feature implementation begins. Each child note owns one architecture question and its evidence requirement.

#### Frontend migration

- Compare incremental modernization with an isolated new application shell.
- Select the component framework, state strategy, routing approach, build tooling, and test stack.
- Define how existing SillyTavern behavior is invoked during migration.
- Prove that old and new surfaces can coexist safely if migration is staged.

#### Electron runtime

- Launch the SillyTavern runtime without a visible terminal.
- Capture stdout, stderr, exit state, and restart events.
- Prove clean shutdown without orphan processes.
- Define secure main/renderer boundaries and a minimal IPC surface.
- Validate deep links, file dialogs, updates, and application data locations.

#### Embedded console

- Stream captured logs into a bounded in-app buffer.
- Prove secret redaction before logs reach the UI or export path.
- Define persistent log rotation and diagnostic export.
- Validate startup-failure and runtime-crash recovery flows.

#### NanoGPT

- Confirm the supported API protocol and authentication behavior.
- Validate model listing, streaming, cancellation, errors, rate limits, and usage metadata.
- Identify model capability differences the UI must represent.
- Prove secure credential storage on desktop.

#### State Worker runtime and transaction

- Launch managed `llama.cpp` without a terminal and expose health and logs inside the application.
- Validate consented model delivery, checksum verification, removal, Restore Managed Model, and Browse for an external GGUF.
- Prove Local → API → Local-or-Disable onboarding without a half-configured automation state.
- Run the three candidate models through the labeled roleplay fixture and compare accuracy, invention rate, latency, memory, and repair frequency.
- Prove one-job execution, turn coalescing, cancellation, branch and revision guards, atomic commits, event replay, and the circuit breaker.
- Demonstrate that worker backlog never delays roleplay generation.

Before UI polishing, replace the illustrative fixture with executable schema/identity/provenance cases. The [implementation contracts](./IMPLEMENTATION-CONTRACTS.md) require generation/Continue segment IDs, span-aware bounded jobs, total attempt ceilings, historical cutoff-state extraction, request-aware re-anchoring, and isolated provider requests. Prove these in the rework using synthetic fixtures; do not audit or modify the original application or extension clones.

#### Android topology

- Test Capacitor against the selected frontend foundation.
- Decide between standalone, thin-client, and dual-mode behavior.
- Validate Android networking, certificates, storage, backgrounding, and process limits.
- Define secure credential storage and device migration behavior.

#### Extension boundary

- Identify stable APIs required by native modules and compatible third-party extensions.
- Define permissions, lifecycle, settings, navigation contribution, and failure isolation.
- Prove one representative integration before designing the entire extension surface.

### Architecture records

Every locked choice should receive a short architecture decision record containing context, chosen approach, rejected alternatives, consequences, and revisit conditions.

### Phase 2 exit gate

- High-risk paths have working prototypes.
- Electron launches and exits cleanly without a production terminal.
- NanoGPT’s critical request lifecycle is proven.
- Android topology is explicitly chosen.
- Frontend migration and extension boundaries are documented.
- Security review finds no unresolved critical design flaw.

## 6. Phase 3 — UX and interaction specification

**Goal:** convert concept art and functional scope into buildable behavior.

### Deliverables

- desktop and mobile information architecture;
- navigation map and route ownership;
- end-to-end flows for all Must-have workflows;
- wireframes for primary, secondary, and advanced surfaces;
- responsive behavior and breakpoint rules;
- panel sizing, collapsing, and focus behavior;
- command palette taxonomy and keyboard shortcuts;
- Preferences structure, including Advanced → Console;
- onboarding and NanoGPT setup;
- loading, streaming, empty, offline, warning, and failure states;
- destructive-action confirmation and recovery patterns;
- accessibility behavior and keyboard navigation map;
- updated high-fidelity desktop and mobile screens;
- component inventory linked to the design system backlog.
- scene-clock interaction specification, including the forward-only Time Skip HUD, next-occurrence selection, and midnight rollover feedback;
- weather presentation specification with only Static and Animated levels, including the upper-third sky treatment and accessibility fallback;
- OpenWeather integration flow, privacy boundary, attribution placement, and subscription-license compatibility decision;

### Phase 3 exit gate

- Every v1 workflow has an approved flow and screen home.
- Desktop and mobile behavior is specified at all relevant sizes.
- Error and recovery states are designed, not deferred to implementation.
- The concepts have been translated into consistent, testable interaction rules.

## 7. Phase 4 — Design system foundation

**Goal:** create the reusable visual and behavioral vocabulary for the rework.

### Deliverables

- semantic color tokens for light and dark modes;
- typography, spacing, radius, elevation, border, and motion tokens;
- iconography rules;
- density and touch-target standards;
- focus, hover, pressed, selected, disabled, busy, error, and success states;
- buttons, inputs, selectors, tabs, menus, tooltips, dialogs, sheets, cards, lists, trees, split panes, virtualized feeds, toasts, and progress components;
- message and composer primitives;
- accessibility annotations and automated checks;
- isolated component documentation and visual regression fixtures.

### Phase 4 exit gate

- Core components render correctly in light and dark modes.
- Keyboard and screen-reader behavior is verified.
- Desktop density and mobile touch behavior are both supported.
- Visual regression testing covers foundational states.

## 8. Phase 5 — Application platform foundation

**Goal:** establish a production-capable base before feature migration accelerates.

### Workstreams

- shared frontend shell, routing, state, errors, and localization readiness;
- typed interfaces around legacy/server behavior;
- Electron window, runtime supervisor, IPC, secure storage, and update seams;
- embedded console foundation;
- common logging with redaction;
- build modes and environment configuration;
- unit, integration, end-to-end, and visual test infrastructure;
- continuous integration for supported targets;
- feature flags for staged migration;
- crash recovery and safe startup mode;
- developer documentation and reproducible setup.

### Phase 5 exit gate

- A signed-off vertical shell runs in development and packaged desktop form.
- The runtime is supervised without a visible terminal.
- Logs are accessible and sanitized in-app.
- Tests and builds run consistently in automation.
- Legacy coexistence or migration boundaries are proven.

## 9. Phase 6 — Core desktop experience

**Goal:** deliver a complete desktop vertical slice, then expand it to the agreed desktop v1 scope.

### Suggested implementation order

1. Application shell, navigation rail, status area, and Preferences shell.
2. Conversation list, search, organization, and chat lifecycle.
3. Character header and central message feed.
4. Composer, streaming output, cancel, continue, edit, and regenerate.
5. Swipes, branches, message actions, and history navigation.
6. Contextual inspector and panel persistence.
7. Characters and personas.
8. Lore/world information and activation inspection.
9. Generation presets and prompt inspection.
10. Import, export, backup, restore, and recovery.
11. Remaining Must-have desktop workflows from Phase 1.

Each migrated surface needs functional parity evidence or an explicit approved difference from the original UI.

### Phase 6 exit gate

- Desktop v1 workflows can be completed end to end.
- No critical workflow requires returning to an unexplained legacy screen.
- Light/dark, keyboard, resizing, and recovery behavior pass validation.
- Representative real user data performs acceptably.

## 10. Phase 7 — NanoGPT and generation experience

**Goal:** make hosted model use reliable, legible, and safe.

### Deliverables

- guided NanoGPT setup and connection test;
- secure API-key storage and replacement/removal flow;
- model catalogue with search, favorites, metadata, and capability states;
- per-chat model and preset selection;
- streaming, cancellation, retry, timeout, and reconnect behavior;
- rate-limit, authentication, account, provider, and model errors translated into useful actions;
- generation parameters with safe defaults and advanced disclosure;
- prompt/context inspection and token-budget visibility;
- provider-capability accounting with authoritative, reported, estimated, currency/credit, and local-only modes;
- configurable Warning and Protection thresholds with NanoGPT active-subscription detection;
- secret-free logs and diagnostics;
- mocked provider tests plus controlled live integration tests.

### Phase 7 exit gate

- All supported generation paths pass end-to-end testing.
- Credentials remain outside renderer-accessible plain storage and sanitized logs.
- Connection and model failures are recoverable without opening a terminal.
- Provider-specific details do not leak unnecessarily into ordinary chat use.

## 11. Phase 8 — Data, settings, and compatibility

**Goal:** ensure existing users can trust the rework with their data.

### Deliverables

- inventory and versioning of persisted data;
- migration strategy from supported SillyTavern versions;
- settings ownership and defaults;
- atomic writes and corruption recovery where applicable;
- import/export fidelity tests;
- backup and restore workflow;
- data-location visibility and user-controlled export;
- compatibility test corpus for characters, chats, personas, lorebooks, presets, and supported extension data;
- downgrade/rollback expectations;
- privacy and data-retention documentation.

### Phase 8 exit gate

- Migration succeeds against the agreed fixture corpus.
- Failed migrations preserve recoverable originals.
- Backup and restore are tested, documented, and understandable.
- Compatibility exceptions are explicit and accepted.

## 12. Phase 9 — Native extension integration

**Goal:** integrate the highest-value extension capabilities without fragmenting the new product.

### Delivery approach

- Implement the extension contract proven in Phase 2.
- Integrate wave 1 in priority order from the extension register.
- Place settings, actions, and status in shared product surfaces.
- Isolate failures so one module cannot destabilize chat or startup.
- Apply permissions and network disclosure consistently.
- Provide a compatibility route for supported non-integrated extensions.
- Update migration guidance for replaced or retired extensions.

### Per-extension completion criteria

- workflow and ownership documented;
- desktop and mobile behavior decided;
- settings and permissions reviewed;
- error, disabled, and unavailable states implemented;
- migration path tested;
- automated coverage added;
- Development Bible and extension register updated.

### Phase 9 exit gate

- Every wave 1 integration meets the shared completion criteria.
- Extension failures are diagnosable from the embedded console.
- Compatibility promises match actual testing.

## 13. Phase 10 — Android application

**Goal:** produce a mobile application that feels intentional and meets the agreed Android v1 scope.

### Deliverables

- Capacitor project and reproducible Android build;
- resolved server/data topology from Phase 2;
- portrait-first chat and bottom navigation;
- mobile composer and generation bottom sheet;
- system back behavior and deep-link handling;
- keyboard, safe-area, orientation, and lifecycle handling;
- secure credentials and local data protection;
- file picking, sharing, import, and export where in scope;
- connectivity, offline, reconnect, and remote-host states as applicable;
- adaptive performance for realistic chat histories;
- signed internal APK for device testing;
- upgrade and migration tests across app versions.

### Phase 10 exit gate

- Android v1 workflows pass on the supported device/API-level matrix.
- Background/foreground transitions do not lose or corrupt work.
- Installation, upgrade, backup, and recovery are validated.
- Mobile-specific privacy and network behavior is documented.

## 14. Phase 11 — Hardening and release readiness

**Goal:** remove release risk systematically rather than relying on final-week testing.

### Quality tracks

Release hardening is divided into functional, accessibility, performance, security, and privacy tracks. Each child note defines a distinct acceptance lens that must pass before release readiness can be claimed.

#### Functional

- unit, integration, contract, end-to-end, migration, and visual regression suites;
- long conversations, large lorebooks, many characters, slow networks, interrupted streams, and malformed data;
- desktop and Android install, update, restart, and recovery paths.

#### Accessibility

- keyboard-only desktop use;
- screen-reader landmarks, names, order, and announcements;
- contrast and non-color status cues;
- scalable text and zoom;
- reduced motion;
- mobile touch-target and assistive-technology review.

#### Performance

- startup time;
- idle memory;
- message-list rendering and scrolling;
- stream update responsiveness;
- large-library search;
- console buffer limits;
- Android memory pressure and lifecycle restoration.

#### Security and privacy

- Electron hardening and IPC review;
- dependency and supply-chain scanning;
- content security policy;
- credential storage and redaction tests;
- untrusted character, chat, markup, media, and extension input review;
- diagnostic bundle inspection;
- release-signing protection.

### Phase 11 exit gate

- No open release-blocking defects.
- Security review has no unresolved critical or high-severity issue.
- Accessibility target is met and documented.
- Performance budgets pass on the reference hardware/device set.
- Installation, update, migration, rollback, and recovery drills succeed.

## 15. Phase 12 — Preview, alpha, and beta

**Goal:** validate the product progressively with increasingly representative use.

### Developer preview

- incomplete but coherent vertical slice;
- used to validate architecture and migration assumptions;
- no promise of data stability.

### Alpha

- desktop workflows substantially complete;
- feature flags permitted;
- known gaps documented;
- testers use copies of real data;
- structured feedback and diagnostic export active.

### Beta

- feature complete for the intended release scope;
- migrations expected to remain forward-compatible;
- desktop installers and Android APK exercise real update paths;
- no known critical data-loss, security, or startup issue;
- documentation and onboarding reviewed by new users.

### Release candidate

- only release-blocking fixes accepted;
- exact artifacts are signed, checksummed, and retained;
- clean-install and upgrade matrices rerun;
- release notes, known issues, rollback, and support procedures finalized.

### Phase 12 exit gate

- Release candidate satisfies every official release criterion.
- Remaining known issues are documented and accepted.
- Support and rollback owners have the necessary artifacts and procedures.

## 16. Phase 13 — Official deployment

**Goal:** publish a trustworthy, reproducible first official release.

### Release requirements

- version and compatibility policy finalized;
- desktop installers built and signed for supported operating systems;
- Android APK built and signed, with distribution channel decided;
- checksums and provenance retained;
- update channel configured and tested where applicable;
- migration and backup guidance published;
- NanoGPT setup documented without exposing private credentials;
- privacy, permissions, data locations, and diagnostics documented;
- release notes and known issues published;
- support and issue-report templates available;
- rollback artifacts and instructions verified;
- repository tag and source state match shipped binaries.

### Deployment sequence

1. Freeze the release candidate.
2. Build in the controlled release environment.
3. Sign and verify artifacts.
4. Run final clean-install and upgrade smoke tests.
5. Publish documentation and release notes.
6. Publish artifacts to the selected channels.
7. Verify downloads, signatures, installation, provider connection, and update metadata from outside the build environment.
8. Begin the launch monitoring window.

### Phase 13 exit gate

- Published artifacts are installable and verified.
- Official documentation points to the correct versions.
- No launch-blocking incident is active.
- Rollback remains immediately available.

## 17. Phase 14 — Post-launch operations

**Goal:** stabilize the release and establish a sustainable update rhythm.

### Activities

- monitor crash reports and user-submitted sanitized diagnostics according to the agreed privacy policy;
- triage regressions by severity and affected workflow;
- publish hotfixes through the same signed release process;
- track migration and compatibility failures separately from feature requests;
- review performance and accessibility feedback;
- move accepted deferred work into the next milestone;
- hold a release retrospective and update this plan;
- define extension integration wave 2 and subsequent platform work.

## 18. Cross-cutting tracks

These tracks run across phases and cannot be postponed to the end.

| Track | Continuous responsibility |
| --- | --- |
| Product | Scope, workflows, terminology, acceptance criteria, and decision records |
| UX/UI | Information architecture, responsive behavior, states, accessibility, and design system |
| Desktop | Electron lifecycle, packaging, updates, filesystem behavior, and console |
| Android | Capacitor, lifecycle, storage, networking, device compatibility, and signing |
| AI provider | NanoGPT protocol, models, generation, errors, credentials, and usage visibility |
| Data | Persistence, migration, backup, recovery, compatibility, and privacy |
| Extensions | Contracts, integration register, permissions, compatibility, and isolation |
| Quality | Automated tests, manual matrices, performance, accessibility, and security |
| Release | Versioning, CI, signing, artifacts, documentation, rollout, and rollback |

## 19. Definition of done

A feature is not complete merely because its primary screen works. Unless explicitly exempted, completion requires:

- accepted behavior and scope;
- desktop and mobile disposition;
- light and dark appearance;
- keyboard and accessibility behavior;
- loading, empty, error, offline, and recovery states where relevant;
- secure handling of secrets and untrusted content;
- appropriate logging with redaction;
- automated tests at the correct levels;
- migration or compatibility handling;
- documentation updates;
- no unresolved release-blocking defect.

## 20. Release-blocking criteria

The official release cannot proceed with a known issue that can:

- lose or silently corrupt user data;
- expose credentials, private content, or authorization tokens;
- prevent clean installation, startup, shutdown, upgrade, or recovery on a supported target;
- break a Must-have workflow without a safe workaround;
- leave unmanaged runtime processes behind;
- make provider failures impossible to diagnose in-app;
- violate the agreed minimum accessibility bar;
- invalidate signed artifacts or the rollback path.

## 21. Working backlog structure

Implementation tasks should use stable identifiers and include:

- phase and cross-cutting track;
- user outcome;
- scope and exclusions;
- dependencies and linked decisions;
- acceptance criteria;
- platform coverage;
- migration and compatibility impact;
- security, accessibility, and performance considerations;
- test evidence;
- status and target milestone.

Suggested identifier prefixes:

- `PROD` product definition;
- `UX` experience and design;
- `CORE` shared frontend and platform foundation;
- `DESK` Electron desktop;
- `MOB` Android/Capacitor;
- `AI` NanoGPT and generation;
- `DATA` persistence and migration;
- `EXT` extension integration;
- `QA` quality and hardening;
- `REL` packaging and release.

## 22. Next working session

Tracker technical direction is established: Local/API/Disable setup, managed `llama.cpp`, Browse, non-blocking cadence, factual configurable limits, provider-aware Warning/Protection, and atomic recovery requirements. The first model fixture is illustrative, not executable or qualified. Final model selection waits for the working interface and its schema, provenance, cancellation, commit, and performance harness.

Persistent Scene Memory does not decay by age or turn count; pins are bounded without silent eviction; recursive recall, extraction size, retries, and boundary qualification have explicit baselines. Audit A07 nevertheless found a remaining product gap: confirm the Short Memory rolling/trigger/pressure proposal before Phase 1 exit. Schemas, runtime correctness, performance, and tuning remain later measured gates, not already validated implementation.

Continue **Close Phase 1 product definition** in this order:

1. settings versioning and ownership boundaries;
2. portable versus app-local Character Card metadata;
3. SillyTavern Lorebook compatibility and explicit promotion behavior;
4. internet-research activation, provider, evidence, privacy, cache, and cost rules;
5. exact desktop v1 and Android v1 scope.

Then conduct the Phase 1 exit review against the workflow inventory, UI delta ledger, extension register, platform scope matrices, information architecture coverage, and assigned validation backlog. Do not begin Phase 2 merely because the discussion list is exhausted; record gate evidence and update the delivery dashboard first.

The first closure question is complete in [Settings, Defaults, and Versioning Specification](./SETTINGS-VERSIONING-SPEC.md). Developer configuration has an agreed candidate-to-promoted-to-compiled Factory Defaults pipeline, `0.0.1` pre-release starting point, `1.0.0` public-release reservation, per-version local changelogs, independent schema/default revision identities, layered validation, and field-aware ownership. User settings keep SillyTavern's Save/Export contract: Save replaces the selected writable settings atomically with a recovery snapshot, while Export creates a separate portable file. Character Card metadata portability is now active.

The Character Card fixture and current SillyTavern handling are now audited in [Character Card Compatibility and Portability Specification](./CHARACTER-CARD-COMPATIBILITY-SPEC.md). The baseline preserves V1/V2/V3 and unknown-extension compatibility through a preserved source envelope plus normalized runtime view, with strict target-aware JSON/PNG export and retained CharX support for assets. Confirm whether new rework-specific preferences are app-local by default and only exported through an explicit namespaced-metadata option; then advance to Lorebook compatibility.

## 23. Astra follow-up and exit-review constraints

The 2026-09-05 repair is limited to `ST-UI/sillytavern-ui-rework/` and the Vault. Original-application and extension changes are prohibited; repository-boundary/CI/updater work is excluded. Finish and verify the repair changelog before resuming the closure conversation. Neither documentation repair nor passing maintenance tests advances the application version or the Phase 1 dashboard.

The existing settings question is complete. Character metadata, Lorebook compatibility/promotion ownership, research, and exact desktop/Android release matrices remain open. Add Short Memory behavior/overflow, changed linked-content policy, and present-cast/Story Continuity Profile delivery to the explicit exit checklist. The suggested simpler worker onboarding is an optional proposed revision, not an accepted replacement for the agreed setup flow.

The [workflow surface map](./WORKFLOW-SURFACE-MAP.md) supplies candidate desktop/mobile homes for every core workflow. Its routes do not approve Android parity, a runtime topology, or Character Library/research release inclusion. Assign Must/Should/Deferred plus failure fallback per platform during the existing scope closure. The executable worker harness, isolated runtime/provider adapters, and quota validation are Phase 2 deliverables; the broader card-privacy/compatibility corpus belongs to Phase 8.
