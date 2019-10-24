<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ovk-theme
 */

?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="Описание страницы для SEO и соцсетей">
	<meta name="keywords" content="ключевые, слова, через, запятую">
	<link rel="shortcut icon" type='image/png' href="img/icons/favicon.ico" />
	<title>Поволжское ОВК</title>
	<?php wp_head(); ?>
</head>
<body>
	<header>
		<div class="navigation-bg">
			<div class="container">
				<div class="navigation">
					<?php wp_nav_menu( [
					'theme_location'  => 'main_menu',
					'menu_class'      => 'navigation-list',
					'container'       => null,  
					] ); ?>					
					<div class="navigation-connect">
						<div class="navigation-connect-item">
						<div class="navigation-connect-wrap">
							<p class="town-title">Саратов</p>
							<div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/media/button-down.svg"></div>
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
							<button class="navtown-item">Другое</button>
						</div>
						</div>
						<div class="navigation-connect-item">
						<div class="navigation-connect-wrap">
							<p>Контакты</p>
							<div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/media/button-down.svg"></div>
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
						<button class="navigation-button button desktop-hide">Приглашаем к сотрудничеству</button>
					</a>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="navigation-middle">
				<a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/header/mobile-logo.png" alt=""></a>
				<a href="http://ovk.asap-lp.ru/priglashaem_k_sotrudnichestvu/">
					<button class="navigation-button button ">Приглашаем к сотрудничеству</button>
				</a>
			</div>
		</div>
		<div class="container">
			<div class="navigation-bottom">
				<a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/header/logo.png" alt="" class="navigation-bottom__logo desktop-hide"></a>
				<?php wp_nav_menu( [
					'theme_location'  => 'primary_menu',
					'menu_class'      => 'navigation-bottom-menu',
					'container'       => null,  
				] ); ?>
				<div class="navigation-bottom-menu__hamburger">
					<?php wp_nav_menu( [
					'theme_location'  => 'hamburger_menu',
					'container'       => 'div', 
					'container_class' => 'navigation-bottom-list',
					'menu_class'      => null, 
					] ); ?>
					<img class="navigation-bottom-menu__icon" src="<?php echo get_template_directory_uri(); ?>/assets/img/header/hamburger-blue.png">
				</div>
			</div>
		</div>
	</header>

	<div id="content" class="site-content">
