<?php

namespace DashTodo;

if (!defined('ABSPATH')) {
	exit;
}
$n = function ($function) {
	return __NAMESPACE__ . "\\$function";
};

add_action('init', $n('todo_post_type'), 0);
function todo_post_type()
{

	register_post_type(
		'todo',
		[
			'labels' 		=> [
				'name'          => __('Todo', 'dash-todo'),
				'singular_name' => __('Todo', 'dash-todo')
			],
			'supports'		=> ['title', 'page-attributes', 'excerpt'],
			'public'      	=> false,
			'has_archive' 	=> true,
			'show_ui'		=> false,
			'show_in_rest'  => true,
		]
	);
}

add_action('admin_menu', $n('admin_menu'), 100);
function admin_menu()
{
	global $n;
	$hook_name = add_submenu_page(
		'index.php',
		__('Todo', 'dash-todo'),
		__('Todo', 'dash-todo'),
		'manage_options',
		'todo',
		$n('admin_page'),
		99
	);

	add_action("load-{$hook_name}", $n('admin_page_load'));
}


function admin_page_load()
{
	global $n;
	add_action('admin_enqueue_scripts', $n('enqueue_scripts_from_asset_file'));
	remove_all_filters('admin_footer_text');
	remove_filter('update_footer', 'core_update_footer');
	add_filter('admin_footer_text', fn () => null);
	add_filter('admin_body_class', $n('admin_body_class'));
}

function admin_body_class($classes)
{
	$classes .= ' dash-todo';

	return $classes;
}


function admin_page()
{

	echo '<noscript>Enable JavaScript to visit this page</noscript><div id="TodoApp"></div>';
	if (!wp_script_is('dash-todo')) {
		_e('Please reload to see the todo items.', 'dash-todo');
	}
}

add_filter('plugin_action_links_' . plugin_basename(dirname(__FILE__, 2)) . '/dash-todo.php', $n('action_links'));

function action_links($links)
{
	$todo_link = array(
		'<a href="' . admin_url('index.php?page=todo') . '">Todo</a>',
	);
	return array_merge($todo_link, $links);
}

add_action('wp_dashboard_setup', $n('dash_todo_admin_widget'));
function dash_todo_admin_widget()
{
	global $n;
	wp_add_dashboard_widget(
		'dash_todo_admin_widget',
		esc_html__('Todo', 'dash-todo'),
		$n('admin_page')
	);
}

add_action('admin_enqueue_scripts', function () {
	global $pagenow;
	$hidden_widgets = get_user_option('metaboxhidden_dashboard');
	if (is_array($hidden_widgets) && in_array('dash_todo_admin_widget', $hidden_widgets)) {
		return;
	}
	if (is_admin() && $pagenow === 'index.php') {
		enqueue_scripts_from_asset_file();
	}
});
function enqueue_scripts_from_asset_file()
{
	if (!$manifest = realpath(__DIR__ . '/dist/entrypoints.json')) {
		throw new \Exception('Example: you must run `yarn build` before using this plugin.');
	}

	$entry_points = json_decode(file_get_contents($manifest));

	wp_enqueue_script("dash-todo", plugins_url("dist/js/app.js", DASH_TODO_PLUGIN_FILE), $entry_points->app->dependencies, null, true);


	$style_dependencies = [];

	if (in_array('wp-components', $entry_points->app->dependencies, true)) {
		$style_dependencies[] = 'wp-components';
	}
	wp_enqueue_style("dash-todo", plugins_url("dist/css/app.css", DASH_TODO_PLUGIN_FILE), $style_dependencies, null, false);
}
