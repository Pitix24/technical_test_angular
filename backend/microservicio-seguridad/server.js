const Hapi = require('@hapi/hapi');
const securityRoutes = require('./routes/securityRoutes');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(securityRoutes);

    await server.start();
    console.log('Servidor corriendo en %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
