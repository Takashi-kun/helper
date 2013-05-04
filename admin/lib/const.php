<?php

class Constants {
    protected static $ERROR_CODES = array(
        1 => 'success',
        0 => 'No user registed',
        -1 => 'No priority checked',
        -2 => 'Missed save help',
        -3 => 'No question inserted',
        -4 => 'Missed add question',
        -5 => 'Already added help'
    );

    const DB_HOST = 'mysql:dbname=HELPERDB;host=localhost;';
    const DB_USER = 'helper';
    const DB_PASS = 'helperpass';
}
