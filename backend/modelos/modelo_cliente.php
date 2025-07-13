<?php
class Cliente {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function consultar() {
    $query = "SELECT id_cliente, nombre, apellido, telefono, correo FROM cliente ORDER BY nombre ASC";
    $resultado = $this->conexion->query($query);
    $clientes = [];
    while ($fila = $resultado->fetch_assoc()) {
        $clientes[] = $fila;
    }
    return $clientes;
}


  public function insertar($datos) {
    $nombre = $datos['nombre'];
    $apellido = $datos['apellido'];
    $telefono = $datos['telefono'];
    $correo = $datos['correo'];
    $id_usuario = $datos['id_usuario'];

    $stmt = $this->conexion->prepare("INSERT INTO cliente (nombre, apellido, telefono, correo, id_usuario) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $nombre, $apellido, $telefono, $correo, $id_usuario);

    if ($stmt->execute()) {
        return ['success' => true];
    } else {
        return ['success' => false, 'message' => 'Error al insertar cliente: ' . $stmt->error];
    }
}

   public function editar($id, $datos) {
    $nombre = $datos['nombre'];
    $apellido = $datos['apellido'];
    $telefono = $datos['telefono'];
    $correo = $datos['correo'];

    $stmt = $this->conexion->prepare("UPDATE cliente SET nombre=?, apellido=?, telefono=?, correo=? WHERE id_cliente=?");
    $stmt->bind_param("ssssi", $nombre, $apellido, $telefono, $correo, $id);

    if ($stmt->execute()) {
        return ['success' => true];
    } else {
        return ['success' => false, 'message' => 'Error al editar cliente'];
    }
}


    public function eliminar($id) {
    // Eliminar primero los carritos relacionados si existen
    $subconsulta = $this->conexion->prepare("SELECT id_usuario FROM cliente WHERE id_cliente = ?");
    $subconsulta->bind_param("i", $id);
    $subconsulta->execute();
    $resultado = $subconsulta->get_result();
    $row = $resultado->fetch_assoc();
    $id_usuario = $row['id_usuario'] ?? null;

    if ($id_usuario) {
        $stmtCarrito = $this->conexion->prepare("DELETE FROM carrito WHERE id_usuario = ?");
        $stmtCarrito->bind_param("i", $id_usuario);
        $stmtCarrito->execute();
    }

    // Ahora sí, eliminar cliente
    $stmt = $this->conexion->prepare("DELETE FROM cliente WHERE id_cliente = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    return ['success' => true];
}



}
