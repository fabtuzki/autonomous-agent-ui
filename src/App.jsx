import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import { DataProvider, useData } from './DataContext';
import GlobalNav from './components/GlobalNav';
import MainArea from './components/MainArea';

const AppContent = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <GlobalNav />
      <MainArea />
    </Box>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataProvider>
        <AppContent />
      </DataProvider>
    </ThemeProvider>
  );
}
