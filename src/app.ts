import cliProgress from "cli-progress";
import createProvider from "./provider.js";
import createContract from "./erc721.js";
import {
  create as createIpfsClient,
  loadUtf8Content,
  stripIpfsProtocol,
} from "./ipfs.js";
import { IPFSHTTPClient } from "ipfs-http-client";
import { Erc721UriStorage } from "./contracts/Erc721UriStorage.js";
import { Erc721Enumerable } from "./contracts/Erc721Enumerable.js";
import { BigNumber } from "ethers";

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

async function pinAll(
  ipfsClient: IPFSHTTPClient,
  storage: Erc721UriStorage,
  enumerable: Erc721Enumerable
) {
  const tokenCount = await enumerable.totalSupply();
  bar.start(tokenCount.toNumber(), 0);
  for (let i = BigNumber.from(1); i.lte(tokenCount); i = i.add(1)) {
    bar.update(i.toNumber());
    const metadataUrl = await storage.tokenURI(i);
    const ipfsCid = stripIpfsProtocol(metadataUrl);
    await ipfsClient.pin.add(ipfsCid);
    const metadataContent = await loadUtf8Content(ipfsClient, ipfsCid);
    const metadata = JSON.parse(metadataContent);
    const imageCid = stripIpfsProtocol(metadata.image);
    await ipfsClient.pin.add(imageCid);
  }
}

export default async function () {
  const provider = createProvider(process.env.NETWORK || "homestead");
  const ipfsClient = createIpfsClient();
  const erc721 = createContract(process.env.ERC721_ADDRESS || "", provider);
  await pinAll(ipfsClient, erc721.uriStorage, erc721.enumerable);
}
