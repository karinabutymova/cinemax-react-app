export const DateFormat = (film, setToDateRent) => {
   let monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"];

   let dateStr = '';
   if (new Date(film.from_rent_date) <= new Date()) {
      let dateDay = new Date(film.to_rent_date).getDate().toString();
      let dateMounth = monthNames[new Date(film.to_rent_date).getMonth().toString()];
      dateStr = 'до ' + dateDay + ' ' + dateMounth;
   } else {
      let dateDay = new Date(film.from_rent_date).getDate().toString();
      let dateMounth = monthNames[new Date(film.from_rent_date).getMonth().toString()];
      dateStr = 'c ' + dateDay + ' ' + dateMounth;
   }

   setToDateRent(dateStr);
}