"use strict";

let rollback = 20;
let adaptive;

alert("Hello, JS!");
console.log("Here we go!");

/* lesson03 */

let title = prompt("Как называется ваш проект?");
console.log(title);

let screens = prompt("Какие типы экранов нужно разработать?");
console.log(screens);

let screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
console.log(screenPrice);

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");

let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

console.log("услуга " + service1 + " будет стоить " + servicePrice1);

console.log("услуга " + service2 + " будет стоить " + servicePrice2);

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.round((fullPrice * (100 - rollback)) / 100);

console.log(servicePercentPrice);

if (fullPrice >= 30000) {
  console.log("Даём скидку 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даём скидку 5%");
} else if (fullPrice > 0 && fullPrice < 15000) {
  console.log("Даём скидку 5%");
} else if (fullPrice <= 0) {
  console.log("Что-то пошло не так");
}

/* end lesson03 */
