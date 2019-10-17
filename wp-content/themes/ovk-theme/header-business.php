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
                            <p>Саратов</p>
                                <div class="svg" data-src="<?php echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div>
                            </div>
                            <div class="b-navigation-connect-item">
                                <p>Контакты</p>
                                <div class="svg" data-src="<?php echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div>
                            </div>
                        </div>
                        <button class="b-navigation-button button desktop-hide">Приглашаем к сотрудничеству</button>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="b-navigation-middle">
                    <a href="index.html"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/business/business-mobile.png" alt=""></a>
                    <button class="b-navigation-button button">Приглашаем к сотрудничеству</button>
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