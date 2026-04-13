import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, TextField, Box, Select, MenuItem, FormControl, InputLabel, Typography, Autocomplete, Chip, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useData } from '../DataContext';

const steps = ['Basics', 'Personality', 'Capabilities', 'Heartbeat'];

const personalities = [
  { value: 'Helpful Assistant', label: 'Helpful Assistant', desc: 'Default friendly and concise mode.' },
  { value: 'Data Analyst', label: 'Data Analyst', desc: 'Focuses strictly on numbers, trends, and JSON outputs.' },
  { value: 'Code Critic', label: 'Code Critic', desc: 'Harsh code reviewer prioritizing security and efficiency.' },
  { value: 'None', label: 'None (Skip)', desc: 'No system prompt enforcement.' }
];

export default function CreateAgentDialog({ open, onClose }) {
  const { addAgent, setActiveAgentId, availableMCPs, availableSkills } = useData();
  const [activeStep, setActiveStep] = useState(0);
  
  // Form State
  const [name, setName] = useState('');
  const [model, setModel] = useState('gemini-1.5-pro');
  const [personality, setPersonality] = useState('Helpful Assistant');
  const [selectedCapabilities, setSelectedCapabilities] = useState([]);
  const [heartbeatInterval, setHeartbeatInterval] = useState('1h');
  const [heartbeatPrompt, setHeartbeatPrompt] = useState('Check all unread communication threads and summarize them if important.');

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Distribute selections
      const configuredMCPs = selectedCapabilities
        .filter(c => c.type === 'mcp')
        .map(mcp => ({
          ...mcp,
          hasCredentials: false
        }));
        
      const configuredSkills = selectedCapabilities
        .filter(c => c.type === 'skill');

      const newAgent = addAgent({
        name: name || 'Unnamed Agent',
        model,
        personality: personality === 'None' ? '' : personality,
        heartbeatInterval,
        heartbeatPrompt: heartbeatPrompt,
        channels: [], // Empty initially
        skills: configuredSkills, 
        mcps: configuredMCPs
      });
      setActiveAgentId(newAgent.id);
      onClose();
      // Reset form
      setActiveStep(0);
      setName('');
      setPersonality('Helpful Assistant');
      setSelectedCapabilities([]);
      setHeartbeatInterval('1h');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 6, p: { xs: 2, md: 4 } } }}>
      <DialogTitle sx={{ fontWeight: 700, px: 2, fontSize: '1.5rem', pb: 2, color: '#000000' }}>Initialize Autonomous Agent</DialogTitle>
      <DialogContent sx={{ px: 2, py: 1 }}>
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
            <FormControl component="fieldset" fullWidth>
              <RadioGroup value={personality} onChange={e => setPersonality(e.target.value)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {personalities.map((p) => (
                    <Paper 
                      key={p.value}
                      variant="outlined" 
                      sx={{ 
                        p: 1.5, 
                        display: 'flex', 
                        alignItems: 'flex-start',
                        borderColor: personality === p.value ? 'primary.main' : 'rgba(0,0,0,0.1)',
                        backgroundColor: personality === p.value ? 'rgba(63,81,181,0.03)' : 'transparent',
                        borderRadius: 2
                      }}
                    >
                      <FormControlLabel 
                        value={p.value} 
                        control={<Radio color="primary" />} 
                        label={
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>{p.label}</Typography>
                            <Typography variant="body2" color="text.secondary">{p.desc}</Typography>
                          </Box>
                        } 
                        sx={{ m: 0, width: '100%', alignItems: 'flex-start' }}
                      />
                    </Paper>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>
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
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 2, backgroundColor: '#FFF3E0', color: '#E65100', borderRadius: 2 }}>
                  <WarningAmberIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Selected MCPs require personal token setup in workspace later.
                  </Typography>
                </Box>
              )}

              <Box sx={{ p: 2, bgcolor: '#F5F7FA', borderRadius: 2, border: '1px dashed rgba(0,0,0,0.1)' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Note:</strong> Custom internal skills can be programmed organically later via the Chat interface using the `/addnewskill` protocol.
                </Typography>
              </Box>
            </Box>
          )}

          {/* STEP 3: HEARTBEAT */}
          {activeStep === 3 && (
            <>
              <FormControl fullWidth>
                <InputLabel>Wake-up Interval (Heartbeat)</InputLabel>
                <Select value={heartbeatInterval} label="Wake-up Interval (Heartbeat)" onChange={e => setHeartbeatInterval(e.target.value)}>
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
                label="Objective Prompt on Wake" 
                value={heartbeatPrompt}
                onChange={e => setHeartbeatPrompt(e.target.value)}
              />
            </>
          )}

        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 2, px: 3, pt: 2 }}>
        <Button onClick={onClose} sx={{ color: '#444444', fontWeight: 600 }}>Cancel</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={handleBack} disabled={activeStep === 0} sx={{ fontWeight: 600 }}>Back</Button>
        <Button variant="contained" onClick={handleNext} disableElevation color="primary" sx={{ px: 5, py: 1.5, fontSize: '1rem' }}>
          {activeStep === steps.length - 1 ? 'Start Agent' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
