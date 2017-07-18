import { setInterval } from './task';

inlets = 1;
outlets = 4;

const config = require('json-loader!yaml-loader!./emaLive.yaml');


setInterval(2000, () => {
  post(JSON.stringify(config.solace.tempo));
});

max.onLoad = () => {
  post('recompiled');
}

max.myFunc = () => {
  post('myFunc');
}