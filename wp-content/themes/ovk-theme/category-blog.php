<?php

$category = get_the_category();
rsort($category);
$cat_add_id = $category[0]->term_id;
$paged = get_query_var('paged') ? get_query_var('paged') : 1;
$posts = new WP_Query(array('paged' => $paged, 'orderby' => 'date', 'order' => 'DESC', 'cat' => $cat_add_id));
$posts = $posts->posts;
?>

<?php get_header(); ?>



<section class="blog">
	<div class="container">
		<div class="blog-wrap">
			<div class="secondary-title__wrap">
                <h1 class="secondary-title"><?php echo single_cat_title(); ?></h1>
            </div>
			<!-- <div class="page-header">
				<img src="/wp-content/themes/ovk-theme/assets/img/header/title-line.png" alt="">
				<h1 class="regular-title"><?php echo single_cat_title(); ?></h1>
			</div> -->
			<?php foreach ($posts as $post) { ?>
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