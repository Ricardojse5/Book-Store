<?php
$servidor = "sql111.epizy.com"; // o el que te dieron en el panel
$usuario = "if0_39626355";      // tu usuario FTP/MySQL
$clave = "HshfWNpq7iT9";            // tu contraseña de base de datos
$bd = "if0_39626355_bookstore"; // nombre exacto de la base de datos

$conexion = mysqli_connect($servidor, $usuario, $clave, $bd)
    or die ('❌ Error de conexión al servidor o la base de datos');

mysqli_set_charset($conexion, "utf8");
?>
