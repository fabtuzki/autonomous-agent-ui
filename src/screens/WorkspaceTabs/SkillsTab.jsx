import React, { useState } from 'react';
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Chip, Paper, Drawer, Divider, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import AddIcon from '@mui/icons-material/Add';
import { useData } from '../../DataContext';

const DEFAULT_MARKDOWN = `Overview / Context
Define the high level logic for this skill.

Metadata / Stack
- Runtime: Node.js / Python
- Dependencies: ...

Triggers ("When to Use This Skill")
Explain exactly what user prompt should trigger this code.

Workflow / Steps
1. First...
2. Then...

Rules & Constraints
- Must not crash if X is null.
`;

export default function SkillsTab({ agent }) {
  const { updateAgent } = useData();
  const theme = useTheme();
  const m3 = theme.m3;

  const [createOpen, setCreateOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillDesc, setNewSkillDesc] = useState('');
  const [newSkillMarkdown, setNewSkillMarkdown] = useState(DEFAULT_MARKDOWN);
  const [viewingSkill, setViewingSkill] = useState(null);

  const handleSaveNewSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkillId = `skill-custom-${Date.now()}`;
    const newSkill = {
      id: newSkillId,
      name: newSkillName,
      description: newSkillDesc,
      markdown: newSkillMarkdown,
      type: 'skill'
    };
    updateAgent(agent.id, { skills: [...agent.skills, newSkill] });
    setCreateOpen(false);
    setNewSkillName('');
    setNewSkillDesc('');
    setNewSkillMarkdown(DEFAULT_MARKDOWN);
  };

  const handleDelete = (e, skillId) => {
    e.stopPropagation();
    updateAgent(agent.id, { skills: agent.skills.filter(s => s.id !== skillId) });
  };

  const builtInSkills = [
    { id: 'builtin-scheduler', name: 'Scheduler Runtime', description: 'Internal utility handling Heartbeat cron logic.', isBuiltIn: true },
    { id: 'builtin-fs', name: 'File System Writer', description: 'Required for updating codebases.', isBuiltIn: true }
  ];

  const customSkills = agent.skills;

  // Shared list-item styling
  const listItemSx = (isBuiltIn) => ({
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { xs: 'flex-start', md: 'center' },
    justifyContent: 'space-between',
    p: 2,
    borderRadius: `${m3.shape.medium}px`,
    backgroundColor: isBuiltIn ? m3.color.surfaceContainerHigh : m3.color.surfaceContainerLowest,
    border: `1px solid ${m3.color.outlineVariant}`,
    transition: 'all 200ms ease-in-out',
    cursor: 'pointer',
    gap: 2,
    '&:hover': {
      backgroundColor: `rgba(90, 75, 254, ${m3.stateLayer.hover})`,
      borderColor: m3.color.outline,
    },
  });

  return (
    <Box sx={{ p: { xs: 3, md: 4 }, height: '100%', overflowY: 'auto', position: 'relative' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: m3.color.onSurface }}>
            Native Capabilities
          </Typography>
          <Typography variant="body1" sx={{ color: m3.color.onSurfaceVariant, mb: 1 }}>
            Manage core functions and build custom markdown logic for your agent runtime.
          </Typography>
          <Chip
            label="Coming Soon in v1.2: Skill Hub & Community Sharing API!"
            size="small"
            sx={{ backgroundColor: m3.color.primaryContainer, color: m3.color.onPrimaryContainer, fontWeight: 500 }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateOpen(true)}
          startIcon={<AddIcon />}
          sx={{ flexShrink: 0 }}
        >
          Program New Skill
        </Button>
      </Box>

      <Typography variant="subtitle1" sx={{ color: m3.color.onSurface, mb: 1.5 }}>System Utilities (Installed Natively)</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
        {builtInSkills.map(skill => (
          <Paper key={skill.id} elevation={0} onClick={() => setViewingSkill(skill)} sx={listItemSx(true)}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1, maxWidth: { md: '75%' } }}>
              <Box sx={{ p: 1, borderRadius: `${m3.shape.small}px`, backgroundColor: m3.color.surfaceContainerLowest, display: 'flex' }}>
                <BuildCircleIcon sx={{ color: m3.color.onSurfaceVariant, opacity: 0.5 }} />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, color: m3.color.onSurfaceVariant }}>{skill.name}</Typography>
                <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant, mt: 0.25 }}>{skill.description}</Typography>
              </Box>
            </Box>
            <Chip label="Built-in Core" size="small" variant="outlined" />
          </Paper>
        ))}
      </Box>

      <Typography variant="subtitle1" sx={{ color: m3.color.onSurface, mb: 1.5 }}>Custom Programmed Logic</Typography>
      {customSkills.length === 0 && (
        <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant, fontStyle: 'italic', mb: 5 }}>No custom skills have been programmed yet.</Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pb: 8 }}>
        {customSkills.map(skill => (
          <Paper key={skill.id} elevation={0} onClick={() => setViewingSkill(skill)} sx={listItemSx(false)}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1, maxWidth: { md: '75%' } }}>
              <Box sx={{ p: 1, borderRadius: `${m3.shape.small}px`, backgroundColor: m3.color.primaryContainer, display: 'flex' }}>
                <BuildCircleIcon sx={{ color: m3.color.onPrimaryContainer }} />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, color: m3.color.onSurface }}>{skill.name}</Typography>
                <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant, mt: 0.25 }}>{skill.description}</Typography>
              </Box>
            </Box>
            <IconButton color="error" size="small" onClick={(e) => handleDelete(e, skill.id)} onMouseDown={e => e.stopPropagation()}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}
      </Box>

      {/* CREATE SKILL DIALOG */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 500, fontSize: m3.typeScale.headlineSmall.fontSize, color: m3.color.onSurface }}>
          Construct Native Skill
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField
              fullWidth label="Skill Name" variant="outlined"
              value={newSkillName} onChange={e => setNewSkillName(e.target.value)}
              placeholder="e.g. Weather API Router"
            />
            <TextField
              fullWidth label="Short Description" variant="outlined"
              value={newSkillDesc} onChange={e => setNewSkillDesc(e.target.value)}
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={14}
            label="Skill Logic / Instructions (Plain Text)"
            variant="outlined"
            value={newSkillMarkdown}
            onChange={e => setNewSkillMarkdown(e.target.value)}
            InputProps={{ sx: { backgroundColor: m3.color.surfaceContainerLow } }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCreateOpen(false)} sx={{ color: m3.color.onSurfaceVariant }}>Cancel</Button>
          <Button onClick={handleSaveNewSkill} variant="contained" color="primary">Inject Skill</Button>
        </DialogActions>
      </Dialog>

      {/* VIEW SKILL DRAWER */}
      <Drawer
        anchor="right"
        open={!!viewingSkill}
        onClose={() => setViewingSkill(null)}
      >
        <Box sx={{ width: { xs: '100%', sm: 500, md: 600 }, p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <BuildCircleIcon sx={{ color: m3.color.primary, fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 400, color: m3.color.onSurface }}>{viewingSkill?.name}</Typography>
          </Box>
          <Typography variant="body1" sx={{ color: m3.color.onSurfaceVariant, mb: 3 }}>
            {viewingSkill?.description}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{
            flexGrow: 1,
            bgcolor: m3.color.surfaceContainerLowest,
            borderRadius: `${m3.shape.medium}px`,
            border: `1px solid ${m3.color.outlineVariant}`,
            p: 3,
            overflowY: 'auto',
          }}>
            <Typography component="div" variant="body2" sx={{
              color: m3.color.onSurface,
              '& p': { m: 0, mb: 2, lineHeight: 1.6 },
              '& h1, & h2, & h3': { mt: 0, mb: 1, color: m3.color.onSurface, fontWeight: 500 },
              '& ul, & ol': { mt: 0, pl: 3 },
              '& pre': { bgcolor: m3.color.surfaceContainerHigh, p: 2, borderRadius: `${m3.shape.small}px`, overflowX: 'auto', border: `1px solid ${m3.color.outlineVariant}` },
              '& code': { fontFamily: '"Fira Code", monospace', color: m3.color.primary },
            }}>
              {viewingSkill?.isBuiltIn ? (
                <Typography sx={{ fontStyle: 'italic', color: m3.color.onSurfaceVariant }}>/* System Core Binary — Imperative Code Non-Readable */</Typography>
              ) : (
                <ReactMarkdown>{viewingSkill?.markdown || "No markdown programmed."}</ReactMarkdown>
              )}
            </Typography>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setViewingSkill(null)} variant="contained">
              Close Workspace
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
