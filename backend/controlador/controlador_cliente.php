<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once("../conexion.php");
require_once("../modelos/modelo_cliente.php");

$cli = new Cliente($conexion);
$respuesta = [];

if (isset($_GET['control'])) {
    $control = $_GET['control'];
    switch ($control) {
        case 'consultar':
            $respuesta = $cli->consultar();
            break;
        case 'insertar':
            $datos = json_decode(file_get_contents("php://input"), true);
            $respuesta = $cli->insertar($datos);
            break;
        case 'editar':
            $id = $_GET['id'] ?? null;
            $datos = json_decode(file_get_contents("php://input"), true);
            $respuesta = $cli->editar($id, $datos);
            break;
        case 'eliminar':
            $id = $_GET['id'] ?? null;
            $respuesta = $cli->eliminar($id);
            break;
    }
}

echo json_encode($respuesta);
