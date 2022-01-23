import { create as ipfsCreate } from "ipfs-http-client";
import type { IPFSHTTPClient } from "ipfs-http-client";

export function create() {
  const ipfsUrl = process.env.IPFS_URL || "http://localhost:5001";

  const ipfs = ipfsCreate({
    url: ipfsUrl,
  });
  return ipfs;
}

export function stripIpfsProtocol(maybeIpfsProtocol: string) {
  const imgComponents = maybeIpfsProtocol.split("ipfs://");
  if (imgComponents.length > 0) {
    return imgComponents[1];
  }
  return maybeIpfsProtocol;
}

export async function loadUtf8Content(
  ipfsClient: IPFSHTTPClient,
  ipfsCid: string,
  abortController?: AbortController
) {
  const textDecoder = new TextDecoder();
  let content = "";
  for await (let metadataBuf of ipfsClient.cat(ipfsCid, {
    signal: abortController?.signal,
  })) {
    content += textDecoder.decode(metadataBuf);
  }
  return content;
}
