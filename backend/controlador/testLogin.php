<?php
// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

// Incluir conexión a la base de datos
include("../conexion.php");  // <<--- AQUÍ VA

// Consulta de prueba
$query = "SELECT * FROM usuario LIMIT 1";
$result = mysqli_query($conexion, $query);

// Verificar resultado
if ($result && mysqli_num_rows($result) > 0) {
    echo "✅ Conexión exitosa. Se encontró al menos un usuario en la base de datos.";
} else {
    echo "⚠️ Conexión fallida o no hay datos en la tabla 'usuario'.";
}
?>
