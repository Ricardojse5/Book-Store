<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

require_once("../conexion.php"); // Ajusta la ruta si es necesario

if (isset($_GET['control'])) {
    $control = $_GET['control'];

    if ($control === 'login') {
        $data = json_decode(file_get_contents("php://input"), true);
        $user = isset($data['user']) ? $data['user'] : '';
        $password = isset($data['password']) ? $data['password'] : '';

        if (empty($user) || empty($password)) {
            echo json_encode([
                'success' => false,
                'message' => 'Usuario y contraseña requeridos'
            ]);
            exit;
        }

        $query = "SELECT * FROM usuario WHERE user = ? AND password = ? AND login_status = 'activo'";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("ss", $user, $password);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            $usuario = $resultado->fetch_assoc();
            echo json_encode([
                'success' => true,
                'usuario' => $usuario
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Usuario o contraseña incorrectos o cuenta inactiva'
            ]);
        }

        exit;
    }

    elseif ($control === 'registrar') {
        $data = json_decode(file_get_contents("php://input"), true);
        $user = $data['user'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($user) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Email y contraseña son requeridos']);
            exit;
        }

        $query = "SELECT * FROM usuario WHERE user = ?";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Ya existe un usuario con ese email']);
            exit;
        }

        $queryInsert = "INSERT INTO usuario (user, password, login_status) VALUES (?, ?, 'activo')";
        $stmtInsert = $conexion->prepare($queryInsert);
        $stmtInsert->bind_param("ss", $user, $password);
        if ($stmtInsert->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrar usuario']);
        }

        exit;
    }

    else {
        echo json_encode(['success' => false, 'message' => 'Acción no reconocida']);
        exit;
    }

} else {
    echo json_encode(['success' => false, 'message' => 'No se recibió control']);
    exit;
}
?>
