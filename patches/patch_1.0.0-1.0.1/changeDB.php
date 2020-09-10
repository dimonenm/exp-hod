<?php
set_time_limit(0);

$json = file_get_contents('php://input');
file_put_contents('../../src/db/dbExpertises2.json', $json); // создается новая база

echo 'ok';
