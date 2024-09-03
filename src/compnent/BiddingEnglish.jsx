import React, { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import { Button, Card, CardContent, getAlertTitleUtilityClass, Paper, TextField } from '@mui/material'
import { useNavigate } from "react-router";
import { BlockchainContext } from "../Web3Connection/Connection";
import { notify } from "./Notify";

const BiddingEnglish = () => {
  const { web, nftContract, dutchContract, engContract, multiContract, account } = useContext(BlockchainContext)
  const [tokenId, setTokenId] = useState();
  const [amount, setAmount] = useState();
  const [allDetail, setAllDetail] = useState();
  const [endTime, setEndTime] = useState();
  const navigate = useNavigate();


  const getAuctionDetail = async () => {
    try {
      const result = await engContract.methods.AuctionDetail().call();
      setAllDetail(result)
      // Convert the BigInt timestamp to a number
      let timestamp = Number(result.EndedTime);
      // Create a new Date object using the timestamp (in milliseconds)
      let date = new Date(timestamp * 1000);
      let formattedDate = date.toLocaleString();
      console.log(`The actual clock time is: ${formattedDate}`);
      setEndTime(formattedDate)
   
    } catch (error) {
      console.log('error', error)
    }
  };

 
  // const checkTime = async () => {
  //   try {
  //     const result = await engContract.methods.checkTime().call();
  //     console.log('check time is:',result)
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // };

  // const getEndTimess = () => {
  //   // let now = new Date();
  //   // console.log('now time is ',now)
  //   // now.setSeconds(now.getSeconds() + endTime);
  //   let hours = endTime.getHours().toString().padStart(2, '0');
  //   let minutes = endTime.getMinutes().toString().padStart(2, '0');
  //   let seconds = endTime.getSeconds().toString().padStart(2, '0');
  //   console.log('end time is ;', hours, ":", minutes, ":", seconds)
  // }
  // const getEndTimes = async () => {
  //   try {
  //     const endTime = await engContract.methods.endTime().call();
  //     const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  //     const remainingTime = endTime.toString() - currentTime; // Calculate remaining time

  //     if (remainingTime < 0) {
  //       return "00:00"; // Return "00:00" if the time has already passed
  //     }

  //     const minutes = Math.floor(remainingTime / 60);
  //     const seconds = remainingTime % 60;

  //     // Adding leading zero to seconds if it's less than 10
  //     const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  //     setTime(`${minutes}:${formattedSeconds}`)
  //     console.log(`end time is ; ${minutes}:${formattedSeconds}`)
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // };

  useEffect(() => {
    getAuctionDetail()

  }, [multiContract]);
  const getBid = async () => {
    try {
      let Amount = web.utils.toWei(amount, 'ether');
      const gas = await engContract.methods.Bid(tokenId).estimateGas({ from: account, value: Amount })
      const result = await engContract.methods.Bid(tokenId).send({ from: account, gas: gas, value: Amount });
      console.log('bidd is', result);
      notify('success', 'Successful', 'Successfully bid in auction');
      getAuctionDetail();
    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message
      } else {
        errorMessage = "Unexpected Error";
      }
      notify('error', 'Error', errorMessage)
    }
  }
  const getCancel = async () => {
    try {
      const gas = await engContract.methods.Cancel(tokenId).estimateGas({ from: account })
      const result = await engContract.methods.Cancel(tokenId).send({ from: account, gas: gas });
      console.log('bidd is', result);
      notify('success', 'Successful', 'Auction Canceled');
      getAuctionDetail();
    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message
      } else {
        errorMessage = "Unexpected Error";
      }
      notify('error', 'Error', errorMessage)
    }
  }
  const getEndTime = async () => {
    try {
      const gas = await engContract.methods.EndTime(tokenId).estimateGas({ from: account })
      const result = await engContract.methods.EndTime(tokenId).send({ from: account, gas: gas });
      console.log('bidd is', result);
      notify('success', 'Successful', 'Time ended successfully');
      getAuctionDetail();
    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message
      } else {
        errorMessage = "Unexpected Error";
      }
      notify('error', 'Error', errorMessage)
    }
  }
  const getWithdraw = async () => {
    try {
      const gas = await engContract.methods.Withdraw(tokenId).estimateGas({ from: account })
      const result = await engContract.methods.Withdraw(tokenId).send({ from: account, gas: gas });
      console.log('bidd is', result);
      notify('success', 'Successful', 'Amount successfully withdraw');
      getAuctionDetail();
    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message
      } else {
        errorMessage = "Unexpected Error";
      }
      notify('error', 'Error', errorMessage)
    }
  }

  const resetAuction = async() => {
    try {
      const gas = await engContract.methods.reset().estimateGas({from: account});
      const result = await engContract.methods.reset().send({from: account, gas: gas});
      getAuctionDetail();
      navigate('/english-auction')
      notify('success','Successful','Auction successfully reset')
      console.log('result reset auction',result)
    } catch (error) {
      console.log('error reset',error)
      notify('error','Error',error.message)
    }
}
  return (
    <div className=" ">

      <Container className="mt-5">
        <Card className=" MuuliColorCard rounded-5 shadow">

          <Row xl={2} lg={2} md={1} sm={1} xs={1} className="p-4" >
            <Col className="mb-3 ">
              <Container>
                <h5 className='text-start '>Auction Details</h5>
                <Card className="ModernCard mx-auto rounded-4">
                  <CardContent>
                    {allDetail ? (
                      <ul className="listStyle m-0 p-1  ">
                        <li  className="ellipsedText">Owner: {allDetail.Owner}</li>
                        <li className="ellipsedText">Beneficiar: {allDetail.Beneficiar}</li>
                        <li className="ellipsedText">Token Id: {allDetail.ToknId.toString()}</li>

                      </ul>
                    ) : (
                      <ul className="listStyle m-0 p-1  ">
                        <li className="ellipsedText">Owner: 0x00000000000000000000000000000000000000000000</li>
                        <li className="ellipsedText">Beneficiar: 0x00000000000000000000000000000000000000000000</li>
                        <li className="ellipsedText">Tiken Id: 0</li>
                      </ul>
                    )}

                  </CardContent>
                </Card>
              </Container>
            </Col>

            <Col>
              <h5 className="text-start">Participient Details</h5>
              <Card className="ModernCard mx-auto rounded-4">
                <CardContent>
                  {allDetail ? (
                    <ul className="listStyle m-0 p-1  ">
                      <li className="ellipsedText">End Time: {endTime}</li>
                      <li className="ellipsedText" >Highest Bid: { web.utils.fromWei(allDetail.HighestBid.toString(), 'ether' )} ETH</li>
                      <li className="ellipsedText">Highest Bidder: {allDetail.HighestBidder}</li>

                    </ul>
                  ) : (
                    <ul className="listStyle m-0 p-1  ">
                      <li className="ellipsedText">Time: 0:00</li>
                      <li className="ellipsedText">Highest Bid: 0</li>
                      <li className="ellipsedText">Highest Bidder: 0x00000000000000000000000000000000000000000000</li>
                    </ul>
                  )}

                </CardContent>
              </Card>
            </Col>
          </Row>
          <CardContent>
            <div className="Cardstyle  mt-5 mb-5 ">
              <TextField className="w-100 ellipsedText" label='Token Id' placeholder="Enter token id" type="number" id="tokenid" name="tokenid" required onChange={(e) => setTokenId(e.target.value)} />
              <br /><br />
              <TextField className="w-100 ellipsedText" label='Amount' placeholder="Enter bid amount" type="number" id="amount" name="amount" required onChange={(e) => setAmount(e.target.value)} />
              <br /><br />
              <div className="d-flex justify-content-between">
                <Button className="bg-primary  w-100" size="large"  variant="contained" onClick={getBid}>Bid</Button>
                <Button className="bg-warning  w-100 ms-1 me-1" size="large"  variant="contained" onClick={getWithdraw}>Withdraw</Button>
                <Button className="bg-info  w-100 me-1" size="large"  variant="contained" onClick={getCancel}>Cancel</Button>
                <Button className="bg-danger  w-100" size="large"  variant="contained" onClick={getEndTime}>Stop</Button>
                {/* <Button className="bg-danger  w-100" variant="contained" onClick={resetAuction}>reset</Button> */}
              </div>
              <Button className="bg-secondary mt-3 w-100" variant="contained" size="large" onClick={resetAuction}>reset auction</Button>

            </div>
          </CardContent>
        </Card>
      </Container>

    </div>
  )
};

export default BiddingEnglish;
