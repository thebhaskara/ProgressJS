# ProgressJS 

A javascript tool to track progress between different async activities.

## Why use ProgressJS?
* As, it can register and trigger a callback after all your async activities are done.
* As, your code would look syncronous even if it works asyncronously.
* As, it can update you in real time whenever a change in progress happens.
* As, it can start async processes for you and still the progress can be tracked.
* As, it is compatable with RequireJS, node, amd, normal browser usage, etc...

## How to use ProgressJS?
1. Download the `progress.js` file to your local.
2. Include it in your project.

  if you are using it in a browser then add it in html
  ``` html
  <script src="progress.js"></script>
  ```

  if you are using it in node application..
  ```js
  var Progress = require('./progress');
  ```

3. use it in your javascript
```js
// declare and initialize progress
var progress = new Progress(function () {
    // code to execute while initalizing
});

// register a function to fire on change event.
progress.whenChanged(function (status) {
    // status will provide the present progress details
});

// mark 'start' progress for the process with key 'request'
progress.start('request');

// trigger an asyncronous ajax call
// jquery ajax is used only to show an example of asynchronous activity
// progressjs doesnot require jquery as such
$.ajax({ 
    type: 'POST',
    url: '/echo/json/',
    data: {
        json: ['something'],
        delay: 5
    },
    success: function () {
        // write your success return logic

        // mark 'done' progress for the process with key 'request'
        progress.done('request');
    },
    error: function () {
        // write your error return logic

        // mark 'done' progress for the process with key 'request'
        progress.done('request');
    }
});

// register a function to fire on complete event.
progress.whenComplete(function () {
    // write the code to be executed when progress is completed
});
```
See example on [JS filddle](http://jsfiddle.net/thebhaskara/ky29ou4e/1/)

Note: node js example can be found in examples folder.

## API reference

### Defining new object
```js
var process = new Process([callback]);
```
initalization takes a `callback` parameter which is optional.
this `callback` is executed on initialization.

### `.done(key)`

Marks the progress of the process as done with the given `key`.

`key` can be any type of object, prefer providing a string.

change event is triggered.

Returns the root object.

See example on [JS filddle](http://jsfiddle.net/thebhaskara/ky29ou4e/1/)

### `.doneCallback(callback)`

When called, marks the progress of the callback process as started.

change event is triggered.

Returns the callback wrapped with a done trigger.

progress of this callback will be marked as done once the callback is executed.

See example on [JS filddle](http://jsfiddle.net/thebhaskara/b43ycfs0/1/)

### `.start(key)`

Marks the progress of the process as started with the given `key`.

`key` can be any type of object, prefer providing a string.

change event is triggered.

Returns the root object.

See example on [JS filddle](http://jsfiddle.net/thebhaskara/b43ycfs0/1/)

### `.startAsync(callback)`

Marks the progress of the process as started with the given `callback`.

Starts an asyncronous process with the `callback`. 

Marks done when the `callback` has finished executing.

change event is triggered.

Returns the root object.

See example on [JS filddle](http://jsfiddle.net/thebhaskara/6n1uc7y5/1/)

### `.whenChanged(callback)`

Change event triggers whenever a start or done is marked.

`callback` is triggered whenever a change happens.

status object is passed to the `callback`.

Returns the root object.

See example on [JS filddle](http://jsfiddle.net/thebhaskara/b43ycfs0/1/)

### `.whenComplete(callback)`

Complete event triggers whenever all the processes are marked as done.

`callback` is triggered when a complete event happens.

Returns the root object.

See example on [JS filddle](http://jsfiddle.net/thebhaskara/b43ycfs0/1/)

