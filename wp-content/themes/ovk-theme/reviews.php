<?php
/*
 * Template Name: Отзывы
 * Template Post Type: page
 */

?>

<?php global $post; ?>

<?php get_header(); ?>

<section class="reviews">
    <div class="container">
        <div class="reviews-wrap">
            <div class="page-header">
                <img src="/wp-content/themes/ovk-theme/assets/img/header/title-line.png" alt="" />
                <h1>Отзывы</h1>
            </div>
            <div class="reviews-examples">
                <?php echo $post->post_content; ?>
            </div>

            <a class="reviews-more" href="http://ovk.asap-lp.ru/otzivy-gallery/">Посмотреть больше отзывов</a>

            <div class="reviews-list">
                <?php echo do_shortcode('[WPCR_SHOW SHOWFORM="1" PAGINATE="1" PERPAGE="1" POSTID="' . $post->ID . '"]'); ?>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
