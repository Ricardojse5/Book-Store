
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
require_once("../conexion.php");
require_once("../modelos/modelo_producto.php");

$prod = new Producto($conexion);
$respuesta = [];

if(isset($_GET['control'])){
    $control = $_GET['control'];

    switch($control){
        case 'consulta':
            $respuesta = $prod->consulta();
            break;
        case 'insertar':
            $datos = json_decode(file_get_contents('php://input'), true);
            $respuesta = $prod->insertar($datos);
            break;
        case 'eliminar':
            $id = $_GET['id'];
            $respuesta = $prod->eliminar($id);
            break;
        case 'editar':
            $id = $_GET['id'];
            $datos = json_decode(file_get_contents('php://input'), true);
            $respuesta = $prod->editar($id, $datos);
            break;
        case 'filtro':
            $valor = $_GET['valor'];
            $respuesta = $prod->filtro($valor);
            break;
    }
}

echo json_encode($respuesta);
?>
