<?php
class Categoria {
    private $conexion;

    function __construct($conexion){
        $this->conexion = $conexion;
    }

    public function consulta() {
        $query = "SELECT * FROM categoria ORDER BY nombre ASC";
        $stmt = $this->conexion->prepare($query);
        $stmt->execute();
        $resultado = $stmt->get_result();

        $categorias = [];
        while ($fila = $resultado->fetch_assoc()) {
            $categorias[] = $fila;
        }

        return $categorias;
    }

    public function insertar($params) {
        $nombre = $params['nombre'] ?? null;
        if (!$nombre) return ['success' => false, 'message' => 'Nombre requerido'];

        $query = "INSERT INTO categoria(nombre) VALUES (?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $nombre);
        $stmt->execute();

        return ['success' => true];
    }

    public function editar($id, $params) {
        $nombre = $params['nombre'] ?? null;
        if (!$nombre) return ['success' => false, 'message' => 'Nombre requerido'];

        $query = "UPDATE categoria SET nombre = ? WHERE id_categoria = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("si", $nombre, $id);
        $stmt->execute();

        return ['success' => true];
    }

    public function eliminar($id) {
        $query = "DELETE FROM categoria WHERE id_categoria = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        return ['success' => true];
    }
}
?>
