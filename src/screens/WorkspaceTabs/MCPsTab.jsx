import React, { useState } from 'react';
import { Box, Typography, Switch, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText, Tooltip as MuiTooltip, Paper } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExtensionIcon from '@mui/icons-material/Extension';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useData } from '../../DataContext';

export default function MCPsTab({ agent }) {
  const { updateAgent, availableMCPs } = useData();
  const [credDialogOpen, setCredDialogOpen] = useState(false);
  const [selectedMCP, setSelectedMCP] = useState(null);

  const handleToggle = (mcpGlobal) => {
    const isInstalled = agent.mcps.find(m => m.id === mcpGlobal.id);

    if (isInstalled) {
      updateAgent(agent.id, {
        mcps: agent.mcps.filter(m => m.id !== mcpGlobal.id)
      });
    } else {
      updateAgent(agent.id, {
        mcps: [...agent.mcps, { ...mcpGlobal, hasCredentials: false }]
      });
    }
  };

  const handleOpenCreds = (installedMcp) => {
    setSelectedMCP(installedMcp);
    setCredDialogOpen(true);
  };

  const handleSaveCreds = () => {
    updateAgent(agent.id, {
      mcps: agent.mcps.map(m => m.id === selectedMCP.id ? { ...m, hasCredentials: true } : m)
    });
    setCredDialogOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 4, md: 6 }, height: '100%', overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
      <Box sx={{ mb: 6, maxWidth: 800 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#000000', letterSpacing: '-0.5px' }}>
          Global Integrations (MCPs)
        </Typography>
        <Typography variant="body1" sx={{ color: '#555555', fontSize: '1.1rem' }}>
          Securely authorize and manage Model Context Protocols. Flip the switch to bind external logic layers to your agent.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {availableMCPs.map(globalMcp => {
          const installedInstance = agent.mcps.find(m => m.id === globalMcp.id);
          const isInstalled = !!installedInstance;
          const hasCreds = isInstalled && installedInstance.hasCredentials;
          
          return (
              <Paper 
              key={globalMcp.id}
              elevation={0}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start', lg: 'center' },
                justifyContent: 'space-between',
                p: { xs: 2, md: 2.5 },
                borderRadius: 2,
                backgroundColor: isInstalled && !hasCreds ? 'rgba(245, 158, 11, 0.04)' : '#F4F5F8',
                border: isInstalled ? (hasCreds ? '2px solid rgba(16, 185, 129, 0.15)' : '2px solid rgba(245, 158, 11, 0.4)') : '1px solid rgba(0,0,0,0.0)',
                transition: 'border 0.2s, background-color 0.2s',
                gap: 2
              }}
            >
              {/* Left Domain: Icon + Text block */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1, maxWidth: { lg: '60%' } }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  backgroundColor: isInstalled ? '#FFFFFF' : 'rgba(0,0,0,0.04)',
                  boxShadow: isInstalled ? '0px 2px 8px rgba(0,0,0,0.05)' : 'none',
                  display: 'flex' 
                }}>
                  <ExtensionIcon color={isInstalled ? "primary" : "disabled"} fontSize="medium" sx={{ opacity: isInstalled ? 1 : 0.6 }} />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: isInstalled ? '#000000' : '#444' }}>
                    {globalMcp.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: isInstalled ? '#333' : '#777', mt: 0.25, lineHeight: 1.4 }}>
                    {globalMcp.description}
                  </Typography>
                </Box>
              </Box>

              {/* Right Domain: Core Action Logic */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: { lg: 'auto' }, width: { xs: '100%', lg: 'auto' }, justifyContent: { xs: 'space-between', lg: 'flex-end' } }}>
                
                {/* Fixed Dimension Token Status Block - Guarantees horizontal real-estate even if empty */}
                <Box sx={{ minWidth: 240, display: 'flex', justifyContent: 'flex-end', opacity: isInstalled ? 1 : 0 }}>
                  {isInstalled && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {hasCreds ? (
                        <Chip 
                          icon={<CheckCircleIcon sx={{ fontSize: '16px !important' }}/>} 
                          label="Token Applied" 
                          size="small"
                          sx={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontWeight: 600, border: 'none' }} 
                        />
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, backgroundColor: '#FFFFFF', p: 0.5, pr: 1, borderRadius: 2, boxShadow: '0px 1px 4px rgba(0,0,0,0.06)' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#B45309', pl: 1 }}>
                            <WarningAmberIcon fontSize="small" />
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>Missing</Typography>
                          </Box>
                          <Button 
                            variant="contained" 
                            color="warning" 
                            disableElevation
                            size="small"
                            onClick={() => handleOpenCreds(installedInstance)}
                            sx={{ borderRadius: 1.5, px: 2, py: 0.5, minWidth: 80, fontSize: '0.75rem', fontWeight: 600 }}
                          >
                            Add Token
                          </Button>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>

                <Switch 
                  checked={isInstalled} 
                  onChange={() => handleToggle(globalMcp)} 
                  color="primary" 
                  sx={{ transform: 'scale(1.2)' }}
                />
              </Box>

            </Paper>
          );
        })}
      </Box>

      {/* Auth Dialog */}
      <Dialog open={credDialogOpen} onClose={() => setCredDialogOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { p: 2, borderRadius: 6 } }}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700, fontSize: '1.25rem', color: '#000000' }}>
          <KeyIcon color="primary" fontSize="large" /> Add Credentials
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText sx={{ mb: 4, display: 'flex', alignItems: 'flex-start', gap: 1.5, color: '#333333', fontSize: '1.05rem', lineHeight: 1.5 }}>
            Provide the persistent token for <strong style={{color: '#000000'}}>{selectedMCP?.name}</strong>.
            <MuiTooltip title="Generate this token in your Developer Settings and ensure it has repo-read permissions.">
              <InfoOutlinedIcon sx={{ cursor: 'pointer', mt: 0.2, color: 'primary.main' }} />
            </MuiTooltip>
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="Personal Access Token"
            type="password"
            variant="outlined"
            placeholder="••••••••••••"
            InputProps={{ sx: { borderRadius: 3 } }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 2 }}>
          <Button onClick={() => setCredDialogOpen(false)} sx={{ color: '#444444', fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleSaveCreds} variant="contained" disableElevation color="primary" sx={{ px: 4, py: 1.5, fontSize: '1rem' }}>Secure Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
