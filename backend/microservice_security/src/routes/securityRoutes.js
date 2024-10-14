import connection from '../connection/connect'; // Importar la conexión

export const securityRoutes = [ // Definir las rutas
  {
    method: 'POST',
    path: '/generar-token',
    handler: (request, h) => {
      // Generar un token aleatorio de 8 dígitos
      const token = Math.floor(10000000 + Math.random() * 90000000).toString();

      // Insertar el token en la base de datos
      connection.query('INSERT INTO tokens (token) VALUES (?)', [token], (err, results) => {
        if (err) throw err;
        console.log('Token guardado en la base de datos');
      });

      return { token };
    }
  },
  {
    method: 'POST',
    path: '/validar-token',
    handler: async (request, h) => {
      const { token } = request.payload;

      try {
        const [results] = await connection.promise().query('SELECT * FROM tokens WHERE token = ?', [token]);
        const isValid = results.length > 0;
        return h.response({ isValid }).code(200);
      } catch (err) {
        console.error('Error al validar el token:', err);
        return h.response({ error: 'Error interno del servidor' }).code(500);
      }
    }
  }

];
