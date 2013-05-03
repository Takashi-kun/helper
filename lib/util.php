<?php

require_once(dirname(__FILE__) . '/const.php');
require_once(dirname(__FILE__) . '/db.php');

class Util extends Constants {

    public static function hello() {
        var_dump('hello');
    }

    public static function validate_priority($priority) {
        if ($priority === '1' || $priority === '2' || $priority === '3') {
            return true;
        }
        return false;
    }

    public static function validate_body($body) {
        $length = mb_strlen($body);
        if ($length >= 1) {
            return true;
        }
        return false;
    }

    public static function getErrorMsg($code) {
        $err = parent::$ERROR_CODES;
        return $err[$code];
    }

    public static function echoJSON($array) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($array);
        exit;
    }
}
