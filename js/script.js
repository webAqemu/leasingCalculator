document.addEventListener("DOMContentLoaded", () => {
  // заносим дефолтные значения в инпуты
  const inputPercent = document.querySelector(".calc__price--percent input");
  const inputDate = document.querySelector(".calc__price--date input");
  inputPercent.value = 30;
  inputDate.value = 30;
  // добавляем обновление слайдера и платежа при изменении инпутов
  // document.querySelector(".calc__price--percent input").addEventListener("change", function () {
  //   leasingCalc();

  //   percentSlider.noUiSlider.set(inputPercent.value);
  // });
  // предотвращение отправки при нажатии enter
  window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") e.preventDefault();
  });
  document.addEventListener("keyup", function (e) {
    percentSlider.noUiSlider.set(inputPercent.value);
    dateSlider.noUiSlider.set(inputDate.value);
    leasingCalc();
  });
  // функция красивого вывода чисел (3500000 -> 3 500 000)
  const beautyNum = function (num, element) {
    const k = (num + "").length % 3;
    const str = `${num}`;
    let newNum = "";
    let flag = false;
    if ((num + "").length >= 4) {
      for (let i = 0; i < k; i++) {
        newNum += `${str[i]}`;
        flag = true;
      }
      for (let i = 0; i < (num + "").length - k; i++) {
        if (i % 3 == 0 || flag) {
          newNum += " ";
          flag = false;
        }
        newNum += `${str[i + k]}`;
        //console.log(newNum);
      }
    } else {
      newNum = num;
    }
    element.innerHTML = newNum;
  };
  // функция составления итогового ежемесячного платежа
  const leasingCalc = function () {
    const fullPrice = +document.querySelector(".calc__price--main span").innerHTML.split(" ").join("");
    //console.log(fullPrice);
    const prePayment = +document.querySelector(".calc__price--percent input").value / 100;
    //console.log(prePayment);
    const time = +document.querySelector(".calc__price--date input").value;
    //console.log(time);
    const percents = +document.querySelector("#finalPercent span").innerHTML / 100;
    //console.log(percents);
    const C = fullPrice - fullPrice * prePayment;
    //console.log(C);
    const B = percents / 12;
    //console.log(B);
    const monthlyPayment = Math.floor((C * B) / (1 - 1 / (1 + B) ** time));
    // выводим месячный платеж
    if (monthlyPayment == "Infinity") {
      console.log("Неверный входные данные");
    } else {
      //document.querySelector(".calc__pricePerMounth span").innerHTML = monthlyPayment;
      beautyNum(monthlyPayment, document.querySelector(".calc__pricePerMounth span"));
      // рассчитываем сумму по договору и выводим ее
      const finalFullPrice = monthlyPayment * time + (fullPrice - C);
      //document.querySelector("#finalSum span").innerHTML = finalFullPrice;
      beautyNum(finalFullPrice, document.querySelector("#finalSum span"));
      // рассчитываем годовое удорожание
      const yearUp = Math.floor(((finalFullPrice - fullPrice) / fullPrice / (time / 12)) * 100);
      //document.querySelector("#finalYearUp span").innerHTML = yearUp;
      beautyNum(yearUp, document.querySelector("#finalYearUp span"));
      // рассчитываем налоговую экономию
      const due = Math.floor((finalFullPrice - fullPrice) * 0.2);
      //document.querySelector("#finalDue span").innerHTML = due;
      beautyNum(due, document.querySelector("#finalDue span"));
    }
  };

  // выбираем модель
  document.querySelector(".calc__options").addEventListener("click", function (e) {
    document.querySelector(".calc__options").classList.toggle("open");
    if (e.target.classList.contains("calc__option")) {
      const price = document.querySelector(".calc__price--main span");
      const newItem = e.target;
      const curItem = document.querySelector(".calc__option--choosed");
      curItem.innerHTML = newItem.innerHTML;
      curItem.dataset.price = newItem.dataset.price;
      beautyNum(newItem.dataset.price, price);
      leasingCalc();
    }
  });

  // создаем слайдеры
  const percentSlider = document.getElementById("percent");
  const dateSlider = document.getElementById("date");

  noUiSlider.create(percentSlider, {
    start: 30,
    behaviour: "snap",
    connect: [true, false],
    step: 5,
    range: {
      min: 20,
      max: 90,
    },
    pips: {
      mode: "values",
      values: [20, 90],
      density: 70,
    },
    format: {
      to: function (value) {
        return parseInt(value);
      },
      from: function (value) {
        return parseInt(value);
      },
    },
  });
  noUiSlider.create(dateSlider, {
    start: 30,
    behaviour: "snap",
    connect: [true, false],
    step: 6,
    range: {
      min: 12,
      max: 36,
    },
    pips: {
      mode: "values",
      values: [12, 36],
      density: 100,
    },
    format: {
      to: function (value) {
        return parseInt(value);
      },
      from: function (value) {
        return parseInt(value);
      },
    },
  });

  leasingCalc();

  // собираем данные со слайдеров при изменении значения на них
  percentSlider.noUiSlider.on("slide", function (value) {
    const percentShow = document.querySelector(".calc__price--percent input");
    percentShow.value = value[0];
    leasingCalc();
  });
  dateSlider.noUiSlider.on("slide", function (value) {
    const dateShow = document.querySelector(".calc__price--date input");
    dateShow.value = value[0];
    leasingCalc();
  });
});
