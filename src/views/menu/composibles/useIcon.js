
import { IconList } from '../../../plugins/icons.js';

export const useIcon = () => {
  const querySearch = (queryString, cb) => {
    const results = queryString ? IconList.filter(item => item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0) : IconList
    cb(results)
  }
  
  return {
    querySearch
  }
}