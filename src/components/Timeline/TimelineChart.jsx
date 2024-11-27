import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Box,
  Paper,
  useTheme,
} from "@mui/material";
import { Timeline as VisTimeline, DataSet } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";
import {
  startOfMonth,
  endOfMonth,
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import TimelineControls from "./TimelineControls";
import TimelineHeader from "./TimelineHeader";
import data from "../../data/data.json";
import usersData from "../../data/users.json";
import { USER_COLORS } from "../../constants/colors";

const TimelineChart = () => {
  const theme = useTheme();
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const visTimelineRef = useRef(null);
  const containerRef = useRef(null);

  // Function of Groups
  const groups = useMemo(() => {
    return new DataSet([
      {
        id: "layer0",
        content: "Layers",
        style: `background-color: ${theme.palette.background.paper};
                padding: 8px;
                font-weight: bold;
                height: 70px;
                line-height: 60px;`,
      },
      {
        id: "layer1",
        content: "Layer 1",
        style: `background-color: ${theme.palette.background.paper};
                padding: 8px;
                font-weight: bold;
                height: 70px;
                line-height: 60px;`,
      },
      {
        id: "layer2",
        content: "Layer 2",
        style: `background-color: ${theme.palette.background.paper};
                padding: 8px;
                font-weight: bold;
                height: 70px;
                line-height: 60px;`,
      },
      {
        id: "overrideLayer",
        content: "Override Layer",
        style: `background-color: ${theme.palette.background.paper};
                padding: 8px;
                font-weight: bold;
                height: 70px;
                line-height: 60px;`,
      },
      {
        id: "finalSchedule",
        content: "Final Schedule",
        style: `background-color: ${theme.palette.background.paper};
                padding: 8px;
                font-weight: bold;
                height: 70px;
                line-height: 60px;`,
      },
    ]);
  }, [theme]);

  // Function of Item Style and Content
  const items = useMemo(() => {
    if (!data) {
      console.error("Invalid data structure:", data);
      return new DataSet([]);
    }

    const allItems = [];

    const createTimelineItem = (schedule, layerGroup, index) => {
      const userId = schedule.userId;
      const user = usersData.users.find((user) => user.id === userId);
      const userColor = user ? USER_COLORS[userId] : "#ccc";
      const userName = user ? user.name : `User ${userId}`;

      return {
        id: `${layerGroup}-${index}`,
        group: layerGroup,
        start: new Date(schedule.startDate),
        end: new Date(schedule.endDate),
        content: userName,
        className: `timeline-item ${layerGroup}-item`,
        style: `
        background-color: ${userColor}; 
        color: black; 
        border-radius: 4px; 
        padding: 2px 4px;
        border: none;
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bold;
        font-size: 1rem;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        pointer-events: none;
        `,
      };
    };

    if (data.layers?.[0]?.layers) {
      data.layers[0].layers.forEach((schedule, index) => {
        allItems.push(createTimelineItem(schedule, "layer1", index));
      });
    }

    if (data.layers?.[1]?.layers) {
      data.layers[1].layers.forEach((schedule, index) => {
        allItems.push(createTimelineItem(schedule, "layer2", index));
      });
    }

    if (data.overrideLayer) {
      data.overrideLayer.forEach((schedule, index) => {
        allItems.push(createTimelineItem(schedule, "overrideLayer", index));
      });
    }

    if (data.finalSchedule) {
      data.finalSchedule.forEach((schedule, index) => {
        allItems.push(createTimelineItem(schedule, "finalSchedule", index));
      });
    }

    return new DataSet(allItems);
  }, []);

  const getTimeRange = useCallback(() => {
    const now = currentDate;
    switch (view) {
      case "month":
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
        };
      case "2week":
        return {
          start: startOfDay(subDays(now, 7)),
          end: endOfDay(addDays(now, 7)),
        };
      case "week":
        return {
          start: startOfWeek(now),
          end: endOfWeek(now),
        };
      case "2day":
        return {
          start: startOfDay(now),
          end: endOfDay(addDays(now, 1)),
        };
      case "day":
        return {
          start: startOfDay(now),
          end: endOfDay(now),
        };
      default:
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
        };
    }
  }, [view, currentDate]);

  const handleToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const handleNext = useCallback(() => {
    switch (view) {
      case "month":
        setCurrentDate(addDays(currentDate, 30));
        break;
      case "2week":
        setCurrentDate(addDays(currentDate, 14));
        break;
      case "week":
        setCurrentDate(addDays(currentDate, 7));
        break;
      case "2day":
        setCurrentDate(addDays(currentDate, 2));
        break;
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
      default:
        setCurrentDate(addDays(currentDate, 1));
    }
  }, [view, currentDate]);

  const handlePrevious = useCallback(() => {
    switch (view) {
      case "month":
        setCurrentDate(subDays(currentDate, 30));
        break;
      case "2week":
        setCurrentDate(subDays(currentDate, 14));
        break;
      case "week":
        setCurrentDate(subDays(currentDate, 7));
        break;
      case "2day":
        setCurrentDate(subDays(currentDate, 2));
        break;
      case "day":
        setCurrentDate(subDays(currentDate, 1));
        break;
      default:
        setCurrentDate(subDays(currentDate, 1));
    }
  }, [view, currentDate]);

  const options = useMemo(
    () => {
      const getTimeAxisConfig = () => {
        switch (view) {
          case 'month':
            return {
              scale: 'day',
              step: 1,
              format: {
                minorLabels: { day: 'D' },
                majorLabels: { day: 'MMMM YYYY' }
              }
            };
          case 'week':
            return {
              scale: 'day',
              step: 1,
              format: {
                minorLabels: { day: 'D (ddd)' },
                majorLabels: { day: 'MMMM YYYY' }
              }
            };
          case '2week':
            return {
              scale: 'day',
              step: 1,
              format: {
                minorLabels: { day: 'D (ddd)' },
                majorLabels: { day: 'MMMM YYYY' }
              }
            };
          case 'day':
          case '2day':
            return {
              scale: 'hour',
              step: 2,
              format: {
                minorLabels: { hour: 'HH:mm' },
                majorLabels: { hour: 'ddd D MMMM' }
              }
            };
          default:
            return {
              scale: 'day',
              step: 1
            };
        }
      };

      const timeAxisConfig = getTimeAxisConfig();

      return {
        width: "100%",
        showMajorLabels: true,
        showCurrentTime: true,
        zoomable: false,
        type: "range",
        selectable: false,
        editable: false,
        multiSelect: false,
        orientation: { axis: "top" },
        margin: {
          item: {
            horizontal: 0,
            vertical: 5,
          },
          axis: 0,
        },
        verticalScroll: true,
        horizontalScroll: true,
        timeAxis: {
          scale: timeAxisConfig.scale,
          step: timeAxisConfig.step
        },
        ...getTimeRange(),
        format: {
          minorLabels: timeAxisConfig.format.minorLabels,
          majorLabels: timeAxisConfig.format.majorLabels
        },
      };
    },
    [view, getTimeRange]
  );

  const handleViewChange = useCallback((newView) => {
    setView(newView);
  }, []);

  useEffect(() => {
    if (containerRef.current && items.length > 0 && groups.length > 0) {
      if (visTimelineRef.current) {
        visTimelineRef.current.destroy();
      }

      visTimelineRef.current = new VisTimeline(
        containerRef.current,
        items,
        groups,
        options
      );
    }

    return () => {
      if (visTimelineRef.current) {
        visTimelineRef.current.destroy();
        visTimelineRef.current = null;
      }
    };
  }, [items, groups, options]);


  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .vis-item {
        pointer-events: none !important;
        user-select: none;
      }
  
      .vis-item.vis-selected {
        background-color: inherit !important;
        border: none !important;
        box-shadow: none !important;
      }
  
      .vis-timeline {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .vis-time-axis {
        text-align: center;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        <TimelineControls
          onNext={handleNext}
          onPrevious={handlePrevious}
          onToday={handleToday}
        />

        <TimelineHeader currentView={view} onViewChange={handleViewChange} />
      </Box>

      <Box
        ref={containerRef}
        sx={{
          "& .vis-timeline": {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          },
          "& .vis-item": {
            fontSize: "0.875rem",
            borderRadius: theme.shape.borderRadius,
          },
          "& .vis-time-axis .vis-grid.vis-minor": {
            borderWidth: "1px",
          },
          "& .vis-time-axis .vis-grid.vis-major": {
            borderWidth: "1px",
          },
          "& .vis-labelset .vis-label": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }}
      />
    </Paper>
  );
};

export default TimelineChart;
