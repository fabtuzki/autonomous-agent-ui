import React, { useState } from 'react';
import { Box, Typography, IconButton, Chip, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubjectIcon from '@mui/icons-material/Subject';
import { useData } from '../../DataContext';

function JobRow({ job, onDelete }) {
  const [innerTab, setInnerTab] = useState(0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'running': return 'primary';
      case 'success': return 'success';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '--';
    return new Date(isoString).toLocaleString();
  };

  return (
    <Accordion 
      disableGutters 
      elevation={0}
      sx={{ 
        mb: 2, 
        borderRadius: '24px !important', 
        backgroundColor: '#FFFFFF',
        '&:before': { display: 'none' }, 
        border: 'none',
        overflow: 'hidden'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ 
          px: 3, 
          py: 1, 
          '& .MuiAccordionSummary-content': { 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            pr: 2
          } 
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: '1rem', flexShrink: 0 }}>
          {job.task}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip label={job.status.toUpperCase()} color={getStatusColor(job.status)} size="small" variant="filled" sx={{ fontWeight: 500 }} />
          <IconButton color="error" size="small" onClick={(e) => { e.stopPropagation(); onDelete(job.id); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, backgroundColor: '#F8F9FC', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}>
          <Tabs value={innerTab} onChange={(e, v) => setInnerTab(v)} aria-label="job details tabs">
            <Tab label="Metadata" sx={{ fontWeight: 500 }} />
            <Tab label="Execution Logs" sx={{ fontWeight: 500 }} />
          </Tabs>
        </Box>

        {innerTab === 0 && (
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}><AccessTimeIcon fontSize="inherit"/> Start Time</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(job.startTime)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}><AccessTimeIcon fontSize="inherit"/> End Time</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(job.endTime)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}><AccessTimeIcon fontSize="inherit"/> Duration</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{job.duration || '--'}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ p: 2, backgroundColor: '#FFFFFF', borderRadius: 4, order: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}><SubjectIcon fontSize="inherit"/> Creation Context (Trigger)</Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#1C1B1F' }}>"{job.context}"</Typography>
            </Box>
          </Box>
        )}

        {innerTab === 1 && (
            <Box sx={{ p: 3, backgroundColor: '#1C1B1F' }}>
              <Typography variant="body2" sx={{ fontFamily: '"Fira Code", monospace', color: '#FFFBFE', mb: 2, opacity: 0.7 }}>
                -- Terminal Output --
              </Typography>
              {job.logs.map((log, idx) => (
                <Typography key={idx} variant="body2" sx={{ fontFamily: '"Fira Code", monospace', color: job.status === 'failed' && idx === job.logs.length - 1 ? '#F2B8B5' : '#CAC4D0', mb: 0.5 }}>
                  {log}
                </Typography>
              ))}
            </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default function JobsTab({ agent }) {
  const { jobs, deleteJob } = useData();

  const agentJobs = jobs.filter(j => j.agentId === agent.id);

  return (
    <Box sx={{ p: { xs: 3, md: 5 }, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#1C1B1F' }}>
        Active & Completed Jobs
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor tasks executed by this agent. Expand a job to view its metadata and decision logs.
      </Typography>

      <Box sx={{ width: '100%' }}>
        {agentJobs.map((job) => (
          <JobRow key={job.id} job={job} onDelete={deleteJob} />
        ))}
        {agentJobs.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography color="text.secondary">No active jobs found.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
