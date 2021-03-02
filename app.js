const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// делаем запрос на наш внутренний файл date.js, экспортируем данные от этого файла
const date = require(__dirname + "/date.js");

// создаем массив данных куда будет добавляться наш список задач
let items = [" Weak Up "];
// создаем массив данных куда будет добавляться наш список задач по работе
let workItems = [];


// используем шаблонизатор ejs с express. Нельзя забывать что нужно использовать строго после
// декларирования express, то есть внизу переменной app
// инфо: https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){

    // здесь мы передаем переменной day данные которую получим
    // через переменную date в куда мы экспортировали данные с файла date.js
    // !важно!: если мы просто укажем date то он посчитает что это как бы название функции и нам вернется только
    // информация о том что это вызов функции. Чтобы наша переменная возвратила работающую функцию мы переменной
    // date добавляем скобки + если у нас будут  экспортироваться больше одной функции то мы должны указать его
    // specific name через точку
    const day = date.getDate();

    //let day = date.getDay();

    // В параметр render я передаю сперва файл с которым нудно связаться(в нашем случае list.ejs файл, лежит в папке views)
    // затем передаю параметры объекта, ключ = с каким ключевым словом связаться(<%= kindOfDay %>),
    //  а значение берем от нашей переменной day
    // наши вторые данные в ключе newListItems напишем здесь для renderинга
    res.render("list",{listTitle: day, newListItems: items});

});


app.post("/",function(req,res){

  //в переменную item закладываем данные о newItem с HTML файла который постит данные пользователя
  const item = req.body.newItem;

  // Здесь мы говорим что если пользователь перейдет на страницу work,
  // и будет добавлять данные, то эти данные не перейдут на главную страницу,
  // и эти данные будут прибавляться непосредственно на странице work
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    // добавляем эти данные в наш список
    items.push(item);
    // поскольку нам нельзя использовать redirect два раза, мы перенапрвляем наши данные в главный файл
    res.redirect("/");
  }



});


app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work List", newListItems: workItems});
});


app.get("/about",function(req,res){
  res.render("about");
})

/*app.post("/work",function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});*/


app.listen(3000,function(){
  console.log("3000 done");
});
