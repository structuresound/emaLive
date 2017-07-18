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

max.init = () => {
  post('recompiled');

  // setInterval(2000, () => {
  //   post(JSON.stringify(songs.solace.tempo));
  // });

  globals = {
    tempo: new JsApi('tempo')
  }

  outlet(0, 'songs _parameter_range ' + Object.keys(songs).join(' '));
}

on('setSong', (args) => {
  const song = args[0];
  post('set song' + args[0]);
  const info = songs[song];

  post(info);
  globals['tempo'].set('value', info.tempo);
});

max.myFunc = () => {
  post('myFunc');
}

