<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$type = $_GET['type'];
$limit = $_GET['limit'];
$offset = $_GET['offset'];
if ($type == null) {
    $type = 'user';
}

$sql = Util::getSql($type);

$db = new DbWrap();
Util::echoJSON($db->callMethod($sql, $limit, $offset));

