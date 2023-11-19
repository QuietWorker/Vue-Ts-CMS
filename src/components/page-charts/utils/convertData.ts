import { geoCoordinateMapData } from '../data/geoCoordMap'

export function convertData(data: any[]) {
  const res = []
  for (const item of data) {
    const geoCoordMap = geoCoordinateMapData[item.name]
    if (geoCoordMap) {
      res.push({
        name: item.name,
        value: [...geoCoordMap, item.value]
      })
    }
  }
  return res
}
