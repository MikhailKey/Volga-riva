$(document).ready(function () 
{
  $(".zaimy-carousel").owlCarousel({
    loop: true,
    items: 3,
    video: true,
    mouseDrag: false,
    autoplay: 3000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    navElement: 'button',
    navText: ['<div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/zaimy/arrow-left.svg"></div>', '<div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/zaimy/arrow-right.svg"></div>'],
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
    navElement: 'button',
    navText: ['<div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/zaimy/arrow-left.svg"></div>', '<div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/zaimy/arrow-right.svg"></div>'],
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

  function easySVG() 
  {
    const svgArr = document.querySelectorAll('.svg');

    for (var i = 0; i < svgArr.length; i++) {
      const path = svgArr[i].dataset.src;
      replaceSvg(svgArr[i], path);
    }
  }

  function replaceSvg(elem, path) 
  {
    if ('ActiveXObject' in window) {
      let IErequest = new ActiveXObject('MSXML2.XMLHTTP');
      IErequest.onReadyStateChange = function () 
      {
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

  function SVGrefresh() 
  {
    easySVG();
  }

  easySVG();

  function mapProcess() 
  {
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
      function hideModalAdress() {
        $(document).mouseup(function (e) {
          if (!innerModal.is(e.target)
            && innerModal.has(e.target).length === 0) {
            $(innerModal).fadeOut(250);
          }
        });
      }
      hideModalAdress()
    }
    handleChangeAdress()

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
      $('body').css('overflow', 'visible');
    })

    function hideMap() {
      if ($('.town-modal').length) {
        $(document).mouseup(function (e) {
          let div = $('.connect-modal-container');
          if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.connect-modal').fadeOut(250);
            $('body').css('overflow', 'visible');
          }
        });
      }
    }
    hideMap()


  }
  mapProcess()

  function yandexMap(coordinates) {
    if ($("#map").length > 0) {
      ymaps.ready(function () {
        let description = '';
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
  function showConnect() 
  {
    function changeAdress(pressedButton) 
    {
      let items = $('.connect-info-item');
      items.each(function (i, item) {
        if ($(item).hasClass('connect-info-item__order')) {
          $(item).removeClass('connect-info-item__order');
        }
        if ($(item).find('h1').text().indexOf(pressedButton) > -1) {
          $(item).addClass('connect-info-item__order');
        }
      })
    }

    function orderContacts() 
    {
      if ($('.connect-info-item').length) {
        let townData = JSON.parse(localStorage.getItem('townData'));
        changeAdress(townData.town);
      }
    }
    orderContacts()

    function closeModal() 
    {
      modal.fadeOut(100);
      button.removeClass('navtop-open');
    }
    let navButton = $('.navtown-item');
    let button = $('.navigation-connect-wrap');
    let modal = $('.navtop-modal');

    navButton.on('click', function () 
    {
      closeModal()
      if ($('.connect-info-item').length) {
        changeAdress($(this).text())
      }
    })

    button.on('click', function () 
    {
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

  function hideConnect() 
  {
    $(document).mouseup(function (e) 
    {
      let div = $('.navtop-modal');
      if (!div.is(e.target)
        && div.has(e.target).length === 0) {
        div.fadeOut();
      }
    });
  }
  hideConnect()

  function renderAdresses() 
  {
    function makeLocalData(item) 
    {
      let townData = {};
      if (item.innerHTML === 'Другое') {
        townData.town = 'Саратов';
      } else {
        townData.town = item.innerHTML;
      }
      townData.adress = item.getAttribute('data-adress');
      townData.firstPhone = item.getAttribute('data-first-phone');
      townData.secondPhone = item.getAttribute('data-second-phone');

      localStorage.setItem('townData', JSON.stringify(townData));
    }

    function getStorage() 
    {
      let townData = JSON.parse(localStorage.getItem('townData')),
        firstPhone = document.querySelectorAll('.phone-first'),
        secondPhone = document.querySelectorAll('.phone-second'),
        adress = document.querySelectorAll('.adress-title'),
        town = document.querySelectorAll('.town-title');

      town.forEach(function (town) { town.innerHTML = townData.town });
      adress.forEach(function (adress) { adress.innerHTML = townData.adress });
      firstPhone.forEach(function (phone) { phone.innerHTML = townData.firstPhone });
      secondPhone.forEach(function (phone) { phone.innerHTML = townData.secondPhone });
    }

    function cityModal() 
    {
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
          makeLocalData(this);
          getStorage();
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

    function sendAdress() {
      let townButtons = document.querySelectorAll('.navtown-item');
      function makeStorage() {
        townButtons.forEach(function (button) {
          button.addEventListener('click', function () {
            makeLocalData(this);
            getStorage()
          })
        })
      }
      if (localStorage.getItem('townData')) {
        getStorage()
      }
      makeStorage()
    }
    sendAdress()
  }

  renderAdresses()
 
  if ($('.navigation-bottom-list')[0]) {
    if ($('.calc-item').length) {

      let stavkaRef = 12;
      let checkButton = document.querySelector('.calc-item-checkbox__square')

      function checkProgram() {
        if (checkButton.checked) {
          comfort()
          $('.saving-options__button').eq(1).addClass('saving-options__button__active');
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
          $('.calc-result__info')[0].innerHTML = stavkaArr + '%';
          $('.calc-result__info')[1].innerHTML = Math.round(nalog) + 'р.';
          $('.calc-result__info')[2].innerHTML = Math.round(comfortFullSumm) + 'р.';
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
        $('.tariff-info__background').fadeIn(500);
        document.body.style.overflow = 'hidden';
      })

      closeButton.click(function () {
        tariffWindow.fadeOut(500);
        $('.tariff-info__background').fadeOut(500);
        document.body.style.overflow = 'visible';

      })
    }

    function hideTariff(arg) {
      if ($('.saving-tariff').length) {
        $(document).mouseup(function (e) {
          let div = $(arg);
          if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            div.fadeOut();
            $('.tariff-info__background').fadeOut(500);
            document.body.style.overflow = 'visible';
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

    function hideModal(...args) {
      $(document).mouseup(function (e) {
        let div = $(args[0]),
          button = $(args[1]);
        if (!button.is(e.target)
          && button.has(e.target).length === 0) {
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
    hideModal('.navigation-bottom-list', '.navigation-bottom-menu__hamburger');
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
        let div = $(args[0]),
          button = $(args[1]);
        if (!button.is(e.target)
          && button.has(e.target).length === 0) {
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
    hideBusinessModal('.b-navigation-bottom-list', '.b-navigation-bottom-menu__hamburger');
    activeBusinessLink('.b-navigation-bottom-menu li a', '.b-navigation-list li a');

  }

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

    function hideModalBitrix() {
      $(document).mouseup(function (e) {
        if ($(bitrixModal).is(":visible")) {
          if (!bitrixContent.is(e.target) && bitrixContent.has(e.target).length === 0) {
            $(bitrixModal).fadeOut(250);
            $('body').css('overflow', 'visible');
          }
        }
      });
    }
    hideModalBitrix()
  }
  showBitrix();
});
