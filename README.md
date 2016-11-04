# angular-js
signalGo client version for angularjs

SignalGo is a library for Cross-Platform developers that makes it incredibly simple to add real-time web functionality to your applications. What is "real-time web" functionality? It's the ability to have your server-side code push content to the connected clients as it happens, in real-time. like WCF and SignalR


##Quick Usage angularjs Client-Side:

first download SignalGo.js from [here](https://github.com/seyedabbasseyedi/SignalGo-client-angularjs/blob/master/SignalGo.js);

then define your angular service According to the example:


SignalGo-service.js :

```js
    taxiApp.service('signalGo', function () {
    this.firstTime = true;
    this.connecting = false;
    this.attemptToConnect = 0;
    this.isClosedConnection = true;
    var currentSignalGoService = this;
    this.connectToServer = connectToServer;

    function connectToServer(onSuccessCallback, onErrorCallback, onCloseCallback) {
        this.provider = new ClientProvider();
        this.service;
        currentSignalGoService.attemptToConnect++;
        this.provider.Connect('ws://localhost:5648/FamilyDeskServices', currentSignalGoService.provider, function () {
            currentSignalGoService.isClosedConnection = false;
            currentSignalGoService.firstTime = false;
            currentSignalGoService.provider.RegisterService("myService", function (myService) {
                currentSignalGoService.service = myService;
                onSuccessCallback();
            });
        }, function () {
            if (!currentSignalGoService.isClosedConnection && !currentSignalGoService.firstTime) {
                currentSignalGoService.connectToServer(onSuccessCallback);
            }
            else
                onErrorCallback();
        }, function () {
            currentSignalGoService.isClosedConnection = true;
            if (!currentSignalGoService.firstTime)
                setTimeout(function () { currentSignalGoService.connectToServer(onSuccessCallback) }, (currentSignalGoService.attemptToConnect - 1) * 10000);
            else
                onCloseCallback();
        });

        if (this.callback == undefined) {
            this.callback = this.provider.RegisterCallbackSerice("myServiceCallback");
        }
        else
            this.provider.SetCallbackService("myServiceCallback", this.callback);
    }

    //use in angular-test.js
    this.SendMessage = function (firstParameter, secondParameter, callback) {
        this.service.Send("SendMessage", firstParameter, secondParameter, callback)
    }
});

```

then define your angular app

angular-test.js :

```js
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

```


# Pull Requests
I welcome all pull requests from you guys.Here are 3 basic rules of your request:
  1. Match coding style (braces, spacing, etc.)
  2. If its a feature, bugfix, or anything please only change code to what you specify.
  3. Please keep PR titles easy to read and descriptive of changes, this will make them easier to merge :)

  
## Other source on github
  1. [javascript client](https://github.com/SignalGo/client-js)
  2. [.Net Framework Client Side](https://github.com/SignalGo/client-net)
  3. [.Net Framework Server side](https://github.com/SignalGo/server-net)
  4. [Java Client](https://github.com/SignalGo/client-java)
  
  

# Maintained By
[Seyed Abbas Seyedi](https://github.com/seyedabbasseyedi) [Blog](http://badrpg.ir)

[Mahdi Ketabdar](https://github.com/mahdi7192)

[Ali Yousefi](https://github.com/hamishebahar) [Blog](http://framesoft.ir)
