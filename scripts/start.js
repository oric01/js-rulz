var bs = require('browser-sync').create();
var bodyParser = require('body-parser');
var url = require('url');
var dataProducts = require('../data');
var path = require('path');

// Start Browsersync
bs.init({
  open: false,
  server: {
    /*
     * Les repertoires de bases à exécuter, peut-être un array
     */
    baseDir: './src',
    /*
     *  le point d'entré de l'application
     */
    index: 'index.html',
    /*
     *  les routes vers les ressources statiques
     */
    routes: {
      '/node_modules': 'node_modules',
      '/bower_components': 'bower_components'
    },
    /*
     *  middleware gérant les ressources serveur dynamiques json ...
     */
    middleware: [bodyParser.urlencoded({ extended: true }), function(req, res, next) {
      var parsed = url.parse(req.url);
      if (parsed.pathname.match(/\/api\/products/)) {
        switch (req.method) {
          case 'POST':
            dataProducts.push(req.body);
          case 'GET':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(dataProducts));
        }
      } else {
        next();
      }
    }]
  }
});