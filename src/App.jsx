import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './config/theme';
import Layout from './components/common/Layout';
import TimelineChart from './components/Timeline/TimelineChart';
import timelineData from './data/data.json';
import usersData from './data/users.json';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <TimelineChart
          data={timelineData}
          users={usersData.users}
        />
      </Layout>
    </ThemeProvider>
  );
}

export default App;