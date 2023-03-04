<?php

namespace DashTodo {
	add_action('init', __NAMESPACE__ . '\\dash_todo_register_post_type', 0);

	function dash_todo_register_post_type()
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


	/**
	 * Includes asset.
	 *
	 * @return void
	 */
	function wp_enqueue_scripts()
	{
		enqueue_scripts_from_asset_file('settings', DASH_TODO_PLUGIN_FILE);

		wp_localize_script('dash-todo-settings', 'DASH_TODO', apply_filters('DASH_TODO_variables', []));

		// wp_set_script_translations( 'dash-todo-core', 'dash-todo', plugin_dir_path( DASH_TODO_PLUGIN_FILE ) . 'languages/' ); ?
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

		return "<small style='float: right; opacity: 0.4'>$lines[$random_line]</small>";
	}

	function admin_footer_text()
	{
		return '';
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
}
