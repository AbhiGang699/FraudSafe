import web3 from "./web3";
import AdFactory from "./build/AdFactory.json";

const instance = new web3.eth.Contract(
  AdFactory.abi,
  "0x159697ffB1997669AD91f8F884af1245d6c7d06B"
);

export default instance;
// 0x5d7efD619Df8804636233559994d52aD97BC824B