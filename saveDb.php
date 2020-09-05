<?php
$post = $_POST['db'];
file_put_contents('src/db/dbExpertises.json',$_POST['db']);
?>