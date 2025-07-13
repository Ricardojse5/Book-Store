
<?php
class Producto {
    private $conexion;

    function __construct($conexion){
        $this->conexion = $conexion;
    }

    public function consulta() {
    $query = "SELECT * FROM producto ORDER BY nombre ASC";
    $stmt = $this->conexion->prepare($query);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $productos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $productos[] = $fila;
    }

    return ['success' => true, 'data' => $productos];
}


 public function insertar($params) {
    $nombre = $params['nombre'] ?? '';
    $id_categoria = $params['id_categoria'] ?? null;
    $descripcion = $params['descripcion'] ?? '';
    $stock = $params['stock'] ?? 0;
    $precio = $params['precio'] ?? 0;

    if ($id_categoria === null) {
        return ['success' => false, 'message' => 'La categoría es obligatoria'];
    }

    $query = "INSERT INTO producto(nombre, id_categoria, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)";
    $stmt = $this->conexion->prepare($query);
    $stmt->bind_param("sisii", $nombre, $id_categoria, $descripcion, $precio, $stock);

    if ($stmt->execute()) {
        return ['success' => true];
    } else {
        return ['success' => false, 'message' => 'Error al insertar producto'];
    }
}


   public function eliminar($id) {
    $query = "DELETE FROM producto WHERE id_producto = ?";
    $stmt = $this->conexion->prepare($query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        return ['success' => true];
    } else {
        return ['success' => false, 'message' => 'Error al eliminar producto'];
    }
}


    public function editar($id, $params) {
    $nombre = $params['nombre'] ?? '';
    $id_categoria = $params['id_categoria'] ?? null;
    $descripcion = $params['descripcion'] ?? '';
    $stock = $params['stock'] ?? 0;
    $precio = $params['precio'] ?? 0;

    if ($id_categoria === null) {
        return ['success' => false, 'message' => 'La categoría es obligatoria'];
    }

    $query = "UPDATE producto SET nombre = ?, id_categoria = ?, descripcion = ?, stock = ?, precio = ? WHERE id_producto = ?";
    $stmt = $this->conexion->prepare($query);
    $stmt->bind_param("sisiii", $nombre, $id_categoria, $descripcion, $stock, $precio, $id);

    if ($stmt->execute()) {
        return ['success' => true];
    } else {
        return ['success' => false, 'message' => 'Error al editar producto'];
    }
}


 public function filtro($valor) {
    $valor = "%$valor%";
    $query = "SELECT * FROM producto WHERE nombre LIKE ?";
    $stmt = $this->conexion->prepare($query);
    $stmt->bind_param("s", $valor);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $productos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $productos[] = $fila;
    }

    return $productos;
}

}
?>
