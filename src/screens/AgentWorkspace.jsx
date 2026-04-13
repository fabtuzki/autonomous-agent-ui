import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useData } from '../DataContext';
import ChatTab from './WorkspaceTabs/ChatTab';
import SkillsTab from './WorkspaceTabs/SkillsTab';
import MCPsTab from './WorkspaceTabs/MCPsTab';
import ChannelsTab from './WorkspaceTabs/ChannelsTab';
import JobsTab from './WorkspaceTabs/JobsTab';

export default function AgentWorkspace() {
  const { activeAgentId, setActiveAgentId, agents } = useData();
  const [activeTab, setActiveTab] = useState(0);
  const [prefilledChat, setPrefilledChat] = useState('');

  const agent = agents.find(a => a.id === activeAgentId);

  if (!agent) return null;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const jumpToChatWithPrefill = (text) => {
    setPrefilledChat(text);
    setActiveTab(0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 4, pt: 3, pb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => setActiveAgentId(null)}
          sx={{ color: 'text.secondary', fontWeight: 600, py: 1 }}
        >
          Back to Agents
        </Button>
        <Typography variant="h6" sx={{ borderLeft: '2px solid rgba(0,0,0,0.1)', pl: 2, fontWeight: 500 }}>
          {agent.name}
        </Typography>
      </Box>

      <Box sx={{ px: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="Chat" sx={{ px: 3, py: 2 }} />
          <Tab label="Internal Skills" sx={{ px: 3, py: 2 }} />
          <Tab label="Global MCPs" sx={{ px: 3, py: 2 }} />
          <Tab label="Channels" sx={{ px: 3, py: 2 }} />
          <Tab label="Active Jobs" sx={{ px: 3, py: 2 }} />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        {activeTab === 0 && <ChatTab agent={agent} initialInput={prefilledChat} clearInitialInput={() => setPrefilledChat('')} />}
        {activeTab === 1 && <SkillsTab agent={agent} onPreFillChat={jumpToChatWithPrefill} />}
        {activeTab === 2 && <MCPsTab agent={agent} />}
        {activeTab === 3 && <ChannelsTab agent={agent} />}
        {activeTab === 4 && <JobsTab agent={agent} />}
      </Box>
    </Box>
  );
}
