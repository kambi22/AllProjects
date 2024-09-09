import React, { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import { Button, Card, CardContent, Paper, TextField } from '@mui/material'
import { useNavigate } from "react-router";
import { BlockchainContext } from "../Web3Connection/Connection";
import { notify } from "./Notify";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import { Player } from "@lottiefiles/react-lottie-player";
const BiddingDutch = (props) => {
  const { web, nftContract, dutchContract, engContract, multiContract, account } = useContext(BlockchainContext)
  const [tokenId, setTokenId] = useState();
  const [amount, setAmount] = useState();
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const getCurrentPrice = async () => {
    try {
      const result = await dutchContract.methods.getCurrentPrice().call({ from: account });
      console.log("time", result.toString())
    } catch (error) {
      console.log('error', error)
    }
  }
  const getDetails = async () => {
    setLoading(true)
    try {
      const result = await dutchContract.methods.getAuctionDetails().call({ from: account });
      console.log("time", result)
      setDetail(result)
    } catch (error) {
      console.log('error', error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    getDetails();
  }, [dutchContract]);
  const getBuyItem = async () => {
    setLoading(true)
    try {
      const gas = await dutchContract.methods.buy().estimateGas({ from: account, value: web.utils.toWei(amount, "ether") });
      const result = await dutchContract.methods.buy().send({ from: account, gas: gas, value: web.utils.toWei(amount, "ether") });
      console.log('item buy', result)
      getDetails();
      notify('success', 'Successful', 'Item successfully bought')
    } catch (error) {
      console.log('error',error)
      console.log('amounti is',web.utils.toWei(amount, "ether"))
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error';
      }
      notify('error', 'Error', errorMessage)

    }finally{
      setLoading(false)
    }
  }

  const getEndAuction = async () => {
    setLoading(true)
    try {
      const gas = await dutchContract.methods.endAuction().estimateGas({ from: account });
      const result = await dutchContract.methods.endAuction().send({ from: account, gas: gas });
      console.log("result is ended", result);
      notify('success', 'Successful', 'Auction Ended')
      getDetails
    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error';
      }
      notify('error', 'Error', errorMessage)

    }finally{
      setLoading(false)
    }
  }
  const resetAuction = async () => {
    setLoading(true)
    try {
      const gas = await dutchContract.methods.resetAuction().estimateGas({ from: account });
      const result = await dutchContract.methods.resetAuction().send({ from: account, gas: gas });
      console.log("result is ended", result);
      notify('success', 'Successful', 'Auction successfully reset')
      navigate('/dutch-auction')
    } catch (error) {
      console.log('error resent dutch auction',error)
      notify('error','Error',error.message)

    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="">

      <Container className="mt-5">
        <Card className=" MuuliColorCard rounded-5 shadow">

          <Row xl={2} lg={2} md={1} sm={1} xs={1} className="p-5" >
            <Col className="mb-3">
              <h5 className='text-start'>Auction Details</h5>
              <Card className="ModernCard rounded-4">
                <CardContent>
                  {detail ? (
                    <ul className="listStyle m-0 p-1  ">
                      <li className="ellipsedText">Item: {detail._nftItem}</li>
                      <li className="ellipsedText">Owner: {detail._owner}</li>
                      <li className="ellipsedText">Tiken Id: {detail._tokenId.toString()}</li>

                    </ul>
                  ) : (
                    <ul className="listStyle m-0 p-1  ">
                      <li className="ellipsedText">Item: 0x00000000000000000000000000000000000000000000</li>
                      <li className="ellipsedText">Owner: 0x00000000000000000000000000000000000000000000</li>
                      <li className="ellipsedText">Token Id: 0</li>
                    </ul>
                  )}

                </CardContent>
              </Card>
            </Col>

            <Col>
              <h5 className="text-start">Participient Details</h5>
              <Card className="ModernCard rounded-4">
                <CardContent>
                {detail ? (
                    <ul className="listStyle m-0 p-1  ">
                      <li className="ellipsedText">Start Price: {web.utils.fromWei(detail._startPrice.toString(), 'ether')} ETH</li>
                      <li className="ellipsedText">End Price: {web.utils.fromWei(detail._endPrice.toString(), 'ether')} ETH</li>
                      <li className="ellipsedText">Buyer: {detail._buyer}</li>
                      
                    </ul>
                  ) : (
                    <ul className="listStyle m-0 p-1  ">
                      <li className="ellipsedText">Start Price: 0</li>
                      <li className="ellipsedText">End Price: 0</li>
                      <li className="ellipsedText">Buyer: 0x00000000000000000000000000000000000000000000</li>
                    </ul>
                  )}
                </CardContent>
              </Card>
            </Col>
          </Row>
          {loading && (
          <div className="m-auto  bg-successk" style={{top:'50%',left:'50%', transform: 'translate(-50%, -50%)', zIndex: 1, position: 'absolute'}}>
          <Player className="bg-k  " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{height:'150px', width:'150px'}} />
              </div>
          )}
          <CardContent>
            <div className="Cardstyle  mt-5 mb-5 ">

              <TextField className="w-100 ellipsedText" label='Amount' placeholder="Enter bid amount" type="number" id="amount" name="amount" required onChange={(e) => setAmount(e.target.value)} />
              <br /><br />
              <div className="d-flex justify-content-between">
                <Button className="bg-primary  w-100" variant="contained" onClick={getBuyItem}>Buy Item</Button>
                <Button className="bg-warning  w-100 ms-1 me-1" variant="contained" onClick={getEndAuction}>Stop</Button>
                {/* <Button className="bg-secondary  w-100 me-1" variant="contained" onClick={getDetails}>AuctionDetail</Button>
                <Button className="bg-secondary  w-100 me-1" variant="contained" onClick={getCurrentPrice}>getCurrentPrice</Button> */}

              </div>
              <Button className="bg-secondary mt-3 w-100 " variant="contained" onClick={resetAuction}>Reset auction</Button>

            </div>
          </CardContent>
        </Card>
      </Container>

    </div>
  )
};

export default BiddingDutch;
