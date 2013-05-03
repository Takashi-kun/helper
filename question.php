<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$question_body = htmlspecialchars($_POST['question_body'], ENT_QUOTES, 'UTF-8');
$user_name = $_POST['user_name'];


$db = new DbWrap();

$user = $db->getRegistUser($user_name);

$ret = array();

if (isset($user['id']) !== true) {
    $ret['code'] = 0;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
    Util::echoJSON($ret);
}

if (Util::validate_body($question_body) !== true) {
    $ret['code'] = -3;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
    Util::echoJSON($ret);
}

$ins_data = array();
$ins_data['body'] = $question_body;
$ins_data['user_id'] = (int) $user['id'];


$flg = $db->insertQuestionLog($ins_data);

if ($flg !== true) {
    $ret['code'] = -4;
    $ret['msg'] = Util::getErrorMsg($ret['code']);
    Util::echoJSON($ret);
}

$ret['code'] = 1;
$ret['msg'] = Util::getErrorMsg($ret['code']);
Util::echoJSON($ret);

