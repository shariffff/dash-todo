<?php

/**
 * Plugin Name:       Dash Todo
 * Plugin URI:        https://github.com/shariffff/wp-starter-plugin
 * Description:       A Todo management plugin for WordPress site admin. Stay consistent and never forget anything.
 * Text Domain:       dash-todo
 * Domain Path:       /languages
 * Author:            Sharif Mohammad Eunus
 * Author URI:       https://sharifff.com
 * Version:           1.0.3
 * Requires at least: 5.9
 * Tested up to:      6.2
 * Requires PHP:      7.4
 */

namespace DashTodo;

if (!defined('ABSPATH')) {
	exit;
}




define('DASH_TODO_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('DASH_TODO_PLUGIN_URL', plugins_url('/', __FILE__));
define('DASH_TODO_PLUGIN_FILE', __FILE__);
define('DASH_TODO_PLUGIN_DIR', __DIR__);
define('DASH_TODO_PLUGIN_VERSION', '1.0.3');

require 'includes/enqueue-scripts-from-asset-file.php';
require 'includes/admin-page.php';





register_activation_hook(__FILE__, __NAMESPACE__ . '\\create_demo_todo_items');

function create_demo_todo_items()
{
	$installed = get_option('dash_todo_installed');
	$initial_todo_items = [
		[
			'post_title'    => 'Install and Activate Dash Todo',
			'post_status'   => 'publish',
			'post_type'   => 'todo'
		],
		[
			'post_title'    => 'Create a new Todo',
			'post_status'   => 'pending',
			'post_type'   => 'todo'

		]
	];
	if (!$installed) {
		update_option('dash_todo_installed', time());
		foreach ($initial_todo_items as $item) {
			wp_insert_post($item);
		}
	}
}
