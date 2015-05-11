(function () {
    var Progress = window['Progress'] = function (initializeCallback) {

        var progress = [],
            completedCallback, changedCallback,
            that = this,
            emptyFunction = function () {},
            states = {
                started: 'started',
                done: 'done'
            },
            doneCount = 0;

        if (initializeCallback) initializeCallback();

        this['start'] = function (key) {
            progress.push({
                key: key,
                state: states.started
            });
            triggerChangedCallback
        }

        this['startAsync'] = function (callback) {
            setTimeout(that['doneCallback'](callback));
        }

        this['doneCallback'] = function (callback) {
            that.start(callback);
            return function () {
                if (callback) callback.apply(callback, arguments);
                that.done(callback);
            }
        }

        var triggerChangedCallback = function () {
            if (changedCallback) {
                var n = progress.length
                changedCallback({
                    completed: doneCount,
                    total: n,
                    percentageCompleted: doneCount * 100 / n,
                    detail: progress
                });
            }
        }

        this['done'] = function (key) {

            var allAreCompleted = true;

            for (var i = 0, n = progress.length; i < n; i++) {
                var pg = progress[i];
                if (pg.key == key) {
                    pg.state = states.done;
                    doneCount++;
                }
                if (pg.state != states.done) allAreCompleted = false;
            }

            triggerChangedCallback();

            if (allAreCompleted) {
                if (completedCallback) completedCallback();
            }
        }

        this['whenChanged'] = function (callback) {
            changedCallback = callback;
        }

        this['whenComplete'] = function (callback) {
            completedCallback = callback;
        }
    };
    return Progress;
})();
