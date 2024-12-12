# Backend Genérico para BD Postgres

Utilidad para ejecución de consultas y sentencias de inserción, edición y eliminación en BD Postgres

## Preparación inicial:

- Url de acceso al servicio
- Puerto de conexión del servicio
- Datos de conexión de la BD
    El servicio requiere las siguientes variables de Header para conectarse al servicio de BD específico:
    - "db_user": Usuario de base de datos
    - "db_password": Contraseña del usuario
    - "db_host": Dirección IP o URL donde se ubica el recurso de BD
    - "db_port": Puerto de conexión del recurso de BD
    - "db_name": Nombre específico de la base de datos
    - "db_schema": Esquema donde se aloja la base de datos


## Métodos:

**GET**

Mediante el método GET es posible realizar las siguientes acciones:

- Consultar todos los elementos de un objeto:
    - Endpoint: [miUrl:miPuerto/objeto]()
    - Retorno: Objeto "outdata" con array de elementos/objetos de retorno

- Consultar elementos de un objeto con filtro:
    - Endpoint: [miUrl:miPuerto/objeto?campo1=valor1&campoN=valorN]()
    - Retorno: Objeto "outdata" con array de elementos/objetos de retorno


**POST**

Mediante el método POST es posible realizar las siguientes acciones:

- Consultar todos los elementos de un objeto personalizado:
    - Endpoint: [miUrl:miPuerto/custom/objeto]()
    - Body: Objeto JSON con especificación de campos y valor vacío
    - Retorno: Objeto "outdata" con array de elementos/objetos de retorno

- Consultar elementos de un objeto personalizado con filtro:
    - Endpoint: [miUrl:miPuerto/custom/objeto?campo1=valor1&campoN=valorN]()
    - Body: Objeto JSON con especificación de campos y valor vacío
    - Retorno: Objeto "outdata" con array de elementos/objetos de retorno

- Insertar un elemento a un objeto:
    - Endpoint: [miUrl:miPuerto/objeto]()
    - Body: Objeto JSON con especificación de campos y valores
    - Retorno: Objeto "outdata" con array de elemento/objeto insertado