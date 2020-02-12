export function getAppointmentsForDay(state, day) {
  const appoint = state.days.find(days => days.name === day);
  if (!appoint) return [];
  const result = appoint.appointments.map(index => {
    return state.appointments[index];
  });
  return result;
}
