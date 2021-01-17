const _ = require('lodash');
const fp = require('lodash/fp');

const trace = _.curry((tag,v)=>{
  console.log(tag,v);
  return v;
})

const f = _.flowRight(fp.join('-'),trace('map后'),fp.map(_.toLower),trace('split后'),fp.split(' '))

console.log(f('DONT SAY DIE'));