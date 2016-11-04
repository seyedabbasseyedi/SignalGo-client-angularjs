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
