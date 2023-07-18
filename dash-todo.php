<?php

/**
 * Plugin Name:       Dash Todo
 * Plugin URI:        https://github.com/shariffff/dash-todo
 * Description:       A Todo management plugin for WordPress site admin. Stay consistent and never forget anything.
 * Text Domain:       dash-todo
 * Domain Path:       /languages
 * Author:            Sharif Mohammad Eunus
 * Author URI:       https://sharifff.com
 * Version:           1.1.1
 * Requires at least: 5.9
 * Tested up to:      6.3
 * Requires PHP:      7.4
 */

namespace DashTodo;

defined( 'ABSPATH' ) or exit;


define( 'DASH_TODO_PLUGIN_VERSION', '1.1.1' );
define( 'DASH_TODO_PLUGIN_FILE', __FILE__ );

require_once __DIR__ . '/dash-todo-class.php';

Dash_Todo_Class::get_instance();

register_activation_hook( __FILE__, fn() => Dash_Todo_Class::sample_todo_items() );