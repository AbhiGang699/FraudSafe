const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
const contractFileName = 'Ad.sol';

// Delete the current build folder.
fs.removeSync(buildPath);

const adPath = path.resolve(__dirname, "contracts", contractFileName);
const source = fs.readFileSync(adPath, "utf8");


const input = {
  language: "Solidity",
  sources: {},
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};
input.sources[contractFileName] = {
  content: source
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);

const contracts = output.contracts[contractFileName];

// Create the build folder.
fs.ensureDirSync(buildPath);

// Extract and write the JSON representations of the contracts to the build folder.
for (let contract in contracts) {
  if (contracts.hasOwnProperty(contract)) {
    const element = contracts[contract];
    fs.outputJsonSync(
      path.resolve(buildPath, `${contract}.json`),
      contracts[contract]
    );
  }
}
