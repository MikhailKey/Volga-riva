<?php
/*
 * Template Name: Форма отправки заявок
 * Template Post Type: page
 */

global $post;

$script = get_post_meta($post->ID, 'application_form', true);

?>

<?php get_header(); ?>

    <!--<section class="regular">
        <div class="container">
            <div class="page-header">
                <img src="/wp-content/themes/ovk-theme/assets/img/header/title-line.png" alt="" />
                <h1 class="regular-title"><?php /*echo the_title(); */?></h1>
            </div>
        </div>
    </section>-->
    <div class="form-container">
        <?php echo $script; ?>
    </div>
<?php get_footer(); ?>