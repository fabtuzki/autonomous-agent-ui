import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Avatar, Tooltip, useTheme } from '@mui/material';
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

// Inline SVG Logo — brand asset, not theme-driven
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
  const theme = useTheme();
  const m3 = theme.m3;

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
    <Box sx={{ mb: 1 }}>
      {expanded && (
        <Typography
          variant="overline"
          sx={{
            px: 2, ml: 1, mb: 0.5, display: 'block',
            color: m3.color.onSurfaceVariant,
            fontWeight: 500,
            fontSize: m3.typeScale.labelSmall.fontSize,
            letterSpacing: m3.typeScale.labelSmall.letterSpacing,
            lineHeight: m3.typeScale.labelSmall.lineHeight,
          }}
        >
          {title}
        </Typography>
      )}
      <List disablePadding>
        {items.map((item) => {
          const isActive = item.name === activeModule;

          const listItem = (
            <ListItem disablePadding key={item.name} sx={{ px: expanded ? 1.5 : 1, mb: 0.25 }}>
              <ListItemButton
                sx={{
                  borderRadius: `${m3.shape.full}px`,
                  py: 0.75,
                  px: expanded ? 2 : 1.5,
                  minHeight: 44,
                  backgroundColor: isActive ? m3.color.primaryContainer : 'transparent',
                  color: isActive ? m3.color.onPrimaryContainer : m3.color.onSurfaceVariant,
                  justifyContent: expanded ? 'flex-start' : 'center',
                  transition: 'background-color 200ms ease-in-out',
                  '&:hover': {
                    backgroundColor: isActive
                      ? m3.color.primaryContainer
                      : `rgba(90, 75, 254, ${m3.stateLayer.hover})`,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? m3.color.onPrimaryContainer : 'inherit',
                    minWidth: expanded ? 36 : 'auto',
                    mr: expanded ? 0 : 0,
                    '& .MuiSvgIcon-root': { fontSize: 24 },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: m3.typeScale.labelLarge.fontSize,
                      fontWeight: isActive ? 600 : m3.typeScale.labelLarge.fontWeight,
                      letterSpacing: m3.typeScale.labelLarge.letterSpacing,
                    }}
                  />
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
        backgroundColor: m3.color.surfaceContainerLowest,
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${m3.color.outlineVariant}`,
        transition: 'width 200ms ease-in-out',
        zIndex: 10,
        height: '100%',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: expanded ? 'space-between' : 'center', height: 64 }}>
        {expanded && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 0.5 }}>
            <LogoIcon />
            <Typography
              variant="h6"
              sx={{
                color: m3.color.primary,
                fontWeight: 600,
                letterSpacing: '-0.5px',
                fontSize: m3.typeScale.titleLarge.fontSize,
              }}
            >
              xStudio
            </Typography>
          </Box>
        )}
        {!expanded && <LogoIcon />}

        {expanded && (
          <IconButton
            onClick={() => setExpanded(false)}
            size="small"
            sx={{
              color: m3.color.onSurfaceVariant,
              borderRadius: m3.shape.small,
              border: `1px solid ${m3.color.outlineVariant}`,
              '&:hover': { backgroundColor: `rgba(90, 75, 254, ${m3.stateLayer.hover})` },
            }}
          >
            <KeyboardDoubleArrowLeftIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ mb: 1.5 }} />

      {/* Main SCROLLABLE List Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pt: 0.5 }}>
        <List disablePadding>
          <ListItem disablePadding sx={{ px: expanded ? 1.5 : 1, mb: 1 }}>
            <ListItemButton sx={{ borderRadius: `${m3.shape.full}px`, minHeight: 44, justifyContent: expanded ? 'flex-start' : 'center' }}>
              <ListItemIcon sx={{ minWidth: expanded ? 36 : 'auto', '& .MuiSvgIcon-root': { fontSize: 24 } }}><HomeOutlinedIcon /></ListItemIcon>
              {expanded && <ListItemText primary="Home" primaryTypographyProps={{ fontSize: m3.typeScale.labelLarge.fontSize, fontWeight: 500 }} />}
            </ListItemButton>
          </ListItem>
        </List>

        {renderNavGroup('Applications', applications)}
        {renderNavGroup('Core Services', coreServices)}
      </Box>

      {/* Expansion Toggle when collapsed */}
      {!expanded && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
          <IconButton onClick={() => setExpanded(true)} size="small" sx={{ mb: 2, color: m3.color.onSurfaceVariant }}>
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Box>
      )}

      <Divider />

      {/* User Profile */}
      <Box sx={{ p: expanded ? 1.5 : 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: expanded ? 1.5 : 1,
            borderRadius: m3.shape.medium,
            cursor: 'pointer',
            justifyContent: expanded ? 'flex-start' : 'center',
            transition: 'background-color 200ms ease-in-out',
            '&:hover': { backgroundColor: `rgba(90, 75, 254, ${m3.stateLayer.hover})` },
          }}
        >
          <Avatar sx={{ width: 36, height: 36, bgcolor: m3.color.primaryContainer, color: m3.color.onPrimaryContainer, fontWeight: 600, fontSize: '0.875rem' }}>P</Avatar>
          {expanded && (
            <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Phùng Bích Hằng</Typography>
              <Typography variant="caption" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: m3.color.onSurfaceVariant }}>hangpb@tcbs.com.vn</Typography>
            </Box>
          )}
          {expanded && <UnfoldMoreIcon fontSize="small" sx={{ color: m3.color.onSurfaceVariant }} />}
        </Box>
      </Box>
    </Box>
  );
}
