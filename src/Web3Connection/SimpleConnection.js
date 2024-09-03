import React, { createContext, useState } from "react"
import Routting from "../compnent/Routing";
import SAbi from '../contracts/SimpleStorage.json';
import Web3 from "web3";
export const SimpleContext = createContext()

const SimpleConnection = async(props) => {
    const [simpleContract, setSimpleContract] = useState('Hi this is from simple connection file');
    const [account, setAccount] = useState();
    const [web3, setWeb3] = useState();
    if (window.ethereum) {
        try {
            const web3 = new Web3(window.ethereum);
            setWeb3(web3)

            await window.ethereum.request({ method: "eth_requestAccounts" });


                const accounts = await web3.eth.getAccounts();
                console.log('accounts', accounts[0])
                setAccount(accounts[0])

                window.ethereum.on('accountsChanged', (accounts) => {
                    setAccount(accounts[0]);
                })

            const netId = await web3.eth.net.getId();

                const sabi = SAbi.abi;
                const simpleData = await SAbi.networks[netId];

                // const simplecontract = new web3.eth.Contract(sabi, simpleData.address);
                // console.log('simple contrct', simplecontract)
                // setSimpleContract(simplecontract);


            
            
        } catch (error) {
            console.log('Blockchain data not loaded')
        }
    } else {
        console.log('provider not installed')
    }

  return (
    <SimpleContext.Provider value={{simpleContract, account}}>
        <Routting/>
    </SimpleContext.Provider>
  )
};

export default SimpleConnection;
