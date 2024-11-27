import { USER_COLORS } from '../constants/colors';

export const formatTimelineData = (data, users) => {
  return data.finalSchedule.map((schedule, index) => ({
    id: index,
    group: schedule.userId,
    start: new Date(schedule.startDate),
    end: new Date(schedule.endDate),
    content: users.find(user => user.id === schedule.userId)?.name || '',
    style: `background-color: ${USER_COLORS[schedule.userId]}`
  }));
};