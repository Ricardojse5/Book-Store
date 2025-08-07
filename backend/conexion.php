<?php

$servidor = "localhost";
$usuario = "root";
$clave = "";
$bd = "general";

$conexion = mysqli_connect($servidor, $usuario, $clave) or die ('No encontró el servidor');
mysqli_select_db($conexion, $bd) or die ('No encontró la base de datos');
mysqli_set_charset($conexion, "utf8");
//echo "se conecto"

/*
// --- Conexión activa para InfinityFree ---
$servidor = "sql112.infinityfree.com";
$usuario = "if0_39626355";
$clave = "HshfWNpq7iT9";
$bd = "if0_39626355_bookstore";  // ← REEMPLAZA esto con el nombre real exacto de tu base de datos

$conexion = mysqli_connect($servidor, $usuario, $clave, $bd)
    or die ('No encontró el servidor o la base de datos');

mysqli_set_charset($conexion, "utf8");
*/
?>
