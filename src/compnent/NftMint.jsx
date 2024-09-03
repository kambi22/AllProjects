import React, { useContext, useEffect, useState } from "react"
import { BlockchainContext } from "../Web3Connection/Connection";
import Button from '@mui/material/Button';
import { Card, CardContent, CardMedia, TextField, Tooltip } from "@mui/material";
import { notify } from "./Notify";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const NftMint = (props) => {
    const { web, nftContract, dutchAddress, account } = useContext(BlockchainContext);
    // const [name, setName] = useState('');
    // const [symbol, setSymbol] = useState('');
    // const [admin, setAdmin] = useState('');
    const [to, setTo] = useState('');
    const [tokenId, setTokenId] = useState();
    const [dutchContAddress, setDutchContAddress] = useState(dutchAddress);//0xAC952ea6948641A34C9518E0D33e4924a77dC264
    const [image, setImage] = useState("https://i0.wp.com/css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-2.gif");
    const [isImage, setIsImage] = useState(false);
    // const [isIntialized, setIsIntialized] = useState(false);
    const [isminted, setIsminted] = useState(false);
    const navigate = useNavigate();

    // async function getNFTDetails() {
    //     // Get the owner of the token
    //     const owner = await nftContract.methods.ownerOf(tokenId).call();
    //     console.log(`Owner of token ID ${tokenId}: ${owner}`);

    //     const admin = await nftContract.methods.admin().call();
    //     console.log(`nft item admin ID ${admin}`);

    //     // const tokenId = await nftContract.methods.tokenId().call();
    //     // console.log(`nft item token ID ${tokenId}`);

    //     // Get the token URI
    //     const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
    //     console.log(`Token URI of token ID ${tokenId}: ${tokenURI}`);

    //     // Get the name of the NFT collection
    //     const name = await nftContract.methods.name().call();
    //     console.log(`NFT Collection Name: ${name}`);

    //     // Get the symbol of the NFT collection
    //     const symbol = await nftContract.methods.symbol().call();
    //     console.log(`NFT Collection Symbol: ${symbol}`);

    //     // Get the balance of the owner
    //     const balance = await nftContract.methods.balanceOf(owner).call();
    //     console.log(`Balance of the owner: ${balance}`);
    // }


    // const getnextTokenId = async () => {
    //     try {
    //         const result = await nftContract.methods.tokenId().call()
    //         console.log('id is', result)
    //         setTokenId(result)

    //     } catch (error) {
    //         console.log('error owner', error)
    //     }
    // }
    // const getOwner = async () => {
    //     try {
    //         const result = await nftContract.methods.admin().call()
    //         console.log('owner is', result)
    //         setOwner(result)

    //     } catch (error) {
    //         console.log('error owner', error)
    //     }
    // }

    // useEffect(() => {
    //     getnextTokenId()
    //     getOwner();
    // }, [nftContract]);
    console.log('image is images', image)

    // const getinitialize = async () => {
    //     try {
    //         const gas = await nftContract.methods.initialize().estimateGas({ from: account });
    //         const result = await nftContract.methods.initialize().estimateGas({ from: account, gas: gas });
    //         console.log("Nft initialized successfully");
    //     } catch (error) {
    //         console.log('error nft initialized');
    //     }
    // }

    const getOwner = async () => {
        try {
            const owner = await nftContract.methods.ownerOf(tokenId).call();
            console.log(`Owner of token ID ${tokenId}: ${owner}`);
            setTo(owner);
        } catch (error) {
            console.log('error get owner of nft', error)
        }

    }
    useEffect(()=>{
        getOwner()
    },[tokenId]);
    const mintNft = async () => {
        try {
            if (isImage) {
                const gasEstimate = await nftContract.methods.mint(to, tokenId).estimateGas({ from: account });
                const result = await nftContract.methods.mint(to, tokenId).send({ from: account, gas: gasEstimate });
                console.log('result mint nft', result)
                setIsminted(true)
                notify('success', 'Nft item Successfully minted', 'Now you can Approve for duth auction contract ')
            } else {
                notify('warning', 'Warning', 'Plese insert an image before mint nft')
            }
        } catch (error) {
            let errorMessage;
            console.log('error is', error)
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
    // const Initializenft = async () => {
    //     try {
    //         if (isImage) {
    //             if (name !== '' && symbol !== '' && admin !== '') {
    //                 const gasEstimate = await nftContract.methods.initialize(name, symbol, admin).estimateGas({ from: account });
    //                 const result = await nftContract.methods.initialize(name, symbol, admin).send({ from: account, gas: gasEstimate });
    //                 console.log('result mint nft', result)
    //                 setIsIntialized(true)
    //                 notify('success', 'Successful', 'Nft item Successfully initalized')
    //             } else {
    //                 notify('error', 'Error', 'Please enter  name, symbol & adim beform for initialize ')
    //             }
    //         } else {
    //             notify('error', 'Error', 'Please insert an image before initialize')
    //         }
    //     } catch (error) {
    //         notify('error', 'Error', error.message)
    //     }
    // }

    const setApprovalForAllToAuction = async () => {
        try {

            if (isminted) {
                const gasEstimate = await nftContract.methods.setApprovalForAllToAuction(dutchContAddress).estimateGas({ from: account });
                const result = await nftContract.methods.setApprovalForAllToAuction(dutchContAddress).send({ from: account, gas: gasEstimate });
                console.log('result mint nft', result)
                navigate('/dutch-auction')
                notify('success', 'Successful', 'Nft item Successfully Approved')
            } else {
                notify('error', 'Error', 'Please mint nft before Approvel')
            }
        } catch (error) {
            let errorMessage;
            console.log('error is', error)
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
    const checkisApprovedForAll = async () => {
        try {
            const result = await nftContract.methods.checkisApprovedForAll(to, dutchContAddress).call({ from: account });
            console.log('result mint nft', result)
        } catch (error) {
            console.log('error is approved for all:', error)
        }
    }
    const burnNft = async () => {
        try {
            const gas = await nftContract.methods.burn(tokenId).estimateGas({ from: account });
            const result = await nftContract.methods.burn(tokenId).send({ from: account, gas: gas });
            console.log('result mint nft', result)
            notify('success', 'Successully Burn', `Nft item Successfully removed from token id: ${tokenId}`)
        } catch (error) {
            let errorMessage;
            console.log('error is', error)
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

    // const GetsetApprovalForAllToAuction = async () => {
    //     try {
    //         const gas = await nftContract.methods.setApprovalForAllToAuction().estimateGas({ from: account });
    //         const result = await nftContract.methods.setApprovalForAllToAuction().send({ from: account, gas: gas });
    //         console.log('all details', result);

    //     } catch (error) {
    //         console.log('nft details error:', error)
    //     }
    // }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setIsImage(true)
        }
    };

    // Function to handle drag-and-drop
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            isImage(true)
        }
    };

    //     const CheckInitalizeData = () => {
    //      try {
    //         if (isImage) {
    //             if (name === '' && symbol === '' && admin === '') {
    //                 notify('error', 'Error', 'Please enter  name, symbol & adim beform for initialize ')

    //             } else {
    //                 notify('success', 'Successful', 'Nft item Successfully initalized')

    //             }
    //         } else {
    //             notify('error', 'Error', 'Please insert an image before initialize')
    //         }
    //     } catch (error) {
    //         notify('error', 'Error', error.message)
    //     }
    // }

    const handleDragOver = (e) => {
        e.preventDefault();
        isImage(true)
    };

    return (
        <div className="">
            <Container className="mt-5">
                <Card className="MuuliColorCard shadow rounded-5 mt-5">
                    <CardContent>
                        <Row >
                            <Col className="m-3 rounded-5">
                                <div
                                    className="m-auto mt-4 ShadowEffect border rounded-5 d-flex justify-content-center align-items-center"
                                    style={{
                                        height: '400px',
                                        maxWidth: '400px',
                                        minWidth: '200px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        backgroundColor: '#f8f9fa',
                                        cursor: 'pointer',
                                    }}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <img
                                        src={image}
                                        className="w-100 h-100 rounded-5"
                                        alt="Selected"
                                        style={{ objectFit: 'cover', position: 'absolute', }}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{
                                            opacity: 0,
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col >
                                <div className=" p-3 mt-3" >
                                    {/* <TextField className="text-white  mt-3 w-100" id="name " name="name" label='Name' placeholder="Enter item name" value={name} onChange={(e) => setName(e.target.value)} />
                                    <TextField className="text-white  mt-3 w-100" id="symbol " name="symbol" label='Symbol' placeholder="Enter item symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
                                    <TextField className="text-white  mt-3 w-100" id="admin " name="admin" label='Admin' placeholder="Enter admin to contraol dutch contract" value={admin} onChange={(e) => setAdmin(e.target.value)} /> */}
                                    <TextField className="text-white  mt-3  mt-3 w-100" type='text' label='address' id="address" name="address" placeholder="Enter address who control nft " value={to} onChange={(e) => setTo(e.target.value)} />
                                    <TextField className="text-white  mt-3 w-100" type="number" id="tokenid " name="tokenid" label='Token Id' placeholder="Enter token Id" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
                                    <Tooltip title='Dutch contract address for apovale,  to use this minted nfts' arrow>
                                        <TextField className="text-white  mt-3 w-100" id="address " name="address" label='Dutch auction contract address for approval' value={dutchContAddress} onChange={(e) => setDutchContAddress(e.target.value)} style={{ cursor: 'pointer' }} />

                                    </Tooltip>
                                    <div className="d-flex">
                                        {/* <Button className="w-100 rounded-3  bg-info mt-5 me-1 " label='Name' size="large" variant="contained" onClick={Initializenft}>Initializenft</Button> */}
                                        <Row xl={2} lg={2} md={2} sm={1} xs={1} className="bg-infok w-100 ms-1 mt-4">
                                            <Col className="bg-primaryk">
                                                <Button className="w-100 rounded-3 bg-warning mt-3 " label='Name' size="large" variant="contained" onClick={mintNft}>Mint Nft</Button>
                                            </Col>
                                            <Col className="bg-successk">
                                                <Button className="w-100 rounded-3 bg-success mt-3" label='Name' size="large" variant="contained" onClick={setApprovalForAllToAuction}>Approve dutch auction</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    {/* <Button className="w-100 rounded-3 bg-success mt-3 " label='Name' size="large" variant="contained" onClick={checkisApprovedForAll}>checkis approved</Button> */}
                                    <Button className="w-100 rounded-3 bg-danger mt-3 " label='Name' size="large" variant="contained" onClick={burnNft}>Remove nft</Button>
                                    {/* <Button className="w-100 rounded-3 bg-danger mt-3 " label='Name' size="large" variant="contained" onClick={checkisApprovedForAll}>Check nft</Button> */}

                                </div>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>
            </Container>

            {/* <Button variant="contained" onClick={getinitialize}>Nft Initialized</Button> */}
            {/* <Button variant="contained" onClick={mintNft}>Mint Nft</Button> */}
            {/* <Button variant="contained" onClick={GetsetApprovalForAllToAuction}>Approval All</Button> */}
            {/* <Button variant="contained" onClick={getNFTDetails}>NFt Detail</Button> */}
        </div>
    )
};

export default NftMint;
