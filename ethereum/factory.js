import web3 from "./web3";
import AdFactory from "./build/AdFactory.json";

const instance = new web3.eth.Contract(
  AdFactory.abi,
  ""
);

export default instance;
