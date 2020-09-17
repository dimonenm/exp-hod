<?php
set_time_limit(0);

if (!copy('index.html', '../../index.html')) {
    echo "не удалось скопировать index.html\n";
}

if (!copy('script.js', '../../src/js/script.js')) {
    echo "не удалось скопировать script.js\n";
}

if (!copy('style.css', '../../src/css/style.css')) {
    echo "не удалось скопировать style.css\n";
}

if (!copy('version.txt', '../../version.txt')) {
    echo "не удалось скопировать version.txt\n";
}

echo 'ok';
