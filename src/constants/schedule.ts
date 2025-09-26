export const rules: Record<
  number,
  Record<number, { startHour: number; allowed: string[] | "all" }>
> = {
  1: {
    0: {
      startHour: 19,
      allowed: ["Снятие ресниц", "Ламинирование ресниц", "Окрашивание ресниц"],
    },
    1: {
      startHour: 20,
      allowed: ["Снятие ресниц", "Окрашивание ресниц"],
    },
    2: { startHour: 18, allowed: "all" },
    3: { startHour: 14, allowed: "all" },
    4: { startHour: 14, allowed: "all" },
    5: { startHour: 16, allowed: "all" },
    6: { startHour: 14, allowed: "all" },
  },
  2: {
    0: { startHour: 18, allowed: "all" },
    1: {
      startHour: 20,
      allowed: ["Снятие ресниц", "Окрашивание ресниц"],
    },
    2: {
      startHour: 20,
      allowed: ["Снятие ресниц", "Окрашивание ресниц"],
    },
    3: { startHour: 14, allowed: "all" },
    4: { startHour: 18, allowed: "all" },
    5: { startHour: 14, allowed: "all" },
    6: { startHour: 14, allowed: "all" },
  },
};
