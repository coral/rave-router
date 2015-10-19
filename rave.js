'use strict';
var express = require('express');
var routes = require('./routes.json');
var _ = require('lodash');
var app = null;

var Router = function () {
};

Router.Http = function(App)
{
    app = App;
    routes.forEach(function(route){
        createRoute(route);
    });
}

Router.Socket = function(socket)
{
    routes.forEach(function(route){
        createSocket(socket, route);
    });
}

/**
 * Bind the routes with the incomming JSON "routes" structure
 */

var createRoute = function(route) {
    for (var key in route.routes) {
        (function() {
            var mod = require('./' + route.path);
            var prop = route.routes[key];
            var method = key.split(' ')[0];
            var path = '/' + route.name + key.split(' ')[1];
            var fn = mod[prop];

            app[method.toLowerCase()](path, function(req, res){
                var resp = fn(req)
                res.status(resp.status).json(resp.data);
            });

        })();
    }
}

var createSocket = function(socket, route) {
    for (var key in route.routes) {
        (function() {
            var mod = require('./' + route.path);
            var prop = route.routes[key];
            var method = key.split(' ')[0];
            var path = '/' + route.name + key.split(' ')[1];
            var func = mod[prop];
            socket.on(path, function (data, ret) {
                if (typeof ret !== 'undefined' && ret !== null){
                    ret(func(data));
                    //try socket.emit("/test", null, function(kek) { console.log(kek) }); on the client side
                } else {
                    func(data);
                } 
            });
        })();
    }
}

module.exports = Router;