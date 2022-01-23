# ipfs-mirror-nft

Mirrors an ERC721 token metadata and images by pinning to IPFS.

## Requirements

- Access to an IPFS API
- Infura project-id and secret
- The address of an ERC721 token that implements ERC721UriStorage and ERC721Enumerable

## Setup

- node16+
- yarn

```
yarn install
```

Make a copy of `.env.example` and modify as needed

```
cp .env.example .env
```

The ENV vars to set:

- INFURA_PROJECT_ID -- Infura project ID. Required.
- INFURA_PROJECT_SECRET -- Infura secret (optional)
- ERC721_ADDRESS -- Contract address. Required.
- IPFS_URL -- IPFS API endpoint. Defaults to "http://localhost:5001"
- NETWORK -- Ethereum network. Defaults to "homestead"

## Usage

```
yarn start
```
