const Hapi = require('@hapi/hapi');
const connection = require('./connection/connect'); // Importa la conexión

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Define tus rutas aquí

    await server.start();
    console.log('Servidor corriendo en %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
