<?php

namespace DashTodo;

defined( 'ABSPATH' ) or exit;

class Dash_Todo_Class {

	private static $instance;
	public static function get_instance() {
		if ( null == self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	public function __construct() {
		add_action( 'init', [ $this, 'todo_cpt' ], 0 );
		add_action( 'admin_menu', [ $this, 'menu' ], 100 );
		add_action( 'wp_dashboard_setup', [ $this, 'admin_widget' ] );
		add_filter( 'plugin_action_links_' . plugin_basename( dirname( __FILE__ ) ) . '/dash-todo.php', [ $this, 'plugin_link' ] );
		add_action( 'admin_enqueue_scripts', function () {
			global $pagenow;
			$hidden_widgets = get_user_option( 'metaboxhidden_dashboard' );
			if ( is_array( $hidden_widgets ) && in_array( 'dash_todo_admin_widget', $hidden_widgets ) ) {
				return;
			}
			if ( is_admin() && $pagenow === 'index.php' ) {
				$this->frontend_assets();
			}
		} );
	}

	public function todo_cpt() {
		register_post_type(
			'todo',
			[ 
				'labels' => [ 
					'name' => __( 'Todo', 'dash-todo' ),
					'singular_name' => __( 'Todo', 'dash-todo' )
				],
				'supports' => [ 'title', 'page-attributes', 'excerpt' ],
				'public' => false,
				'has_archive' => true,
				'show_ui' => false,
				'show_in_rest' => true,
			]
		);
	}

	public function menu() {
		$hook_name = add_submenu_page(
			'index.php',
			__( 'Todo', 'dash-todo' ),
			__( 'Todo', 'dash-todo' ),
			'manage_options',
			'todo',
			[ $this, 'dom' ],
			99
		);

		add_action( "load-{$hook_name}", [ $this, 'todo_area_loaded' ] );
	}

	public function todo_area_loaded() {
		add_action( 'admin_enqueue_scripts', [ $this, 'frontend_assets' ] );
		remove_all_filters( 'admin_footer_text' );
		remove_filter( 'update_footer', 'core_update_footer' );
		add_filter( 'admin_footer_text', fn() => null );
		add_filter( 'admin_body_class', function ($classes) {
			$classes .= ' dash-todo';
			return $classes;
		} );
	}

	public function dom() {
		echo '<noscript>
				Enable JavaScript to visit this page
			</noscript>
			<div id="TodoApp"></div>';
		if ( ! wp_script_is( 'dash-todo' ) ) {
			_e( 'Please reload to see the todo items.', 'dash-todo' );
		}
	}

	public function plugin_link( $links ) {
		$todo_link = array(
			'<a href="' . admin_url( 'index.php?page=todo' ) . '">Todo</a>',
		);
		return array_merge( $todo_link, $links );
	}

	public function admin_widget() {
		wp_add_dashboard_widget(
			'dash_todo_admin_widget',
			esc_html__( 'Todo', 'dash-todo' ),
			[ $this, 'dom' ]
		);
	}

	public function frontend_assets() {
		$script_asset_path = dirname( DASH_TODO_PLUGIN_FILE ) . "/build/index.asset.php";
		if ( file_exists( $script_asset_path ) ) {
			$script_asset = include $script_asset_path;
			$script_dependencies = $script_asset['dependencies'] ?? [];

			wp_enqueue_script( "dash-todo", plugins_url( "build/index.js", DASH_TODO_PLUGIN_FILE ), $script_dependencies, DASH_TODO_PLUGIN_VERSION, true );

			wp_enqueue_style( "dash-todo", plugins_url( "build/index.css", DASH_TODO_PLUGIN_FILE ), [ 'wp-components' ], DASH_TODO_PLUGIN_VERSION, false );
		}
	}


	public static function sample_todo_items() {
		$installed = get_option( 'dash_todo_installed' );
		if ( $installed ) {
			return;
		}
		$initial_todo_items = [ 
			[ 
				'post_title' => 'Install and Activate Dash Todo',
				'post_status' => 'publish',
				'post_type' => 'todo',
				'post_excerpt' => date( "F j, Y" ),
				'menu_order' => 3

			],
			[ 
				'post_title' => 'Create a new Todo',
				'post_status' => 'pending',
				'post_type' => 'todo',
				'post_excerpt' => date( "F j, Y" ),
				'menu_order' => 1

			]
		];

		update_option( 'dash_todo_installed', time() );
		foreach ( $initial_todo_items as $item ) {
			wp_insert_post( $item );
		}

	}

}