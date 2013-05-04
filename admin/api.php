<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$type = $_GET['type'];
$limit = $_GET['limit'];
$offset = $_GET['offset'];
$detail = $_GET['detail'];
$id = null;
if ($type == null) {
    $type = 'user';
}

$db = new DbWrap();
if (count($_POST) > 0) {
    //UPDATE, DELETE, 系の処理
    if ($type === 'help' && isset($_POST['id']) && Util::isNumber($_POST['id'])) {
        $id = $_POST['id'];
        $db->updateHelpLog($id);
    }
}

error_log($detail);

$sql = Util::getSql($type, $detail);

Util::echoJSON($db->callMethod($sql, $limit, $offset));
