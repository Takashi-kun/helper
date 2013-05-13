<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$user_name = $_POST['user_name'];
$question  = preg_replace('/(\s|　)/','',$_POST['question']);

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

if (Util::validate_body($question) !== true) {
    $ret['code'] = -1;
    $ret['msg']  = Util::getErrorMsg($ret['code']);
    Util::echoJSON($ret);
}



$ins_data = array();
$ins_data['user_id'] = (int) $user['id'];
//$ins_data['question'] = htmlspecialchars($question);
$ins_data['question'] = $question;



$flg = $db->insertHelpLog($ins_data);

if ($flg !== true) {
    if ($flg === -5) {
        $ret['code'] = $flg;
        $ret['msg'] = Util::getErrorMsg($ret['code']);
        Util::echoJSON($ret);
    }
    $ret['code'] = -2;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
    Util::echoJSON($ret);
}

$ret['code'] = 1;
$ret['msg'] = Util::getErrorMsg($ret['code']);
$count = $db->getWaitCount(intval($user['id']));
$ret['data'] = intval($count['cnt']);
Util::echoJSON($ret);

