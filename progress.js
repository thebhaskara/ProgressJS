/**
 * Progress module.
 * @module Progress
 */
(function () {
    /**
     * Creates a progress tracking object
     * @param {Callback} initializeCallback - Called after initializing this object.
     * @return {Progress} Progress - Returns object of Progress.
     */
    var Progress = function (initializeCallback) {
        /** The module's `progress` container object. */
        var progress = [],
            /** The module's `completed` callback. */
            completedCallback, 
            /** The module's `changed` callback. */
            changedCallback,
            /** The root(this) object for accessing all the properties. */
            root = this,
            /** An empty function for invalid return purposes. */
            emptyFunction = function () {},
            /** @enum {string} states */
            states = {
                /** @property {string} started - State when a process is just started */
                started: 'started',
                /** @property {string} done - State when a process is completed */
                done: 'done'
            },
            /** @member {number} doneCount - Keeps the count of all processes which are done */
            doneCount = 0;
        /** Initialize function is called if its callback was passed */
        if (initializeCallback) initializeCallback();

        /** 
         * Marks start for a given key
         * @param {Object} key - pass any object as key, prefer passing a string
         * @return {Progress} retuns root object*/
        root['start'] = function (key) {
            /** Creates a new progress entry for a process with the given key */
            progress.push({
                key: key,
                /** sets the state as started*/
                state: states.started
            });
            /** triggers change callback */
            triggerChangedCallback();
            return root;
        }

        /** 
         * Starts an async process from callback after marking it as started
         * @param {function} callback - pass a callback to start in async.
         * @return {Progress} retuns root object*/
        root['startAsync'] = function (callback) {
            setTimeout(root['doneCallback'](callback));
            return root;
        }

        /** 
         * Marks a new process as started and returns the callback.
         * When callback is called, this process will be marked as done.
         * @param {function} callback - pass a callback to start progress for a process.
         * @return {Progress} retuns the callback with added done trigger*/
        root['doneCallback'] = function (callback) {
            root.start(callback);
            return function () {
                if (callback) callback.apply(callback, arguments);
                root.done(callback);
            }
        }

        /** Triggers the callback registered for update event */
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

        /** 
         * Marks a the process with respective key as done and returns the root.
         * @param {Object} key - pass any object as key, prefer passing a string
         * @return {Progress} retuns root object*/
        root['done'] = function (key) {
            /** @todo optimize the logic */
            /** gets and sets the state of the process with key to done */
            var allAreCompleted = true;

            for (var i = 0, n = progress.length; i < n; i++) {
                var pg = progress[i];
                if (pg.key == key) {
                    pg.state = states.done;
                    doneCount++;
                }
                if (pg.state != states.done) allAreCompleted = false;
            }

            /** triggers change callback */
            triggerChangedCallback();

            if (allAreCompleted) {
                /** triggers complete callback */
                if (completedCallback) completedCallback();
            }
            
            return root;
        }

        /** 
         * Registers the given callback for any progress change event.
         * @param {function} callback - pass a callback to register for change event.
         * @return {Progress} retuns root object*/
        root['whenChanged'] = function (callback) {
            changedCallback = callback;
            return root;
        }

        /** 
         * Registers the given callback for all progress complete event.
         * @param {function} callback - pass a callback to register for all progress complete event.
         * @return {Progress} retuns root object*/
        root['whenComplete'] = function (callback) {
            completedCallback = callback;
            return root;
        }
    };
    
    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Progress;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return Progress;
        });
    }
    // included directly via <script> tag
    else {
        root.Progress = Progress;
    }
})();
