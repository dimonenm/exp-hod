<?php
set_time_limit(0);

$json = file_get_contents('php://input');
$data = json_decode($json);

echo '- ok';
