<footer>
        <section class="contacts contacts-green">
			<div class="container">
				<div class="contacts-wrap">
					<div class="contacts-logo">
						<a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/footer/logo-2.png" alt=""></a>
						<div class="contacts-info-town contacts-mobile">
							<p class="town-title">Саратов</p>
							<!-- <div class="svg" data-src="<?php //echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div> -->
						</div>
					</div>
					<div class="contacts-info">
						<div class="contacts-info-town  contacts-desktop">
							<p class="town-title">Саратов</p>
							<!-- <div class="svg" data-src="<?php //echo get_template_directory_uri(); ?>/assets/img/media/button-down.svg"></div> -->
						</div>
						<div class="contacts-info-adress">
							<p class="adress-title">Адрес: ул. Советская, 86/70</p>
							<div class="contacts-info-adress-number">
								<p>тел.:</p>
								<div>
									<a  class="contacts-info-adress-number__phone phone-first" href="#">8 800 775 64 44</a>
									<a class="contacts-info-adress-number__phone phone-second" href="#">(8452) 49 33 33</a>
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
							<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/media/facebook-logo.svg" alt="" class="b-footnav-media-icons__item"></a>
							<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/media/youtube-logo.svg" alt="" class="b-footnav-media-icons__item"></a>
							<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/media/vk-logo.svg" alt="" class="b-footnav-media-icons__item"></a>
							<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/media/odnoklassniki-logo.svg" alt="" class="b-footnav-media-icons__item"></a>
						</div>
					</div>
					<div class="footnav-navigation">
						<?php wp_nav_menu( [
							'theme_location'  => 'bottom_first',
							'menu_class'      => 'b-footnav-navigation-row',
							'container'       => null,  
						] ); ?>
						<?php wp_nav_menu( [
							'theme_location'  => 'bottom_second',
							'menu_class'      => 'b-footnav-navigation-row',
							'container'       => null,  
						] ); ?>
					</div>
				</div>
			</div>
		</section>
	</footer>
	<script type="text/javascript">
	disableSelection(document.body)
	</script>
	<?php wp_footer(); ?>
	<script>

    (function(w,d,u){
    
    var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
    
    var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
    
    })(window,document,'https://cdn.bitrix24.ru/b3104609/crm/site_button/loader_4_a8cwtb.js');
    
    </script>
</body>
</html>