<?php

class DbWrap {

    private $pdo;
    private $stmt;

    public function __construct() {
        try {
            $this->pdo = new PDO('mysql:dbname=HELPERDB;host=localhost;', 'helper', 'helperpass');
            $this->stmt = $this->pdo->query('SET NAMES utf8;');
        } catch (PDOException $e) {
            error_log($e->getMessage() . ' ' . strtotime('now'));
        }
    }

    public function callMethod($sql_base, $limit, $offset) {
        if (Util::isNumber($limit) !== true) {
            $limit = 20;
        }
        if (Util::isNumber($offset) !== true) {
            $offset = 0;
        }

        $sql_base .= ' LIMIT ' . $limit . ' OFFSET ' . $offset;
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

        $this->stmt = $this->pdo->prepare($sql);
        $this->stmt->execute(
                array(
                    'id' => intval($id)
                )
            );
    }

    public function __destruct() {
        $this->pdo = null;
        $this->stmt = null;
    }

}
