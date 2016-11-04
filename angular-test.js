var testApp = angular.module('testApp', []);

testApp.controller('testController', function ($scope, signalGo) {

    //call server method
    signalGo.SendMessage({ Text: "ali" }, new Array(), function (response) {
        console.log("send message successful");
    })

    //callback method(return value to server)
    signalGo.callback.Test = function (value1, value2) {
        console.log("this is called");
    }
});