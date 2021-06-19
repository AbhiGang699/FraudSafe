import web3 from "./web3";
import Ad from "./build/Ad.json";

export default ad => {
  return new web3.eth.Contract(Ad.abi, ad);
};
