<?php
/**
 * Template part for displaying news content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package ovk-theme
 */

?>
 <section class="blog">
	<div class="container">
		<div class="blog-wrap">
			<div class="page-header">
				<img src="img/header/title-line.png" alt="">
				<h1 class="regular-title">Блог</h1>
			</div>
			<div class="blog-list">
				<div class="blog-item">
					<p class="blog-subtitle"><?php echo get_the_date(); ?></p>
					<a href='<?php echo wp_get_shortlink(); ?>' class="blog-title"><?php echo the_title(); ?></a>
					<a href='<?php echo wp_get_shortlink(); ?>' class="simple-button blog-button">Читать статью</a>
				</div>
			</div>
		</div>
	</div>
</section>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="entry-content">
		<?php
		the_content('Читать далее', true);

		wp_link_pages( array(
			'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'ovk-theme' ),
			'after'  => '</div>',
		) );
		?>
	</div><!-- .entry-content -->


</article><!-- #post-<?php the_ID(); ?> -->
