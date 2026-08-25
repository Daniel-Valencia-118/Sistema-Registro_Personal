-- Creamos la base de datos con el charset correcto para caracteres especiales (tildes, ñ)
CREATE DATABASE IF NOT EXISTS bd_sis_personal
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE bd_sis_personal;

DROP TABLE IF EXISTS referencias_laborales;
DROP TABLE IF EXISTS contactos;
DROP TABLE IF EXISTS estudios;
DROP TABLE IF EXISTS experiencias_laborales;
DROP TABLE IF EXISTS personas;


-- ===================================================
-- Tabla: Persona (Raíz del agregado)
-- ===================================================
CREATE TABLE personas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    paterno VARCHAR(100) NOT NULL,
    materno VARCHAR(100) NOT NULL,
    nombres VARCHAR(150) NOT NULL,
    ci VARCHAR(15) NOT NULL UNIQUE, -- La cédula debe ser única
    ci_expedicion VARCHAR(10) NOT NULL,
    sexo VARCHAR(15) NOT NULL, -- MASCULINO, FEMENINO, etc.
    fecha_nacimiento DATE NOT NULL,
    lugar_nacimiento_provincia VARCHAR(100),
    lugar_nacimiento_ciudad VARCHAR(100),
    estado_civil VARCHAR(20),
    numero_hijos INT UNSIGNED DEFAULT 0,
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(20),
    celular VARCHAR(20),
    direccion_actual VARCHAR(255),
    fecha_ingreso_fundacion DATE,
    cargo_actual VARCHAR(100),
    url_croquis VARCHAR(255), -- Ruta o URL de la imagen del croquis
    url_foto VARCHAR(255),    -- Ruta o URL de la foto de perfil

    -- Auditoría (Laravel lo maneja automáticamente si llamamos a las columnas así)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================================
-- Tabla: ExperienciaLaboral
-- ===================================================
CREATE TABLE experiencias_laborales (
    id_exp_lab INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    institucion VARCHAR(200) NOT NULL,
    cargo VARCHAR(150) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NULL, -- NULL si es empleo actual
    id_persona INT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_persona_fecha (id_persona, fecha_inicio), -- Índice compuesto para consultas rápidas
    FOREIGN KEY (id_persona) REFERENCES personas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================================
-- Tabla: ReferenciaLaboral (Ahora referenciando directamente a la experiencia)
-- ===================================================
CREATE TABLE referencias_laborales (
    id_ref_lab INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_referente VARCHAR(200) NOT NULL,
    telefono_celular VARCHAR(20) NOT NULL,
    id_persona INT UNSIGNED NOT NULL,
    id_exp_lab INT UNSIGNED NOT NULL, -- Vinculada a una experiencia específica

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_persona) REFERENCES personas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_exp_lab) REFERENCES experiencias_laborales(id_exp_lab) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================================
-- Tabla: Contacto (Unifica Familiares y Referencias Personales)
-- ===================================================
CREATE TABLE contactos (
    id_familiar INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    paterno VARCHAR(100) NOT NULL,
    materno VARCHAR(100) NOT NULL,
    parentesco_relacion VARCHAR(50) NOT NULL, -- Ej: Esposo, Hermana, Amigo, Vecino
    edad INT UNSIGNED,
    telefono_celular VARCHAR(20) NOT NULL,
    es_familiar BOOLEAN DEFAULT TRUE, -- TRUE = Familiar, FALSE = Referencia personal
    id_persona INT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_persona_tipo (id_persona, es_familiar), -- Para filtrar rápidamente por tipo
    FOREIGN KEY (id_persona) REFERENCES personas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================================
-- Tabla: Estudio (Formación Académica)
-- ===================================================
CREATE TABLE estudios (
    id_estudio INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL, -- 'Diplomado', 'Especializacion', 'Maestria', 'Licenciatura', etc.
    titulo_obtenido VARCHAR(200) NOT NULL,
    institucion VARCHAR(200) NOT NULL,
    anio YEAR NOT NULL,
    id_persona INT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_persona) REFERENCES personas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;