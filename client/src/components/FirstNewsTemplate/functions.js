export const DateFormat = (created_at, setNewsCreatedate) => {
   let monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"];

   let dateStr = '';
   let dateDay = new Date(created_at).getDate().toString();
   let dateMounth = monthNames[new Date(created_at).getMonth().toString()];
   let dateYear = new Date(created_at).getFullYear().toString();
   let dateTime = created_at.split('T')[1].substring(0, 5);
   dateStr = dateDay + ' ' + dateMounth + ' ' + dateYear + ' в ' + dateTime;

   setNewsCreatedate(dateStr);
}