<?php

$serverName = "localhost"; 
$connectionOptions = array(
    "Database" => "ElectroShop",
    "Uid" => "sa",
    "PWD" => "cripta"
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if (!$conn) {
    die(print_r(sqlsrv_errors(), true));
}

?>
