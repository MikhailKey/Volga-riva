function RenderSvg() {
  function easySVG() {
      const svgArr = document.querySelectorAll('.svg');

      svgArr.forEach(function (svgItem) {
          const path = svgItem.dataset.src;
          replaceSvg(svgItem, path);
      })
  }

  function replaceSvg(elem, path) {
      if ('ActiveXObject' in window) {
          let IErequest = new ActiveXObject('MSXML2.XMLHTTP');
          IErequest.onReadyStateChange = function () {
              if (IErequest.readyState === 4 && IErequest.status === 200) {
                  const attr = elem.getAttribute('class');
                  const noSvgClassAttr = attr.slice(attr.indexOf('svg') + 3);

                  if (elem.parentNode) {
                      elem.insertAdjacentHTML('afterend', IErequest.responseText);

                      if (noSvgClassAttr.length) {
                          elem.nextSibling.setAttribute('class', noSvgClassAttr.trim());
                      }

                      elem.parentNode.removeChild(document.querySelector('.svg'));
                  }
              }
          }
          IErequest.open('GET', path);
          IErequest.send();

      } else {
          let request = new XMLHttpRequest();
          request.open('GET', path);
          request.addEventListener("readystatechange", () => {
              if (request.readyState === 4 && request.status === 200) {
                  const attr = elem.getAttribute('class');
                  const noSvgClassAttr = attr.slice(attr.indexOf('svg') + 3);

                  if (path && elem.parentNode) {
                      elem.insertAdjacentHTML('afterend', request.responseText);

                      if (noSvgClassAttr.length) {
                          elem.nextSibling.setAttribute('class', noSvgClassAttr.trim());
                      }
                  }
                  elem.remove();
              }
          });
          request.send();
      }
  }
  easySVG();
}
const arrowsForSlider = ['<div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/zaimy/arrow-left.svg"></div>', '<div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/zaimy/arrow-right.svg"></div>'];
//Адреса в контактах
let items = $('.connect-info-item');
//Переменные калькулятора
let timeValueSteps = [3, 6, 12, 24, 36];
let stavkaRef = 12;
let checkButton = $('.calc-item-checkbox__square');
let importanceButton = $('.saving-options__button');
let programButton = $('.saving-options__program');
let zaimyButton = $('.zaimy-banner-options__button');
const owlResponsiveSlider = (selector, params) => {
  $(selector).owlCarousel({
      loop: true,
      items: 3,
      navElement: 'button',
      navText: arrowsForSlider,
      nav: true,
      margin: 10,
      responsive: {
          0: {
              items: 1,
              nav: false,
          },
          600: {
              items: 2,
              nav: true,
          },
          1024: {
              items: 3,
          }
      },
      ...params
  })
}

function makeBodyVisible() {
  $('body').css('overflow', 'visible');
}

//Скрытие модального окна
function hideModal(...args) {
  let modalBg = $(args[0]);
  let modalContent = $(args[1]);
  $(document).mouseup(function (e) {
      if (modalBg.is(':visible')) {
          if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
              $(modalBg).fadeOut(250);
              makeBodyVisible();
          }
      }
  })
}

//Карты в разделе "Контакты"
function mapProcess(args) {
  let { mapButton,
      closeButton,
      townTitle,
      townStatus,
      townAdress,
      townWebsite,
      townFirstNumber,
      innerModal,
      townButton,
      townSecondNumber,
      modalTownButton
  } = args;

  function yandexMap(coordinates) {
      if ($("#map").length > 0) {
          ymaps.ready(function () {
              let description = '';
              //Добавляем изменение описания маркера при открытии адресов на вкладке "Контакты"
              switch (JSON.stringify(coordinates)) {
                  case '[51.531825572387724,46.01106200000002]':
                      description = 'Адрес: Ул. Советская 86/70';
                      break;
                  case '[51.498775094836816,46.11590139814754]':
                      description = 'ул. М. Горького, 28';
                      break;
                  case '[45.03911564913005,38.98481291104504]':
                      description = 'ул. Северная, 311/1, оф.19'
                      break;
                  case '[51.68371724420709,39.183256728835964]':
                      description = 'Московский пр., 7Е, оф. 226 (БЦ "Плаза")'
                      break;
                  case '[43.580503399147226,39.71970927116393]':
                      description = 'ул. Войкова, д.1/1, оф.23'
                      break;
                  case '[54.308244521039086,48.38772785273916]':
                      description = ' ул.Минаева 11 (ТРК СПАРТАК), оф.201'
                      break;
                  default:
                      description = 'ул. Революционная, 18';
              }
              var myMap = new ymaps.Map("map", {
                  center: coordinates,
                  zoom: 17,
                  "multiTouch": false,
                  controls: ['zoomControl']
              }, {
                  suppressMapOpenBlock: true
              });
              var myPlacemark = new ymaps.Placemark(coordinates, {
                  hintContent: description
              });
              myMap.geoObjects.add(myPlacemark);
              myMap.controls.remove('routeEditor');
              myMap.behaviors.disable('scrollZoom');
          });
      }
  }

  function sendAttributes(item) {
      $(townTitle).html(item.attr('data-town'));
      $(townStatus).html(item.attr('data-status'));
      $(townAdress).html(item.attr('data-adress'));
      if (item.attr('data-website').length) {
          $(townWebsite).html(item.attr('data-website'));
          $(townWebsite).attr('href', `https://${item.attr('data-website')}`)
      } else {
          $(townWebsite).html('')
      }
      $(townFirstNumber).html(item.attr('data-first-phone'));
      $(townSecondNumber).html(item.attr('data-second-phone'));
  }

  modalTownButton.each(function (i, button) {
      $(button).on('click', function () {
          sendAttributes($(this));
          let coordinates = JSON.parse($(this).attr('data-coordinates'));
          $('#map').empty();
          yandexMap(coordinates);
          $('.town-modal').fadeOut(250);
      })
  })

  function handleChangeAdress() {
      townButton.on('click', function () {
          $(innerModal).fadeIn(300);
      })
      if ($('.town-modal').length) {
          hideModal('.town-modal', '.town-modal');
      }
  }
  handleChangeAdress()



  mapButton.each(function (i, button) {
      $(button).on('click', function () {
          $('.connect-modal').fadeIn(250);
          $('body').css('overflow', 'hidden');

          sendAttributes($(this));
          let coordinates = JSON.parse($(this).attr('data-coordinates'));
          $('#map').empty();
          yandexMap(coordinates);
      })
  })

  $(closeButton).on('click', function () {
      $('.connect-modal').fadeOut(250);
      makeBodyVisible()
  })

  if ($('.town-modal').length) {
      hideModal('.connect-modal', '.connect-modal-container');
  }
}
//Запрос из какого города
function cityModal() {
  $('body').css('overflow', 'hidden');
  let cityModal = $('.city-modal');
  let closeCityButton = $('.city-modal-inside');
  let cityButtons = $('.city-modal-inside button');
  cityModal.fadeIn(1000);

  closeCityButton.on('click', '.city-close', function () {
      cityModal.fadeOut(250);
      $('body').css('overflow', 'visible');
  })

  cityButtons.each(function (index, elem) {
      $(elem).on('click', function () {
          cityModal.fadeOut(250);
          $('body').css('overflow', 'visible');
      })
  })

  function hideCityModal() {
      let innerModal = $('.city-modal-content')
      $(document).mouseup(function (e) {
          if (!innerModal.is(e.target)
              && innerModal.has(e.target).length === 0) {
              $(cityModal).fadeOut(250);
              $('body').css('overflow', 'visible');
          }
      });
  }
  hideCityModal()
}
//Формы Битрикс
function showBitrix() {
  let mainPageButton = $('.button-bitrix'),
      bitrixModal = $('.bitrix-container'),
      bitrixContent = $('.bitrix-content');
  mainPageButton.each(function (i, button) {
      $(button).on('click', function () {
          if (window.location.pathname === '/materinskiy-kapital/') {
              $(bitrixModal).fadeIn(250);
              $('#bx_form_iframe_13').show();
          } else if (window.location.pathname === '/') {
              if ($(this).html() === 'реализовать') {
                  $(bitrixModal).fadeIn(250);
                  $('#bx_form_iframe_10').hide();
                  $('#bx_form_iframe_15').hide();
                  $('#bx_form_iframe_13').show();
                  $('body').css('overflow', 'hidden');
              } else {
                  $(bitrixModal).fadeIn(250);
                  $('#bx_form_iframe_13').hide();
                  $('#bx_form_iframe_15').hide();
                  $('#bx_form_iframe_10').show();
                  $('body').css('overflow', 'hidden');
              }
          } else if (window.location.pathname === '/zaemshchikam/' || window.location.pathname === '/sberezheniya/' || window.location.pathname === '/contacts/') {
              $(bitrixModal).fadeIn(250);
              $('#bx_form_iframe_10').show();
              $('body').css('overflow', 'hidden');
          } else if (window.location.pathname === '/zaymyi-dlya-biznesa/') {
              $(bitrixModal).fadeIn(250);
              $('#bx_form_iframe_15').show();
              $('body').css('overflow', 'hidden');
          }
      })
  })

  $(document).mouseup(function (e) {
      if ($(bitrixModal).is(":visible")) {
          if (!bitrixContent.is(e.target) && bitrixContent.has(e.target).length === 0) {
              $(bitrixModal).fadeOut(250);
              makeBodyVisible()
          }
      }
  });
}

//Выбор города в верху навигации
function chooseTown() {
  let navButton = $('.navtown-item');
  let navConnectButton = $('.navigation-connect-wrap');
  let townModal = $('.navtop-modal');

  function closeModal() {
      townModal.fadeOut(100);
      navConnectButton.removeClass('navtop-open');
  }
  navButton.on('click', function () {
      closeModal()
      if ($(items).length) {
          changeAdress($(this).text())
      }
  })

  navConnectButton.on('click', function () {
      if ($(this).hasClass('navtop-open')) {
          closeModal()
      } else {
          closeModal()
          $(this).siblings(townModal).fadeIn(500);
          $(this).addClass('navtop-open');
      }
  })
  hideModal('.navtop-modal', '.navtop-modal');
}

//Изменение порядка адресов в Контактах
function changeAdress(pressedButton) {
  let orderClass = 'connect-info-item__order';
  items.each(function (i, item) {
      if ($(item).hasClass(orderClass)) {
          $(item).removeClass(orderClass);
      }
      if ($(item).find('h1').text().indexOf(pressedButton) > -1) {
          $(item).addClass(orderClass);
      }
  })
}
//Хранение данных об адресе в localStorage
function renderAdresses() {

  function makeLocalData(item) {
      let townData = {};
      townData.town = $(item).html();
      townData.adress = $(item).attr('data-adress');
      townData.firstPhone = $(item).attr('data-first-phone');
      townData.secondPhone = $(item).attr('data-second-phone');

      localStorage.setItem('townData', JSON.stringify(townData));
  }

  function getStorage() {
      let townData = JSON.parse(localStorage.getItem('townData')),
          firstPhone = $('.phone-first'),
          secondPhone = $('.phone-second'),
          adress = $('.adress-title'),
          town = $('.town-title');

      $(town).each(function (i, item) { $(item).html(townData.town) });
      if (townData.town === 'Другой') {
          $(town).eq(1).html('Саратов');
      }
      $(adress).each(function (i, item) { $(item).html(townData.adress) });
      $(firstPhone).each(function (i, item) { $(item).html(townData.firstPhone) });
      $(secondPhone).each(function (i, item) { $(item).html(townData.secondPhone) });
  }


  if (!localStorage.getItem('townData')) {
      cityModal()
  }

  let townButtons = $('.navtown-item');

  townButtons.each(function (index, button) {
      $(button).on('click', function () {
          makeLocalData($(this));
          getStorage()
      })
  })

  if (localStorage.getItem('townData')) {
      getStorage()
  }
}

function wordPressVideoSlider() {
  $('#sample_slider').find('a').attr('data-fancybox', 'gallery');
  $('.gallery-icon').find('a').attr('data-fancybox', 'gallery');
  let linksArr = [];
  linksArr.push($("div.sa_hover_container:contains('[embed]')"));
  linksArr.push($("p:contains('[embed]')"));
  linksArr[0].each(function (i, link) {
      let newString = $(link).html().replace('[embed]', '');
      newString = newString.replace('[/embed]', '');
      newString = newString.replace('<p>', '');
      newString = newString.replace('</p>', '');
      if (newString.indexOf('&') >= 0) {
          newString = newString.slice(0, newString.indexOf('&'));
      }
      newString = newString.replace('watch?v=', 'embed/');

      let newLink = `<iframe class="feedback-video" src="${newString}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`;
      $(link).html(newLink);
  })
}
//Отображение значения range inputa 
function switchInputs(summLabel, summRange, timeLabel, timeRange) {
  $(summRange).on('input', function () {
      $(summLabel).val($(summRange).val());
  })
  $(summLabel).on('input', function () {
      $(summRange).val($(summLabel).val());
  })
  $(timeRange).on('input', function () {
      for (let i = 0; i < timeValueSteps.length; i++) {
          if ($(timeRange).val() == i + 1) {
              $(timeLabel).val(timeValueSteps[i]);
          }
      }
  })
  $(timeLabel).on('input', function () {
      let labelVal = Number($(timeLabel).val());
      $(timeRange).val(timeValueSteps.indexOf(labelVal, 0) + 1);
  })
}

function setProgramResult(stavkaArr, nalog, fullSum) {
  let resultBlock = $('.calc-result__info');
  $(resultBlock).eq(0).html(stavkaArr + '%');
  $(resultBlock).eq(1).html(Math.round(nalog) + 'р.');
  $(resultBlock).eq(2).html(Math.round(fullSum) + 'р.');
}

function checkProgram() {
  if ($(checkButton).is(':checked')) {
      comfort()
  } else {
      dohod()
  }
}
$(checkButton).on('click', function () {
  removeActiveClasses('.saving-banner__title')
  checkProgram()
})
//с возможностью снятия
function comfort() {
  let comfortFullSumm = 0,
      comfortSummSber = $('.summ-value').val(),
      comfortMonth = $('.time-value').val(),
      percentArr;
  if (comfortSummSber >= 3000 && comfortSummSber <= 199999) {
      percentArr = [{
          monthArr: 3,
          stavkaArr: 3
      },
      {
          monthArr: 6,
          stavkaArr: 4
      },
      {
          monthArr: 12,
          stavkaArr: 6
      },
      {
          monthArr: 24,
          stavkaArr: 7.5
      },
      {
          monthArr: 36,
          stavkaArr: 8.5
      }];
  }
  else if (comfortSummSber >= 200000 && comfortSummSber <= 399999) {
      percentArr = [{
          monthArr: 3,
          stavkaArr: 4
      },
      {
          monthArr: 6,
          stavkaArr: 5
      },
      {
          monthArr: 12,
          stavkaArr: 7
      },
      {
          monthArr: 24,
          stavkaArr: 8.5
      },
      {
          monthArr: 36,
          stavkaArr: 9.5
      }];
  }
  else if (comfortSummSber >= 400000) {
      percentArr = [{
          monthArr: 3,
          stavkaArr: 5
      },
      {
          monthArr: 6,
          stavkaArr: 6
      },
      {
          monthArr: 12,
          stavkaArr: 8
      },
      {
          monthArr: 24,
          stavkaArr: 9.5
      },
      {
          monthArr: 36,
          stavkaArr: 10.5
      }];
  }
  let nalog;
  let stavkaArr;
  for (let i = 0; i < percentArr.length; i++) {
      if (comfortMonth == percentArr[i].monthArr) {
          comfortFullSumm = (+comfortSummSber / 100 * ((percentArr[i].stavkaArr) / 12 * comfortMonth));
          stavkaArr = percentArr[i].stavkaArr;
      }

      if (stavkaArr > stavkaRef) {
          let nalogDohod = (stavkaArr - (stavkaArr - stavkaRef) * 0.35) / 12 * comfortMonth / 100;
          let nalogDohodStavkaReff = comfortSummSber * nalogDohod;
          let nalog = comfortFullSumm - nalogDohodStavkaReff;
          comfortFullSumm = comfortFullSumm - nalog;
      } else {
          nalog = 0;
      }
      if (!stavkaArr) {
          stavkaArr = 0;
      }
      setProgramResult(stavkaArr, nalog, comfortFullSumm);
      $(programButton).eq(1).addClass('saving-options__program__active');
      $(importanceButton).eq(1).addClass('saving-options__button__active');
      $(checkButton).prop('checked', true);
  }
}
//без возможности снятия 
function dohod() {
  let dohodFullSumm = 0,
      dohodSummSber = $('.summ-value').val(),
      dohodMonth = $('.time-value').val(),
      percentArr;

  if (dohodSummSber >= 3000 && dohodSummSber <= 199999) {
      percentArr = [{
          monthArr: 3,
          stavkaArr: 4
      },
      {
          monthArr: 6,
          stavkaArr: 5
      },
      {
          monthArr: 12,
          stavkaArr: 9.5
      },
      {
          monthArr: 24,
          stavkaArr: 10
      },
      {
          monthArr: 36,
          stavkaArr: 11
      }];
  }
  else if (dohodSummSber >= 200000 && dohodSummSber <= 399999) {
      percentArr = [{
          monthArr: 3,
          stavkaArr: 5
      },
      {
          monthArr: 6,
          stavkaArr: 6
      },
      {
          monthArr: 12,
          stavkaArr: 10.5
      },
      {
          monthArr: 24,
          stavkaArr: 11
      },
      {
          monthArr: 36,
          stavkaArr: 12
      }];
  }
  else if (dohodSummSber >= 400000) {
      percentArr = [{
          monthArr: 3,
          stavkaArr: 7
      },
      {
          monthArr: 6,
          stavkaArr: 8
      },
      {
          monthArr: 12,
          stavkaArr: 11.5
      },
      {
          monthArr: 24,
          stavkaArr: 12
      },
      {
          monthArr: 36,
          stavkaArr: 12.5
      }];
  }
  let nalog;
  let stavkaArr;
  for (let i = 0; i < percentArr.length; i++) {
      if (dohodMonth == percentArr[i].monthArr) {
          dohodFullSumm = (+dohodSummSber / 100 * ((percentArr[i].stavkaArr) / 12 * dohodMonth));
          stavkaArr = percentArr[i].stavkaArr;
      }

      if (stavkaArr >= stavkaRef) {
          let nalogDohod = (stavkaArr - (stavkaArr - stavkaRef) * 0.35) / 12 * dohodMonth / 100;
          let nalogDohodStavkaReff = dohodSummSber * nalogDohod;
          nalog = dohodFullSumm - nalogDohodStavkaReff;
          dohodFullSumm = dohodFullSumm - nalog;
      } else {
          nalog = 0;
      }
      if (!stavkaArr) {
          stavkaArr = 0;
      }
      setProgramResult(stavkaArr, nalog, dohodFullSumm);
      $(programButton).eq(0).addClass('saving-options__program__active');
      $(importanceButton).eq(0).addClass('saving-options__button__active');
      $(checkButton).prop('checked', false);
  }
}

function removeActiveClasses(classTrigger) {
  if (classTrigger.length) {
      $(programButton).removeClass('saving-options__program__active');
      $(importanceButton).removeClass('saving-options__button__active');
  }
}

function calcProcedure(summLabel, summRange, timeLabel, timeRange) {
  let calcInputs = [$(summLabel), $(summRange), $(timeLabel), $(timeRange)];
  $(calcInputs).each(function (i, input) {
      $(input).on('input', function () {
          if ($('.calc-item').length) {
              checkProgram()
          } else {
              zaimyCalculator('.summ-value', '.time-value', '.zaimy-monthpayment', '.zaimy-endyear', zaimyButton);
          }
      })
  })
}

function chooseImportance() {
  $(importanceButton).on('click', function () {
      removeActiveClasses('.saving-banner__title');
      $(this).addClass('saving-options__button__active');
      if ($(this).html() === 'максимальный доход') {
          dohod()
      } else {
          comfort()
      }
  })
}

function chooseProgram() {
  $(programButton).on('click', function () {
      removeActiveClasses('.saving-banner__title');
      $(this).addClass('saving-options__program__active');
      if ($(this).html() === 'ПРОГРАММА «КОМФОРТ»') {
          comfort()
      } else {
          dohod()
      }
  })
}

function inputWindow(summLabel, timeLabel) {
  $(summLabel).on('input', function () {
      if ($(summLabel).val() < 0) {
          $(summLabel).val('0');
      } else if ($(summLabel).val() > 100000000) {
          $(summLabel).val('100000000');
      }
  })
  $(timeLabel).on('input', function () {
      if ($(timeLabel).val() < 0) {
          $(timeLabel).val('0');
      } else if ($(timeLabel).val() > 36) {
          $(timeLabel).val('36');
      }
      for (let i = 0; i < timeValueSteps.length; i++) {
          if ($(timeLabel).val() !== timeValueSteps[i]) {
              return;
          }
      }
  })
}
//Платить только проценты
function zaimyCalculator(summ, time, month, year, pressedButton) {
  let summValue = Number($(summ).val());
  let timeValue = Number($(time).val());
  let monthTypes = $(month);
  let yearTypes = $(year);

  $(yearTypes).each(function (i, year) {
      if ($(pressedButton).eq(0).hasClass('zaimy-banner-options__button__active')) {
          //Ежемесячно платим только %
          $(year).html(summValue);
      } else {
          //aннуитетный платеж
          $(year).html('0');
      }
  })

  $(monthTypes).each(function (i, month) {
      let monthPercent = Number($(month).attr('data-percent')) / 100;
      let monthPayment = 0;

      if ($(pressedButton).eq(0).hasClass('zaimy-banner-options__button__active')) {
          //Только проценты
          monthPayment = Math.round(summValue * (monthPercent) / timeValue);
      } else {
          //Аннуитетный платёж
          monthPayment = Math.round((summValue * monthPercent) / (1 - Math.pow((1 + monthPercent), -timeValue)));
      }
      $(month).html(monthPayment);
  })
}

function switchZaimyConditions() {
  $(zaimyButton).each(function (i, button) {
      $(button).on('click', function () {
          $(zaimyButton).removeClass('zaimy-banner-options__button__active');
          $(this).addClass('zaimy-banner-options__button__active');
          zaimyCalculator('.summ-value', '.time-value', '.zaimy-monthpayment', '.zaimy-endyear', zaimyButton);
      }
      )
  })
}



$(document).ready(function () {

  if ($('.button-bitrix').length) {
      showBitrix();
  }

  owlResponsiveSlider('.zaimy-carousel', params = {
      video: true,
      mouseDrag: false,
      autoplay: 3000,
      autoplaySpeed: 1500,
      autoplayHoverPause: true,
  })

  owlResponsiveSlider('.about-slider');

  $("#saving-slider").owlCarousel({
      loop: true,
      items: 1,
      animateOut: 'fadeOut',
      mouseDrag: false,
      autoHeight: true,
      autoplay: 1000,
      autoplaySpeed: 500,
  });

  mapProcess({
      mapButton: $('.connect-button'),
      closeButton: $('.connect-modal-scheme button'),
      townTitle: $('.town-modal-title'),
      townStatus: $('.connect-modal__status'),
      townAdress: $('.connect-modal__adress'),
      townWebsite: $('.connect-modal__link'),
      townFirstNumber: $('.connect-modal__phone__first'),
      innerModal: $('.town-modal'),
      townButton: $('.town-modal-wrap'),
      townSecondNumber: $('.connect-modal__phone__second'),
      modalTownButton: $('.town-modal__item')
  })
  if ($(items).length) {
      let townData = JSON.parse(localStorage.getItem('townData'));
      changeAdress(townData.town);
  }

  RenderSvg()
  chooseTown()
  renderAdresses()

  if ($('.navigation-bottom-list')[0]) {
      //Калькуляторы
      if ($('.calc-item-add').length) {
          inputWindow('.summ-value', '.time-value')
          switchInputs('.summ-value', '.summ-range', '.time-value', '.time-range');
          calcProcedure('.summ-value', '.summ-range', '.time-value', '.time-range');
          //Калькуляторы на главной и сбережениях
          if ($('.calc-item').length) {
              chooseImportance()
              chooseProgram()
          }
          //Калькулятор в займах
          if ($('.zaimy-banner-title').length) {
              switchZaimyConditions();
              zaimyCalculator('.summ-value', '.time-value', '.zaimy-monthpayment', '.zaimy-endyear', zaimyButton);
          }
      }
      if ($('.zaimy-banner-title').length) {
          switchInputs()
      }

      function showTariff(...args) {
          let tariffButton = $(args[0]),
              tariffWindow = $(args[1]),
              closeButton = $(args[2]);

          tariffButton.click(function () {
              tariffWindow.fadeIn(500);
              $('.tariff-info__background').fadeIn(500);
              document.body.style.overflow = 'hidden';
          })

          closeButton.click(function () {
              tariffWindow.fadeOut(500);
              $('.tariff-info__background').fadeOut(500);
              makeBodyVisible()

          })
      }

      function hideTariff(...args) {
          if ($('.saving-tariff').length) {
              let div = $(args[0]);
              let divBg = $(args[1]);
              $(document).mouseup(function (e) {
                  if (!div.is(e.target)
                      && div.has(e.target).length === 0) {
                      div.fadeOut();
                      $(divBg).fadeOut(500);
                      makeBodyVisible();
                  }
              });
          }
      }

      function showModal(...args) {
          let navButton = $(args[0]),
              navWindow = $(args[1]);

          navButton.click(function () {
              navWindow.fadeToggle(300);
          })
      }

      function activeLink(...args) {
          let url = document.location.href,
              links = $(args[0]),
              mainLinks = $(args[1]);
          links.each(function (i, link) {
              if (url === link.href) {
                  $(link).addClass('nav-bottom-active');
              }
          })
          mainLinks.each(function (i, mainLink) {
              if ($(mainLink).html() === 'Частным клиентам') {
                  $(mainLink).addClass('nav-top-active');
              }
          })
      }
      showModal('.navigation-bottom-menu__hamburger', '.navigation-bottom-list');
      hideModal('.navigation-bottom-list', '.navigation-bottom-menu__hamburger');
      showTariff('.saving-tariff-button button', '.tariff-info', '.tariff-close');
      hideTariff('.tariff-info', '.tariff-info__background');
      activeLink('.navigation-bottom-menu li a', '.navigation-list li a');
  }
  else {
      function showBusinessModal(...args) {
          let navButton = $(args[0]),
              navWindow = $(args[1]);

          navButton.click(function () {
              navWindow.fadeToggle(300);
          })
      }

      function activeBusinessLink(...args) {
          let url = document.location.href,
              links = $(args[0]),
              mainLinks = $(args[1]);
          links.each(function (i, link) {
              if (url === link.href) {
                  $(link).addClass('b-bottom-active');
              }
          })
          mainLinks.each(function (i, mainLink) {
              if ($(mainLink).html() === 'Бизнесу') {
                  $(mainLink).addClass('b-top-active');
              }
          })
      }
      showBusinessModal('.b-navigation-bottom-menu__hamburger', '.b-navigation-bottom-list');
      hideModal('.b-navigation-bottom-list', '.b-navigation-bottom-menu__hamburger');
      activeBusinessLink('.b-navigation-bottom-menu li a', '.b-navigation-list li a');

  }
  wordPressVideoSlider()
});