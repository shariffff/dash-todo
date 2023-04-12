<?php

namespace DashTodo;

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
			'supports'		=> ['title'],
			'public'      	=> false,
			'has_archive' 	=> true,
			'show_ui'		=> false,
			'show_in_rest'  => true
		]
	);
}

add_action('admin_menu', $n('admin_menu'), 100);
function admin_menu()
{
	global $n;
	$hook_name = add_submenu_page(
		'index.php',
		__('Todo', 'wp-dash_todo-settings-page-boilerplate'),
		__('Todo', 'wp-dash_todo-settings-page-boilerplate'),
		'manage_options',
		'todo',
		$n('admin_page'),
		99
	);

	add_action("load-{$hook_name}", $n('admin_page_load'));
}


function wp_enqueue_scripts()
{
	enqueue_scripts_from_asset_file('index');
}


function admin_page_load()
{
	global $n;
	add_action('admin_enqueue_scripts', $n('wp_enqueue_scripts'));
	remove_all_filters('admin_footer_text');
	remove_filter('update_footer', 'core_update_footer');
	add_filter('update_footer', $n('update_footer'));
	add_filter('admin_footer_text', fn () => null);
	add_filter('admin_body_class', $n('admin_body_class'));
}

function admin_body_class($classes)
{
	$classes .= ' dash-todo';

	return $classes;
}

function update_footer()
{
	$inspiringLines = [
		"Verily, with every difficulty there is relief. [Quran 94:5-6]",
		"Indeed, Allah is with the patient. [Quran 2:153]",
		"Do good deeds properly, sincerely and moderately. [Quran 25:61]",
		"So verily, with hardship, there is relief. [Quran 94:6]",
		"And He is with you wherever you are. [Quran 57:4]",
		"And seek help through patience and prayer. [Quran 2:45]",
		"Be kind, for whenever kindness becomes part of something, it beautifies it. [Quran 54:40]"
	];
	$random_line =  array_rand($inspiringLines);

	return "<small class='inspiring-lines' style='float: right; opacity: 0.5'>$inspiringLines[$random_line]</small>";
}

function admin_page()
{
	echo '<noscript>Enable JavaScript to visit this page</noscript><div id="TodoApp"></div>';
	if (!wp_script_is('dash-todo-index')) {

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

	$hidden_widgets = get_user_option('metaboxhidden_dashboard') ?? [];
	if (in_array('dash_todo_admin_widget', $hidden_widgets)) {
		return;
	}
	enqueue_scripts_from_asset_file('index');
});
