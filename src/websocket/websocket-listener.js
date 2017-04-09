/**
 * Created by XuanVinh on 3/30/2017.
 */
'use strict';

var SockJS = require('sockjs-client'); // <1>
var Stomp = require('stompjs'); // <2>

function register(registrations) {
    var socket = SockJS('http://localhost:8080/questions'); // <3>
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        registrations.forEach(function (registration) { // <4>
            stompClient.subscribe(registration.route, registration.callback);
        });
    });
}

module.exports.register = register;