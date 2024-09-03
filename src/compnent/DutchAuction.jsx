import React, { useContext, useEffect, useState, useSyncExternalStore, useTransition } from "react"
import { BlockchainContext } from "../Web3Connection/Connection";
import { Button, Card, CardContent, TextField, Tooltip } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { notify } from "./Notify";

const DutchAuction = (props) => {
  const { web, nftContract,nftContAddress, dutchContract, account } = useContext(BlockchainContext);
  const [owner, setOwner] = useState();
  const [buyer, setBuyer] = useState();
  const [isActive, setIsActive] = useState();
  const [amount, setAmount] = useState();
  const [startPrice, setStartPrice] = useState();
  const [endPrice, setEndPrice] = useState();
  const [duration, setDuration] = useState();
  const [nftItem, setNftItem] = useState(nftContAddress);
  const [tokenId, setTokenId] = useState();
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [btnCreatColor, setBtnCreatColor] = useState(false)
  const [detail, setDetail] = useState();

  const [nftName, setNftName] = useState();
  const [nftSymbol, setNftSymbol] = useState();
  const [nftAdmin, setNftAdmin] = useState();
  const [nftOwner, setNftOwner] = useState();
  const [nftTokenuri, setNftTokenuri] = useState();

  const navigate = useNavigate();

  async function getNFTDetails() {
    try {
        if (!tokenId) throw new Error("tokenId is not set");
        if (!nftContract) throw new Error("nftContract is not initialized");

        const owner = await nftContract.methods.ownerOf(tokenId).call();
        console.log(`Owner of token ID ${tokenId}: ${owner}`);
        setNftOwner(owner);

        const admin = await nftContract.methods.admin().call();
        console.log(`nft item admin ID ${admin}`);
        setNftAdmin(admin);

        const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
        console.log(`Token URI of token ID ${tokenId}: ${tokenURI}`);
        setNftTokenuri(tokenURI);

        const name = await nftContract.methods.name().call();
        console.log(`NFT Collection Name: ${name}`);
        setNftName(name);

        const symbol = await nftContract.methods.symbol().call();
        console.log(`NFT Collection Symbol: ${symbol}`);
        setNftSymbol(symbol);

        const balance = await nftContract.methods.balanceOf(owner).call();
        console.log(`Balance of the owner: ${balance}`);
    } catch (error) {
        console.error("Error in getNFTDetails:", error);
    }
}


 
async function fetchTokenId() {
  try {
      const tokenId = await nftContract.methods.tokenId().call();
      console.log(`NFT item token ID: ${tokenId}`);
      console.log('token id is sssssss', tokenId)
      setTokenId(tokenId.toString()); // Assuming setTokenId is a useState setter
      
  } catch (error) {
      console.error('Error fetching token ID:', error);
  }
}

useEffect(() => {
  fetchTokenId();
 
}, [dutchContract]); // Fetch token ID on component mount
useEffect(()=>{
    getNFTDetails();
},[tokenId]);

 
  // Function's calling block
  const getCreateAuction = async () => {//nft contract addres: 0x0F8Da504De2D5f7553bbe62E337a6F46b92DbF1e , tokenId : 6
    try {
      const gas = await dutchContract.methods.createAuction(startPrice, endPrice, duration, nftItem, tokenId).estimateGas({ from: account })
      const result = await dutchContract.methods.createAuction(startPrice, endPrice, duration, nftItem, tokenId).send({ from: account, gas: gas })
      console.log('items:', startPrice, endPrice, duration, nftItem, tokenId)
      console.log('result is :', result)
      setBtnCreatColor(true)
      navigate('dutch-bidding')
      notify('success','Success','Auction successfully started')
    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if(error.message)  {
        errorMessage = error.message;
      }else{
        errorMessage = 'Unexpected Error';
      }
      notify('error','Error',errorMessage)

    }
  }
  // const getDetails = async () => {
  //   try {
  //     const result = await dutchContract.methods.getAuctionDetails().call({ from: account });
  //     console.log("get auction detailss", result)
  //     setDetail(result)
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }
  // useEffect(() => {
  //   getDetails();

  // }, []);

  return (
    <div>
      <Container className="mt-5"  >
      <Row xl={2} lg={2} md={1} sm={1} xs={1} className=" mb-5" >
            <Col className="mb-3">
              <h5 className='text-start'>Auction Details</h5>
              <Card className=" rounded-4 w-100" >
                <CardContent>
                  {tokenId ? (
                    <ul className="listStyle m-0 p-1  ">
                      <li className="ellipsedText">NFT Collection Name: {nftName}</li>
                      <li className="ellipsedText">NFT Collection Symbol: {nftSymbol}</li>
                      <li className="ellipsedText">NFT Collection Token Id: {tokenId}</li>

                    </ul>
                  ) : (
                    <ul className="listStyle m-0 p-1  ">
                       <li className="ellipsedText">NFT Collection Name: </li>
                      <li className="ellipsedText">NFT Collection Symbol: </li>
                      <li className="ellipsedText">NFT Collection Token Id: 0</li>
                    </ul>
                  )}

                </CardContent>
              </Card>
            </Col>

            <Col>
              <h5 className="text-start">Participient Details</h5>
              <Card className=" rounded-4" >
                <CardContent>
                {tokenId ? (
                    <ul className="listStyle m-0 p-1  ">
                     <li className="ellipsedText">Nft Collection Owner: {nftOwner}</li>
                     <li className="ellipsedText">Nft Collection Admin: {nftAdmin}</li>
                     <li className="ellipsedText">Nft Token Uri: {nftTokenuri}</li>
                      
                    </ul>
                  ) : (
                    <ul className="listStyle m-0 p-1  ">
                      <li className="ellipsedText">Nft Collection Owner: 0x00000000000000000000000000000000000000000000</li>
                      <li className="ellipsedText">Nft Collection Admin:  0x00000000000000000000000000000000000000000000</li>
                      <li className="ellipsedText">Nft Token Uri: </li>
                    </ul>
                  )}
                </CardContent>
              </Card>
            </Col>
          </Row>
        <div className="CardStyled ">
        
          <Row xl={2} lg={2} md={1} sm={1} xs={1} className="mb-5">
            <Col className="mt-3">
              <TextField className="w-100 ellipsedText" required placeholder="Enter Auctionn Start Price" type="number" label='Start Price' id="price" name="price" onChange={(e) => setStartPrice(e.target.value)} />
            </Col>
            <Col className="mt-3">
              <TextField className=" w-100 ellipsedText" placeholder="Enter Auctionn End Price" type='number' label='End Price' id="price" name="price" onChange={(e) => setEndPrice(e.target.value)} />

            </Col >
              <Col className="mt-3">
            <TextField className="w-100 ellipsedText" placeholder="Enter Auctionn Duration Time" type="number" label='Duration' id="time" name="time" onChange={(e) => setDuration(e.target.value)} />
            </Col>
            
            <Col className="mt-3">
              <TextField className="w-100 ellipsedText" placeholder="Enter Nft Item Token Id" label="Token Id" type="number" id="id" name="id" onChange={(e) => setTokenId(e.target.value)} />

            </Col>
           <Tooltip arrow title='NFT contract address on that you mint nft, now you can use this minted nft item with token ID reference'>
              <TextField disabled value={nftItem} className="w-100 mt-3 ps-2 pe-2 ellipsedText" placeholder="Enter Nft Item Address" label="  Nft Address" type="address" id="address" name="address" onChange={(e) => setNftItem(e.target.value)} />
              </Tooltip>
          
          </Row>
          <Button variant="contained" className=" w-100" size="large" color={btnCreatColor ? "success" : "primary"} onClick={getCreateAuction}>Start Auction</Button><br /><br />

        </div>
      </Container>



    </div>
  )
};

export default DutchAuction;
