import React from 'react';
import { Box, Typography, Card, CardContent, Switch, FormControlLabel } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { useData } from '../../DataContext';

export default function ChannelsTab({ agent }) {
  const { updateAgent } = useData();

  const isTeamsEnabled = agent.channels.includes('Teams');

  const handleToggleTeams = (e) => {
    const checked = e.target.checked;
    const newChannels = checked 
      ? [...agent.channels, 'Teams'] 
      : agent.channels.filter(c => c !== 'Teams');
      
    updateAgent(agent.id, { channels: newChannels });
  };

  return (
    <Box sx={{ p: 4, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#001F3F' }}>
        Communication Channels
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Authorize platforms where this agent can passively listen and proactively respond.
      </Typography>

      <Card sx={{ maxWidth: 400 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ p: 1, backgroundColor: 'rgba(63, 81, 181, 0.1)', borderRadius: 2, display: 'flex' }}>
              <ForumIcon color="primary" />
            </Box>
            <Box>
              <Typography variant="h6">Microsoft Teams</Typography>
              <Typography variant="body2" color="text.secondary">Corporate messaging integration</Typography>
            </Box>
          </Box>
          
          <FormControlLabel
            control={<Switch checked={isTeamsEnabled} onChange={handleToggleTeams} color="primary" />}
            label=""
            sx={{ m: 0 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
