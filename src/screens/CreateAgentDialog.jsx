import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, TextField, Box, Select, MenuItem, FormControl, InputLabel, Typography, Autocomplete, Chip, RadioGroup, FormControlLabel, Radio, Paper, useTheme } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SettingsIcon from '@mui/icons-material/Settings';
import { useData } from '../DataContext';

const steps = ['Basics', 'Personality', 'Capabilities', 'Heartbeat'];

export default function CreateAgentDialog({ open, onClose }) {
  const { addAgent, setActiveAgentId, availableMCPs, availableSkills } = useData();
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const m3 = theme.m3;

  // Form State
  const [name, setName] = useState('');
  const [model, setModel] = useState('gemini-1.5-pro');
  const [personality, setPersonality] = useState('');
  const [selectedCapabilities, setSelectedCapabilities] = useState([]);
  const [heartbeatInterval, setHeartbeatInterval] = useState('disabled');
  const [heartbeatPrompt, setHeartbeatPrompt] = useState('');

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const configuredMCPs = selectedCapabilities
        .filter(c => c.type === 'mcp')
        .map(mcp => ({ ...mcp, hasCredentials: false }));
      const configuredSkills = selectedCapabilities.filter(c => c.type === 'skill');

      const newAgent = addAgent({
        name: name || 'Unnamed Agent',
        model,
        personality,
        heartbeatInterval,
        heartbeatPrompt: heartbeatPrompt,
        channels: [],
        skills: configuredSkills,
        mcps: configuredMCPs
      });
      setActiveAgentId(newAgent.id);
      onClose();
      setActiveStep(0);
      setName('');
      setPersonality('');
      setSelectedCapabilities([]);
      setHeartbeatInterval('disabled');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 400, fontSize: m3.typeScale.headlineSmall.fontSize, color: m3.color.onSurface, px: 3, pt: 3, pb: 1 }}>
        Initialize Autonomous Agent
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 1 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: 280, display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          {/* STEP 0: BASICS */}
          {activeStep === 0 && (
            <>
              <TextField fullWidth label="Agent Name" variant="outlined" value={name} onChange={e => setName(e.target.value)} autoFocus sx={{ mb: 1 }} />
              <FormControl fullWidth>
                <InputLabel>Language Model</InputLabel>
                <Select value={model} label="Language Model" onChange={e => setModel(e.target.value)}>
                  <MenuItem value="gemini-1.5-pro">Gemini 1.5 Pro</MenuItem>
                  <MenuItem value="gemini-1.5-flash">Gemini 1.5 Flash</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {/* STEP 1: PERSONALITY */}
          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body1" sx={{ color: m3.color.onSurfaceVariant, mb: 1 }}>
                Define instructions spanning the entire agent's autonomous context window.
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                label="System Prompt (Optional)"
                placeholder="e.g. You are a senior DevOps engineer. Always review code for security vulnerabilities before proposing fixes..."
                variant="outlined"
                value={personality}
                onChange={e => setPersonality(e.target.value)}
              />
            </Box>
          )}

          {/* STEP 2: CAPABILITIES */}
          {activeStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Autocomplete
                multiple
                options={[...availableMCPs, ...(availableSkills || [])]}
                groupBy={(option) => option.type === 'mcp' ? 'External Integrations (MCP)' : 'Native Skills'}
                getOptionLabel={(option) => option.name}
                value={selectedCapabilities}
                onChange={(event, newValue) => setSelectedCapabilities(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Search Capabilities..."
                    placeholder="e.g. GitHub, Web Serper"
                    sx={{ mt: 1 }}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant={option.type === 'mcp' ? 'filled' : 'outlined'}
                      color={option.type === 'mcp' ? 'primary' : 'secondary'}
                      label={option.name}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />

              {selectedCapabilities.some(c => c.type === 'mcp') && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 2, backgroundColor: m3.color.warningContainer, color: m3.color.onWarningContainer, borderRadius: `${m3.shape.small}px` }}>
                  <WarningAmberIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Selected MCPs require personal token setup in workspace later.
                  </Typography>
                </Box>
              )}

              {/* Built-in Core Functions — M3 Tonal Card */}
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: `${m3.shape.medium}px`,
                  backgroundColor: m3.color.secondaryContainer,
                  color: m3.color.onSecondaryContainer,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <SettingsIcon fontSize="small" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Built-in Core Functions</Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.5, mb: 1.5 }}>
                  These universal tools are natively embedded into the agent runtime and do not need to be manually configured.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Scheduler" size="small" variant="outlined" sx={{ borderColor: m3.color.onSecondaryContainer, color: m3.color.onSecondaryContainer }} />
                  <Chip label="File System Writer" size="small" variant="outlined" sx={{ borderColor: m3.color.onSecondaryContainer, color: m3.color.onSecondaryContainer }} />
                  <Chip label="Web Serper" size="small" variant="outlined" sx={{ borderColor: m3.color.onSecondaryContainer, color: m3.color.onSecondaryContainer }} />
                </Box>
              </Box>
            </Box>
          )}

          {/* STEP 3: HEARTBEAT */}
          {activeStep === 3 && (
            <>
              <FormControl fullWidth>
                <InputLabel>Wake-up Interval (Optional)</InputLabel>
                <Select value={heartbeatInterval} label="Wake-up Interval (Optional)" onChange={e => setHeartbeatInterval(e.target.value)}>
                  <MenuItem value="disabled">Disabled (No Heartbeat)</MenuItem>
                  <MenuItem value="15m">Every 15 Minutes</MenuItem>
                  <MenuItem value="1h">Every 1 Hour</MenuItem>
                  <MenuItem value="12h">Every 12 Hours</MenuItem>
                  <MenuItem value="manual">Manual Execution Only</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Objective Prompt on Wake (Optional)"
                value={heartbeatPrompt}
                onChange={e => setHeartbeatPrompt(e.target.value)}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3, pt: 2 }}>
        <Button onClick={onClose} sx={{ color: m3.color.onSurfaceVariant }}>Cancel</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
        <Button variant="contained" onClick={handleNext} color="primary">
          {activeStep === steps.length - 1 ? 'Start Agent' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
