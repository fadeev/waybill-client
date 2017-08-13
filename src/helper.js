function day_month(date) {
  if (!date) return ''
  let monthList = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
  let day = date.substring(0,10).split('-')[2]
  let month = monthList[+date.substring(0,10).split('-')[1]-1]
  return `${day}, ${month}`
}

export { day_month }