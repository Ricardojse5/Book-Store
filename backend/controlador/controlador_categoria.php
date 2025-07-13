<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require_once("../conexion.php");
require_once("../modelos/modelo_categoria.php");

$categoria = new Categoria($conexion);
$respuesta = [];

if (isset($_GET['control'])) {
    $control = $_GET['control'];

    switch ($control) {
        case 'consulta':
            $respuesta = $categoria->consulta();
            break;
        case 'insertar':
            $datos = json_decode(file_get_contents('php://input'), true);
            $respuesta = $categoria->insertar($datos);
            break;
        case 'editar':
            $id = $_GET['id'];
            $datos = json_decode(file_get_contents('php://input'), true);
            $respuesta = $categoria->editar($id, $datos);
            break;
        case 'eliminar':
            $id = $_GET['id'];
            $respuesta = $categoria->eliminar($id);
            break;
    }
}

echo json_encode($respuesta);
?>
