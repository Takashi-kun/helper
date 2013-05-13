<?php

class DbWrap {

    private $pdo;
    private $stmt;

    public function __construct() {
        try {
            $this->pdo = new PDO(Constants::DB_HOST, Constants::DB_USER, Constants::DB_PASS);
            //$this->stmt = $this->pdo->query('SET NAMES utf8;');
            $this->pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
        } catch (PDOException $e) {
            error_log($e->getMessage() . ' ' . strtotime('now'));
        }
    }

    public function callMethod($sql_base, $offset) {
        $sql_base .= ' LIMIT ' . Constants::LIMIT_NUMBER . ' OFFSET ' . $offset;
        return $this->getDBData($sql_base);
    }

    private function getDBData($sql) {
        $this->stmt = $this->pdo->prepare($sql);
        $this->stmt->execute();
        $result = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function updateHelpLog($id) {
        $sql = ' UPDATE help_log SET ';
        $sql .= ' is_solved = 1 ';
        $sql .= ' WHERE id = :id';

        try {
            $this->pdo->beginTransaction();
            $this->stmt = $this->pdo->prepare($sql);
            $this->stmt->execute(
                array(
                    'id' => intval($id)
                )
            );
            $this->pdo->commit();
        } catch (PDOException $e) {
            $this->pdo->rollback();
            error_log($e->getMessage() . ' ' . strtotime('now'));
            return false;
        }
    }

    public function insertPriorityMst($body) {
        $sql = 'INSERT INTO priority_mst(body) VALUES (:body)';
        try {
            $this->pdo->beginTransaction();
            $this->stmt = $this->pdo->prepare($sql);
            $this->stmt->execute(
                array(
                    'body' => $body
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

    public function deletePriorityMst($id) {
        $sql = 'DELETE FROM priority_mst WHERE id = :id';
        try {
            $this->pdo->beginTransaction();
            $this->stmt = $this->pdo->prepare($sql);
            $this->stmt->execute(
                array(
                    'id' => $id
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

    public function updatePriorityMst($body, $id) {
        $sql = 'UPDATE priority_mst SET ';
        $sql .= 'body = :body ';
        $sql .= 'WHERE id = :id';
        try {
            $this->pdo->beginTransaction();
            $this->stmt = $this->pdo->prepare($sql);
            $this->stmt->execute(
                array(
                    'body' => $body,
                    'id' => $id
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

    public function getTableCount($type, $detail) {
        $sql = 'SELECT count(id) AS cnt ';
        if ($type === 'user') {
            $sql .= ' FROM user_profile';
        } else if ($type === 'help') {
            $sql .= ' FROM help_log t1';
            if ($detail === 'solved') {
                $sql .= ' WHERE t1.is_solved = 1 ';
            } else if ($detail === 'no_solved') {
                $sql .= ' WHERE t1.is_solved = 0 ';
            }
        } else if ($type === 'question') {
            $sql .= ' FROM question_log ';
        }
        $this->stmt = $this->pdo->prepare($sql);
        $this->stmt->execute();
        $result = $this->stmt->fetch(PDO::FETCH_ASSOC);
        return intval($result['cnt']);
    }

    public function __destruct() {
        $this->pdo = null;
        $this->stmt = null;
    }

}
