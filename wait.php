<?php

require_once(dirname(__FILE__) . '/lib/util.php');


$user_name = $_POST['user_name'];

$db = new DbWrap();

$user = $db->getRegistUser($user_name);

$ret = array();

if (isset($user['id']) === true) {
    $ret['code'] = 1;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
    $count = $db->getWaitCount(intval($user['id']));
    $ret['data'] = intval($count['user']) - intval($count['now']);
} else {
    $ret['code'] = 0;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
}


header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain; charset=UTF-8');

Util::echoJSON($ret);

