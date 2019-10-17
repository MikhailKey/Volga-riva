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
						<p>Саратов</p>
							<div class="svg" data-src="<?php echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div>
						</div>
						<div class="navigation-connect-item">
							<p>Контакты</p>
							<div class="svg" data-src="<?php echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div>
						</div>
					</div>
					<button class="navigation-button button desktop-hide">Приглашаем к сотрудничеству</button>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="navigation-middle">
				<a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/header/mobile-logo.png" alt=""></a>
				<button class="navigation-button button">Приглашаем к сотрудничеству</button>
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
