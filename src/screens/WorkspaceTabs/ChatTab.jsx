import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Typography, Avatar, Paper, InputBase, Card, CardContent, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useData } from '../../DataContext';

export default function ChatTab({ agent, initialInput, clearInitialInput }) {
  const { chats, addChat } = useData();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const m3 = theme.m3;

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
      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        {history.map((msg, index) => {
          const isAgent = msg.role === 'agent';
          return (
            <Box key={index} sx={{ display: 'flex', gap: 1.5, flexDirection: isAgent ? 'row' : 'row-reverse', alignItems: 'flex-start', width: '100%', overflow: 'hidden' }}>
              <Avatar
                sx={{
                  bgcolor: isAgent ? m3.color.primary : m3.color.tertiary,
                  color: isAgent ? m3.color.onPrimary : m3.color.onTertiary,
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                }}
              >
                {isAgent ? <SmartToyIcon sx={{ fontSize: 18 }} /> : <PersonIcon sx={{ fontSize: 18 }} />}
              </Avatar>
              <Box sx={{ maxWidth: 'calc(100% - 48px)', minWidth: 0 }}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: `${m3.shape.medium}px`,
                    backgroundColor: isAgent ? m3.color.surfaceContainerLow : m3.color.primaryContainer,
                    color: isAgent ? m3.color.onSurface : m3.color.onPrimaryContainer,
                    border: isAgent ? `1px solid ${m3.color.outlineVariant}` : 'none',
                    overflow: 'hidden',
                  }}
                >
                  <CardContent sx={{ p: 2, px: 2.5, '&:last-child': { pb: 2 } }}>
                    <Typography
                      component="div"
                      variant="body2"
                      sx={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        '& p, & li': { m: 0, mb: 1 },
                        '& p:last-child': { mb: 0 },
                        '& ul, & ol': { pl: 2.5, mb: 1, listStylePosition: 'inside' },
                        '& pre': {
                          bgcolor: isAgent ? m3.color.surfaceContainerHighest : 'rgba(255,255,255,0.15)',
                          p: 1.5,
                          borderRadius: `${m3.shape.small}px`,
                          overflowX: 'auto',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                        },
                        '& code': { fontFamily: '"Fira Code", monospace', fontSize: '0.8125rem' },
                        '& strong': { fontWeight: 600 },
                      }}
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 0.75,
          px: 2,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          borderRadius: `${m3.shape.extraLarge}px`,
          backgroundColor: m3.color.surfaceContainerHighest,
          border: `1px solid ${m3.color.outlineVariant}`,
          transition: 'border-color 200ms ease-in-out',
          '&:focus-within': {
            borderColor: m3.color.primary,
          },
        }}
      >
        <InputBase
          fullWidth
          multiline
          maxRows={4}
          placeholder="Message or use /addnewskill..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{
            p: 1,
            fontSize: m3.typeScale.bodyLarge.fontSize,
            lineHeight: m3.typeScale.bodyLarge.lineHeight,
            color: m3.color.onSurface,
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{
            mb: 0.25,
            backgroundColor: m3.color.primaryContainer,
            color: m3.color.onPrimaryContainer,
            borderRadius: `${m3.shape.full}px`,
            width: 40,
            height: 40,
            '&:hover': {
              backgroundColor: m3.color.primary,
              color: m3.color.onPrimary,
            },
          }}
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Paper>
    </Box>
  );
}
