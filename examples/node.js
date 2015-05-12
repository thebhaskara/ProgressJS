// Including ProgressJS 
var Progress = require('./../progress');

// Create new instance
var progress = new Progress(function(){
    console.log('Hi, progress is initialized');
});

// Example for .start and .done
progress.start('1 sec process');
setTimeout(function(){
    console.log('1 sec process is done');
    progress.done('1 sec process');
}, 1000);

// Example for .startAsync
progress.startAsync(function(){
    var t = new Date();
    t.setSeconds(t.getSeconds() + 2);
    while(t > new Date());
    console.log('2 second process is done.');
});

// Example for doneCallback
setTimeout(progress.doneCallback(function(){
    console.log('3 sec process is done');
}), 3000);

// register changed event
progress.whenChanged(function(status){
    console.log(status.percentageCompleted + '% is completed');
});

// register completed event
progress.whenComplete(function(){
    console.log('all are completed');
});
