"use strict";
// cargar modulos de node para crear el server
const appExpress = require('express');
const bodyParser = require('body-parser');
// ejecutar express HTTP
var app = appExpress();
// cargar las rutas
var articleRoutes = require('./rutes/article');
// cargar middlewares
app.use(bodyParser({ extended: false }));
app.use(bodyParser.json());
// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// añadir prefijos a rutas
app.use('/api', articleRoutes);
// ruta de pruebas
// app.post('/provando', (req:any, res:any) =>{
//     var hola = req.body.hola;
//     // console.log("Hola mundo");
//     return res.status(200).send({
//         curso: 'Master en frameworks JS',
//         autor: 'Edgar Ulises Sánchez Izquierdo',
//         url: 'google.com',
//         hola
//     });
// });
// Exportar modulos(Fichero actual)
module.exports = app;
