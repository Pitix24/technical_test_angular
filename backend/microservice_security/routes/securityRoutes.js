module.exports = [
  {
    method: 'POST',
    path: '/generar-token',
    handler: (request, h) => {
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
    handler: (request, h) => {
      const { token } = request.payload;

      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM tokens WHERE token = ?', [token], (err, results) => {
          if (err) return reject(err);
          const isValid = results.length > 0;
          resolve({ isValid });
        });
      });
    }
  }
];
