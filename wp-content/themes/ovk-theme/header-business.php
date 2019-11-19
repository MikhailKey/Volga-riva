<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="Описание страницы для SEO и соцсетей">
	<meta name="keywords" content="ключевые, слова, через, запятую">
	<link rel="shortcut icon" type='image/png' href="img/icons/favicon.ico" />
    <title><?php echo wp_get_document_title(); ?></title>
    <?php wp_head(); ?>
    <script type="text/javascript">
	function disableSelection(target){
	if (typeof target.onselectstart!="undefined")
		target.onselectstart=function(){return false}
	else if (typeof target.style.MozUserSelect!="undefined")
		target.style.MozUserSelect="none"
	else
		target.onmousedown=function(){return false}
	target.style.cursor = "default"
	}
	</script>
</head>
<body>
    <div class="city-modal">
        <div class="container city-modal-content">
            <div class="city-modal-inside">
                <div class="svg city-close" data-src="/wp-content/themes/ovk-theme/assets/img/icons/close-button.svg"></div>
                <div class="city-ask">
                    <h4>Ваш город - Саратов?</h4>
                    <button data-adress="Ул. Советская 86/70 (угол ул. Пугачева), Литер А"
                    data-first-phone="8 (8452) 49-33-33"
                    data-second-phone="8 (800) 775-64-44 (факс)">Да</button>
                </div>
                <div class="city-choose">
                        <button data-adress="Ул. Советская 86/70 (угол ул. Пугачева), Литер А"
                        data-first-phone="8 (8452) 49-33-33"
                        data-second-phone="8 (800) 775-64-44 (факс)" 
                        class="city-choose__button">Саратов</button>
                <button data-adress="ул. М. Горького, 28"
                        data-first-phone="8 (800) 755-64-44"
                        data-second-phone="8 (8453) 530-630 (факс)"
                        class="city-choose__button">Энгельс</button>
                <button data-adress="ул. Северная, 311/1, оф.19"
                        data-first-phone="8 (8452) 49-33-33"
                        data-second-phone="8 (800) 775 64 44 (факс)"
                        class="city-choose__button">Краснодар</button>
                <button data-adress="Московский пр., 7Е, оф. 226 (БЦ «Плаза»)"
                        data-first-phone="8 (473) 254-64-44"
                        data-second-phone="8 (800) 775 64 44 (факс)"
                        class="city-choose__button">Воронеж</button>
                <button data-adress="ул. Войкова, д.1/1, оф.23"
                        data-first-phone="8 (862) 259-0123"
                        data-second-phone="8 (800) 775 64 44 (факс)"
                        class="city-choose__button">Сочи</button>
                <button data-adress="ул.Минаева 11 (ТРК СПАРТАК), оф.201"
                        data-first-phone="8 (8422) 717-333"
                        data-second-phone="8 (800) 775 64 44 (факс)"
                        class="city-choose__button">Ульяновск</button>
                <button data-adress="ул. Революционная, 18"
                        data-first-phone="8 (917) 301 05 55"
                        data-second-phone="8 (800) 775 64 44 (факс)"
                        class="city-choose__button">Вольск</button>
                <button data-adress="Ул. Советская 86/70 (угол ул. Пугачева), Литер А"
                        data-first-phone="8 (8452) 49-33-33"
                        data-second-phone="8 (800) 775-64-44 (факс)" 
                        class="city-choose__button">Другое</button>
                </div>
            </div>
        </div>
    </div> 
    <header>
            <div class="b-navigation-bg">
                <div class="container">
                    <div class="b-navigation">
                    <?php wp_nav_menu( [
					'theme_location'  => 'main_menu',
					'menu_class'      => 'b-navigation-list',
					'container'       => null,  
					] ); ?>
                        <div class="b-navigation-connect">
                            <div class="b-navigation-connect-item">
                            <div class="navigation-connect-wrap">
                                <p class="town-title">Саратов</p>
                                <div class="svg" data-src="<?php echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div>
                            </div>
                            <div class="navtown-list navtop-modal">
                                <button data-adress="Ул. Советская 86/70 (угол ул. Пугачева), Литер А"
                                        data-first-phone="8 (8452) 49-33-33"
                                        data-second-phone="8 (800) 775-64-44 (факс)" 
                                        class="navtown-item">Саратов</button>
                                <button data-adress="ул. М. Горького, 28"
                                        data-first-phone="8 (800) 755-64-44"
                                        data-second-phone="8 (8453) 530-630 (факс)"
                                        class="navtown-item">Энгельс</button>
                                <button data-adress="ул. Северная, 311/1, оф.19"
                                        data-first-phone="8 (8452) 49-33-33"
                                        data-second-phone="8 (800) 775 64 44 (факс)"
                                        class="navtown-item">Краснодар</button>
                                <button data-adress="Московский пр., 7Е, оф. 226 (БЦ «Плаза»)"
                                        data-first-phone="8 (473) 254-64-44"
                                        data-second-phone="8 (800) 775 64 44 (факс)"
                                        class="navtown-item">Воронеж</button>
                                <button data-adress="ул. Войкова, д.1/1, оф.23"
                                        data-first-phone="8 (862) 259-0123"
                                        data-second-phone="8 (800) 775 64 44 (факс)"
                                        class="navtown-item">Сочи</button>
                                <button data-adress="ул.Минаева 11 (ТРК СПАРТАК), оф.201"
                                        data-first-phone="8 (8422) 717-333"
                                        data-second-phone="8 (800) 775 64 44 (факс)"
                                        class="navtown-item">Ульяновск</button>
                                <button data-adress="ул. Революционная, 18"
                                        data-first-phone="8 (917) 301 05 55"
                                        data-second-phone="8 (800) 775 64 44 (факс)"
                                        class="navtown-item">Вольск</button>
                                <button data-adress="Ул. Советская 86/70 (угол ул. Пугачева), Литер А"
                                        data-first-phone="8 (8452) 49-33-33"
                                        data-second-phone="8 (800) 775-64-44 (факс)" 
                                        class="navtown-item">Другое</button>
                            </div>
                            </div>
                            <div class="b-navigation-connect-item">
                                <div class="navigation-connect-wrap">
                                    <p>Контакты</p>
                                    <div class="svg" data-src="<?php echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div>
                                </div>
                                <div class="navconnect-list navtop-modal">
                                    <p class="navconnect-town town-title">Саратов</p>
                                    <p class="navconnect-adress adress-title">Адрес: ул. Советская, 86/70</p>
                                    <div class="navconnect-time">
                                        <h5>Режим работы</h5>
                                        <p>пн-чт 9.00-18:00</p>
                                        <p>пт 9.00-17:00</p>
                                        <p>Без перерыва</p>
                                        <p>сб, вс - выходные дни</p>
                                    </div>
                                    <h3 class="navconnect-phone phone-first">8 800 775 64 44</h3>
                                    <h3 class="navconnect-phone phone-second">+7 (8452) 49 33 33</h3>
                                </div>
                            </div>
                        </div>
                        <a href="http://ovk.asap-lp.ru/priglashaem_k_sotrudnichestvu/">
                            <button class="b-navigation-button button desktop-hide">Приглашаем к сотрудничеству</button>
                        </a> 
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="b-navigation-middle">
                    <a href="index.html"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/business/business-mobile.png" alt=""></a>
                    <a href="http://ovk.asap-lp.ru/priglashaem_k_sotrudnichestvu/">
						<button class="navigation-button button">Приглашаем к сотрудничеству</button>
					</a>
                </div>
            </div>
            <div class="container">
                <div class="b-navigation-bottom">
                    <a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/business/logo-green.png" alt="" class=" desktop-hide b-navigation-bottom__logo"></a>
                    
                    <?php wp_nav_menu( [
					'theme_location'  => 'business_menu',
					'menu_class'      => 'b-navigation-bottom-menu',
					'container'       => null,  
				] ); ?>
                    <div class="b-navigation-bottom-menu__hamburger">
                    <?php wp_nav_menu( [
					'theme_location'  => 'hamburger_menu',
					'container'       => 'div', 
					'container_class' => 'b-navigation-bottom-list',
					'menu_class'      => null, 
					] ); ?>
                        <img class="b-navigation-bottom-menu__icon" src="<?php echo get_template_directory_uri(); ?>/assets/img/header/hamburger-green.png">
                    </div>
                </div>
            </div>
    </header>