# Whisper-Protocol
This is simple application that implements whisper protocol using [Web3](https://github.com/ethereum/web3.js/) [Whisper](https://web3js.readthedocs.io/en/1.0/web3-shh.html)

## install
Requires a Geth (Go Ethereum) node connected and synchronised to a blockchain. This node must be enabled with whisper and expose a WS API for usage with the Web3.
```bash
geth --shh --rpc --rpccorsdomain "*"
```

Install all project dependencies.
```bash
npm install
```

run with symmetric key
```bash
npm start name password sym selectedTopic
```

run with asymmetric key
```bash
npm start name "" asym selectedTopic
```
