<?php

$category = get_the_category();
rsort($category);
$cat_add_id = $category[0]->term_id;

 ?>

<?php get_header(); ?>

<section class="blog">
	<div class="container">
		<div class="blog-wrap">
			<div class="page-header">
				<img src="/wp-content/themes/ovk-theme/assets/img/header/title-line.png" alt="">
				<h1 class="regular-title"><?php echo single_cat_title(); ?></h1>
			</div>
			<?php foreach (get_posts(array('orderby' => 'date', 'order' => 'DESC', 'cat' => $cat_add_id)) as $post) { ?>
			<div class="blog-list">
				<div class="blog-item">
					<p class="blog-subtitle"><?php echo get_the_date('d F Y', $post->ID); ?></p>
					<a href='<?php echo $post->guid; ?>' class="blog-title"><?php echo $post->post_title; ?></a>
					<a href='<?php echo $post->guid; ?>' class="simple-button blog-button">Читать статью</a>
				</div>
			</div>
			<?php } ?>
		</div>
		<?php wp_tools_pagination(); ?>
	</div>
</section>



<?php get_footer(); ?>