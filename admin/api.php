<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$type = $_GET['type'];
$limit = $_GET['limit'];
$offset = $_GET['offset'];
$id = null;
if ($type == null) {
    $type = 'user';
}

if ($type === 'help' && isset($_POST['id']) && Util::isNumber($_POST['id'])) {
    $id = $_POST['id'];
}

$sql = Util::getSql($type, $id);

$db = new DbWrap();
Util::echoJSON($db->callMethod($sql, $limit, $offset));

