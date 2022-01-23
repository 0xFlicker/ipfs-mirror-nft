import { providers } from "ethers";

export default function (network: providers.Networkish) {
  return new providers.InfuraProvider(network, {
    projectId: process.env.INFURA_PROJECT_ID,
    secret: process.env.INFURA_SECRET,
  });
}
