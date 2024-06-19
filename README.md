# Disclaimer

Este es un repositorio para crear un backend básico de test, por lo que faltan muchas funcionalidades que normalmente serían necesarias (coverage en los tests, deploys, etc.). 
El objetivo es sólo mostrar un poco cómo se manejaría el código en un backend.
Tomasz Tarnowski sale como contribuyente por haber utilizado su template para crear el proyecto de serverless.

## Endpoints

El url base es: `https://hen8t7wcoc.execute-api.us-east-1.amazonaws.com`

### Crear un Producto
- **URL**: `/products`
- **Método HTTP**: `POST`
- **Descripción**: Crea un nuevo producto.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "isAvailable": "boolean"
  }

### Obtener un Producto
- **URL**: `/products/{productId}`
- **Método HTTP**: `GET`
- **Descripción**: Obtiene un producto específico basado en su ID.

### Obtener todos los Productos
- **URL**: `/products`
- **Método HTTP**: `GET`
- **Descripción**: Obtiene la lista de todos los productos disponibles.

### Actualizar un Producto
- **URL**: `/products/{productId}`
- **Método HTTP**: `PUT`
- **Descripción**: Actualiza la información de un producto específico basado en su ID.
- **Cuerpo de la Solicitud**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "isAvailable": "boolean"
  }

### Eliminar un Producto
- **URL**: `/products/{productId}`
- **Método HTTP**: `DELETE`
- **Descripción**: Elimina un producto específico basado en su ID.

