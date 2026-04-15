import React, { useState } from 'react';
import { Box, Typography, Switch, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText, Tooltip as MuiTooltip, Paper, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const m3 = theme.m3;

  const installedMcpConfigs = availableMCPs.filter(m => agent.mcps.some(am => am.id === m.id));
  const availableMcpConfigs = availableMCPs.filter(m => !agent.mcps.some(am => am.id === m.id));

  const handleToggle = (mcpGlobal) => {
    const isInstalled = agent.mcps.find(m => m.id === mcpGlobal.id);
    if (isInstalled) {
      updateAgent(agent.id, { mcps: agent.mcps.filter(m => m.id !== mcpGlobal.id) });
    } else {
      updateAgent(agent.id, { mcps: [...agent.mcps, { ...mcpGlobal, hasCredentials: false }] });
    }
  };

  const handleOpenCreds = (installedMcp) => {
    setSelectedMCP(installedMcp);
    setCredDialogOpen(true);
  };

  const handleSaveCreds = () => {
    updateAgent(agent.id, { mcps: agent.mcps.map(m => m.id === selectedMCP.id ? { ...m, hasCredentials: true } : m) });
    setCredDialogOpen(false);
  };

  // Shared list-item styling
  const listItemSx = (isInstalled, hasCreds, requiresToken = true) => ({
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    alignItems: { xs: 'flex-start', lg: 'center' },
    justifyContent: 'space-between',
    p: 2,
    borderRadius: `${m3.shape.medium}px`,
    backgroundColor: isInstalled
      ? ((hasCreds || !requiresToken) ? m3.color.surfaceContainerLowest : m3.color.warningContainer + '1A')
      : m3.color.surfaceContainerHigh,
    border: `1px solid ${isInstalled
      ? ((hasCreds || !requiresToken) ? m3.color.successContainer : m3.color.warningContainer)
      : m3.color.outlineVariant}`,
    transition: 'all 200ms ease-in-out',
    gap: 2,
  });

  return (
    <Box sx={{ p: { xs: 3, md: 4 }, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ mb: 5, maxWidth: 800 }}>
        <Typography variant="h4" gutterBottom sx={{ color: m3.color.onSurface }}>
          Global Integrations (MCPs)
        </Typography>
        <Typography variant="body1" sx={{ color: m3.color.onSurfaceVariant }}>
          Securely authorize and manage Model Context Protocols. Flip the switch to bind external logic layers to your agent.
        </Typography>
      </Box>

      <Typography variant="subtitle1" sx={{ color: m3.color.onSurface, mb: 1.5 }}>Integrations Active</Typography>
      {installedMcpConfigs.length === 0 && (
        <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant, fontStyle: 'italic', mb: 5 }}>No external data protocols bound to this agent.</Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
        {installedMcpConfigs.map(globalMcp => {
          const installedInstance = agent.mcps.find(m => m.id === globalMcp.id);
          const hasCreds = installedInstance.hasCredentials;

          return (
            <Paper key={globalMcp.id} elevation={0} sx={listItemSx(true, hasCreds, globalMcp.requiresToken !== false)}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1, maxWidth: { lg: '55%' } }}>
                <Box sx={{ p: 1, borderRadius: `${m3.shape.small}px`, backgroundColor: m3.color.surfaceContainerLowest, display: 'flex' }}>
                  <ExtensionIcon sx={{ color: m3.color.primary }} />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: m3.color.onSurface }}>{globalMcp.name}</Typography>
                  <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant, mt: 0.25 }}>{globalMcp.description}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: { lg: 'auto' }, width: { xs: '100%', lg: 'auto' }, justifyContent: { xs: 'space-between', lg: 'flex-end' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  {globalMcp.requiresToken === false ? (
                    <Chip
                      icon={<CheckCircleIcon sx={{ fontSize: '16px !important' }} />}
                      label="Ready to Use"
                      size="small"
                      sx={{ backgroundColor: m3.color.successContainer, color: m3.color.onSuccessContainer, fontWeight: 500, border: 'none' }}
                    />
                  ) : hasCreds ? (
                    <Chip
                      icon={<CheckCircleIcon sx={{ fontSize: '16px !important' }} />}
                      label="Token Applied"
                      size="small"
                      sx={{ backgroundColor: m3.color.successContainer, color: m3.color.onSuccessContainer, fontWeight: 500, border: 'none' }}
                    />
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, backgroundColor: m3.color.surfaceContainerLowest, p: 0.5, pr: 1, borderRadius: `${m3.shape.small}px`, border: `1px solid ${m3.color.outlineVariant}` }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: m3.color.warning, pl: 1 }}>
                        <WarningAmberIcon fontSize="small" />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>Missing</Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => handleOpenCreds(installedInstance)}
                        sx={{ borderRadius: `${m3.shape.small}px`, px: 2, py: 0.5, minWidth: 80, fontSize: m3.typeScale.labelSmall.fontSize, fontWeight: 500 }}
                      >
                        {globalMcp.authType === 'database' ? 'Add DB Credentials' : 'Add Token'}
                      </Button>
                    </Box>
                  )}
                </Box>
                <Switch checked={true} onChange={() => handleToggle(globalMcp)} color="primary" />
              </Box>
            </Paper>
          );
        })}
      </Box>

      <Typography variant="subtitle1" sx={{ color: m3.color.onSurface, mb: 1.5 }}>Global Protocol Library</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pb: 8 }}>
        {availableMcpConfigs.map(globalMcp => (
          <Paper key={globalMcp.id} elevation={0} sx={listItemSx(false, false)}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 1, maxWidth: { lg: '55%' } }}>
              <Box sx={{ p: 1, borderRadius: `${m3.shape.small}px`, backgroundColor: m3.color.surfaceContainerLowest, display: 'flex' }}>
                <ExtensionIcon sx={{ color: m3.color.onSurfaceVariant, opacity: 0.5 }} />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, color: m3.color.onSurfaceVariant }}>{globalMcp.name}</Typography>
                <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant, mt: 0.25 }}>{globalMcp.description}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: { lg: 'auto' } }}>
              <Switch checked={false} onChange={() => handleToggle(globalMcp)} color="primary" />
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Auth Dialog */}
      <Dialog open={credDialogOpen} onClose={() => setCredDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 500, fontSize: m3.typeScale.headlineSmall.fontSize, color: m3.color.onSurface }}>
          <KeyIcon sx={{ color: m3.color.primary }} /> {selectedMCP?.authType === 'database' ? 'Add Database Credentials' : 'Add Credentials'}
        </DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <DialogContentText sx={{ mb: 3, color: m3.color.onSurfaceVariant, fontSize: m3.typeScale.bodyLarge.fontSize, lineHeight: 1.5 }}>
            Provide the required connection payload for <strong style={{ color: m3.color.onSurface }}>{selectedMCP?.name}</strong>.
            <MuiTooltip title={selectedMCP?.authType === 'database' ? "Input your secure database connection string or credentials." : "Generate this token in your Developer Settings."}>
              <InfoOutlinedIcon sx={{ cursor: 'pointer', ml: 0.5, fontSize: 18, verticalAlign: 'text-bottom', color: m3.color.primary }} />
            </MuiTooltip>
          </DialogContentText>

          {selectedMCP?.authType === 'database' ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField fullWidth label="Database URL (Connection String)" variant="outlined" placeholder="postgres://user:pass@host:5432/db" autoFocus />
              <TextField fullWidth label="SSL Mode" variant="outlined" placeholder="require" />
            </Box>
          ) : (
            <TextField autoFocus fullWidth label="Personal Access Token" type="password" variant="outlined" placeholder="••••••••••••" />
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
          <Button onClick={() => setCredDialogOpen(false)} sx={{ color: m3.color.onSurfaceVariant }}>Cancel</Button>
          <Button onClick={handleSaveCreds} variant="contained" color="primary">Secure Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
