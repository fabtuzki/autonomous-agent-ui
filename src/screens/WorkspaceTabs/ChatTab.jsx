import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Typography, Avatar, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useData } from '../../DataContext';

export default function ChatTab({ agent, initialInput, clearInitialInput }) {
  const { chats, addChat } = useData();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const history = chats[agent.id] || [];

  useEffect(() => {
    if (initialInput) {
      setInput(initialInput);
      clearInitialInput();
    }
  }, [initialInput, clearInitialInput]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSend = () => {
    if (!input.trim()) return;
    addChat(agent.id, input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        {history.map((msg, index) => {
          const isAgent = msg.role === 'agent';
          return (
            <Box key={index} sx={{ display: 'flex', gap: 2, flexDirection: isAgent ? 'row' : 'row-reverse', alignItems: 'flex-start' }}>
              <Avatar sx={{ bgcolor: isAgent ? 'primary.main' : 'secondary.main', width: 36, height: 36 }}>
                {isAgent ? <SmartToyIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
              </Avatar>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2, 
                  maxWidth: '75%',
                  borderRadius: 3,
                  backgroundColor: isAgent ? '#FFFFFF' : '#3F51B5',
                  color: isAgent ? '#001F3F' : '#FFFFFF',
                  border: isAgent ? '1px solid rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Paper>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ p: 1, px: 2, display: 'flex', alignItems: 'flex-end', gap: 1, borderRadius: '16px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.15)', boxShadow: '0px 2px 12px rgba(0,0,0,0.04)' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Message or use /addnewskill..."
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          InputProps={{ disableUnderline: true, sx: { p: 1 } }}
        />
        <IconButton color="primary" onClick={handleSend} sx={{ mb: 0.5 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
