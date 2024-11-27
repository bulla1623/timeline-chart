import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import { TIME_VIEWS } from '../../constants/timeViews';

const TimelineHeader = ({ currentView, onViewChange }) => {
  return (
    <ButtonGroup>
      {TIME_VIEWS.map(view => (
        <Button
          key={view.value}
          onClick={() => onViewChange(view.value)}
          variant={currentView === view.value ? 'contained' : 'outlined'}
        >
          {view.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TimelineHeader;