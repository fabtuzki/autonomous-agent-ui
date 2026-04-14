import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useData } from '../DataContext';
import AgentHub from '../screens/AgentHub';
import AgentWorkspace from '../screens/AgentWorkspace';

export default function MainArea() {
  const { activeAgentId } = useData();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: theme.m3.color.surface }}>
      {!activeAgentId ? <AgentHub /> : <AgentWorkspace />}
    </Box>
  );
}
