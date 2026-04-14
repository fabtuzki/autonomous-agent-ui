import { Box, Typography, Card, CardContent, Switch, FormControlLabel, Button, useTheme } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useData } from '../../DataContext';

export default function ChannelsTab({ agent }) {
  const { updateAgent } = useData();
  const theme = useTheme();
  const m3 = theme.m3;

  const isTeamsEnabled = agent.channels.includes('Teams');

  const handleToggleTeams = (e) => {
    const checked = e.target.checked;
    const newChannels = checked
      ? [...agent.channels, 'Teams']
      : agent.channels.filter(c => c !== 'Teams');
    updateAgent(agent.id, { channels: newChannels });
  };

  return (
    <Box sx={{ p: { xs: 3, md: 4 }, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: m3.color.onSurface }}>
        Communication Channels
      </Typography>
      <Typography variant="body1" sx={{ color: m3.color.onSurfaceVariant, mb: 4 }}>
        Authorize platforms where this agent can passively listen and proactively respond.
      </Typography>

      <Card sx={{ maxWidth: 440 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2.5 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ p: 1, backgroundColor: m3.color.primaryContainer, borderRadius: `${m3.shape.small}px`, display: 'flex' }}>
              <ForumIcon sx={{ color: m3.color.onPrimaryContainer }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: m3.color.onSurface }}>Microsoft Teams</Typography>
              <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant }}>Corporate messaging integration</Typography>
            </Box>
          </Box>
          <FormControlLabel
            control={<Switch checked={isTeamsEnabled} onChange={handleToggleTeams} color="primary" />}
            label=""
            sx={{ m: 0 }}
          />
        </CardContent>
      </Card>

      {isTeamsEnabled && (
        <Box
          sx={{
            mt: 3,
            maxWidth: 440,
            p: 3,
            backgroundColor: m3.color.surfaceContainerLow,
            borderRadius: `${m3.shape.medium}px`,
            border: `1px solid ${m3.color.outlineVariant}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: m3.color.success }}>
            <CheckCircleIcon fontSize="small" />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Integration Active
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: m3.color.onSurfaceVariant,
              mb: 3,
              lineHeight: 1.6,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              px: 1,
            }}
          >
            To interact with this agent in your corporate workspace, click the link below. Start your messages with <strong style={{ color: m3.color.onSurface }}>/{(agent?.name || 'agent').toLowerCase().replace(/\s+/g, '-')}</strong> to trigger an autonomous response.
          </Typography>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ borderRadius: `${m3.shape.full}px` }}
          >
            Chat on Teams
          </Button>
        </Box>
      )}
    </Box>
  );
}
