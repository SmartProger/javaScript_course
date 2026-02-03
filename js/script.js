"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input[type='range']");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

const range = document.querySelector(".rollback input[type='range']");
const rangeSpan = document.querySelector(".rollback .range-value");

let screens = document.querySelectorAll(".screen");
const appData = {
  title: "",
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    this.addTitle();
    startBtn.addEventListener("click", this.start);
    buttonPlus.addEventListener("click", this.addScreenBlock);
    range.addEventListener("input", this.changeRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    // this будет кнопкой из-за addEventListener
    // поэтому здесь appData
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    // appData.logger();
  },
  showResult: function () {
    const selectedScreens = document.querySelectorAll(".screen select[name='views-select']");
    const selectedValues = document.querySelectorAll(".screen input[type='text']");

    let required = 0;
    selectedScreens.forEach((item) => {
      if (item.selectedIndex == 0) {
        required += 1;
      }
    });
    selectedValues.forEach((item) => {
      if (item.value == 0) {
        required += 1;
      }
    });
    if (required > 0) {
      alert("Заполните все типы экранов и их количество!");
      return;
    }

    selectedScreens.forEach((item) => {
      item.disabled = true;
    });
    selectedValues.forEach((item) => {
      item.disabled = true;
    });

    startBtn.style.display = "none";
    resetBtn.style.display = "block";

    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });

      this.screensCount += +input.value;
    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  changeRollback: function () {
    // this будет input из-за addEventListener
    // поэтому здесь appData
    rangeSpan.textContent = range.value + "%";
    appData.rollback = range.value;
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    for (screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += (this.screenPrice * this.servicesPercent[key]) / 100;
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);

    totalCount.value = this.screensCount;
  },
  logger: function () {
    console.log(this);
  },
};

appData.init();
