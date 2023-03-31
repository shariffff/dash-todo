<?php

if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

$all_todo = get_posts(
    [
        'post_type' => 'todo',
        'numberposts' => -1,
        'fields' => 'ids'
    ]
);
foreach ($all_todo as $todo) {
    wp_delete_post($todo, true);
}
