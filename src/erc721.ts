import { providers, Contract } from "ethers";
// import {
//   Erc721UriStorage__factory,
//   Erc721Enumerable__factory,
// } from "./contracts";
import { Erc721UriStorage__factory } from "./contracts/factories/Erc721UriStorage__factory.js";
import { Erc721Enumerable__factory } from "./contracts/factories/Erc721Enumerable__factory.js";

export default function (address: string, provider: providers.Provider) {
  return {
    uriStorage: Erc721UriStorage__factory.connect(address, provider),
    enumerable: Erc721Enumerable__factory.connect(address, provider),
  };
}
