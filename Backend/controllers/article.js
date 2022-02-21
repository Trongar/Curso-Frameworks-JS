"use strict";
const articleValidator = require('validator');
const fs = require('fs');
const path = require('path');
const Article = require('../modelos/article');
var controller = {
    datosCurso: (req, res) => {
        var hola = req.body.hola;
        // console.log("Hola mundo");
        return res.status(200).send({
            curso: 'Master en frameworks JS',
            autor: 'Edgar Ulises Sánchez Izquierdo',
            url: 'google.com',
            hola
        });
    },
    test: (req, res) => {
        return res.status(200).send({
            message: "Soy la acción test de mi controlador de artículos"
        });
    },
    save: (req, res) => {
        // recoger datos por post
        var params = req.body;
        // validar datos (validator)
        try {
            var validate_title = !articleValidator.isEmpty(params.title);
            var validate_content = !articleValidator.isEmpty(params.content);
        }
        catch (err) {
            return res.status(200).send({
                status: "error",
                message: "faltan datos por enviar"
            });
        }
        if (validate_title && validate_content) {
            // crear objeto a guardar
            let article = new Article();
            // asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;
            // guardar el articulo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: "error",
                        message: "El articulo no se ha guardado"
                    });
                }
                // devolver respuesta
                return res.status(200).send({
                    status: "success",
                    article
                });
            });
        }
        else {
            return res.status(200).send({
                status: "error",
                message: "los datos no son valido",
            });
        }
    },
    getArticles: (req, res) => {
        let query = Article.find({});
        let last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        //console.log(last);
        // find
        query.sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "error al devolver los artículos"
                });
            }
            if (!articles) {
                return res.status(404).send({
                    status: "Error",
                    message: "No se encontraron artículos"
                });
            }
            return res.status(200).send({
                status: "success",
                articles
            });
        });
    },
    getArticle: (req, res) => {
        //recoger el id de la url
        let articleId = req.params.id;
        //comprobar que no esté vacío
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: "Error",
                message: "No se encontró el articulo"
            });
        }
        //buscar el articulo
        Article.findById(articleId, (err, article) => {
            if (err || !article) {
                return res.status(404).send({
                    status: "Error",
                    message: "Error el articulo no existe el articulo"
                });
            }
            //devolver en JSON
            return res.status(200).send({
                status: "success",
                article
            });
        });
    },
    update: (req, res) => {
        //recoger id del articulo de la URL
        let articleId = req.params.id;
        //recoger los datos por put
        let params = req.body;
        //validar los datos
        try {
            var validateTitle = !articleValidator.isEmpty(params.title);
            var validateContent = !articleValidator.isEmpty(params.content);
        }
        catch (err) {
            return res.status(200).send({
                status: "Error",
                message: "Error Faltan datos"
            });
        }
        if (validateTitle && validateContent) {
            //hacer la consulta Find Update
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: "Error",
                        message: "Error al actualizar"
                    });
                }
                if (!articleUpdated) {
                    return res.status(500).send({
                        status: "Error",
                        message: "Error el articulo no existe"
                    });
                }
                //devolver los datos
                return res.status(200).send({
                    status: "success",
                    article: articleUpdated
                });
            });
        }
        else {
            return res.status(200).send({
                status: "Error",
                message: "Error la validación no es correcta"
            });
        }
    },
    delete: (req, res) => {
        //recoger el id de la url
        let articleId = req.params.id;
        //Find and Delete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: "Error",
                    message: "Error al borrar"
                });
            }
            if (!articleRemoved) {
                return res.status(404).send({
                    status: "Error",
                    message: "Error no se ha podido borrar o posiblemente no exista"
                });
            }
            return res.status(200).send({
                status: "Success",
                article: articleRemoved
            });
        });
    },
    upload: (req, res) => {
        //configurar modulo connect multiparty router/article
        //recoger fichero de la petición
        let file = 'imagen no subida...';
        if (!req.files) {
            return res.status(404).send({
                status: "Error",
                message: file
            });
        }
        //conseguir nombre y extensión del archivo
        let filePath = req.files.file0.path;
        let fileSplit = filePath.split('/');
        //nombre del archivo
        let fileName = fileSplit[2];
        //extensión del archivo
        let extensionSplit = fileName.split('.');
        let fileExt = extensionSplit[1];
        //comprobar la extensión, solo images, borrar si no es valido
        if (fileExt != 'png' && fileExt != 'jpg' && fileExt != 'jpeg' && fileExt != 'gif') {
            //borrar el archivo
            fs.unlink(filePath, (err) => {
                return res.status(200).send({
                    status: "Error",
                    message: "La extensión de la imagen no es valida"
                });
            });
        }
        else {
            //si todo es valido
            let articleId = req.params.id;
            //buscar el articulo, asignar el nombre de la imagen y actualizarlo
            Article.findOneAndUpdate({ _id: articleId }, { image: fileName }, { new: true }, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(200).send({
                        status: "Error",
                        message: "Error al guardar la imagen"
                    });
                }
                return res.status(200).send({
                    status: "success",
                    article: articleUpdated
                });
            });
        }
    },
    getImage: (req, res) => {
        let file = req.params.image;
        let filePath = './upload/articles/' + file;
        fs.exists(filePath, (exist) => {
            if (exist) {
                return res.sendFile(path.resolve(filePath));
            }
            else {
                return res.status(404).send({
                    status: "Error",
                    message: "La imagen no existe"
                });
            }
        });
    },
    search: (req, res) => {
        //sacar el string a buscar
        let searchString = req.params.search;
        //Find or
        Article.find({ "$or": [
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } },
            ]
        })
            .sort([['date', 'descending']])
            .exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: "Error",
                    message: "Error en la petición"
                });
            }
            if (!articles || articles.length <= 0) {
                return res.status(404).send({
                    status: "Error",
                    message: "No se encontraron coincidencias"
                });
            }
            return res.status(200).send({
                status: "success",
                articles
            });
        });
    }
}; //end controller
module.exports = controller;
