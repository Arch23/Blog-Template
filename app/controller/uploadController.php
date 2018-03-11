<?php

require_once "../config.php";

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// 5 minutes execution time
//@set_time_limit(5 * 60);

$targetDir = IMGS_FOLDER;

$totalImgs = new FilesystemIterator($targetDir, FilesystemIterator::SKIP_DOTS);
echo "<h1>".iterator_count($totalImgs)."</h1>";

print_r($_FILES);