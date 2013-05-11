<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$user_name = $_POST['user_name'];

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain; charset=UTF-8');

$db = new DbWrap();

$user = $db->getRegistUser($user_name);

$ret = array();

if (isset($user['id']) !== true) {
    $ret['code'] = 0;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
    Util::echoJSON($ret);
}

$flg = $db->isUserHelping($user['id']);

if ($flg !== false) {
    $ret['code'] = 1;
    $ret['msg'] = 1;//Util::getErrorMsg($ret['code']);
    $count = $db->getWaitCount(intval($user['id']));
    $ret['data'] = intval($count['cnt']) - 1;
    Util::echoJSON($ret);
}

$ret['code'] = -5;
$ret['msg'] = Util::getErrorMsg($ret['code']);
Util::echoJSON($ret);
