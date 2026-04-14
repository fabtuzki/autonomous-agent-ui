import React, { useState } from 'react';
import { Box, Typography, IconButton, Chip, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubjectIcon from '@mui/icons-material/Subject';
import { useData } from '../../DataContext';

function JobRow({ job, onDelete }) {
  const [innerTab, setInnerTab] = useState(0);
  const theme = useTheme();
  const m3 = theme.m3;

  const formatDate = (isoString) => {
    if (!isoString) return '--';
    return new Date(isoString).toLocaleString();
  };

  return (
    <Accordion disableGutters elevation={0} sx={{ mb: 1.5, overflow: 'hidden' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: 3,
          py: 0.5,
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pr: 2,
          },
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: m3.typeScale.titleSmall.fontSize, color: m3.color.onSurface, flexShrink: 0 }}>
          {job.task}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="error" size="small" onClick={(e) => { e.stopPropagation(); onDelete(job.id); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, backgroundColor: m3.color.surfaceContainer, borderTop: `1px solid ${m3.color.outlineVariant}` }}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 0.5 }}>
          <Tabs value={innerTab} onChange={(e, v) => setInnerTab(v)} aria-label="job details tabs">
            <Tab label="Decision Logs" sx={{ fontWeight: 500, fontSize: m3.typeScale.labelMedium.fontSize }} />
            <Tab label="Metadata" sx={{ fontWeight: 500, fontSize: m3.typeScale.labelMedium.fontSize }} />
            <Tab label="Execution History" sx={{ fontWeight: 500, fontSize: m3.typeScale.labelMedium.fontSize }} />
          </Tabs>
        </Box>

        {innerTab === 0 && (
          <Box sx={{ p: 3, backgroundColor: m3.color.inverseSurface }}>
            <Typography variant="body2" sx={{ fontFamily: '"Fira Code", monospace', color: m3.color.inverseOnSurface, mb: 2, opacity: 0.7 }}>
              -- Terminal Output --
            </Typography>
            {job.logs.map((log, idx) => (
              <Typography key={idx} variant="body2" sx={{
                fontFamily: '"Fira Code", monospace',
                color: job.status === 'failed' && idx === job.logs.length - 1 ? m3.color.errorContainer : m3.color.inverseOnSurface,
                mb: 0.5,
                opacity: 0.85,
              }}>
                {log}
              </Typography>
            ))}
          </Box>
        )}

        {innerTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="caption" sx={{ color: m3.color.onSurfaceVariant, display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}><AccessTimeIcon fontSize="inherit" /> Start Time</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: m3.color.onSurface }}>{formatDate(job.startTime)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: m3.color.onSurfaceVariant, display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}><AccessTimeIcon fontSize="inherit" /> End Time</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: m3.color.onSurface }}>{formatDate(job.endTime)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: m3.color.onSurfaceVariant, display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}><AccessTimeIcon fontSize="inherit" /> Duration</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: m3.color.onSurface }}>{job.duration || '--'}</Typography>
              </Box>
            </Box>
            <Box sx={{ p: 2, backgroundColor: m3.color.surfaceContainerLowest, borderRadius: `${m3.shape.medium}px`, border: `1px solid ${m3.color.outlineVariant}` }}>
              <Typography variant="caption" sx={{ color: m3.color.onSurfaceVariant, display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}><SubjectIcon fontSize="inherit" /> Creation Context (Trigger)</Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: m3.color.onSurface }}>"{job.context}"</Typography>
            </Box>
          </Box>
        )}

        {innerTab === 2 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {job.history && job.history.length > 0 ? (
                job.history.map((hist, idx) => (
                  <Box key={hist.runId} sx={{
                    p: 2,
                    px: 3,
                    backgroundColor: m3.color.surfaceContainerLowest,
                    borderRadius: `${m3.shape.small}px`,
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 100px',
                    alignItems: 'center',
                    border: `1px solid ${m3.color.outlineVariant}`,
                    gap: 2,
                  }}>
                    <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant, fontWeight: 500 }}>Run #{job.history.length - idx}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: m3.color.onSurface }}>{formatDate(hist.timestamp)}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Chip label={hist.status.toUpperCase()} color={hist.status === 'success' ? 'success' : 'error'} size="small" sx={{ fontWeight: 600 }} />
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: m3.color.onSurfaceVariant, py: 2, textAlign: 'center' }}>No historical execution records found for this job logic.</Typography>
              )}
            </Box>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default function JobsTab({ agent }) {
  const { jobs, deleteJob } = useData();
  const theme = useTheme();
  const m3 = theme.m3;

  const agentJobs = jobs.filter(j => j.agentId === agent.id);

  return (
    <Box sx={{ p: { xs: 3, md: 4 }, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: m3.color.onSurface }}>
        Active & Completed Jobs
      </Typography>
      <Typography variant="body1" sx={{ color: m3.color.onSurfaceVariant, mb: 4 }}>
        Monitor tasks executed by this agent. Expand a job to view its metadata and decision logs.
      </Typography>

      <Box sx={{ width: '100%' }}>
        {agentJobs.map((job) => (
          <JobRow key={job.id} job={job} onDelete={deleteJob} />
        ))}
        {agentJobs.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography sx={{ color: m3.color.onSurfaceVariant }}>No active jobs found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
