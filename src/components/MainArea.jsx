import React from 'react';
import { Box } from '@mui/material';
import { useData } from '../DataContext';
import AgentHub from '../screens/AgentHub';
import AgentWorkspace from '../screens/AgentWorkspace';

export default function MainArea() {
  const { activeAgentId } = useData();

  return (
    <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {!activeAgentId ? <AgentHub /> : <AgentWorkspace />}
    </Box>
  );
}
