<?php
$post = $_POST['db'];
file_put_contents('src/db/db.json',$_POST['db']);
// print_r(json_decode($post)[0]);
// $db = json_decode(file_get_contents('src/db/db.json'));
// var_dump(str_split($db[1]->id,2));
// var_dump($db[1]);
// echo ('1' + 4);

if($post){
    echo 'ok';
}else echo 'not ok';
?>