<?php

require_once(dirname(__FILE__) . '/lib/util.php');


$user_name = $_POST['user_name'];

$db = new DbWrap();

$user = $db->getRegistUser($user_name);

$ret = array();

if (isset($user['id']) === true) {
    $ret['code'] = 1;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
} else {
    $ret['code'] = 0;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
}

Util::echoJSON($ret);

