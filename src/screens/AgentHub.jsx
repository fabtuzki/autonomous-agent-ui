import React, { useState } from 'react';
import { Box, Typography, Card, CardActions, Button, IconButton, Menu, MenuItem, Chip, CardActionArea, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
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
  const theme = useTheme();
  const m3 = theme.m3;

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
    <Box sx={{ p: { xs: 3, md: 4 }, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: m3.color.onSurface }}>
            Agents Hub
          </Typography>
          <Typography variant="body1" sx={{ color: m3.color.onSurfaceVariant }}>
            Manage and monitor all your autonomous agents from one dashboard.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateDialogOpen(true)}
          startIcon={<AddIcon />}
          sx={{ flexShrink: 0 }}
        >
          Create Agent
        </Button>
      </Box>

      <Grid container spacing={3} columns={12}>
        {agents.map(agent => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={agent.id}>
            <Card
              sx={{
                height: 240,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: m3.color.surfaceContainerLow,
                '&:hover': {
                  boxShadow: m3.elevation.level2,
                  borderColor: m3.color.outline,
                },
              }}
            >
              <CardActionArea
                onClick={() => handleCardClick(agent.id)}
                sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0, pr: 2 }}>
                    <SmartToyIcon sx={{ color: m3.color.primary, flexShrink: 0 }} />
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        color: m3.color.onSurface,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {agent.name}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, agent.id);
                    }}
                    sx={{ color: m3.color.onSurfaceVariant }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: m3.color.onSurfaceVariant,
                    mb: 2,
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.6,
                  }}
                >
                  {agent.personality || "No personality defined."}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={agent.model} size="small" variant="outlined" />
                  <Chip
                    label={`${agent.skills.length} Skills`}
                    size="small"
                    sx={{ backgroundColor: m3.color.primaryContainer, color: m3.color.onPrimaryContainer }}
                  />
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {agents.length === 0 && (
          <Grid size={12}>
            <Box sx={{ p: 6, textAlign: 'center', backgroundColor: m3.color.surfaceContainerLow, borderRadius: `${m3.shape.medium}px` }}>
              <Typography variant="body1" sx={{ color: m3.color.onSurfaceVariant }}>No agents found. Create one to get started.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { borderRadius: `${m3.shape.extraSmall}px`, mt: 0.5 } }}
      >
        <MenuItem onClick={handleDelete} sx={{ color: m3.color.error }}>Delete Agent</MenuItem>
      </Menu>

      <CreateAgentDialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
    </Box>
  );
}
