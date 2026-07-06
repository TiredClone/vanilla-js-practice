const items = document.querySelectorAll(".countdown-item > h4");
const countdownElement = document.querySelector(".countdown");

//назначаем дату отсчёта

let countdownDate = new Date(2026, 11, 18, 10, 0, 0).getTime();

function getCountDownTime() {
  //Получить текущее время
  const now = new Date().getTime();
  //Найти разницу времени
  const distance = countdownDate - now;

  //1с - 1000мс

  //Создаём переменные в милисекундах
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  //Подсчёт для дней, часов и секунд
  let days = Math.floor(distance / oneDay);
  let hours = Math.floor((distance % oneDay) / oneHour);
  let minutes = Math.floor((distance % oneHour) / oneMinute);
  let seconds = Math.floor((distance % oneMinute) / 1000);

  //Создаём массив с переменными

  const values = [days, hours, minutes, seconds];
  console.log(values);

  //Добавляем значения переменных на страницу
  items.forEach(function (item, index) {
    item.textContent = values[index];
  });

  if(distance < 0){
    clearInterval(countdown);
    countdownElement.innerHTML = "<h4 class='expired'>Время вышло</h4>"
  }
}

//Обновление счётчика каждую секунду
let countdown = setInterval(getCountDownTime, 1000);

getCountDownTime()
