export function getXForDay(state, day, x) {
  const dayObj = state.days.find(days => days.name === day);
  if (!dayObj) return [];
  const result = dayObj[x].map(index => {
    return state[x][index];
  });
  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  };

  return result;
}
