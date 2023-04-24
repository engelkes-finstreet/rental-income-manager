import { Building } from "db"

export function getBuildingName(building: Building) {
  return `${building.street} ${building.number} ${building.city}`
}
