inlets = 1;
outlets = 8;

global_mira_faders = [3, 4, 5, 6, 7, 8, 12, 13];
var watchers = [];

function init() {
  post("init mira faders");
  global_mira_faders.forEach(function(track, i) {
    var watcher = new LiveAPI(function(args) {
      outlet(i, args[1]);
    }, "live_set tracks " + track + " mixer_device volume");
    watcher.property = "value";
    watchers.push(watcher);
  });
}

function slider() {
  var args = arrayfromargs(arguments);
  if (watchers[args[0]]) {
    watchers[args[0]].set("value", args[1]);
  }
}
