const title = "javascript_course";
const screens = "Простые, Сложные, Интерактивные";
let screenPrice = 20000;
let rollback = 15;
let fullPrice = 100_000; // удобный формат записи больших чисел :)
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость вёрстки экрана: " + screenPrice + " руб");
console.log("Стоимость разработки сайта: " + fullPrice + " руб");

console.log(screens.toLowerCase().split(", "));

console.log("Процент посреднику: " + fullPrice * (rollback / 100) + " руб");
