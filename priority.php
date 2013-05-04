<?php

require_once(dirname(__FILE__) . '/lib/util.php');

$db = new DbWrap();

$ret = $db->getPriorityAll();

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain; charset=UTF-8');

Util::echoJSON($ret);

