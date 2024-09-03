import React, { createContext, useEffect, useState } from "react"
import Web3 from 'web3'
import MynftAbi from '../contracts/MyNFT.json'
import DuthcAbi from '../contracts/DutchAuction.json'
import EnglishAbi from '../contracts/EnglishAuction.json';
import MultisgAbi from '../contracts/Multisig.json'
import SimpleAbi from '../contracts/SimpleStorage.json';
import Routting from "../compnent/Routing";
import { notify } from "../compnent/Notify";
export const BlockchainContext = createContext();
const Connection = (props) => {
    const [web, setWeb] = useState();
    const [multiContract, setMultiContract] = useState();
    const [engContract, setEngContract] = useState();
    const [nftContract, setnftContract] = useState();
    const [dutchContract, setDutchContract] = useState();
    const [account, setAccount] = useState();
    const [dutchAddress, setDutchAddress] = useState();
    const [nftContAddress, setNftContAddress] = useState();
    const [simple, setSimple] = useState();

    const FetchData = async () => {
        if (window.ethereum) {
            try {
                const web = new Web3(window.ethereum);
                console.log("web3", web)
                setWeb(web)
                await window.ethereum.request({ method: "eth_requestAccounts" });


                const accounts = await web.eth.getAccounts();
                console.log('accounts', accounts[0])
                setAccount(accounts[0])

                window.ethereum.on('accountsChanged', (accounts) => {
                    setAccount(accounts[0]);
                })

                const nftAbi = MynftAbi.abi
                const dutchAbi = DuthcAbi.abi
                const multiAbi = MultisgAbi.abi;
                const engAbi = EnglishAbi.abi;
                const simpleAbi = SimpleAbi.abi;

                const netIdn = await web.eth.net.getId();
                const netId = netIdn.toString();
                console.log('network id sepolia testnet id:',netId)
                
                const nftData = await MynftAbi.networks[netId];
                const dutchData = await DuthcAbi.networks[netId];
                const engData = await EnglishAbi.networks[netId];
                const multiData = await MultisgAbi.networks[netId];
                const simpleData = await SimpleAbi.networks[netId];

              

                console.log('nft   address', nftData.address)
                console.log('dutch  address', dutchData.address)
                console.log('simple storage address',simpleData.address)
                console.log('english  address', engData.address)
                console.log('multi sig address', multiData.address)

                setNftContAddress(nftData.address)
                setDutchAddress(dutchData.address)

                const MultiContract = new web.eth.Contract(multiAbi, multiData.address)
                const dutchContract = new web.eth.Contract(dutchAbi, dutchData.address)
                const nftContract = new web.eth.Contract(nftAbi, nftData.address)
                const engcontract = new web.eth.Contract(engAbi, engData.address)
                const simpleContract = new web.eth.Contract(simpleAbi, simpleData.address);

                setMultiContract(MultiContract)
                setnftContract(nftContract)
                setDutchContract(dutchContract)
                setEngContract(engcontract)
                setSimple(simpleContract)
            } catch (error) {
                console.log('Error fetch data from blockchain.')
            }
        } else {
            console.log("Please install vailed provider like Metamask");
        }
    }
    useEffect(() => {
        FetchData();
    }, []);
    return (
        <BlockchainContext.Provider value={{ web, nftContract,nftContAddress, simple, dutchContract, dutchAddress, engContract, multiContract, account }}>
            <Routting/>
        </BlockchainContext.Provider>
    )
};

export default Connection;
