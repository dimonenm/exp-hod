<?php
set_time_limit(0);

if (!copy('files/index.html', '../../index.html')) {
    echo "не удалось скопировать index.html\n";
}

if (!copy('files/script.js', '../../src/js/script.js')) {
    echo "не удалось скопировать script.js\n";
}

if (!copy('files/classExpertise.js', '../../src/js/classExpertise.js')) {
    echo "не удалось скопировать script.js\n";
}

if (!copy('files/style.css', '../../src/css/style.css')) {
    echo "не удалось скопировать style.css\n";
}

if (!copy('files/version.txt', '../../version.txt')) {
    echo "не удалось скопировать version.txt\n";
}

echo 'ok';
