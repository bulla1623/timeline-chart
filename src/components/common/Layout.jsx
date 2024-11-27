import React from 'react';
import { Container, Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 10 }}>
        {children}
      </Box>
    </Container>
  );
};

export default Layout;