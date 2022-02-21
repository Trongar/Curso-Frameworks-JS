"use strict";
var appMongoose = require('mongoose');
var app = require('./app');
var port = 3900;
var url = 'mongodb://127.0.0.1:27017/api_rest_blog';
var opciones = { useNewUrlParser: true, useUnifiedTopology: true };
// mongoose.set('useFindAndModify', false);
appMongoose.Promise = global.Promise;
appMongoose.connect(url, opciones)
    .then(() => {
    // console.log('La conexión a la base de datos se ha ejecutado correctamente!!!!!')
    // crear servidor y escuchar peticiones
    app.listen(port, () => {
        console.log("Servidor establecido en http://127.0.0.1:" + port);
    });
});
