export const services = {
  extension: [
    { label: "Классика", price: "750₽" },
    { label: "1.5D", price: "900₽" },
    { label: "2D", price: "1000₽" },
  ],
  removal: [
    { label: "Без последующего наращивания", price: "200₽" },
    { label: "С последующим наращиванием", price: "БЕСПЛАТНО" },
  ],
  extra: [
    { label: "Мокрый эффект", price: "+200₽" },
    { label: "Лучи", price: "+200₽" },
    { label: "Цветные ресницы/вставки", price: "+200₽" },
  ],
  // lamination: [
  //   { label: "Ламинирование без окрашивания", price: "800₽" },
  //   { label: "Ламинирование с окрашиванием", price: "900₽" },
  //   { label: "Окрашивание ресниц", price: "200₽" },
  // ],
  correction: [{ label: "Коррекция ресниц", price: "400₽ - 500₽" }],
  // discount: [{ label: "Приведи подругу и получи скидку 10% на любую одну услугу", price: "" }],
};

export const sectionTitles: Record<keyof typeof services, string> = {
  extension: "Наращивание ресниц",
  removal: "Снятие ресниц",
  extra: "Дополнительные эффекты",
  // lamination: "Ламинирование и окрашивание",
  correction: "Коррекция ресниц",
  // discount: "Скидки",
};
