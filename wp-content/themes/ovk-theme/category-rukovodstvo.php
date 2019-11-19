<?php

$category = get_the_category();
rsort($category);
$cat_add_id = $category[0]->term_id;

?>

<?php get_header(); ?>

    <section class="leadership">
        <div class="container">
            <div class="lead-wrap">
                <div class="secondary-title__wrap">
                    <h1 class="secondary-title"><?php echo single_cat_title(); ?></h1>
                </div>
                <!-- <div class="page-header">
                    <img src="/wp-content/themes/ovk-theme/assets/img/header/title-line.png" alt="">
                    <h1 class="regular-title"><?php echo single_cat_title(); ?></h1>
                </div> -->
                <div class="lead-list">
                    <?php foreach (get_posts(array('orderby' => 'date', 'order' => 'ASC', 'cat' => $cat_add_id)) as $post) { ?>
                        <?php $management_data = get_post_meta($post->ID, 'management', true); ?>
                        <div class="lead-item">
                            <?php the_post_thumbnail(); ?>
                            <div class="lead-item-info">
                                <a href='<?php echo $post->guid; ?>'><h1><?php echo $post->post_title; ?></h1></a>
                                <p><?php echo $management_data['position']; ?></p>
                                <h3><?php echo $management_data['telephone']; ?></h3>
                                <h3><?php echo $management_data['email']; ?></h3>
                                <a href='<?php echo $post->guid; ?>' class="simple-button lead-button">подробнее</a>
                            </div>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </section>



<?php get_footer(); ?>