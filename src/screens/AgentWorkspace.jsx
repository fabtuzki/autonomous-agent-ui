import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const m3 = theme.m3;

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
      <Box sx={{ px: 3, pt: 2.5, pb: 0.5, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => setActiveAgentId(null)}
          sx={{ color: m3.color.onSurfaceVariant, fontWeight: 500 }}
        >
          Back to Agents
        </Button>
        <Typography
          variant="h6"
          sx={{
            borderLeft: `2px solid ${m3.color.outlineVariant}`,
            pl: 2,
            fontWeight: 400,
            color: m3.color.onSurface,
          }}
        >
          {agent.name}
        </Typography>
      </Box>

      <Box sx={{ px: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Chat" />
          <Tab label="Internal Skills" />
          <Tab label="Global MCPs" />
          <Tab label="Channels" />
          <Tab label="Active Jobs" />
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
