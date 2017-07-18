inlets = 1;
outlets = 8;

var watchers = [];

function init() {
  post("init mira meters", global_mira_faders);
  global_mira_faders.forEach(function(track, i) {
    var watcher = new LiveAPI(function(args) {
      outlet(i, args[1] * 100.0);
    }, "live_set tracks " + track);
    watcher.property = "output_meter_level";
    watchers.push(watcher);
  });
}
