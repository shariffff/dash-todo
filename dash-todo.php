<?php
/**
 * Plugin Name:       Simple Dashboard Todo
 * Plugin URI:        https://github.com/shariffff/dash-todo
 * Description:       A simple todo management plugin for WordPress site admin. Stay consistent and never forget anything.
 * Text Domain:       dash-todo
 * Domain Path:       /languages
 * Author:            Sharif Mohammad Eunus
 * Author URI:       https://sharifff.com
 * Version:           1.1.5
 * Requires at least: 6.0
 * Tested up to:      6.5
 * Requires PHP:      7.4
 *
 * @package DashTodo
 */

namespace DashTodo;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


define( 'DASH_TODO_PLUGIN_VERSION', '1.1.5' );
define( 'DASH_TODO_PLUGIN_FILE', __FILE__ );

/**
 * The main plugin class
 */
class Dash_Todo_Plugin {

	/**
	 * The plugin instance
	 *
	 * @var Dash_Todo_Plugin
	 */
	private static $instance;

	/**
	 * Initialize the plugin
	 *
	 * @return Dash_Todo_Plugin
	 */
	public static function init() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Dash_Todo_Plugin constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'todo_cpt' ), 0 );
		add_action( 'admin_menu', array( $this, 'menu' ), 100 );
		add_action( 'wp_dashboard_setup', array( $this, 'admin_widget' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( __DIR__ ) . '/dash-todo.php', array( $this, 'plugin_link' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'widget_assets' ) );
	}

	/**
	 * Register the Todo custom post type
	 */
	public function todo_cpt() {
		register_post_type(
			'todo',
			array(
				'labels'       => array(
					'name'          => __( 'Todo', 'dash-todo' ),
					'singular_name' => __( 'Todo', 'dash-todo' ),
				),
				'supports'     => array( 'title', 'page-attributes', 'excerpt' ),
				'public'       => false,
				'has_archive'  => true,
				'show_ui'      => false,
				'show_in_rest' => true,
			)
		);
	}

	/**
	 * Add the Todo menu to the admin menu
	 */
	public function menu() {
		$hook_name = add_submenu_page(
			'index.php',
			__( 'Todo', 'dash-todo' ),
			__( 'Todo', 'dash-todo' ),
			'manage_options',
			'todo',
			array( $this, 'dom' ),
			99
		);

		add_action( "load-{$hook_name}", array( $this, 'todo_area_loaded' ) );
	}

	/**
	 * Cleanup screen for the Todo area
	 */
	public function todo_area_loaded() {
		remove_all_filters( 'admin_footer_text' );
		remove_filter( 'update_footer', 'core_update_footer' );
		add_filter( 'admin_footer_text', '__return_null' );
		add_action( 'admin_enqueue_scripts', array( $this, 'frontend_assets' ) );
		add_filter( 'admin_body_class', fn( $classes ) => "{$classes} dash-todo" );
	}

	/**
	 * Render the Todo app
	 */
	public function dom() {
		echo '<noscript>Enable JavaScript to visit this page</noscript>
			<div id="TodoApp"></div>';
		if ( ! wp_script_is( 'dash-todo' ) ) {
			esc_html_e( 'Please reload to see the todo items.', 'dash-todo' );
		}
	}

	/**
	 * Add a link to the Todo area in the plugin list
	 *
	 * @param array $links The existing plugin links.
	 *
	 * @return array
	 */
	public function plugin_link( $links ) {
		return array_merge(
			array( '<a href="' . admin_url( 'index.php?page=todo' ) . '">Todo</a>' ),
			$links
		);
	}

	/**
	 * Add the Todo widget to the admin dashboard
	 */
	public function admin_widget() {
		wp_add_dashboard_widget(
			'dash_todo_admin_widget',
			esc_html__( 'Todo', 'dash-todo' ),
			array( $this, 'dom' )
		);
	}

	/**
	 * Enqueue the frontend assets
	 */
	public function frontend_assets() {
		$script_asset_path = dirname( DASH_TODO_PLUGIN_FILE ) . '/build/index.asset.php';
		if ( file_exists( $script_asset_path ) ) {
			$script_asset        = include $script_asset_path;
			$script_dependencies = $script_asset['dependencies'] ?? array();

			wp_enqueue_script( 'dash-todo', plugins_url( 'build/index.js', DASH_TODO_PLUGIN_FILE ), $script_dependencies, DASH_TODO_PLUGIN_VERSION, true );

			wp_enqueue_style( 'dash-todo', plugins_url( 'build/index.css', DASH_TODO_PLUGIN_FILE ), array( 'wp-components' ), DASH_TODO_PLUGIN_VERSION, false );
		}
	}

	/**
	 * Enqueue the widget assets if the widget is visible
	 */
	public function widget_assets() {
		global $pagenow;
		$hidden_widgets = get_user_option( 'metaboxhidden_dashboard' ) ?? array();
		if ( is_array( $hidden_widgets ) && in_array( 'dash_todo_admin_widget', $hidden_widgets, true ) ) {
			return;
		}
		if ( is_admin() && ( 'index.php' === $pagenow ) ) {
			$this->frontend_assets();
		}
	}

	/**
	 * Add some sample todo items on plugin activation
	 */
	public static function sample_todo_items() {
		$installed = get_option( 'dash_todo_installed' );
		if ( $installed ) {
			return;
		}
		$initial_todo_items = array(
			array(
				'post_title'   => 'Install and Activate Dash Todo',
				'post_status'  => 'publish',
				'post_type'    => 'todo',
				'post_excerpt' => gmdate( 'F j, Y' ),
				'menu_order'   => 3,

			),
			array(
				'post_title'   => 'Create a new Todo',
				'post_status'  => 'pending',
				'post_type'    => 'todo',
				'post_excerpt' => gmdate( 'F j, Y' ),
				'menu_order'   => 1,

			),
		);

		update_option( 'dash_todo_installed', time() );
		foreach ( $initial_todo_items as $item ) {
			wp_insert_post( $item );
		}
	}
}

register_activation_hook(
	__FILE__,
	fn() => Dash_Todo_Plugin::sample_todo_items()
);

Dash_Todo_Plugin::init();
