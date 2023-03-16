<?php

namespace DashTodo;

function enqueue_scripts_from_asset_file($name)
{
	$script_asset_path = dirname(DASH_TODO_PLUGIN_FILE) . "/build/$name.asset.php";
	if (file_exists($script_asset_path)) {
		$script_asset = include $script_asset_path;
		$script_dependencies = $script_asset['dependencies'] ?? [];


		if (in_array('wp-react-refresh-runtime', $script_asset['dependencies'], true) && !constant('SCRIPT_DEBUG')) {
			wp_die(esc_html__('SCRIPT_DEBUG should be true to run HMR.', 'dash-todo'));
		}

		wp_enqueue_script("dash-todo-$name", plugins_url("build/$name.js", DASH_TODO_PLUGIN_FILE), $script_dependencies, $script_asset['version'], true);

		$style_dependencies = [];


		if (in_array('wp-components', $script_dependencies, true)) {
			$style_dependencies[] = 'wp-components';
		}

		wp_enqueue_style("dash-todo-$name", plugins_url("build/$name.css", DASH_TODO_PLUGIN_FILE), $style_dependencies, $script_asset['version'], 'all');
	}
}
