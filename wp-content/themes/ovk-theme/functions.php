<?php
/**
 * ovk-theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package ovk-theme
 */

if ( ! function_exists( 'ovk_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function ovk_theme_setup() {
		register_nav_menu('primary_menu', 'Меню частным лицам');
		register_nav_menu('hamburger_menu', 'Меню гамбургер');
		register_nav_menu( 'main_menu', 'Верхнее меню' );
		register_nav_menu( 'business_menu', 'Меню бизнесу');
		register_nav_menu( 'bottom_first', 'Первая строка меню в футере' );
		register_nav_menu( 'bottom_second', 'Вторая строка меню в футере' );

		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on ovk-theme, use a find and replace
		 * to change 'ovk-theme' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'ovk-theme', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'ovk_theme_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'ovk_theme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function ovk_theme_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'ovk_theme_content_width', 640 );
}
add_action( 'after_setup_theme', 'ovk_theme_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function ovk_theme_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'ovk-theme' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'ovk-theme' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'ovk_theme_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function ovk_theme_style() {
	wp_enqueue_style('style', get_template_directory_uri());
	wp_enqueue_style( 'ovk-theme-style', get_template_directory_uri() . '/assets/css/main.css' );
	wp_enqueue_style('owl-carousel-css', get_template_directory_uri() . '/assets/vendors/owl-carousel/owl.carousel.min.css');
	wp_enqueue_style('fancybox-css', get_template_directory_uri() . '/assets/vendors/fancybox/jquery.fancybox.min.css');
	wp_enqueue_style('owl-carousel-default', get_template_directory_uri() . '/assets/vendors/owl-carousel/owl.theme.default.min.css');
}
add_action( 'wp_enqueue_scripts', 'ovk_theme_style' );

function ovk_theme_scripts() {
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jQuery-last', get_template_directory_uri() . '/assets/vendors/jQuery/jquery-3.0.0.min.js');
	wp_enqueue_script( 'jQuery-last' );
	wp_enqueue_script('owl-carousel', get_template_directory_uri() . '/assets/vendors/owl-carousel/owl.carousel.min.js');
	wp_enqueue_script('fancybox-js', get_template_directory_uri() . '/assets/vendors/fancybox/jquery.fancybox.min.js');
	wp_enqueue_script('script-js', get_template_directory_uri() . '/assets/js/script.js');

}
add_action( 'wp_footer', 'ovk_theme_scripts');
/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

add_action( 'add_meta_boxes', 'cd_meta_box_add' );
function cd_meta_box_add()
{
    add_meta_box( 'my-meta-box-id', 
    'Дополнительные атрибуты', 
    'cd_meta_box_cb', 
    'page', 
    'side', 
    'low'
    );
}

function cd_meta_box_cb()
{
    // $post is already set, and contains an object: the WordPress post
    global $post;
    $value = get_post_meta( $post->ID,'is_business',true );
     
    // We'll use this nonce field later on when saving.
    wp_nonce_field( 'my_meta_box_nonce', 'meta_box_nonce' );
    ?>
    <p>
        <input type="checkbox" id="is_business" name="is_business" <?php checked( true, $value, true ); ?> />
        <label for="is_business">Бизнес страница</label>
    </p>
    <?php    
}

add_action( 'save_post', 'cd_meta_box_save' );
function cd_meta_box_save( $post_id )
{
    // This is purely my personal preference for saving check-boxes
    $chk = isset( $_POST['is_business'] ) ? true : false;
    update_post_meta( $post_id, 'is_business', $chk );
}

add_filter( 'category_description', 'do_shortcode' );





/**
 * WordPress Bootstrap Pagination
 */
function wp_tools_pagination( $args = array() ) {
    
    $defaults = array(
        'range'           => 4,
        'custom_query'    => FALSE,
        'previous_string' => __( '&#8249;', 'text-domain' ),
        'next_string'     => __( '&#8250;', 'text-domain' ),
        'before_output'   => '<div class="pagination"><ul class="pagination-numbers">',
        'after_output'    => '</ul></div>'
    );
    
    $args = wp_parse_args( 
        $args, 
        apply_filters( 'wp_bootstrap_pagination_defaults', $defaults )
    );
    
    $args['range'] = (int) $args['range'] - 1;
    if ( !$args['custom_query'] )
        $args['custom_query'] = @$GLOBALS['wp_query'];
    $count = (int) $args['custom_query']->max_num_pages;
    $page  = intval( get_query_var( 'paged' ) );
    $ceil  = ceil( $args['range'] / 2 );
    
    if ( $count <= 1 )
        return FALSE;
    
    if ( !$page )
        $page = 1;
    
    if ( $count > $args['range'] ) {
        if ( $page <= $args['range'] ) {
            $min = 1;
            $max = $args['range'] + 1;
        } elseif ( $page >= ($count - $ceil) ) {
            $min = $count - $args['range'];
            $max = $count;
        } elseif ( $page >= $args['range'] && $page < ($count - $ceil) ) {
            $min = $page - $ceil;
            $max = $page + $ceil;
        }
    } else {
        $min = 1;
        $max = $count;
    }
    
    $echo = '';
    $previous = intval($page) - 1;
    $previous = esc_attr( get_pagenum_link($previous) );
    
   
    if ( $previous && (1 != $page) )
        $echo .= '<li><a href="' . $previous . '" title="' . __( 'previous', 'text-domain') . '"class="pagination-number pagination-arrow" >' . $args['previous_string'] . '</a></li>';
    
    if ( !empty($min) && !empty($max) ) {
        for( $i = $min; $i <= $max; $i++ ) {
            if ($page == $i) {
                $echo .= '<li class="active"><span class="pagination-number pagination-current">' . str_pad( (int)$i, 1, '0', STR_PAD_LEFT ) . '</span></li>';
            } else {
                $echo .= sprintf( '<li><a class="pagination-number" href="%s">%2d</a></li>', esc_attr( get_pagenum_link($i) ), $i );
            }
        }
    }
    
    $next = intval($page) + 1;
    $next = esc_attr( get_pagenum_link($next) );
    if ($next && ($count != $page) )
        $echo .= '<li><a href="' . $next . '" title="' . __( 'next', 'text-domain') . '" class="pagination-number pagination-arrow">' . $args['next_string'] . '</a></li>';
    
    
    if ( isset($echo) )
        echo $args['before_output'] . $echo . $args['after_output'];
}