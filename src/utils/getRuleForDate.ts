import { differenceInCalendarWeeks, getISODay } from "date-fns";
import { rules } from "../constants/schedule";

export function getRuleForDate(date: Date) {
  const weekday = getISODay(date) - 1;
  const scheduleStartDate = new Date(2025, 8, 22);

  const weekDiff = differenceInCalendarWeeks(date, scheduleStartDate);
  const scheduleWeekNumber = (((weekDiff % 2) + 2) % 2) + 1;

  const weekRules = rules[scheduleWeekNumber];
  return weekRules[weekday];
}
