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
    //UPDATE, DELETE, INSERT系の処理
    if ($type === 'help' && isset($_POST['id']) && Util::isNumber($_POST['id']) === true) {
        $id = $_POST['id'];
        $db->updateHelpLog($id);
    } else if ($type === 'question') {
        if (isset($_POST['body']) === true && isset($_POST['id']) === true && Util::isNumber($_POST['id']) === true) {
            $body = htmlspecialchars($_POST['body']);
            if (mb_strlen($body) > 0) {
                $db->updatePriorityMst($body, intval($_POST['id']));
            }
        } else {
            if (isset($_POST['body']) === true) {
                $body = htmlspecialchars($_POST['body']);
                if (mb_strlen($body) > 0) {
                    $db->insertPriorityMst($body);
                }
            } else if (isset($_POST['id']) === true && Util::isNumber($_POST['id']) === true) {
                $db->deletePriorityMst(intval($_POST['id']));
            }
        }
    }
}

$sql = Util::getSql($type, $detail);

$count = $db->getTableCount($type, $detail);

Util::echoJSON($db->callMethod($sql, $offset), $count);




