import Hapi from '@hapi/hapi'; // Importar Hapi
import securityRoutes from './src/routes/securityRoutes'; // Importar las rutas

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(securityRoutes); // Registrar las rutas de Prueba

    await server.start();
    console.log('Servidor corriendo en %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
