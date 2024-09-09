import React, { useContext, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap";
import { BlockchainContext } from "../Web3Connection/Connection";
import { Button, IconButton, TextField } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router";
import { RiTokenSwapFill } from "react-icons/ri";
import { notify } from "./Notify";
import BiddingEnglish from "./BiddingEnglish";

const EnglishAuction = (props) => {
  const { web, nftContract, dutchContract, engContract, multiContract, account } = useContext(BlockchainContext)
  const [datas, setDatas] = useState();
  const [beneficiar, setBeneficiar] = useState();
  const [duration, setDuration] = useState();
  const [tokenId, setTokenId] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const data = async () => {

    console.log('account is ', account)

    console.log('beneficar',beneficiar)
    console.log('duration',duration)
   
    console.log("token id token", tokenId)

  }

//   const getStartBidding = async() => {
//     try {
//       const gas = await engContract.methods.StartBidding(beneficiar, duration, tokenId).estimateGas({ from: account });
//       const result = await engContract.methods.StartBidding(beneficiar, duration, tokenId).send({ from: account, gas: gas });
//       console.log('result',result)
//       notify('success',"Successful",'Wallet successfully created')
//     } catch (error) {
//       console.log('error', error)
//       let errorMessage;
//       if (error && error.data && error.data.data) {
//         errorMessage = error.data.data.reason;
//       } else if(error.message)  {
//         errorMessage = error.message;
//       }else{
//         errorMessage = 'Unexpected Error';
//       }
//       notify('error','Error',errorMessage)
//     }
// }
const getStartBiddings = async () => {
  setLoading(true)
  try {
    const gas = await engContract.methods.StartBidding(beneficiar, duration, tokenId).estimateGas({ from: account });
    const result = await engContract.methods.StartBidding(beneficiar, duration, tokenId).send({ from: account, gas: gas });
    console.log('result',result)
    navigate('english-bidding')
    notify('success',"Successful",'Auction successfully started')
  } catch (error) {
    console.log('error', error)
    let errorMessage;
    if (error && error.data && error.data.data) {
      errorMessage = error.data.data.reason;
    } else if(error.message)  {
      errorMessage = error.message;
    }else{
      errorMessage = 'Unexpected Error';
    }
    notify('error','Error',errorMessage)
  }finally{
    setLoading(false)
  }
};
//<BiddingEnglish time={duration}/>
  return (
    <div className="mb-5">
      <Container className="mt-5 mb-5"  >
        <div className="CardStyled mb-5 ">
          <Player className="w-50 h-50" src='https://lottie.host/c8ea89bd-f982-4778-994f-adecbbb9e99c/GQUdoDc6E1.json' loop autoplay />
          {loading && (
          <div className="m-auto  bg-successk" style={{top:'50%',left:'50%', transform: 'translate(-50%, -50%)', zIndex: 1, position: 'absolute'}}>
          <Player className="bg-k  " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{height:'150px', width:'150px'}} />
              </div>
          )}
          <Row xl={2} lg={2} md={1} sm={1} xs={1} className="mb-4"> 
          
            <Col className="mt-3 ellipsedText">
              <TextField className="w-100 ellipsedText" label='Token Id' placeholder="Enter token id" type="number" id="tokenid" name="tokenid" required onChange={(e) => setTokenId(e.target.value)} />

            </Col> 
            <Col className="mt-3 ellipsedText">
              <TextField className="w-100 ellipsedText" label='Duration' placeholder="Enter time duration" type="number" id="duration" name="duration" required onChange={(e) => setDuration(e.target.value)} />
            </Col>
          </Row>
          <Col className=" mb-5 ellipsedText">
              <TextField className="w-100 ellipsedText" label='Beneficiar' placeholder="Enter beneficiar address" type="text" id="beneficiar" name="beneficiar" required onChange={(e) => setBeneficiar(e.target.value)} />
            </Col>
          <Button className="w-100 bg-info " size="large" variant="contained" onClick={getStartBiddings}>Start Auction</Button>
          {/* <Button className="w-100 " variant="contained" onClick={data}>data</Button> */}
      
        </div>
      </Container>
      {/* <Player className="" style={{height:'200px', width:'200px',bottom:'0px'}} src='https://lottie.host/cd90abeb-3701-4a03-ae89-ae4713753b18/G1pWwOL5dy.json' loop autoplay/> */}
    </div>
  )
};

export default EnglishAuction;
