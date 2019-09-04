$(document).ready(function(){
    $("#zaimy-carousel").owlCarousel({
        loop: true,
        items: 3,
        autoplay : 5000,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
        navElement: 'button',
        navText: ['<div class="svg" data-src="img/zaimy/arrow-left.svg"></div>', '<div class="svg" data-src="img/zaimy/arrow-right.svg"></div>'],
	
        nav: true,
        margin:10,
    });
    $('.svg').each(function() {
        var path = '../' + $(this).data('src');
        replace($(this), path);
    });
    
    function replace(elem, path) {
        var s = new XMLSerializer();
        $.ajax({
            url: path,
            success: function(data) {
                var str = s.serializeToString(data);
                elem.append(str);
                elem.find('svg').unwrap();
              }
        });
    }
});


let pageName = window.location.pathname;

if (pageName.includes('business')) 
{
    function showBusinessNav(...args) 
    {
        let navButton = document.querySelector(args[0]),
            navMenu = document.querySelector(args[1]);
        navButton.addEventListener('click', function()
        {
            navMenu.classList.toggle('fade');
        })
    }

    function hideBusinessNav(...args) 
    {
        let navButton = document.querySelector(args[0]),
            navMenu = document.querySelector(args[1]);
        document.addEventListener('mouseup', function(e) 
        {
            if (!navMenu.contains(e.target) && !navButton.contains(e.target)) 
            {
                navMenu.classList.remove('fade');
            }
        })
    }

    showBusinessNav('.b-navigation-bottom-menu__hamburger', '.b-navigation-bottom-list');
    hideBusinessNav('.b-navigation-bottom-menu__hamburger', '.b-navigation-bottom-list');
} 
else 
{
    function showNav(...args) 
    {
        let navButton = document.querySelector(args[0]),
            navMenu = document.querySelector(args[1]);

        navButton.addEventListener('click', function()
        {
            navMenu.classList.toggle('fade');        
        })
    }

    function hideNav(...args) 
    {
        let navButton = document.querySelector(args[0]),
            navMenu = document.querySelector(args[1]);

        document.addEventListener('mouseup', function(e) 
        {
            if (!navMenu.contains(e.target) && !navButton.contains(e.target)) 
            {
                navMenu.classList.remove('fade');
            }
        })
    }

    showNav('.navigation-bottom-menu__hamburger', '.navigation-bottom-list');
    hideNav('.navigation-bottom-menu__hamburger', '.navigation-bottom-list');
}
