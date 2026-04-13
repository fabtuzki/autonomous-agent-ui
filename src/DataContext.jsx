import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [activeAgentId, setActiveAgentId] = useState(null);

  const [agents, setAgents] = useState([
    {
      id: 'agent-1',
      name: 'Alpha-bot',
      model: 'gemini-1.5-pro',
      personality: 'Helpful Assistant',
      heartbeatInterval: '1h',
      heartbeatPrompt: 'Check unread threads every hour and summarize them.',
      channels: ['Teams'],
      mcps: [
        { id: 'mcp-github', name: 'GitHub Integration', hasCredentials: false, description: 'Read PRs, issues, and commit history.' }
      ],
      skills: [
        { id: 's2', name: 'Web Serper', description: 'Search the internet for up to date info.' }
      ]
    }
  ]);

  const [jobs, setJobs] = useState([
    { 
      id: 'j1', 
      agentId: 'agent-1', 
      task: 'Scan latest unseen PRs', 
      status: 'running', 
      startTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
      endTime: null,
      duration: 'Running (5m)',
      context: 'User requested in chat: "Check the PRs on the main repo."',
      logs: ['[INIT] Started job.', '[NET] Connecting to GitHub...', '[API] Fetching PR objects...'] 
    },
    { 
      id: 'j2', 
      agentId: 'agent-1', 
      task: 'Send morning brief', 
      status: 'success', 
      startTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      endTime: new Date(Date.now() - 1000 * 60 * 59).toISOString(),
      duration: '1m 12s',
      context: 'Heartbeat trigger (1h interval).',
      logs: ['[INIT] Started job.', '[GEN] Drafted brief.', '[NET] Sent payload to Microsoft Teams webhook.', '[SUCCESS] Job clear.'] 
    }
  ]);

  const [chats, setChats] = useState({
    'agent-1': [
      { role: 'agent', content: 'Hello! I am Alpha-bot. How can I help you today?', timestamp: new Date().toISOString() }
    ]
  });

  // Global Available MCPs list
  const availableMCPs = [
    { id: 'mcp-github', name: 'GitHub Integration', description: 'Interact with repositories and PRs.', type: 'mcp' },
    { id: 'mcp-slack', name: 'Slack Integration', description: 'Read and send messages in Slack workspaces.', type: 'mcp' },
    { id: 'mcp-postgres', name: 'PostgreSQL Tool', description: 'Run secure queries against a replicated DB.', type: 'mcp' },
    { id: 'mcp-jira', name: 'Jira Software', description: 'Access ticketing systems.', type: 'mcp' },
    { id: 'mcp-linear', name: 'Linear App', description: 'Manage Linear issues.', type: 'mcp' },
    { id: 'mcp-datadog', name: 'Datadog Metrics', description: 'Fetch system health and metrics.', type: 'mcp' },
    { id: 'mcp-aws', name: 'AWS CLI wrapper', description: 'Manage cloud resources securely.', type: 'mcp' },
    { id: 'mcp-google-drive', name: 'Google Drive', description: 'Access and parse documents.', type: 'mcp' },
    { id: 'mcp-notion', name: 'Notion Workspace', description: 'Read and write to Notion databases.', type: 'mcp' },
    { id: 'mcp-figma', name: 'Figma Comments', description: 'Read design comments.', type: 'mcp' },
    { id: 'mcp-sentry', name: 'Sentry Error Log', description: 'Read application errors.', type: 'mcp' },
    { id: 'mcp-stripe', name: 'Stripe Analytics', description: 'Read financial analytics.', type: 'mcp' }
  ];

  const availableSkills = [
    { id: 'skill-web', name: 'Web Serper', description: 'Search the internet for up to date info.', type: 'skill' },
    { id: 'skill-math', name: 'Calculator Math', description: 'Evaluates advanced math expressions objectively.', type: 'skill' },
    { id: 'skill-bash', name: 'Bash Terminal', description: 'Executes scripts in a sandboxed runtime.', type: 'skill' },
    { id: 'skill-csv', name: 'CSV Parser', description: 'Reads and normalizes comma-separated datasets.', type: 'skill' }
  ];

  // Actions
  const addAgent = (agent) => {
    const newAgent = { ...agent, id: `agent-${Date.now()}` };
    setAgents([...agents, newAgent]);
    setChats({ ...chats, [newAgent.id]: [{ role: 'agent', content: `Hello, I'm ready. My core directive is: ${newAgent.personality}`, timestamp: new Date().toISOString() }] });
    return newAgent;
  };

  const deleteAgent = (id) => {
    setAgents(agents.filter(a => a.id !== id));
    if (activeAgentId === id) setActiveAgentId(null);
  };

  const updateAgent = (id, updates) => {
    setAgents(agents.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const addChat = (agentId, message) => {
    setChats(prev => ({
      ...prev,
      [agentId]: [...(prev[agentId] || []), { role: 'user', content: message, timestamp: new Date().toISOString() }]
    }));
    
    setTimeout(() => {
      setChats(prev => {
        let responseContent = `Acknowledged. I will process: "${message}"`;
        if (message.startsWith('/addnewskill')) {
          responseContent = 'Initializing skill creation interface... What native capability should I learn? (e.g., "Parse weather API").';
        }
        return {
          ...prev,
          [agentId]: [
            ...(prev[agentId] || []), 
            { role: 'agent', content: responseContent, timestamp: new Date().toISOString() }
          ]
        };
      });
    }, 1000);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <DataContext.Provider value={{
      activeAgentId, setActiveAgentId,
      agents, addAgent, deleteAgent, updateAgent,
      jobs, deleteJob,
      chats, addChat,
      availableMCPs,
      availableSkills
    }}>
      {children}
    </DataContext.Provider>
  );
};
