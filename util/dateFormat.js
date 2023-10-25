export function getDayAndMonth(dayDate) {
  const parts = dayDate.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
    const day = parseInt(parts[2], 10);

    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const date = new Date(year, month, day);
      const formattedDay = getOrdinal(day);
      const formattedMonth = date.toLocaleString("default", { month: "short" });
      return `${formattedDay} ${formattedMonth}`;
    }
  }
  return "Invalid Date";
}

export function getDayMonthAndYear(dayDate) {
  const parts = dayDate.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
    const day = parseInt(parts[2], 10);

    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const date = new Date(year, month, day);
      const formattedDay = getOrdinal(day);
      const formattedMonth = date.toLocaleString("default", { month: "short" });
      const formattedYear = year.toString();
      return `${formattedDay} ${formattedMonth} ${formattedYear}`;
    }
  }
  return "Invalid Date";
}


function getOrdinal(n) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}
