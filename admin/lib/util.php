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

    public static function isNumber($num) {
        if (preg_match('/^\d+$/', $num) !== 1) {
            return false;
        }
        return true;
    }

    public static function getSql($type, $detail) {
        if ($type === 'user') {
            $sql = 'SELECT * FROM user_profile ORDER BY created_at DESC';
        } else if ($type === 'help') {
            $sql = 'SELECT t1.id, t2.user_name, t1.is_solved, t1.priority, t1.created_at ';
            $sql .= ' FROM help_log t1 LEFT JOIN user_profile t2 ON t1.user_profile_id = t2.id ';
            if ($detail === 'solved') {
                $sql .= ' WHERE t1.is_solved = 1 ';
            } else if ($detail === 'no_solved') {
                $sql .= ' WHERE t1.is_solved = 0 ';
            }
            $sql .= ' ORDER BY t1.created_at DESC, t1.priority DESC ';
        } else if ($type === 'question') {
            $sql = 'SELECT t1.id, t2.user_name, t1.body, t1.priority, t1.created_at ';
            $sql .= ' FROM question_log t1 LEFT JOIN user_profile t2 ON t1.user_profile_id = t2.id ';
            $sql .= ' ORDER BY t1.priority DESC, t1.created_at DESC ';
        }

        return $sql;
    }
}
