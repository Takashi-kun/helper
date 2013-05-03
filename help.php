<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$priority = $_POST['help_priority'];
$user_name = $_POST['user_name'];


$db = new DbWrap();

$user = $db->getRegistUser($user_name);

$ret = array();

if (isset($user['id']) !== true) {
    $ret['code'] = 0;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
    Util::echoJSON($ret);
}

if (Util::validate_priority($priority) !== true) {
    $ret['code'] = -1;
    $ret['msg']  = Util::getErrorMsg($ret['code']);
    Util::echoJSON($ret);
}

$ins_data = array();
$ins_data['priority'] = $priority;
$ins_data['user_id'] = (int) $user['id'];



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
Util::echoJSON($ret);

