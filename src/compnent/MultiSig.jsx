import React, { useContext, useState } from "react"
import { BlockchainContext } from "../Web3Connection/Connection";
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, Link, TextField } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { Col, Container, Row } from "react-bootstrap";
import { MdExpandMore } from "react-icons/md";
import { useNavigate } from "react-router";
import { notify } from "./Notify";


const Multisig = (props) => {
  const { web, nftContract, dutchContract, engContract, multiContract, account } = useContext(BlockchainContext)

  const [owners, setOwners] = useState([]);
  const [confirmations, setConfirmations] = useState();

  const navigate = useNavigate();

  // const data = async () => {
  //   console.log('data')
  //   console.log('confimation', confirmations)
  //   console.log('multicontract', multiContract)
  //   console.log('accoun connected', account)
  //   // ['0x545314C1E79589Ec2f97a454f67E61d3AeDF86d1','0xD3dB62da34b02f95926199a9f959EE99f076394c','0x21F9720a12D72728B885acfD47AA213468655968']
  //   // [0x545314C1E79589Ec2f97a454f67E61d3AeDF86d1, 0xD3dB62da34b02f95926199a9f959EE99f076394c, 0x21F9720a12D72728B885acfD47AA213468655968]
  // }
  const handleOwnersInput = (e) => {
    const input = e.target.value;
    const ownersArray = input.split(',').map(addr => addr.trim());
    setOwners(ownersArray);
  };
  const MultiSigWallete = async () => {
    try {
      const gas = await multiContract.methods.setOwners(owners, confirmations).estimateGas({ from: account });
      const result = await multiContract.methods.setOwners(owners, confirmations).send({ from: account, gas: gas });
      console.log('result', result)
      navigate('mulisignature-details')
      notify('success', "Successful", 'Wallet successfully created')
    } catch (error) {
      console.log('error', error)
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error';
      }
      notify('error', 'Error', errorMessage)
    }
  }

  return (
    <div>
      <Container className="mt-5">
        <Row xl={2} lg={2} md={2} sm={1} xs={1} className="mt-5">
          <Col className="">
            <Player className="w-75 h-75 mt-5" src='https://lottie.host/46ab3329-44ca-4b64-a246-978c4b229278/A6JyrLjO2D.json' loop autoplay style={{ height: '200px', width: '200px' }} />
          </Col>
          <Col className="mt-3">
          <h5 className="text-start">Create new wallet</h5>
            <Card className="p-0 m-0">
              <CardContent>
                {owners.length > 0 ? (
                  <ul className="p-0 m-0 listStyle text-secondary">
                    {owners.map((owner, index) => (
                      <li className="ellipsedText" key={index}>Owner {index + 1}: {owner}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="p-0 m-0 listStyle text-secondary">
                    <li className="ellipsedText">Owner 1: 0x0000000000000000000000000000000000000000</li>
                    <li className="ellipsedText">Owner 2: 0x0000000000000000000000000000000000000000</li>
                    <li className="ellipsedText">Owner 3: 0x0000000000000000000000000000000000000000</li>
                  </ul>
                )}

                {/* <Accordion className="mt-3" >
                  <AccordionSummary expandIcon={<MdExpandMore />}>
                  Transaction Details
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="listStyle">
                      <ul>
                        <li>Id: 5</li>
                        <li>To: 0x00000000000000000000000000000000000000</li>
                        <li>Value: 10 ETH </li>
                        <li>Confirmations: 2</li>
                        <li>Executed: true</li>
                      </ul>
                    </div>
                  </AccordionDetails>
                </Accordion> */}
              </CardContent>
            </Card>
            <div className="mt-5 p-3">
              <TextField className="w-100 ellipsedText" label='Owners' placeholder="Enter owners array " type="text" id="address" name="address" onChange={handleOwnersInput} required />
              <TextField className="w-100 mt-3 ellipsedText" label='Confirmations' placeholder="Enter confirmations number" type="number" id="number" name="number" onChange={(e) => setConfirmations(e.target.value)} required /> 
              
              <br /><br />
              <Button variant="contained" className="w-100 bg-info mt-2" size="large" onClick={MultiSigWallete} >Create new wallet</Button>
              <h5 className="mb-0 mt-3">or</h5>
              <hr />
              <Button variant="contained" className="w-100 bg-warning" size="large"onClick={()=>navigate('mulisignature-details')} >Existing Wallet</Button>
              {/* <Button variant="contained" className="w-100" size="large" onClick={data} >Set data</Button> */}
            </div>
          </Col>
        </Row>

      </Container>

    </div>
  )
};

export default Multisig;
