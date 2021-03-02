
// Вся информация как экспортировать с одного js файла в другой js:
// info: https://nodejs.org/dist/latest-v15.x/docs/api/modules.html#modules_module

// при случае когда мы должны экспортровать больше одной функции то просто exports = "something"
// и потом повторять этот код не получится, поскольку он должен вызваться один раза
// чтобы вызвать множество функций мы должны более подробно указывать имена наших экспортируемых файлов
// в самом module.exports, то есть через точку добавлять specific __dirname
// это можно увидеть случаем ниже         use anonymous functions

exports.getDate = function(){

  const today = new Date();

// https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
// создаем объект с данными
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

// даем переменной day формат того как нам нужно написать наши данные даты("en-US" и options)
  const day = today.toLocaleDateString("en-US",options);
  return day;
}



exports.getDay = function(){
  const today = new Date();

  const options = {
    weekday: "long",
  };

  const day = today.toLocaleDateString("en-US",options);
  return day;
}
