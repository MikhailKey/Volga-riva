<section class="blog-item">
    <div class="container">
        <div class="blog-item-wrap">
            <div class="page-header">
                <img src="/wp-content/themes/ovk-theme/assets/img/header/title-line.png" alt="">
                <h1 class="regular-title">Блог</h1>
            </div>
            <div class="bread-crums"> </div>
            <div class="blog-item-content">
                <h1 class="simple-title blog-item-padding"><?php echo the_title(); ?></h1>
                <p class="blog-subtitle blog-item-padding"><?php echo get_the_date('d F Y'); ?></p>
                <p class="blog-text">
                    <?php echo the_content(); ?>
                </p>
            </div>
            <div class="blog-arrows">
                <a href="<?php echo get_permalink(get_previous_post()) ?>" class="blog-arrow">
                    <div class="svg" data-src="/wp-content/themes/ovk-theme/assets/img/icons/blog-arrow-left.svg"></div>
                    <p>Предыдущая новость</p>
                </a>
                <a href="<?php echo get_permalink(get_next_post()) ?>" class="blog-arrow">
                    <p>Следующая новость</p>
                    <div class="svg arrow-right" data-src="/wp-content/themes/ovk-theme/assets/img/icons/blog-arrow-left.svg"></div>
                </a>
            </div>
        </div>
    </div>
</section>