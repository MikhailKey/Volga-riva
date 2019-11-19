<?php

$category = get_the_category();
rsort($category);
$cat_add_id = $category[0]->term_id;
$paged = get_query_var('paged') ? get_query_var('paged') : 1;
$posts = new WP_Query(array('paged' => $paged, 'orderby' => 'date', 'order' => 'DESC', 'cat' => $cat_add_id));
$posts = $posts->posts;
?>

<?php get_header(); ?>

    <section class="smi">
        <div class="container">
            <div class="smi-wrap">
                <div class="secondary-title__wrap">
                    <h1 class="secondary-title"><?php echo single_cat_title(); ?></h1>
                </div>
                <!-- <div class="page-header">
                    <img src="/wp-content/themes/ovk-theme/assets/img/header/title-line.png" alt="">
                    <h1 class="regular-title"><?php echo single_cat_title(); ?></h1>
                </div> -->
                <?php foreach ($posts as $post) { ?>
                    <div class="simple-list">
                        <div class="simple-item">
                            <a href='<?php echo $post->guid; ?>'> <p class="simple-title"><?php echo $post->post_title; ?></p></a>
                            <p class="simple-subtitle smi-subtitle"><?php echo get_the_excerpt( $post->ID ); ?></p>
                            <a href='<?php echo $post->guid; ?>' class="simple-button">Читать статью</a>
                        </div>
                    </div>
                <?php } ?>
                <div class="smi-video">
                    <h1 class="simple-title smi-title">Видео</h1>
                    <?php echo do_shortcode('[slide-anything id="364"]'); ?>
                </div>
            </div>
        </div>
    </section>



<?php get_footer(); ?>