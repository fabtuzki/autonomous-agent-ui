import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Fab, Menu, MenuItem, Chip, CardActionArea } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useData } from '../DataContext';
import CreateAgentDialog from './CreateAgentDialog';

export default function AgentHub() {
  const { agents, deleteAgent, setActiveAgentId } = useData();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  const handleMenuClick = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedAgentId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAgentId(null);
  };

  const handleDelete = () => {
    deleteAgent(selectedAgentId);
    handleMenuClose();
  };

  const handleCardClick = (id) => {
    setActiveAgentId(id);
  };

  return (
    <Box sx={{ p: 4, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#001F3F' }}>
        Agents Hub
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage and monitor all your autonomous agents from one dashboard.
      </Typography>

      <Grid container spacing={3}>
        {agents.map(agent => (
          <Grid item xs={12} sm={6} md={4} key={agent.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea onClick={() => handleCardClick(agent.id)} sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SmartToyIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" component="div">
                      {agent.name}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, agent.id);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {agent.personality}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={agent.model} size="small" variant="outlined" />
                  <Chip label={`${agent.skills.length} Skills`} size="small" sx={{ backgroundColor: 'rgba(63, 81, 181, 0.08)', color: '#3F51B5' }} />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {agents.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ p: 6, textAlign: 'center', backgroundColor: '#fff', borderRadius: 6 }}>
              <Typography variant="h6" color="text.secondary">No agents found. Create one to get started.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Delete Agent</MenuItem>
      </Menu>

      <Fab 
        color="secondary" 
        onClick={() => setCreateDialogOpen(true)}
        sx={{ position: 'absolute', bottom: 32, right: 32, px: 3, borderRadius: 16 }}
        variant="extended"
      >
        <AddIcon sx={{ mr: 1 }} />
        Create Agent
      </Fab>

      <CreateAgentDialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
    </Box>
  );
}
