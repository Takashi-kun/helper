<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$type   = $_GET['type'];
$offset = 0;
$detail = null;

if ($type == null) {
    $type = 'user';
}


if (isset($_GET['offset']) === true) {
    $offset = intval($_GET['offset']);
}

if (isset($_GET['detail']) === true) {
    $detail = $_GET['detail'];
}

$db = new DbWrap();
if (count($_POST) > 0) {
    //UPDATE, DELETE, 系の処理
    if ($type === 'help' && isset($_POST['id']) && Util::isNumber($_POST['id'])) {
        $id = $_POST['id'];
        $db->updateHelpLog($id);
    }
}

$sql = Util::getSql($type, $detail);

$count = $db->getTableCount($type, $detail);

Util::echoJSON($db->callMethod($sql, $offset), $count);




