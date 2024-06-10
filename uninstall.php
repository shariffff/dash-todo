<?php
/**
 * Uninstall the plugin
 *
 * @package DashTodo
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die;
}

$all_todo = get_posts(
	array(
		'post_type'   => 'todo',
		'numberposts' => -1,
		'fields'      => 'ids',
	)
);
foreach ( $all_todo as $todo ) {
	wp_delete_post( $todo, true );
}

delete_option( 'dash_todo_installed' );
