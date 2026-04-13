import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Avatar, Collapse, Tooltip } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

// Inline SVG Logo for the exact xStudio brand look
const LogoIcon = () => (
  <Box component="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1136 1085" sx={{ width: 28, height: 28, flexShrink: 0 }}>
    <g id="Layer_3">
      <polygon fill="#7D4EF0" points="254 500 409 594 582.5 481 756 594 911 499 911 573 756 666 582.5 560 409 666 254 573.5 254 500"/>
      <polygon fill="#391AEF" points="254 621 409 715 582.5 602 756 715 911 620 911 694 756 787 582.5 681 409 787 254 694.5 254 621"/>
      <polygon fill="#2200EE" points="254 747 409 841 582.5 728 756 841 911 746 911 820 756 913 582.5 807 409 913 254 820.5 254 747"/>
    </g>
    <g id="Layer_2">
      <polygon fill="#C020EE" points="406 172 254 271 428 379 254 485 409 581 583 468 757 581 911 485 738 376.5 911 270 755 172 582.5 281 406 172"/>
      <polygon fill="#9F16E8" points="254 285 254 355 350 414 409 376.5 254 285"/>
      <polygon fill="#1900CE" points="911 285 911 355 815 414 756 376.5 911 285"/>
    </g>
  </Box>
);

export default function GlobalNav() {
  const [expanded, setExpanded] = useState(true);

  const activeModule = 'Autonomous Agents';

  const applications = [
    { name: 'Chat Agents', icon: <ChatOutlinedIcon /> },
    { name: 'OCR Suite', icon: <DocumentScannerOutlinedIcon /> },
    { name: 'Autonomous Agents', icon: <SmartToyOutlinedIcon /> },
    { name: 'Image Generation', icon: <ImageOutlinedIcon /> },
  ];

  const coreServices = [
    { name: 'Models', icon: <PsychologyOutlinedIcon /> },
    { name: 'Knowledge Bases', icon: <MenuBookOutlinedIcon /> },
    { name: 'Tool Hub', icon: <BuildOutlinedIcon /> },
    { name: 'Guardrails', icon: <ShieldOutlinedIcon /> },
  ];

  const renderNavGroup = (title, items) => (
    <Box sx={{ mb: 2 }}>
      {expanded && (
        <Typography variant="caption" sx={{ px: 3, mb: 1, display: 'block', color: 'text.secondary', fontWeight: 600 }}>
          {title}
        </Typography>
      )}
      <List disablePadding>
        {items.map((item) => {
          const isActive = item.name === activeModule;
          
          const listItem = (
            <ListItem disablePadding key={item.name} sx={{ px: expanded ? 2 : 1, mb: 0.5 }}>
              <ListItemButton 
                sx={{ 
                  borderRadius: 2, 
                  py: 1,
                  px: expanded ? 2 : 1.5,
                  minHeight: 44,
                  backgroundColor: isActive ? 'rgba(192, 32, 238, 0.06)' : 'transparent',
                  color: isActive ? 'secondary.main' : 'text.secondary',
                  justifyContent: expanded ? 'flex-start' : 'center',
                  '&:hover': {
                    backgroundColor: isActive ? 'rgba(192, 32, 238, 0.1)' : 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'secondary.main' : 'inherit', minWidth: expanded ? 40 : 'auto', mr: expanded ? 0 : 0 }}>
                  {item.icon}
                </ListItemIcon>
                {expanded && (
                  <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 500 }} />
                )}
              </ListItemButton>
            </ListItem>
          );

          return expanded ? listItem : (
            <Tooltip title={item.name} placement="right" key={item.name}>
               {listItem}
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        width: expanded ? 260 : 72,
        flexShrink: 0,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        transition: 'width 0.2s ease',
        zIndex: 10,
        height: '100%'
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: expanded ? 'space-between' : 'center', height: 72 }}>
        {expanded && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 1 }}>
            <LogoIcon />
            <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: '-0.5px' }}>
              xStudio
            </Typography>
          </Box>
        )}
        {!expanded && <LogoIcon />}
        
        {expanded && (
          <IconButton onClick={() => setExpanded(false)} size="small" sx={{ color: 'text.secondary', borderRadius: 1, border: '1px solid rgba(0,0,0,0.1)' }}>
            <KeyboardDoubleArrowLeftIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.04)' }} />

      {/* Main SCROLLABLE List Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List disablePadding>
          <ListItem disablePadding sx={{ px: expanded ? 2 : 1, mb: 2 }}>
            <ListItemButton sx={{ borderRadius: 2, minHeight: 44, justifyContent: expanded ? 'flex-start' : 'center' }}>
              <ListItemIcon sx={{ minWidth: expanded ? 40 : 'auto' }}><HomeOutlinedIcon /></ListItemIcon>
              {expanded && <ListItemText primary="Home" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}/>}
            </ListItemButton>
          </ListItem>
        </List>

        {renderNavGroup('Applications', applications)}
        {renderNavGroup('Core Services', coreServices)}

      </Box>

      {/* Expansion Toggle when collapsed */}
      {!expanded && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
           <IconButton onClick={() => setExpanded(true)} size="small" sx={{ mb: 2, color: 'text.secondary' }}>
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Box>
      )}

      <Divider sx={{ borderColor: 'rgba(0,0,0,0.04)' }} />

      {/* User Profile */}
      <Box sx={{ p: expanded ? 2 : 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            p: expanded ? 1.5 : 1, 
            borderRadius: 2, 
            cursor: 'pointer',
            justifyContent: expanded ? 'flex-start' : 'center',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.03)' }
          }}
        >
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#F3F4F6', color: '#1F2937', fontWeight: 600, fontSize: '1rem' }}>P</Avatar>
          {expanded && (
            <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, noWrap: true }}>Phùng Bích Hằng</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', noWrap: true }}>hangpb@tcbs.com.vn</Typography>
            </Box>
          )}
          {expanded && <UnfoldMoreIcon fontSize="small" color="action" />}
        </Box>
      </Box>
    </Box>
  );
}
