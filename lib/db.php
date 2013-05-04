<?php

class DbWrap {

    private $pdo;
    private $stmt;

    public function __construct() {
        try {
            $this->pdo = new PDO(Constants::DB_HOST, Constants::DB_USER, Constants::DB_PASS);
            $this->stmt = $this->pdo->query('SET NAMES utf8;');
        } catch (PDOException $e) {
            error_log($e->getMessage() . ' ' . strtotime('now'));
        }
    }

    public function getRegistUser($user_name) {
        $this->stmt = $this->pdo->prepare('SELECT * FROM user_profile WHERE user_name = :user_name');
        $this->stmt->execute(
            array(
                'user_name' => $user_name
            )
        );
        $result = $this->stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getPriorityAll() {
        $this->stmt = $this->pdo->prepare('SELECT id, body FROM priority_mst');
        $this->stmt->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function checkDupplicateHelpLog($user_id) {
        $this->stmt = $this->pdo->prepare('SELECT COUNT(id) AS cnt FROM help_log WHERE user_profile_id = :user_id AND is_solved = 0');
        $this->stmt->execute(
            array(
                'user_id' => $user_id
            )
        );
        $result = $this->stmt->fetch(PDO::FETCH_ASSOC);
        if (intval($result['cnt']) !== 0) {
            return true;
        }
        return false;
    }

    public function confirmDupplicateHelpLog($user_id) {
        $this->stmt = $this->pdo->prepare('SELECT priority FROM help_log WHERE user_profile_id = :user_id AND is_solved = 0');
        $this->stmt->execute(
            array(
                'user_id' => $user_id
            )
        );
        $result = $this->stmt->fetch(PDO::FETCH_ASSOC);
        if (isset($result['priority']) !== false) {
            return $result['priority'];
        }
        return false;
    }

    public function insertHelpLog($data) {
        $flg = $this->checkDupplicateHelpLog($data['user_id']);
        if ($flg === true) {
            return -5;
        }

        $sql = 'INSERT INTO help_log(user_profile_id, priority) VALUES (:user_profile_id, :priority)';
        $placeholder = array(
                            'user_profile_id' => $data['user_id'],
                            'priority' => $data['priority']
                        );
        return $this->insert($sql, $placeholder);
   }

    public function insertQuestionLog($data) {
        $sql = 'INSERT INTO question_log(user_profile_id, body) VALUES (:user_profile_id, :body)';
        $placeholder = array(
                            'user_profile_id' => $data['user_id'],
                            'body' => $data['body']
                        );
        return $this->insert($sql, $placeholder);
    }

    private function insert($sql, $placeholder) {
         try {
            $this->pdo->beginTransaction();
            $this->stmt = $this->pdo->prepare($sql);
            $this->stmt->execute($placeholder);
            $this->pdo->commit();
            return true;
        } catch (PDOException $e) {
            $this->pdo->rollback();
            error_log($e->getMessage() . ' ' . strtotime('now'));
            return false;
        }
    }

    public function updateHelperLog($user_name) {
        $sql = 'update help_log t1 inner join user_profile t2 ';
        $sql .= 'on t1.user_profile_id = t2.id set is_solved = 1 ';
        $sql .= 'where t2.user_name = :user_name';
        try {
            $this->pdo->beginTransaction();
            $this->stmt = $this->pdo->prepare($sql);
            $this->stmt->execute(
                array(
                    'user_name' => $user_name
                )
            );
            $this->pdo->commit();
            return true;
        } catch (PDOException $e) {
            $this->pdo->rollback();
            error_log($e->getMessage() . ' ' . strtotime('now'));
            return false;
        }
    }

    public function __destruct() {
        $this->pdo = null;
        $this->stmt = null;
    }

}
