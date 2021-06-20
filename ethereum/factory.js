import web3 from "./web3";
import AdFactory from "./build/AdFactory.json";

const instance = new web3.eth.Contract(
  AdFactory.abi,
  "0xC2d1e503bb414942C5E949C858d9214b77A8bc57"
);

export default instance;
// 0x5d7efD619Df8804636233559994d52aD97BC824B
// 0x159697ffB1997669AD91f8F884af1245d6c7d06B
// 0x24F51E4B19df078aA993ff8f05aF35E4b51117e0
// 0x4c5781dCd6343bd89909ec1B487736735E6773a4