import { load } from 'js-moss';
import { setInterval } from './task';
import { post, outlet, on } from './max';
import { JsApi } from './ableton';

inlets = 1;
outlets = 4;

const configFile = require('raw-loader!./emaLive.yaml');

const songs = load(configFile, '');

interface Globals {
  [index: string]: JsApi
}

let globals: Globals = {};

let ready = false;

on('init', (args) => {
  globals.info = new JsApi('live_set');
  globals.tempo = new JsApi('live_set song tempo');
  outlet(0, 'songs _parameter_range ' + Object.keys(songs).sort().join(' '));
  ready = true;
});

on('setSong', (args) => {
  const song = args[0];
  const info = songs[song];
  post('set song ' + song + ' @ ' + info.tempo);
  globals.tempo.set('value', info.tempo);
});