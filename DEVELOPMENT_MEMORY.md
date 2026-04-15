# Development Memory: xStudio Autonomous Agent UI

> **Purpose**: This document captures the full history, decisions, patterns, and lessons learned from building the xStudio Autonomous Agent Management UI. Use this as a reference skill for building future prototype UIs rapidly.

---

## 1. Project Genesis & Objective

**Goal**: Build a management interface for autonomous AI agents — allowing users to create, configure, monitor, and interact with LLM-powered agents that can perform background tasks, integrate with external services, and communicate across platforms.

**Core User Stories**:
- As a user, I want to create and configure autonomous agents with specific personalities and capabilities
- As a user, I want to chat with my agents in real-time
- As a user, I want to connect external services (GitHub, Slack, Jira, etc.) via Model Context Protocols (MCPs)
- As a user, I want to teach agents custom skills via programmatic markdown instructions
- As a user, I want to monitor background job execution with decision logs, metadata, and history
- As a user, I want to deploy agents to communication channels (Teams)

---

## 2. Tech Stack Decision

| Layer | Choice | Rationale |
|---|---|---|
| **Bundler** | Vite 8 | Fastest HMR, ideal for prototyping |
| **Framework** | React 19 | Latest stable, concurrent features |
| **UI Library** | MUI v9 (`@mui/material`) | Comprehensive component set, theming system |
| **Icons** | `@mui/icons-material` v9 | Native integration with MUI |
| **Typography** | `@fontsource/inter` | Self-hosted, no external CDN dependency |
| **Markdown** | `react-markdown` v10 | Chat bubble content rendering |
| **CSS** | Emotion (`@emotion/react`, `@emotion/styled`) | MUI's styling engine |
| **State** | React Context API | Sufficient for prototype — no Redux overhead |
| **Deployment** | Vercel | Zero-config, instant previews |

**Key Insight**: For prototypes, MUI + Vite is the fastest path from zero to polished UI. MUI's `ThemeProvider` allows centralized design tokens that propagate everywhere. No need for Tailwind — MUI's `sx` prop does inline responsive styling natively.

### Project Initialization Pattern
```bash
npx -y create-vite@latest ./ --template react
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @fontsource/inter react-markdown
```

---

## 3. Architecture & File Structure

```
src/
├── App.jsx                    # Root: ThemeProvider + DataProvider + Layout
├── main.jsx                   # Entry point
├── theme.js                   # ★ Centralized design token system (486 lines)
├── global.css                 # CSS reset, scrollbar, selection color
├── DataContext.jsx             # Global state (agents, jobs, chats, MCPs, skills)
├── components/
│   ├── GlobalNav.jsx           # Persistent sidebar navigation (collapsible)
│   └── MainArea.jsx            # Router: AgentHub ↔ AgentWorkspace
└── screens/
    ├── AgentHub.jsx            # Card grid dashboard
    ├── AgentWorkspace.jsx      # Tabbed workspace container
    ├── CreateAgentDialog.jsx   # 4-step stepper wizard
    └── WorkspaceTabs/
        ├── ChatTab.jsx         # Conversational interface
        ├── SkillsTab.jsx       # Skill management + viewer drawer
        ├── MCPsTab.jsx         # Integration credential management
        ├── ChannelsTab.jsx     # Communication platform toggles
        └── JobsTab.jsx         # Job monitoring with 3 inner tabs
```

### Architecture Pattern: `App.jsx`
```jsx
<ThemeProvider theme={theme}>
  <CssBaseline />
  <DataProvider>
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <GlobalNav />
      <MainArea />
    </Box>
  </DataProvider>
</ThemeProvider>
```

**Key Pattern**: The root layout uses `display: 'flex'` with `overflow: 'hidden'` to create a sidebar + main area split that never scrolls the outer page. Individual content areas scroll internally.

---

## 4. Design System: The Token Architecture

### 4.1 Philosophy
The entire visual language is driven by a single `theme.js` file exporting an object at `theme.m3`. Every component references tokens via `theme.m3.color.*`, `theme.m3.shape.*`, etc. — never hardcoded values.

This is the **most critical file** in the project. Get the tokens right, and every component looks unified automatically.

### 4.2 Color System (xStudio Palette)

```javascript
const xStudioTokens = {
  color: {
    // Brand Purple (primary actions, active states, CTA)
    primary:              '#5A4BFE',
    onPrimary:            '#FFFFFF',
    primaryContainer:     '#EDE9FF',   // Light purple backgrounds
    onPrimaryContainer:   '#1A0066',

    // Red CTA (secondary — destructive, alerts)
    secondary:            '#d82121',
    onSecondary:          '#FFFFFF',
    secondaryContainer:   '#FEE2E2',
    onSecondaryContainer: '#7F1D1D',

    // Teal Accent (toggles, switches, tertiary actions)
    tertiary:             '#00beb4',
    onTertiary:           '#FFFFFF',
    tertiaryContainer:    '#CCFBF1',
    onTertiaryContainer:  '#134E4A',

    // 6 Surface Tiers (from white → light gray)
    surface:              '#FFFFFF',
    surfaceContainerLowest:  '#FFFFFF',
    surfaceContainerLow:     '#FAFAFA',
    surfaceContainer:        '#F5F5F7',
    surfaceContainerHigh:    '#EFEFEF',
    surfaceContainerHighest: '#E8E8ED',

    // Text hierarchy
    onSurface:            '#1A1A1A',        // Primary text
    onSurfaceVariant:     '#6B7280',        // Secondary/muted text

    // Borders
    outline:              '#9CA3AF',        // Input borders
    outlineVariant:       '#E5E7EB',        // Card borders, dividers

    // Semantic states
    success:              '#16A34A',
    successContainer:     '#DCFCE7',
    warning:              '#D97706',
    warningContainer:     '#FEF3C7',
    error:                '#DC2626',
    errorContainer:       '#FEE2E2',

    // Dark panels (terminal output)
    inverseSurface:       '#1E293B',
    inverseOnSurface:     '#E2E8F0',
  }
}
```

### 4.3 Shape Scale
```javascript
shape: {
  none:       0,      // No rounding
  extraSmall: 4,      // Input borders, tooltips
  small:      8,      // Chips, badges, list items
  medium:     12,     // Cards, accordions, alerts
  large:      16,     // Drawers, FABs
  extraLarge: 28,     // Dialogs
  full:       9999,   // Buttons (pill-shaped)
}
```

### 4.4 Type Scale (Inter font)
```javascript
typeScale: {
  displayLarge:   { fontSize: '3.5625rem', fontWeight: 400 },
  headlineMedium: { fontSize: '1.75rem',   fontWeight: 400 },  // → MUI h4
  headlineSmall:  { fontSize: '1.5rem',    fontWeight: 400 },  // → MUI h5
  titleMedium:    { fontSize: '1rem',      fontWeight: 500 },  // → MUI subtitle1
  titleSmall:     { fontSize: '0.875rem',  fontWeight: 500 },  // → MUI subtitle2
  bodyLarge:      { fontSize: '1rem',      fontWeight: 400 },  // → MUI body1
  bodyMedium:     { fontSize: '0.875rem',  fontWeight: 400 },  // → MUI body2
  labelLarge:     { fontSize: '0.875rem',  fontWeight: 500 },  // → MUI button
  labelMedium:    { fontSize: '0.75rem',   fontWeight: 500 },  // → MUI caption
  labelSmall:     { fontSize: '0.6875rem', fontWeight: 500 },  // → MUI overline
}
```

### 4.5 State Layers (Hover/Focus/Pressed)
```javascript
stateLayer: {
  hover:   0.08,   // Subtle background tint on hover
  focus:   0.12,
  pressed: 0.12,
  dragged: 0.16,
}
```
**Usage**: `backgroundColor: \`rgba(90, 75, 254, ${m3.stateLayer.hover})\``

### 4.6 Elevation Scale
5 levels from `none` to heavy shadow. Cards use level 0 (flat + border). Hover states elevate to level 2.

---

## 5. Component Patterns & Recipes

### 5.1 Agent Card Grid (Fixed-Size Cards)
**Problem**: Cards stretched based on content length — long agent names made some cards wider.

**Solution**: MUI v9 Grid with `size` prop (NOT the legacy `xs/sm/md` on `item`):
```jsx
import Grid from '@mui/material/Grid';

<Grid container spacing={3}>
  {agents.map(agent => (
    <Grid key={agent.id} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card sx={{ height: 240 }}> {/* FIXED height */}
        <Typography noWrap>  {/* Truncates long names */}
          {agent.name}
        </Typography>
        <Typography sx={{
          display: '-webkit-box',
          WebkitLineClamp: 3,     // 3-line clamp
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {agent.personality}
        </Typography>
      </Card>
    </Grid>
  ))}
</Grid>
```

**Critical MUI v9 Gotcha**: `import Grid from '@mui/material/Grid'` in MUI v9 is Grid v2. Use `size={{ xs: 12 }}` NOT `item xs={12}`. The old syntax silently fails and produces stretchy layout.

### 5.2 Chat Bubble with Overflow Protection
**Problem**: Long unbroken strings (like `ádasdasdasdasd`) overflowed the chat bubble borders.

**Solution** (multi-layered):
```jsx
<Box sx={{
  maxWidth: '75%',
  padding: '12px 20px',
  borderRadius: '16px',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  overflow: 'hidden',
  minWidth: 0,
}}>
```
All four properties (`wordBreak`, `overflowWrap`, `whiteSpace`, `overflow`) are needed together. Missing any one can still cause overflow in edge cases.

### 5.3 Collapsible Sidebar (Navigation Drawer → Icon Rail)
```jsx
const [expanded, setExpanded] = useState(true);

<Box sx={{
  width: expanded ? 260 : 80,  // Full width vs icon-only
  transition: 'width 250ms ease-in-out',
  flexShrink: 0,
}}>
```

### 5.4 Stepper Wizard Dialog (Create Agent)
4 steps with `MuiStepper` inside a `Dialog`:
```
Step 0: Basics       → Agent Name, Language Model dropdown, Short Description
Step 1: Personality  → System Prompt (multiline textarea)
Step 2: Capabilities → Autocomplete with grouped options (Skills vs MCPs with divider)
Step 3: Heartbeat    → Wake-up interval dropdown + MCP notice card
```

**Capabilities Autocomplete Pattern**:
```jsx
<Autocomplete
  options={[...availableSkills, ...availableMCPs]}
  groupBy={(option) => option.type === 'skill' ? 'Native Skills' : 'Model Context Protocols'}
  renderInput={(params) => <TextField {...params} placeholder="Search Capabilities..." />}
/>
```

### 5.5 Three-Type MCP Credential Management
```jsx
{globalMcp.requiresToken === false ? (
  <Chip label="Ready to Use" />           // No auth needed
) : hasCreds ? (
  <Chip label="Token Applied" />           // Auth complete
) : (
  <Button onClick={openDialog}>
    {globalMcp.authType === 'database'
      ? 'Add DB Credentials'               // DB-specific auth
      : 'Add Token'}                       // Standard PAT/token
  </Button>
)}
```

### 5.6 Job Accordion with 3 Inner Tabs
```jsx
<Accordion>
  <AccordionSummary>{job.task}</AccordionSummary>
  <AccordionDetails>
    <Tabs value={innerTab}>
      <Tab label="Decision Logs" />    {/* Terminal-style dark output */}
      <Tab label="Metadata" />         {/* Key-value grid */}
      <Tab label="Execution History" /> {/* Timeline of past runs */}
    </Tabs>
  </AccordionDetails>
</Accordion>
```

### 5.7 Terminal-Style Decision Logs
```jsx
<Box sx={{
  backgroundColor: m3.color.inverseSurface,  // Dark slate
  color: m3.color.inverseOnSurface,          // Light text
  fontFamily: '"SF Mono", "Fira Code", monospace',
  fontSize: '0.8rem',
  p: 2,
  borderRadius: `${m3.shape.small}px`,
  whiteSpace: 'pre-wrap',
}}>
  {logs.join('\n')}
</Box>
```

---

## 6. State Management Pattern

### DataContext.jsx — React Context as the Single Source of Truth
```jsx
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activeAgentId, setActiveAgentId] = useState(null);
  const [agents, setAgents] = useState([/* initial data */]);
  const [jobs, setJobs] = useState([/* initial data */]);
  const [chats, setChats] = useState({/* agentId → messages[] */});

  // Static catalogs
  const availableMCPs = [/* global MCP library */];
  const availableSkills = [/* global skill library */];

  // Mutations
  const addAgent = (agent) => { /* create + generate welcome message */ };
  const deleteAgent = (id) => { /* remove from state */ };
  const updateAgent = (id, updates) => { /* merge updates */ };
  const addChat = (agentId, message) => { /* push user msg + simulate response */ };
  const deleteJob = (id) => { /* remove job */ };

  return (
    <DataContext.Provider value={{
      activeAgentId, setActiveAgentId,
      agents, addAgent, deleteAgent, updateAgent,
      jobs, deleteJob,
      chats, addChat,
      availableMCPs, availableSkills,
    }}>
      {children}
    </DataContext.Provider>
  );
};
```

**Key Design Choice**: Mock data lives in the DataContext as `useState` initializers. For a real backend, replace `useState` with API calls. The component tree never changes — only the data source does.

---

## 7. Development Timeline & Decisions

### Phase 1: Initial Prototype (Commit `d977a59`)
- Scaffolded all screens with basic MUI components
- Established the hub → workspace → tabs navigation pattern
- Used ad-hoc colors and inconsistent spacing

### Phase 2: Design System Migration (Commit `a85f827`)
**The biggest refactor.** Triggered by user feedback that cards were different sizes, fonts were inconsistent, and the overall look felt like a "minimum viable product."

Key actions:
1. Created `theme.js` with M3-inspired token system (486 lines)
2. Mapped every color, shape, and type scale token
3. Applied MUI component overrides globally (Button, Card, Tab, Dialog, Accordion, etc.)
4. Fixed the Grid stretching bug by migrating to MUI v9 `Grid` with `size` prop
5. Fixed chat bubble text overflow with multi-property CSS fix
6. Fixed the "Integration Active" box alignment (text/button not centered)
7. Added `react-markdown` for structured welcome messages

### Phase 3: Feature Completion (Commit `71796a4`)
- Added no-token MCP type (`requiresToken: false`) with "Ready to Use" chip
- Renamed "Duration" → "Frequency" in job metadata
- Created comprehensive documentation with screenshots and video recordings

### Phase 4: xStudio Branding Refinement (Latest)
- Migrated primary color from `#6750A4` (M3 Purple) → `#5A4BFE` (xStudio brand purple)
- Updated secondary from M3 tonal purple → `#d82121` (Red CTA)
- Added teal accent `#00beb4` for switches/toggles
- Updated all hover state layers to use `rgba(90, 75, 254, ...)`
- Changed sidebar active icon color from `onSecondaryContainer` → `onPrimaryContainer`
- Changed user avatar color from `secondaryContainer` → `primaryContainer`

---

## 8. Bugs Encountered & Solutions

### Bug 1: Chat Bubble Text Overflow (LEFT border clipping)
**Symptom**: Long words overflowed the LEFT side of chat bubbles.
**Root Cause**: The parent container had no `minWidth: 0` and `overflow: hidden`.
**Fix**: Added `minWidth: 0`, `overflow: 'hidden'`, `wordBreak: 'break-word'`, `overflowWrap: 'break-word'` to the bubble container.

### Bug 2: Agent Cards Stretching to Different Widths
**Symptom**: Cards with longer names were wider than others in the grid.
**Root Cause**: Used legacy MUI Grid v1 syntax (`item xs={4}`) which doesn't constrain width in MUI v9.
**Fix**: Migrated to `<Grid size={{ xs: 12, sm: 6, md: 4 }}>` + added `height: 240` to cards.

### Bug 3: `"./Grid2" is not exported` Error
**Symptom**: Build error when importing `Grid2` from MUI v9.
**Root Cause**: MUI v9 renamed Grid2 to just Grid. `import Grid from '@mui/material/Grid'` IS Grid v2 in MUI v9.
**Fix**: Use `import Grid from '@mui/material/Grid'` with `size={}` prop.

### Bug 4: Integration Active Box Misalignment
**Symptom**: Text and button inside the "Integration Active" status card weren't vertically centered.
**Fix**: Added proper `display: 'flex'`, `alignItems: 'center'`, and consistent padding.

---

## 9. Prototyping Playbook (Reusable Process)

### Step 1: Scaffold
```bash
npx -y create-vite@latest ./ --template react
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @fontsource/inter
```

### Step 2: Design Tokens First
Create `theme.js` BEFORE any components. Define:
- Color palette (primary, secondary, tertiary, surfaces, semantic states)
- Shape scale (border-radius tiers)
- Type scale (mapped to MUI variants)
- State layer opacities
- Elevation shadows
- Component-level overrides

### Step 3: Build Data Layer
Create `DataContext.jsx` with:
- Mock data as `useState` initializers
- CRUD operations as context methods
- Static catalogs (available MCPs, skills, models)

### Step 4: Layout Shell
Build `App.jsx` with flex layout, `GlobalNav` sidebar, and `MainArea` content router.

### Step 5: Screens Top-Down
1. Hub/Dashboard (card grid)
2. Detail/Workspace (tabbed container)
3. Individual tabs (forms, lists, interactive panels)
4. Dialogs (creation wizards, credential inputs)

### Step 6: Polish Pass
- Add hover state elevations to cards
- Add transition animations (`200ms ease-in-out`)
- Fix overflow cases with `word-break` + `overflow-wrap`
- Ensure fixed card heights with text clamping
- Test with long/extreme content strings

---

## 10. Key Takeaways for Future Prototype Skills

1. **Theme.js is the foundation.** A comprehensive token file with MUI component overrides eliminates 80% of ad-hoc `sx` styling. Invest here first.

2. **MUI v9 Grid uses `size` prop.** The old `xs/sm/md` on `<Grid item>` is dead. Use `<Grid size={{ xs: 12, sm: 6, md: 4 }}>`.

3. **Fixed-height cards are non-negotiable.** Always set a fixed height on card containers and use `noWrap` / `-webkit-line-clamp` for overflow text.

4. **Overflow requires ALL 4 CSS properties.** `wordBreak`, `overflowWrap`, `whiteSpace: 'pre-wrap'`, and `overflow: 'hidden'` must all be set in chat bubbles.

5. **React Context is enough for prototypes.** Don't reach for Redux or Zustand until you have a real backend.

6. **Mock data in DataContext, not in components.** This makes it trivial to later swap for real API calls.

7. **Vite HMR is your best friend.** Design-iterate loops take <1 second.

8. **Document as you build.** Capturing screenshots at each step is invaluable for demos and stakeholder review.

9. **Surface tiers create depth without shadows.** The 6-tier surface scale (`surfaceContainerLowest` through `surfaceContainerHighest`) creates layered depth that looks premium without heavy box-shadows.

10. **State layers > background-color.** Using `rgba(brand, 0.08)` for hovers feels more polished than changing to a completely different background color.

---

## 11. File-by-File Reference

| File | Lines | Purpose |
|---|---|---|
| `theme.js` | 486 | Design token system + MUI component overrides |
| `DataContext.jsx` | 153 | Global state, mock data, CRUD operations |
| `GlobalNav.jsx` | ~230 | Sidebar with collapse/expand, nav items, user profile |
| `MainArea.jsx` | ~40 | Router between AgentHub and AgentWorkspace |
| `AgentHub.jsx` | ~161 | Card grid with fixed-size cards, create/delete actions |
| `AgentWorkspace.jsx` | ~80 | Tab container routing to 5 workspace tabs |
| `CreateAgentDialog.jsx` | ~240 | 4-step stepper wizard |
| `ChatTab.jsx` | ~120 | Chat bubbles with markdown, send input |
| `SkillsTab.jsx` | ~200 | Skill list, viewer drawer, create dialog |
| `MCPsTab.jsx` | ~180 | 3-type credential management, toggle switches |
| `ChannelsTab.jsx` | ~120 | Channel toggle, integration active status card |
| `JobsTab.jsx` | ~150 | Accordion jobs, 3 inner tabs (logs, metadata, history) |

---

*Written on 2026-04-15 as development memory for the xStudio Autonomous Agent UI prototype.*
