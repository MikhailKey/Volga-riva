$(document).ready(function(){
    $("#zaimy-carousel").owlCarousel({
        loop: true,
        items: 3,
        video: true,
        autoplay : 3000,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
        navElement: 'button',
        navText: ['<div class="svg" data-src="img/zaimy/arrow-left.svg"></div>', '<div class="svg" data-src="img/zaimy/arrow-right.svg"></div>'],
        nav: true,
        margin:10,
    });

    $("#saving-slider").owlCarousel({
        loop: true,
        items: 1,
        animateOut: 'fadeOut',
        autoHeight : true,
        autoplay : 3000,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
    });

    $('.svg').each(function() {
        var path = '../' + $(this).data('src');
        replace($(this), path);
    });
    
    function replace(elem, path) {
        let s = new XMLSerializer();
        $.ajax({
            url: path,
            success: function(data) {
                let str = s.serializeToString(data);
                elem.append(str);
                elem.find('svg').unwrap();
              }
        });
    }
    if ($('.navigation-bottom-list')[0])
    {
        function showTariff(...args)
        {
            let tariffButton = $(args[0]),
            tariffWindow = $(args[1]),
            closeButton = $(args[2]);
        
            tariffButton.click(function()
            {
                tariffWindow.fadeIn(500);
            })

            closeButton.click(function()
            {
                tariffWindow.fadeOut(500);
            })
        }

        function hideTariff(arg)
        {
            $(document).mouseup(function (e){ 
                let div = $(arg); 
                if (!div.is(e.target)
                    && div.has(e.target).length === 0) { 
                    div.fadeOut(); 
                }
            });
        }

        function showModal(...args)
        {
            let navButton = $(args[0]),
            navWindow = $(args[1]);

            navButton.click(function()
            {
                navWindow.fadeToggle(300);
            })   
        } 

        function hideModal(...args)
        {
            $(document).mouseup(function (e){ 
                let div = $(args[0]); 
                if (!div.is(e.target)
                    && div.has(e.target).length === 0) { 
                    div.fadeOut(); 
                }
            });
        }
       
        showModal('.navigation-bottom-menu__hamburger', '.navigation-bottom-list');
        hideModal('.navigation-bottom-list');
        showTariff('.saving-tariff-button button', '.tariff-info', '.tariff-close');
        hideTariff('.tariff-info');
    }
    else 
    {
        function showBusinessModal(...args)
        {
            let navButton = $(args[0]),
            navWindow = $(args[1]);

            navButton.click(function()
            {
                navWindow.fadeToggle(300);
            })   
        } 

        function hideBusinessModal(...args)
        {
            $(document).mouseup(function (e){ 
                let div = $(args[0]); 
                if (!div.is(e.target)
                    && div.has(e.target).length === 0) { 
                    div.fadeOut(); 
                }
            });
        }
        showBusinessModal('.b-navigation-bottom-menu__hamburger', '.b-navigation-bottom-list');
        hideBusinessModal('.b-navigation-bottom-list');
    }
});
