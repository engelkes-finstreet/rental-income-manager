import { RentPeriod } from "db"

const germanMonths: string[] = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
]

function getGermanMonthName(monthNumber: number): string | undefined {
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("Invalid month number. It must be between 1 and 12.")
  }

  return germanMonths[monthNumber - 1]
}

export function rentPeriodToString(rentPeriod: RentPeriod): string {
  const monthName = getGermanMonthName(rentPeriod.month)

  return `${monthName} ${rentPeriod.year}`
}
