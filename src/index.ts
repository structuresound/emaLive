import { load } from 'js-moss';
import { setInterval } from './task';
import { post, outlet, on } from './max';
import { JsApi } from './ableton';

inlets = 1;
outlets = 4;

const configFile = require('raw-loader!./emaLive.yaml');

const songs = load(configFile, '');

interface Globals {
  info: JsApi
  tempo: JsApi
}

let globals: Globals = <any>{};

let ready = false;

on('init', (args) => {
  globals.info = new JsApi('live_set');
  outlet(0, 'songs _parameter_range ' + Object.keys(songs).sort().join(' '));
  ready = true;
});

on('setSong', (args) => {
  if (!globals.info) {
    post('init before settings song');
    return;
  }
  const song = args[0];
  const info = songs[song];
  post('set song ' + song + ' @ ' + info.tempo + '\n');
  globals.info.set('tempo', info.tempo);
});