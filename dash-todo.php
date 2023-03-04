<?php

/**
 * Plugin Name:       Dash Todo
 * Plugin URI:        https://github.com/sharifff/dash-todo
 * Description:       A todo plugin for WordPress admins.
 * Text Domain:       dash-todo
 * Domain Path:       /languages
 * Author:            Sharif Mohammad Eunus
 * Author URI:        https://sharifff.com/
 * Version:           0.0.1
 * Requires at least: 6.0
 * Tested up to:      6.1.1
 * Requires PHP:      8.0
 */

namespace DashTodo;

if (!defined('ABSPATH')) {
	exit;
}

define('DASH_TODO_PATH', \plugin_dir_path(__FILE__));
define('DASH_TODO_URL', \plugins_url('/', __FILE__));
define('DASH_TODO_PLUGIN_FILE', __FILE__);
define('DASH_TODO_PLUGIN_DIR', __DIR__);
define('DASH_TODO_VERSION', '0.0.1');

require 'includes/enqueue-scripts-from-asset-file.php';
require 'includes/admin-page.php';


register_activation_hook(__FILE__, 'flush_rewrite_rules');
register_activation_hook(__FILE__, function () {
	unregister_post_type('todo');
	flush_rewrite_rules();
});
