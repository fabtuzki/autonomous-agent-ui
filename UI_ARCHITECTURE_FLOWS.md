# Autonomous Agent UI: Complete Architecture & Context Manual

This documentation maps the foundational context constraints, the core UI/UX navigation flows, and the programmatic design logic for the **Autonomous Agent Application**.

---

## Part 1: Design Context & Branding Inheritance

The Autonomous Agent application does not exist in a vacuum; it is a nested core module within the broader **xStudio** parent application. 
- **Global Navigation Matrix:** The application utilizes a collapsible vertical sidebar (`GlobalNav.jsx`) mirroring the parent application. It houses modules (Home, Apps, Webhooks) and can collapse into a thin vertical bar to maximize workspace real-estate.
- **Brand Identity:** Colors are strictly inherited from the parent `logo.svg`. The application injects **Electric Royal Blue (`#2200EE`)** as the `primary` interaction color, and **Vibrant Magenta (`#C020EE`)** as a `secondary` accent.
- **Material 3 (MD3) Fidelity:** The UI enforces strict MD3 principles. Legacy chunky tables and shadows are stripped out. Elements utilize deep container rounding (`borderRadius: 24`), perfectly flat tonal surfaces (`background: #FFFBFE`), and high-contrast typography logic to prevent visual squeezing.

---

## Part 2: The Core Agent Workflows

The application handles seven distinct mapping flows governing how a user breathes life into an autonomous agent.

### Flow 1: Agent Initialization (The Creation Wizard)
Triggered by the floating "Create Agent" button on the **Hub**, it launches a 4-step modal setup:
1. **Basics:** The user defines the agent name and chooses the strict LLM engine (e.g., Gemini 1.5 Pro).
2. **Personality:** Disallows custom text. The user selects from strict predefined system personas (Helpful Assistant, Data Analyst, Code Critic) or skips.
3. **Capabilities:** A dual-selection portal. Users bind **Native Skills** and **Global MCPs**. If an MCP is added, an active amber warning alerts the user that a personal access token will be required in the dashboard later.
4. **Heartbeat:** Configures the chronological wake-up interval (default: 1 hour) and injecting a default wake-up objective prompt. *(Note: Channel addition was explicitly removed from this step per requirements).*

### Flow 2: Programming Native Skills
Internal skills act as custom organic hands/legs.
1. The user navigates to the **Internal Skills** tab within the Agent Workspace.
2. They click "Program New Skill".
3. The UI seamlessly redirects the user into the **Chat Console** with the string `/addnewskill ` pre-typed into the chat bar. 
4. The Agent takes over conversationally, instructing the user to define the logic before organically "compiling" it.

### Flow 3 & 4: Tool Management (Deleting & Authenticating)
1. **Deletion:** Users can browse the Internal Skills tab and unilaterally delete an organically generated skill via the contextual trash icon.
2. **Authentication (MCPs):** Because external tools (Jira, GitHub) require security contexts, users must navigate to the **Global MCPs** tab. If a selected MCP lacks credentials, a "Token Missing!" banner blocks execution. Clicking "Add Token" spawns a secure localized prompt with a tooltip explaining token generation specific to that platform.

### Flow 5: Webhook Channel Routing
1. Mapped within the **Channels** tab.
2. The UI strictly gates integrations to native webhook clients (like Microsoft Teams). Users inject route addresses and can unilaterally disconnect the channel.

### Flow 6: Real-time Prompting (Chat)
1. Hosted in the `ChatTab.jsx` component.
2. A streamlined, deeply rounded messaging interface avoiding old pill-box constraints (locked to `16px` corners). 
3. Operates as the central command line, allowing users to override logic or utilize shortcut hooks (like `/addnewskill`).

### Flow 7: Execution Observability (Active Jobs)
1. Located in the **Active Jobs** tab, this maps the cron-based or triggered background executions of the agent.
2. Maps all current, running, and historical jobs.
3. Expanding a job drops down a dual-window interface showing **Metadata** (start times, creation context) and **Execution Logs** (the raw terminal reasoning matrix).
4. Users have total authority to unilaterally delete jobs.

---

## Part 3: Component-Level State Specifications

To adhere to the rigorous MD3 design standards, the codebase triggers explicit, granular UI warnings depending on the telemetry states of the system:

### The MCP Banner Constraint Logic (`MCPsTab.jsx`)
To prevent visual layout destruction when tokens break, MCPs skip traditional grid cards to utilize strict **Horizontal Banners**.
- **Toggled Off:** Clean, borderless `#F4F5F8` background.
- **Toggled On (Has Token):** Deep green glowing borders (`rgba(16, 185, 129, 0.15)`) showcasing a permanent "Token Applied" green success chip.
- **Toggled On (No Token):** High-alert amber borders, injecting a hard Orange warning metric alongside the "Add Token" button on the horizontal flank. The container never scales vertically, ensuring all lists remain perfectly rigid and uniform.

### Log Anomaly Tracking (`JobsTab.jsx`)
- Built from strict MD3 Accordions instead of tables.
- **Visual Failure Hooks:** If an overall job status evaluates to `failed`, a red error chip spawns on the header. Furthermore, the nested Fira-Code terminal iterates the log array—the exact trailing string where the crash occurred is semantically painted light red (`#F2B8B5`), immediately drawing the developer's eye to the stack trace.
