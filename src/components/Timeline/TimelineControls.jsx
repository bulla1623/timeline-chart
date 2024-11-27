import React from 'react';
import { Button, Stack } from '@mui/material';

const TimelineControls = ({ view, setView, onNext, onPrevious, onToday }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Button
        variant="outlined"
        onClick={onToday}
        sx={{ minWidth: '80px' }}
      >
        Today
      </Button>
      <Button
        variant="outlined"
        onClick={onPrevious}
        sx={{ minWidth: '40px' }}
      >
        &lt;
      </Button>
      <Button
        variant="outlined"
        onClick={onNext}
        sx={{ minWidth: '40px' }}
      >
        &gt;
      </Button>
    </Stack>
  );
};

export default TimelineControls;