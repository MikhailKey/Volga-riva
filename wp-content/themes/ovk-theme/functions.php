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
	wp_enqueue_style('style', get_template_directory_uri() . '/style.css');
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

add_action('add_meta_boxes', 'management_meta_box_add');
function management_meta_box_add()
{
    if (get_the_category()[0]->name === 'Руководство компании') {
        add_meta_box('management-meta-box-id',
            'Данные руководителя',
            'management_meta_box_cb',
            'post',
            'side',
            'low'
        );
    }
}

function management_meta_box_cb()
{
    // $post is already set, and contains an object: the WordPress post
    global $post;
    $value = get_post_meta($post->ID, 'management', true);

    // We'll use this nonce field later on when saving.
    wp_nonce_field('management_meta_box_nonce', 'management_box_nonce');
    ?>
    <p>
        <label for="management_position">Должность</label>
        <input type="text" id="management_position" name="management[position]"
               value="<?php echo @$value['position']; ?>"/>
    </p>
    <p>
        <label for="management_telephone">Телефон</label>
        <input type="text" id="management_telephone" name="management[telephone]"
               value="<?php echo @$value['telephone']; ?>"/>
    </p>
    <p>
        <label for="management_email">Email</label>
        <input type="text" id="management_email" name="management[email]" value="<?php echo @$value['email']; ?>"/>
    </p>
    <?php
}

add_action('save_post', 'management_meta_box_save');
function management_meta_box_save($post_id)
{
    update_post_meta($post_id, 'management', $_POST['management']);
}

add_action('add_meta_boxes', 'application_form_meta_box_add');
function application_form_meta_box_add()
{

    add_meta_box('application-form-meta-box-id',
        'Добавить скрипт в шаблон',
        'application_form_meta_box_cb',
        'page',
        'side',
        'low'
    );
}

function application_form_meta_box_cb()
{
    // $post is already set, and contains an object: the WordPress post
    global $post;
    $value = get_post_meta($post->ID, 'application_form', true);

    // We'll use this nonce field later on when saving.
    wp_nonce_field('application_form_meta_box_nonce', 'application_form_box_nonce');
    ?>
    <p>
        <textarea id="application_form" name="application_form"><?php echo $value; ?></textarea>
    </p>
    <?php
}

add_action('save_post', 'application_form_meta_box_save');
function application_form_meta_box_save($post_id)
{
    update_post_meta($post_id, 'application_form', $_POST['application_form']);
}


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


/**
 * Хлебные крошки для WordPress (breadcrumbs)
 *
 * @param string [$sep  = '']      Разделитель. По умолчанию ' » '
 * @param array  [$l10n = array()] Для локализации. См. переменную $default_l10n.
 * @param array  [$args = array()] Опции. См. переменную $def_args
 * @return string Выводит на экран HTML код
 *
 * version 3.3.2
 */
function kama_breadcrumbs($sep = ' » ', $l10n = array(), $args = array())
{
    $kb = new Kama_Breadcrumbs;
    echo $kb->get_crumbs($sep, $l10n, $args);
}

class Kama_Breadcrumbs
{

    public $arg;

    // Локализация
    static $l10n = array(
        'home' => 'Главная',
        'paged' => 'Страница %d',
        '_404' => 'Ошибка 404',
        'search' => 'Результаты поиска по запросу - <b>%s</b>',
        'author' => 'Архив автора: <b>%s</b>',
        'year' => 'Архив за <b>%d</b> год',
        'month' => 'Архив за: <b>%s</b>',
        'day' => '',
        'attachment' => 'Медиа: %s',
        'tag' => 'Записи по метке: <b>%s</b>',
        'tax_tag' => '%1$s из "%2$s" по тегу: <b>%3$s</b>',
        // tax_tag выведет: 'тип_записи из "название_таксы" по тегу: имя_термина'.
        // Если нужны отдельные холдеры, например только имя термина, пишем так: 'записи по тегу: %3$s'
    );

    // Параметры по умолчанию
    static $args = array(
        'on_front_page' => true,  // выводить крошки на главной странице
        'show_post_title' => true,  // показывать ли название записи в конце (последний элемент). Для записей, страниц, вложений
        'show_term_title' => true,  // показывать ли название элемента таксономии в конце (последний элемент). Для меток, рубрик и других такс
        'title_patt' => '<span class="kb_title">%s</span>', // шаблон для последнего заголовка. Если включено: show_post_title или show_term_title
        'last_sep' => true,  // показывать последний разделитель, когда заголовок в конце не отображается
        'markup' => 'schema.org', // 'markup' - микроразметка. Может быть: 'rdf.data-vocabulary.org', 'schema.org', '' - без микроразметки
        // или можно указать свой массив разметки:
        // array( 'wrappatt'=>'<div class="kama_breadcrumbs">%s</div>', 'linkpatt'=>'<a href="%s">%s</a>', 'sep_after'=>'', )
        'priority_tax' => array('category'), // приоритетные таксономии, нужно когда запись в нескольких таксах
        'priority_terms' => array(), // 'priority_terms' - приоритетные элементы таксономий, когда запись находится в нескольких элементах одной таксы одновременно.
        // Например: array( 'category'=>array(45,'term_name'), 'tax_name'=>array(1,2,'name') )
        // 'category' - такса для которой указываются приор. элементы: 45 - ID термина и 'term_name' - ярлык.
        // порядок 45 и 'term_name' имеет значение: чем раньше тем важнее. Все указанные термины важнее неуказанных...
        'nofollow' => false, // добавлять rel=nofollow к ссылкам?

        // служебные
        'sep' => '',
        'linkpatt' => '',
        'pg_end' => '',
    );

    function get_crumbs($sep, $l10n, $args)
    {
        global $post, $wp_query, $wp_post_types;

        self::$args['sep'] = $sep;

        // Фильтрует дефолты и сливает
        $loc = (object)array_merge(apply_filters('kama_breadcrumbs_default_loc', self::$l10n), $l10n);
        $arg = (object)array_merge(apply_filters('kama_breadcrumbs_default_args', self::$args), $args);

        $arg->sep = '<span class="kb_sep">' . $arg->sep . '</span>'; // дополним

        // упростим
        $sep = &$arg->sep;
        $this->arg = &$arg;

        // микроразметка ---
        if (1) {
            $mark = &$arg->markup;

            // Разметка по умолчанию
            if (!$mark) $mark = array(
                'wrappatt' => '<div class="kama_breadcrumbs">%s</div>',
                'linkpatt' => '<a href="%s">%s</a>',
                'sep_after' => '',
            );
            // rdf
            elseif ($mark === 'rdf.data-vocabulary.org') $mark = array(
                'wrappatt' => '<div class="kama_breadcrumbs" prefix="v: http://rdf.data-vocabulary.org/#">%s</div>',
                'linkpatt' => '<span typeof="v:Breadcrumb"><a href="%s" rel="v:url" property="v:title">%s</a>',
                'sep_after' => '</span>', // закрываем span после разделителя!
            );
            // schema.org
            elseif ($mark === 'schema.org') $mark = array(
                'wrappatt' => '<div class="kama_breadcrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">%s</div>',
                'linkpatt' => '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a href="%s" itemprop="item"><span itemprop="name">%s</span></a></span>',
                'sep_after' => '',
            );

            elseif (!is_array($mark))
                die(__CLASS__ . ': "markup" parameter must be array...');

            $wrappatt = $mark['wrappatt'];
            $arg->linkpatt = $arg->nofollow ? str_replace('<a ', '<a rel="nofollow"', $mark['linkpatt']) : $mark['linkpatt'];
            $arg->sep .= $mark['sep_after'] . "\n";
        }

        $linkpatt = $arg->linkpatt; // упростим

        $q_obj = get_queried_object();

        // может это архив пустой таксы?
        $ptype = null;
        if (empty($post)) {
            if (isset($q_obj->taxonomy))
                $ptype = &$wp_post_types[get_taxonomy($q_obj->taxonomy)->object_type[0]];
        } else $ptype = &$wp_post_types[$post->post_type];

        // paged
        $arg->pg_end = '';
        if (($paged_num = get_query_var('paged')) || ($paged_num = get_query_var('page')))
            $arg->pg_end = $sep . sprintf($loc->paged, (int)$paged_num);

        $pg_end = $arg->pg_end; // упростим

        $out = '';

        if (is_front_page()) {
            return $arg->on_front_page ? sprintf($wrappatt, ($paged_num ? sprintf($linkpatt, get_home_url(), $loc->home) . $pg_end : $loc->home)) : '';
        } // страница записей, когда для главной установлена отдельная страница.
        elseif (is_home()) {
            $out = $paged_num ? (sprintf($linkpatt, get_permalink($q_obj), esc_html($q_obj->post_title)) . $pg_end) : esc_html($q_obj->post_title);
        } elseif (is_404()) {
            $out = $loc->_404;
        } elseif (is_search()) {
            $out = sprintf($loc->search, esc_html($GLOBALS['s']));
        } elseif (is_author()) {
            $tit = sprintf($loc->author, esc_html($q_obj->display_name));
            $out = ($paged_num ? sprintf($linkpatt, get_author_posts_url($q_obj->ID, $q_obj->user_nicename) . $pg_end, $tit) : $tit);
        } elseif (is_year() || is_month() || is_day()) {
            $y_url = get_year_link($year = get_the_time('Y'));

            if (is_year()) {
                $tit = sprintf($loc->year, $year);
                $out = ($paged_num ? sprintf($linkpatt, $y_url, $tit) . $pg_end : $tit);
            } // month day
            else {
                $y_link = sprintf($linkpatt, $y_url, $year);
                $m_url = get_month_link($year, get_the_time('m'));

                if (is_month()) {
                    $tit = sprintf($loc->month, get_the_time('F'));
                    $out = $y_link . $sep . ($paged_num ? sprintf($linkpatt, $m_url, $tit) . $pg_end : $tit);
                } elseif (is_day()) {
                    $m_link = sprintf($linkpatt, $m_url, get_the_time('F'));
                    $out = $y_link . $sep . $m_link . $sep . get_the_time('l');
                }
            }
        } // Древовидные записи
        elseif (is_singular() && $ptype->hierarchical) {
            $out = $this->_add_title($this->_page_crumbs($post), $post);
        } // Таксы, плоские записи и вложения
        else {
            $term = $q_obj; // таксономии

            // определяем термин для записей (включая вложения attachments)
            if (is_singular()) {
                // изменим $post, чтобы определить термин родителя вложения
                if (is_attachment() && $post->post_parent) {
                    $save_post = $post; // сохраним
                    $post = get_post($post->post_parent);
                }

                // учитывает если вложения прикрепляются к таксам древовидным - все бывает :)
                $taxonomies = get_object_taxonomies($post->post_type);
                // оставим только древовидные и публичные, мало ли...
                $taxonomies = array_intersect($taxonomies, get_taxonomies(array('hierarchical' => true, 'public' => true)));

                if ($taxonomies) {
                    // сортируем по приоритету
                    if (!empty($arg->priority_tax)) {
                        usort($taxonomies, function ($a, $b) use ($arg) {
                            $a_index = array_search($a, $arg->priority_tax);
                            if ($a_index === false) $a_index = 9999999;

                            $b_index = array_search($b, $arg->priority_tax);
                            if ($b_index === false) $b_index = 9999999;

                            return ($b_index === $a_index) ? 0 : ($b_index < $a_index ? 1 : -1); // меньше индекс - выше
                        });
                    }

                    // пробуем получить термины, в порядке приоритета такс
                    foreach ($taxonomies as $taxname) {
                        if ($terms = get_the_terms($post->ID, $taxname)) {
                            // проверим приоритетные термины для таксы
                            $prior_terms = &$arg->priority_terms[$taxname];
                            if ($prior_terms && count($terms) > 2) {
                                foreach ((array)$prior_terms as $term_id) {
                                    $filter_field = is_numeric($term_id) ? 'term_id' : 'slug';
                                    $_terms = wp_list_filter($terms, array($filter_field => $term_id));

                                    if ($_terms) {
                                        $term = array_shift($_terms);
                                        break;
                                    }
                                }
                            } else
                                $term = array_shift($terms);

                            break;
                        }
                    }
                }

                if (isset($save_post)) $post = $save_post; // вернем обратно (для вложений)
            }

            // вывод

            // все виды записей с терминами или термины
            if ($term && isset($term->term_id)) {
                $term = apply_filters('kama_breadcrumbs_term', $term);

                // attachment
                if (is_attachment()) {
                    if (!$post->post_parent)
                        $out = sprintf($loc->attachment, esc_html($post->post_title));
                    else {
                        if (!$out = apply_filters('attachment_tax_crumbs', '', $term, $this)) {
                            $_crumbs = $this->_tax_crumbs($term, 'self');
                            $parent_tit = sprintf($linkpatt, get_permalink($post->post_parent), get_the_title($post->post_parent));
                            $_out = implode($sep, array($_crumbs, $parent_tit));
                            $out = $this->_add_title($_out, $post);
                        }
                    }
                } // single
                elseif (is_single()) {
                    if (!$out = apply_filters('post_tax_crumbs', '', $term, $this)) {
                        $_crumbs = $this->_tax_crumbs($term, 'self');
                        $out = $this->_add_title($_crumbs, $post);
                    }
                } // не древовидная такса (метки)
                elseif (!is_taxonomy_hierarchical($term->taxonomy)) {
                    // метка
                    if (is_tag())
                        $out = $this->_add_title('', $term, sprintf($loc->tag, esc_html($term->name)));
                    // такса
                    elseif (is_tax()) {
                        $post_label = $ptype->labels->name;
                        $tax_label = $GLOBALS['wp_taxonomies'][$term->taxonomy]->labels->name;
                        $out = $this->_add_title('', $term, sprintf($loc->tax_tag, $post_label, $tax_label, esc_html($term->name)));
                    }
                } // древовидная такса (рибрики)
                else {
                    if (!$out = apply_filters('term_tax_crumbs', '', $term, $this)) {
                        $_crumbs = $this->_tax_crumbs($term, 'parent');
                        $out = $this->_add_title($_crumbs, $term, esc_html($term->name));
                    }
                }
            } // влоежния от записи без терминов
            elseif (is_attachment()) {
                $parent = get_post($post->post_parent);
                $parent_link = sprintf($linkpatt, get_permalink($parent), esc_html($parent->post_title));
                $_out = $parent_link;

                // вложение от записи древовидного типа записи
                if (is_post_type_hierarchical($parent->post_type)) {
                    $parent_crumbs = $this->_page_crumbs($parent);
                    $_out = implode($sep, array($parent_crumbs, $parent_link));
                }

                $out = $this->_add_title($_out, $post);
            } // записи без терминов
            elseif (is_singular()) {
                $out = $this->_add_title('', $post);
            }
        }

        // замена ссылки на архивную страницу для типа записи
        $home_after = apply_filters('kama_breadcrumbs_home_after', '', $linkpatt, $sep, $ptype);

        if ('' === $home_after) {
            // Ссылка на архивную страницу типа записи для: отдельных страниц этого типа; архивов этого типа; таксономий связанных с этим типом.
            if ($ptype && $ptype->has_archive && !in_array($ptype->name, array('post', 'page', 'attachment'))
                && (is_post_type_archive() || is_singular() || (is_tax() && in_array($term->taxonomy, $ptype->taxonomies)))
            ) {
                $pt_title = $ptype->labels->name;

                // первая страница архива типа записи
                if (is_post_type_archive() && !$paged_num)
                    $home_after = sprintf($this->arg->title_patt, $pt_title);
                // singular, paged post_type_archive, tax
                else {
                    $home_after = sprintf($linkpatt, get_post_type_archive_link($ptype->name), $pt_title);

                    $home_after .= (($paged_num && !is_tax()) ? $pg_end : $sep); // пагинация
                }
            }
        }

        $before_out = sprintf($linkpatt, home_url(), $loc->home) . ($home_after ? $sep . $home_after : ($out ? $sep : ''));

        $out = apply_filters('kama_breadcrumbs_pre_out', $out, $sep, $loc, $arg);

        $out = sprintf($wrappatt, $before_out . $out);

        return apply_filters('kama_breadcrumbs', $out, $sep, $loc, $arg);
    }

    function _page_crumbs($post)
    {
        $parent = $post->post_parent;

        $crumbs = array();
        while ($parent) {
            $page = get_post($parent);
            $crumbs[] = sprintf($this->arg->linkpatt, get_permalink($page), esc_html($page->post_title));
            $parent = $page->post_parent;
        }

        return implode($this->arg->sep, array_reverse($crumbs));
    }

    function _tax_crumbs($term, $start_from = 'self')
    {
        $termlinks = array();
        $term_id = ($start_from === 'parent') ? $term->parent : $term->term_id;
        while ($term_id) {
            $term = get_term($term_id, $term->taxonomy);
            $termlinks[] = sprintf($this->arg->linkpatt, get_term_link($term), esc_html($term->name));
            $term_id = $term->parent;
        }

        if ($termlinks)
            return implode($this->arg->sep, array_reverse($termlinks)) /*. $this->arg->sep*/ ;
        return '';
    }

    // добалвяет заголовок к переданному тексту, с учетом всех опций. Добавляет разделитель в начало, если надо.
    function _add_title($add_to, $obj, $term_title = '')
    {
        $arg = &$this->arg; // упростим...
        $title = $term_title ? $term_title : esc_html($obj->post_title); // $term_title чиститься отдельно, теги моугт быть...
        $show_title = $term_title ? $arg->show_term_title : $arg->show_post_title;

        // пагинация
        if ($arg->pg_end) {
            $link = $term_title ? get_term_link($obj) : get_permalink($obj);
            $add_to .= ($add_to ? $arg->sep : '') . sprintf($arg->linkpatt, $link, $title) . $arg->pg_end;
        } // дополняем - ставим sep
        elseif ($add_to) {
            if ($show_title)
                $add_to .= $arg->sep . sprintf($arg->title_patt, $title);
            elseif ($arg->last_sep)
                $add_to .= $arg->sep;
        } // sep будет потом...
        elseif ($show_title)
            $add_to = sprintf($arg->title_patt, $title);

        return $add_to;
    }

}

/**
 * Изменения:
 * 3.3 - новые хуки: attachment_tax_crumbs, post_tax_crumbs, term_tax_crumbs. Позволяют дополнить крошки таксономий.
 * 3.2 - баг с разделителем, с отключенным 'show_term_title'. Стабилизировал логику.
 * 3.1 - баг с esc_html() для заголовка терминов - с тегами получалось криво...
 * 3.0 - Обернул в класс. Добавил опции: 'title_patt', 'last_sep'. Доработал код. Добавил пагинацию для постов.
 * 2.5 - ADD: Опция 'show_term_title'
 * 2.4 - Мелкие правки кода
 * 2.3 - ADD: Страница записей, когда для главной установлена отделенная страница.
 * 2.2 - ADD: Link to post type archive on taxonomies page
 * 2.1 - ADD: $sep, $loc, $args params to hooks
 * 2.0 - ADD: в фильтр 'kama_breadcrumbs_home_after' добавлен четвертый аргумент $ptype
 * 1.9 - ADD: фильтр 'kama_breadcrumbs_default_loc' для изменения локализации по умолчанию
 * 1.8 - FIX: заметки, когда в рубрике нет записей
 * 1.7 - Улучшена работа с приоритетными таксономиями.
 */