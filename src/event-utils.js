let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: "2022-03-30T09:00:00",
    allDay: true,
    extendedProps: {
      department: "BioChemistry",
    },
    description: "Lecture",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
