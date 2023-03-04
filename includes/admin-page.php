<?php

namespace DashTodo {
	add_action('init', __NAMESPACE__ . '\\todo_post_type', 0);

	function todo_post_type()
	{
		register_post_type(
			'todo',
			[
				'labels' 		=> [
					'name'          => __('Todo', 'dash-todo'),
					'singular_name' => __('Todo', 'dash-todo')
				],
				'public'      	=> false,
				'has_archive' 	=> true,
				'show_ui'		=> false,
				'show_in_rest'  => true
			]
		);
	}

	add_action('admin_menu', __NAMESPACE__ . '\\admin_menu', 100);

	function admin_menu()
	{
		$hook_name = add_submenu_page(
			'index.php',
			__('Todo', 'wp-dash_todo-settings-page-boilerplate'),
			__('Todo', 'wp-dash_todo-settings-page-boilerplate'),
			'manage_options',
			'todo',
			__NAMESPACE__ . '\\admin_page',
			99
		);

		add_action("load-{$hook_name}", __NAMESPACE__ . '\\admin_page_load');
	}


	function wp_enqueue_scripts()
	{
		enqueue_scripts_from_asset_file('settings', DASH_TODO_PLUGIN_FILE);
	}

	function admin_page_load()
	{
		add_action('admin_enqueue_scripts', __NAMESPACE__ . '\\wp_enqueue_scripts');
		remove_all_filters('admin_footer_text');
		remove_filter('update_footer', 'core_update_footer');
		add_filter('update_footer', __NAMESPACE__ . '\\update_footer');
		add_filter('admin_footer_text', fn () => null);
		add_filter('admin_body_class', __NAMESPACE__ . '\\admin_body_class');
	}

	function admin_body_class($classes)
	{
		$classes .= ' dash-todo';

		return $classes;
	}

	function update_footer()
	{
		$lines = [
			'So truly where there is hardship there is also ease.',
			'And “Peace” a word from a Merciful Lord.'

		];
		$random_line =  array_rand($lines);

		return "<small style='float: right; opacity: 0.3'>$lines[$random_line]</small>";
	}

	function admin_page()
	{
		echo <<<HTML
		<noscript>
			<div class="no-js">
				Warning: This options panel will not work properly without JavaScript, please enable it.
			</div>
		</noscript>
		<div id="ui-loading">Loading...</div>
		<div id="app"></div>
		HTML;
	}

	add_filter('plugin_action_links_' . plugin_basename(dirname(__FILE__, 2)) . '/dash-todo.php', __NAMESPACE__ . '\\action_links');

	function action_links($links)
	{
		$todo_link = array(
			'<a href="' . admin_url('index.php?page=todo') . '">Todo</a>',
		);
		return array_merge($todo_link, $links);
	}
}
