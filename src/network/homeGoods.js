import instance from './requestGoods'

export function getGoods(tableName) {
  return instance.get(`api/${tableName}`)
}