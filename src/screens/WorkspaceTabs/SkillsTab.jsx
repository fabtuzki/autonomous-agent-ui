import React from 'react';
import { Box, Typography, Grid, Card, CardContent, IconButton, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import AddIcon from '@mui/icons-material/Add';
import { useData } from '../../DataContext';

export default function SkillsTab({ agent, onPreFillChat }) {
  const { updateAgent } = useData();

  const handleDelete = (skillId) => {
    updateAgent(agent.id, {
      skills: agent.skills.filter(s => s.id !== skillId)
    });
  };

  return (
    <Box sx={{ p: 5, height: '100%', overflowY: 'auto', position: 'relative' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#001F3F' }}>
        Native Capabilities
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage custom internal skills programmed organically by the agent.
      </Typography>

      <Grid container spacing={4}>
        {agent.skills.map(skill => (
          <Grid item xs={12} md={6} lg={4} key={skill.id}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5 }}>
                    <BuildCircleIcon color="primary" fontSize="large" sx={{ opacity: 0.8 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{skill.name}</Typography>
                  </Box>
                  <IconButton color="error" size="small" onClick={() => handleDelete(skill.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {skill.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {agent.skills.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ p: 6, textAlign: 'center', bgcolor: '#FFFFFF' }}>
              <Typography color="text.secondary" sx={{ fontWeight: 500 }}>No localized skills programmed yet.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Fab 
        color="secondary" 
        onClick={() => onPreFillChat('/addnewskill ')}
        sx={{ position: 'absolute', bottom: 40, right: 40, px: 4, py: 3 }}
        variant="extended"
      >
        <AddIcon sx={{ mr: 1 }} />
        Program New Skill
      </Fab>
    </Box>
  );
}
