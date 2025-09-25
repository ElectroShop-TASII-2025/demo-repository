<?php

require 'conection_bd.php'; // Trae $conn

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die("Método no permitido");
}

$email = $_POST['email'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

if ($password !== $confirm_password) {
    die("Las contraseñas no coinciden. <a href='../registro.html'>Volver</a>");
}

$sql = "INSERT INTO Usuarios (email, password) VALUES (?, ?)";
$params = array($email, $password);

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt) {
    echo "Registro exitoso. <a href='../index.html'>Iniciar sesión</a>";
} else {
    die(print_r(sqlsrv_errors(), true));
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

?>
