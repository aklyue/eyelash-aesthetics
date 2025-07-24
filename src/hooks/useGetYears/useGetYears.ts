export const useGetYears = () => {
  function getAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const isBeforeBirthday =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());

    if (isBeforeBirthday) {
      age--;
    }

    return age;
  }

  function getExperience(startDate: Date): number {
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    const isBeforeStart =
      today.getMonth() < startDate.getMonth() ||
      (today.getMonth() === startDate.getMonth() &&
        today.getDate() < startDate.getDate());

    if (isBeforeStart) {
      years--;
    }

    return years;
  }

  function formatAge(num: number): string {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `${num} год`;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
      return `${num} года`;
    return `${num} лет`;
  }

  function formatExperience(num: number): string {
    const mod10 = num % 10;
    const mod100 = num % 100;

    if (mod10 === 1 && mod100 !== 11) return `${num} года`;
    return `${num} лет`;
  }

  const birthDate = new Date(2006, 8, 25);
  const startDate = new Date(2024, 6, 10);
  const age = formatAge(getAge(birthDate));
  const experience = formatExperience(getExperience(startDate));

  return { age, experience };
};
