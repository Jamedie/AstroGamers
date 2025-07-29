export function getZodiacSign(month: number, day: number): string {
  const signs = [
    { name: "capricorne", start: [12, 22], end: [1, 19] },
    { name: "verseau", start: [1, 20], end: [2, 18] },
    { name: "poissons", start: [2, 19], end: [3, 20] },
    { name: "bélier", start: [3, 21], end: [4, 19] },
    { name: "taureau", start: [4, 20], end: [5, 20] },
    { name: "gémeaux", start: [5, 21], end: [6, 20] },
    { name: "cancer", start: [6, 21], end: [7, 22] },
    { name: "lion", start: [7, 23], end: [8, 22] },
    { name: "vierge", start: [8, 23], end: [9, 22] },
    { name: "balance", start: [9, 23], end: [10, 22] },
    { name: "scorpion", start: [10, 23], end: [11, 21] },
    { name: "sagittaire", start: [11, 22], end: [12, 21] },
  ];

  for (const sign of signs) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return sign.name;
    }
  }

  return "capricorne";
}
