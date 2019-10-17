<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ovk-theme
 */

?>
	</div><!-- #content -->
	<footer>
		<section class="contacts contacts-blue">
			<div class="container">
				<div class="contacts-wrap">
					<div class="contacts-logo">
						<a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer/logo-2.png" alt=""></a>
						<div class="contacts-info-town contacts-mobile">
							<p>Саратов</p>
							<div class="svg" data-src="<?php echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div>
						</div>
					</div>
					<div class="contacts-info">
						<div class="contacts-info-town  contacts-desktop">
							<p>Саратов</p>
							<div class="svg" data-src="<?php echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div>
						</div>
						<div class="contacts-info-adress">
							<p>Адрес: ул. Советская, 86/70</p>
							<div class="contacts-info-adress-number">
								<p>тел.:</p>
								<div>
									<a  class="contacts-info-adress-number__phone" href="#">8 800 775 64 44</a>
									<a class="contacts-info-adress-number__phone" href="#">(8452) 49 33 33</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="footnav">
			<div class="container">
				<div class="footnav-wrap">
					<div class="footnav-media">
						<p class="footnav-media__link">© ovk-volga.ru 2011-2018</p>
						<div class="footnav-media-icons">
							<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/media/facebook-logo.svg" alt="" class="footnav-media-icons__item"></a>
							<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/media/youtube-logo.svg" alt="" class="footnav-media-icons__item"></a>
							<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/media/vk-logo.svg" alt="" class="footnav-media-icons__item"></a>
							<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/media/odnoklassniki-logo.svg" alt="" class="footnav-media-icons__item"></a>
						</div>
					</div>
					<div class="footnav-navigation">
						<?php wp_nav_menu( [
							'theme_location'  => 'bottom_first',
							'menu_class'      => 'footnav-navigation-row',
							'container'       => null,  
						] ); ?>
						<?php wp_nav_menu( [
							'theme_location'  => 'bottom_second',
							'menu_class'      => 'footnav-navigation-row',
							'container'       => null,  
						] ); ?>
					</div>
				</div>
			</div>
		</section>
	</footer>
	<?php wp_footer(); ?>
</body>
</html>