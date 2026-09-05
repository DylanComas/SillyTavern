# SillyTavern Studio — Unified Desktop and Android Suite

This suite combines three earlier directions:

- **Soft Bento Studio:** modular, discoverable cards for lore, generation, session state, and character details.
- **Command Palette Minimal:** keyboard-first desktop navigation, contextual inspectors, restrained chrome, and “Jump to anything.”
- **Pocket Tavern:** touch-sized controls, persistent bottom navigation, compact headers, and progressive disclosure through bottom sheets.

## Final theme showcase

The final presentation consists of two continuous interfaces rather than duplicated comparison panes:

- `desktop-diagonal-theme.png` — one 16:9 desktop/Electron workspace with a diagonal light-to-dark theme reveal.
- `android-diagonal-theme.png` — one portrait Android screen at phone aspect ratio with the same diagonal theme treatment.

The diagonal is only a presentation device. Layout and component geometry remain continuous across it; only theme tokens change.

Every board compares the same screen in both themes: **light on the left, dark on the right**.

## Proposed screens

| Board | Desktop / Electron | Android APK |
|---|---|---|
| Conversation | Three-pane chat workspace with contextual bento inspector | Single-column chat with generation bottom sheet |
| Characters | Searchable library and full character editor | Portrait grid with quick-detail bottom sheet |
| Lore and commands | Structured lore editor, context cards, and command palette | Lore list/editor with touch-friendly command sheet |

## Shared product architecture

- One route and data model for chats, characters, lorebooks, personas, presets, models, branches, and plugins.
- Shared design tokens for color, type, spacing, radii, elevation, focus, status, and motion.
- Shared responsive component library; desktop uses rails, panes, shortcuts, and inspectors, while Android uses app bars, bottom navigation, and sheets.
- Theme mode supports light, dark, system default, and per-device preference.
- Desktop target can run as a normal web app or Electron shell. Android target can use the same web application in a Capacitor-style APK wrapper, with native file picker, share, notifications, haptics, and secure credential storage added at the bridge layer.
- Workspace state can remain local-first, with optional encrypted synchronization between desktop and mobile.

## Interaction rules

- Global search and command actions use `Ctrl/Cmd + K` on desktop and a swipe-up or search action on Android.
- Inspectors become bottom sheets below tablet width.
- The composer remains persistent; secondary generation controls collapse into a sheet on narrow screens.
- All touch targets should be at least 48dp; keyboard focus is always visible on desktop.
- Light and dark modes keep semantic accent meanings: cobalt for selection/action, mint for active/saved/connected, coral for character/favorite, and amber for context warnings.

The PNG files are AI-generated interface concepts intended as implementation references rather than pixel-perfect specifications.
