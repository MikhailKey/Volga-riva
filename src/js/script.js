
// Ты пишешь весь js в одном файле, почему не комментируешь, что к какой странице относиться
// можно для этого создать большие функции с именами страниц и вызывать внутри функции которые относятся к этой странице, а еще потом для оптимизации написать условия, которые не будут отрабатывать скрипты там где не надо

$(document).ready(function () {
  $(".zaimy-carousel").owlCarousel({
    loop: true,
    items: 3,
    video: true,
    mouseDrag: false,
    autoplay: 3000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    navElement: 'button',
    navText: ['<div class="svg" data-src="img/zaimy/arrow-left.svg"></div>', '<div class="svg" data-src="img/zaimy/arrow-right.svg"></div>'], // вынести в глобальную константу этот массив
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
    }
  });
  // зачем спамить вызов слайдеров, если у тебя половина параметров повторяется
  const arrowsForSlider = ['<div class="svg" data-src="img/zaimy/arrow-left.svg"></div>', '<div class="svg" data-src="img/zaimy/arrow-right.svg"></div>'];
  //пример реализации
  const slider = (selector, params) => {
    $(selector).owlCarousel({
      loop: true,
      mouseDrag: false,
      navNext: arrowsForSlider,
      ...params /// уникальные параметры
    });
  }
  //пример реализации
  $("#saving-slider").owlCarousel({
    loop: true,
    items: 1,
    animateOut: 'fadeOut',
    mouseDrag: false,
    autoHeight: true,
    autoplay: 1000,
    autoplaySpeed: 500,
  });

  $(".about-slider").owlCarousel({
    loop: true,
    items: 3,
    // autoplay : 3000,
    // autoplaySpeed: 1500,
    // autoplayHoverPause: true,
    navElement: 'button',
    navText: ['<div class="svg" data-src="img/zaimy/arrow-left.svg"></div>', '<div class="svg" data-src="img/zaimy/arrow-right.svg"></div>'],
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
    }
  });

  function easySVG() {
    const svgArr = document.querySelectorAll('.svg');

    for (var i = 0; i < svgArr.length; i++) { // у тебя @babel в gulp замешан, зачем пишешь обычные циклы, когда можно forEach, обычные плохо читаются, плюс не оптимизированы, а вообще лучше использовать lodash
      const path = svgArr[i].dataset.src;
      replaceSvg(svgArr[i], path); // что такое replaceSvg WTF, давай нормальные имена или комментируй
    }
  }

  function replaceSvg(elem, path) { // что блять за монсор, ты как бы троль полюбому можно проще, у тебя подключен jquery, ты на нем пишешь, но вместо ajax, юзаешь чистый xmh
    if ('ActiveXObject' in window) {
      let IErequest = new ActiveXObject('MSXML2.XMLHTTP');//это не читаемо, комментируй или переписывай
      IErequest.onReadyStateChange = function () {
        if (IErequest.readyState === 4 && IErequest.status === 200) {
          const attr = elem.getAttribute('class');// а elem.classList тебя не устраивает?
          const noSvgClassAttr = attr.slice(attr.indexOf('svg') + 3); //wtf что за нановычисления, можно проще, еще раз wtf вообще не смог понять зачем, да и не хочу

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
        if (request.readyState === 4 && request.status === 200) {// повторяющийся код, нельзя один обработчик на статус сделать в функции и в нее прокидывать уникальный код??
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

  function SVGrefresh() {// WTF????????????????????????????????????????????????????????????????????????????????????! функция которая, вызывают функцию, которая нигде во всем проекте не вызывается
    // это блять как function error() {console.log('error')}
    easySVG();
  }
  // ты вызываешь и описываешь функцию там где хочешь и когда хочешь, опиши все функцию за пределами document Ready, и вызывай их в Ready, а так какой смысл в функции если ты ее описываешь и сразу же вызываешь а дальше описываешь другую функцию, это не читаем
  // И так еще получаеться, что функции у тебя создаются только когда страница уже загрузилась, а должны создаваться во время загрузки, а выполняться уже когда загрузилась
  easySVG();

  function mapProcess() { // какой смысл в функции, если в ней все константно, и ее нельзя переиспользовать
    // пример реализации 
    const mapProcess = (selectors) => {
      doSomethingWithSelectors();
    }
    mapProcess({
      mapButton:  $('.connect-button'),
      townTitle: $('.town-modal-title'),
    })
    // пример реализации 

    let mapButton = $('.connect-button'),
      closeButton = $('.connect-modal-scheme button'),
      townTitle = $('.town-modal-title'),
      townStatus = $('.connect-modal__status'),
      townAdress = $('.connect-modal__adress'),
      townWebsite = $('.connect-modal__link'),
      townFirstNumber = $('.connect-modal__phone__first'),
      innerModal = $('.town-modal'),
      townButton = $('.town-modal-wrap'),
      townSecondNumber = $('.connect-modal__phone__second'),
      modalTownButton = $('.town-modal__item');

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
      function hideModal() {
        $(document).mouseup(function (e) {
          if (!innerModal.is(e.target)
            && innerModal.has(e.target).length === 0) {
            $(innerModal).fadeOut(250);
          }
        });
      }
      hideModal()
    }
    handleChangeAdress()

    function sendAttributes(item) {// Зачем эта палатненка, а нельзя в атрибут пихать все разметку сразу в 1 атрибут, а не писать вот этот ад
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

    mapButton.each(function (i, button) { // то есть там выше ты пишешь for, а тут each из jquery ну ты троль конеш, такое впечатление, что js 3 разных человека пишет, и 2 из них по пьяне
      $(button).on('click', function () {
        $('.connect-modal').fadeIn(250);
        $('body').css('overflow', 'hidden');// не очень оптимизированный метод, лучше делать через .classList += 'activeClass' или .addClass из jquery, хотя с учетом того что ты тут жмешь джиквери, то как бы о чем базар


        sendAttributes($(this));
        let coordinates = JSON.parse($(this).attr('data-coordinates'));
        $('#map').empty();
        yandexMap(coordinates);
      })
    })

    $(closeButton).on('click', function () { // вот тут я уже не вьехал откуда closeButton
      $('.connect-modal').fadeOut(250); // тоже лучше делать с помощью addClass анимацию
      $('body').css('overflow', 'visible'); // уже писал
    })

    function hideMap() {
      $(document).mouseup(function (e) {  // я не знаю что это, но document mouseUp выглядит супер странно, если хотели закрывать что-то по клику вне элементы, есть куча способов проще
        let div = $('.connect-modal-container');
        if (!div.is(e.target)
          && div.has(e.target).length === 0) {
          $('.connect-modal').fadeOut(250);
          $('body').css('overflow', 'visible');
        }
      });
    }
    hideMap() // опять хуй пойми чо за вызов, и что он тут делает


  }
  mapProcess()

  function yandexMap(coordinates) {
    if ($("#map").length > 0) {
      ymaps.ready(function () {
        let description = ''
        if (JSON.stringify(coordinates) === '[51.531825572387724,46.01106200000002]') {// а про switch case не знаешь? JSON.stringify(coordinates) не проще в переменную вынести? 
          // координаты в объект , не читаем, что за координаты откуда взялись, а если бы не было, description, я бы вообще прочитать не смог наверное
              // пример реализации 

          const adresses = {
            sover: '[51.531825572387724,46.01106200000002]'
          }
              // пример реализации 

          description = 'Адрес: Ул. Советская 86/70'
        } else if (JSON.stringify(coordinates) === '[51.498775094836816,46.11590139814754]') {
          description = 'ул. М. Горького, 28'
        } else if (JSON.stringify(coordinates) === '[45.03911564913005,38.98481291104504]') {
          description = 'ул. Северная, 311/1, оф.19'
        } else if (JSON.stringify(coordinates) === '[51.68371724420709,39.183256728835964]') {
          description = 'Московский пр., 7Е, оф. 226 (БЦ "Плаза")'
        } else if (JSON.stringify(coordinates) === '[43.580503399147226,39.71970927116393]') {
          description = 'ул. Войкова, д.1/1, оф.23'
        } else if (JSON.stringify(coordinates) === '[54.308244521039086,48.38772785273916]') {
          description = ' ул.Минаева 11 (ТРК СПАРТАК), оф.201'
        } else {
          description = 'ул. Революционная, 18'
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

  function showConnect() {
    function changeAdress(pressedButton) {
      let items = $('.connect-info-item');
      items.each(function (i, item) {
        if ($(item).hasClass('connect-info-item__order')) { // connect-info-item__order три раза повторяешь константу, выноси в переменные
          $(item).removeClass('connect-info-item__order');
        }
        if ($(item).find('h1').text().indexOf(pressedButton) > -1) {// на всякий случай indexOf загрузит тебе страницу секунд на 15 страницу , если данных будет много, самый медленный метод поиска
          $(item).addClass('connect-info-item__order');
        }
      })
    }

    function orderContacts() {
      if ($('.connect-info-item').length) { // блять нахуй выше переменная с этим селектором, вынеси ее в глобальную область и используй сразу в 2х функциях
        let townData = JSON.parse(localStorage.getItem('townData'));
        changeAdress(townData.town);
      }
    }



    orderContacts()

    function closeModal() {
      modal.fadeOut(100);
      button.removeClass('navtop-open');
    }
    let navButton = $('.navtown-item');
    let button = $('.navigation-connect-wrap');
    let modal = $('.navtop-modal');

    navButton.on('click', function () {
      closeModal()
      if ($('.connect-info-item').length) {
        changeAdress($(this).text()) // в переменные такие вещи блять
      }
    })

    button.on('click', function () {
      if ($(this).hasClass('navtop-open')) {
        closeModal()
      } else {
        closeModal()
        $(this).siblings('.navtop-modal').fadeIn(500);
        $(this).addClass('navtop-open');
      }
    })
  }

  showConnect()

  function hideConnect() {// в чем смысл функции если ты выше пишешь такую же функцию только с другим селектором, wtf, Функции нужны, чтобы их переиспользовать, а не дублиовать код
    $(document).mouseup(function (e) {
      let div = $('.navtop-modal');
      if (!div.is(e.target)
        && div.has(e.target).length === 0) {
        div.fadeOut();
      }
    });
  }

  hideConnect()

  function sendAdress() {// опять же в чем смысл если ее нельзя переиспользовать, и все константно
    let firstPhone = document.querySelectorAll('.phone-first'),
      secondPhone = document.querySelectorAll('.phone-second'),
      adress = document.querySelectorAll('.adress-title'),
      town = document.querySelectorAll('.town-title'),
      townButtons = document.querySelectorAll('.navtown-item');

    function makeStorage() {
      townButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          if (button.innerHTML === 'Другое') {
            return;
          }
          let townData = {};
          townData.town = this.innerHTML;
          townData.adress = this.getAttribute('data-adress');
          townData.firstPhone = this.getAttribute('data-first-phone');
          townData.secondPhone = this.getAttribute('data-second-phone');

          localStorage.setItem('townData', JSON.stringify(townData));

          getStorage()
        })
      })
    }
    function getStorage() {
      let townData = JSON.parse(localStorage.getItem('townData')); // зачем в кеш? Ладно не суть, суть в том, что get из кеша, это синхронная операция, ожидай ошибки, или пиши Promise
      town.forEach(function (town) { town.innerHTML = townData.town });
      adress.forEach(function (adress) { adress.innerHTML = townData.adress });
      firstPhone.forEach(function (phone) { phone.innerHTML = townData.firstPhone });
      secondPhone.forEach(function (phone) { phone.innerHTML = townData.secondPhone });
    }

    if (localStorage.getItem('townData')) {
      getStorage()
    }
    makeStorage()
  }

  sendAdress()

  if ($('.navigation-bottom-list')[0]) { // а почему нельзя было написать $('.navigation-bottom-list')[0] && $('.calc-item').length и вообще что ты проверяешь $('.calc-item').length, не являеться ли длинна undefined?
    if ($('.calc-item').length) {

      let stavkaRef = 12;
      let checkButton = document.querySelector('.calc-item-checkbox__square')

      function checkProgram() {
        if (checkButton.checked) {
          comfort()
          $('.saving-options__button').eq(1).addClass('saving-options__button__active');// да вы ебанутые? в чем опять смысл функции, если тут это написано
          $('.saving-options__program').eq(1).addClass('saving-options__program__active');
          $('.saving-options__button').eq(0).removeClass('saving-options__button__active');
          $('.saving-options__program').eq(0).removeClass('saving-options__program__active');
        } else {
          dohod()
          $('.saving-options__button').eq(0).addClass('saving-options__button__active');
          $('.saving-options__program').eq(0).addClass('saving-options__program__active');
          $('.saving-options__button').eq(1).removeClass('saving-options__button__active');
          $('.saving-options__program').eq(1).removeClass('saving-options__program__active');
        }
      }
      checkButton.addEventListener('click', function () {
        checkProgram()
      })
      function comfort() {
        let comfortFullSumm = 0,
          comfortSummSber = $('.summ-value').val(),
          comfortMonth = $('.time-value').val(),
          percentArr;

        if (comfortSummSber >= 3000 && comfortSummSber <= 199999) {// что это за цифры, откуда ты их взял? я не понимаю, можно комментировать или довать имена через пенеменные
          percentArr = [{ // рили? что обозначают свойства эти
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
          $('.calc-result__info')[0].innerHTML = stavkaArr + '%'; 
          $('.calc-result__info')[1].innerHTML = Math.round(nalog) + 'р.';
          $('.calc-result__info')[2].innerHTML = Math.round(comfortFullSumm) + 'р.';
        }
      }
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

          //проценты
          $('.calc-result__info')[0].innerHTML = stavkaArr + '%';
          //налог
          $('.calc-result__info')[1].innerHTML = Math.round(nalog) + 'р.';
          //доход
          $('.calc-result__info')[2].innerHTML = Math.round(dohodFullSumm) + 'р.';
        }
      }

      function switchInputs() {
        let summLabel = document.querySelectorAll('.calc-item__input')[0];
        let summRange = document.querySelectorAll('.calc-item-add__range')[0];
        let timeLabel = document.querySelectorAll('.calc-item__input')[1];
        let timeRange = document.querySelectorAll('.calc-item-add__range')[1];

        checkProgram()

        summRange.addEventListener('input', function () {
          summLabel.value = summRange.value;
          checkProgram()
        })

        let timeValueSteps = [3, 6, 12, 24, 36];
        timeRange.addEventListener('input', function () {
          for (let i = 0; i < timeValueSteps.length; i++) {
            if (timeRange.value == timeValueSteps[i]) {
              timeLabel.value = timeRange.value;
            }
          }
          checkProgram()
        })
      }

      function chooseRadio() {
        // let importanceLabel = document.querySelectorAll();
        $('.saving-options__button').on('click', function () {
          $('.saving-options__button').removeClass('saving-options__button__active');
          $(this).addClass('saving-options__button__active');
          if ($(this).html() === 'максимальный доход') {
            dohod()
            $('.saving-options__program').eq(0).addClass('saving-options__program__active');
            $('.saving-options__program').eq(1).removeClass('saving-options__program__active');
            checkButton.checked = false;
          } else {
            comfort()
            $('.saving-options__program').eq(0).removeClass('saving-options__program__active');
            $('.saving-options__program').eq(1).addClass('saving-options__program__active');
            checkButton.checked = true;
          }
        })
      }

      function chooseProgram() {
        $('.saving-options__program').on('click', function () {
          $('.saving-options__program').removeClass('saving-options__program__active');
          $(this).addClass('saving-options__program__active');
          if ($(this).html() === 'ПРОГРАММА «КОМФОРТ»') {
            comfort()
            $('.saving-options__button').eq(0).removeClass('saving-options__button__active');
            $('.saving-options__button').eq(1).addClass('saving-options__button__active');
            checkButton.checked = true;
          } else {
            dohod()
            $('.saving-options__button').eq(0).addClass('saving-options__button__active');
            $('.saving-options__button').eq(1).removeClass('saving-options__button__active');
            checkButton.checked = false;
          }
        })
      }
      function inputWindow() {
        let summInput = document.querySelectorAll('.calc-item__input')[0];
        summInput.addEventListener('input', function () {
          if (summInput.value < 3000) {
            return;
          } else if (summInput.value > 100000000) {
            summInput.value = '100000000'
          } else {
            checkProgram()
          }
        })
      }
      inputWindow()
      switchInputs()
      chooseRadio()
      chooseProgram()
    }
    function showTariff(...args) {
      let tariffButton = $(args[0]),
        tariffWindow = $(args[1]),
        closeButton = $(args[2]);

      tariffButton.click(function () {
        tariffWindow.fadeIn(500);
      })

      closeButton.click(function () {
        tariffWindow.fadeOut(500);
      })
    }

    function hideTariff(arg) {
      $(document).mouseup(function (e) {
        let div = $(arg);
        if (!div.is(e.target)
          && div.has(e.target).length === 0) {
          div.fadeOut();
        }
      });
    }

    function showModal(...args) {
      let navButton = $(args[0]),
        navWindow = $(args[1]);

      navButton.click(function () {
        navWindow.fadeToggle(300);
      })
    }

    function hideModal(...args) {
      $(document).mouseup(function (e) {
        let div = $(args[0]);
        if (!div.is(e.target)
          && div.has(e.target).length === 0) {
          div.fadeOut();
        }
      });
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
    hideModal('.navigation-bottom-list');
    showTariff('.saving-tariff-button button', '.tariff-info', '.tariff-close');
    hideTariff('.tariff-info');
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

    function hideBusinessModal(...args) {
      $(document).mouseup(function (e) {
        let div = $(args[0]);
        if (!div.is(e.target)
          && div.has(e.target).length === 0) {
          div.fadeOut();
        }
      });
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
    hideBusinessModal('.b-navigation-bottom-list');
    activeBusinessLink('.b-navigation-bottom-menu li a', '.b-navigation-list li a');
  }
  function cityModal() {
    $('body').css('overflow', 'hidden');
    let cityModal = $('.city-modal');
    let closeCityButton = $('.city-modal-inside');
    let cityButtons = $('.city-modal-inside button');
    cityModal.fadeIn(1000);

    closeCityButton.on('click', '.city-close', function() 
    {
      cityModal.fadeOut(250);
      $('body').css('overflow', 'visible');
    })

    cityButtons.each(function(index, elem) 
    {
      $(elem).on('click', function()
      {
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
  if (!localStorage.getItem('townData')) {
    cityModal()
  }
});

