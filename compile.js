const path = require('path');
const fs = require('fs');
const solc = require('solc');

const IdeaPath = path.resolve(__dirname, 'contracts', 'idea.sol');

const source = fs.readFileSync(IdeaPath, 'utf8');

const contracts = {
  sources: {
    'idea.sol': source,
  }
};
let compiled = solc.compile(contracts, 1);
console.log(compiled); //comment if you want
module.exports  = compiled.contracts[ 'idea.sol:idea'];