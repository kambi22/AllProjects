import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Multisig from "./MultiSig";
import EnglishAuction from "./EnglishAuction";
import DutchAuction from "./DutchAuction";
import NftMint from "./NftMint";
import SLogo from "./Slogo";
import Footer from "./Footer";
import Header from "./Navbar";
import Login from "./Login";
import Home from "./Home";
import BiddingDutch from "./BiddingDutch";
import BiddingEnglish from "./BiddingEnglish";
import DetailMultiSig from "./BiddingMuliSig";
import Simple from "./SimpleStorage";
const Routting = (props) => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/multisignature-wallet" Component={Multisig} />
        <Route path="/multisignature-wallet/mulisignature-details" Component={DetailMultiSig} />
        <Route path="/english-auction" Component={EnglishAuction} />
        <Route path="/english-auction/english-bidding" Component={BiddingEnglish} />
        <Route path="/dutch-auction" Component={DutchAuction} />
        <Route path="/dutch-auction/dutch-bidding" Component={BiddingDutch} />
        <Route path="/nft-mint" Component={NftMint} />
        <Route path="/login" Component={Login} />
        <Route path="/simple" Component={Simple} />
      </Routes>
     <Footer/>
      </BrowserRouter>
    </div>
  )
};

export default Routting;
