document.addEventListener("DOMContentLoaded", () => {
  // функция составления итогового ежемесячного платежа
  const leasingCalc = function () {
    const fullPrice = +document.querySelector(".calc__price--main span").innerHTML;
    console.log(fullPrice);
    const prePayment = +document.querySelector(".calc__price--percent span").innerHTML / 100;
    console.log(prePayment);
    const time = +document.querySelector("#date .noUi-handle").getAttribute("aria-valuetext");
    console.log(time);
    const percents = +document.querySelector("#finalPercent span").innerHTML / 100;
    console.log(percents);
    const C = fullPrice - fullPrice * prePayment;
    console.log(C);
    const B = percents / 12;
    console.log(B);
    const monthlyPayment = Math.floor((C * B) / (1 - 1 / (1 + B) ** time));
    // выводим месячный платеж
    document.querySelector(".calc__pricePerMounth span").innerHTML = monthlyPayment;
    // рассчитываем сумму по договору и выводим ее
    const finalFullPrice = monthlyPayment * time + (fullPrice - C);
    document.querySelector("#finalSum span").innerHTML = finalFullPrice;
    // рассчитываем годовое удорожание
    const yearUp = Math.floor(((finalFullPrice - fullPrice) / fullPrice / (time / 12)) * 100);
    document.querySelector("#finalYearUp span").innerHTML = yearUp;
    // рассчитываем налоговую экономию
    const due = Math.floor((finalFullPrice - fullPrice) * 0.2);
    document.querySelector("#finalDue span").innerHTML = due;
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
      price.innerHTML = newItem.dataset.price;
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
  percentSlider.noUiSlider.on("change", function (value) {
    const percentShow = document.querySelector(".calc__price--percent span");
    percentShow.innerHTML = value[0];
    leasingCalc();
  });
  dateSlider.noUiSlider.on("change", function (value) {
    const date = value[0];
    console.log(date);
    leasingCalc();
  });
});
