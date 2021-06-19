import web3 from "./web3";
import AdFactory from "./build/AdFactory.json";

const instance = new web3.eth.Contract(
  AdFactory.abi,
  "0x5d7efD619Df8804636233559994d52aD97BC824B"
);

export default instance;
