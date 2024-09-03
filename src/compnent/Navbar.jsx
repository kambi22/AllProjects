
import React, { useContext, useState } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { IconButton, Switch } from "@mui/material";
import { themeContext } from "../Context/themeContext";
import { MdLightMode, MdDarkMode, MdMenu } from "react-icons/md";
import Sidebar from "./Sidebar";
import white from './images/react192.png'
import gold from './images/gold.png'
const Header = (props) => {
  const {isDark, toggleTheme} = useContext(themeContext);
  const [open, setOpen] = useState(false);
 const navigate = useNavigate();


 const SidebarHandler  = () => {
     setOpen(!open)
 }
  
  return (
    <div className="sticky-top">
      
    <Navbar className={!isDark ? 'ColoredLight' : 'ColoredDark'} expand='md' sticky="top" style={{height:'70px'}} >
      <Container  >
        <Sidebar open={open} close={SidebarHandler}/>
        <div className="me-auto d-flex">
        <IconButton className="d-inline d-sm-none"  onClick={SidebarHandler}>
          <MdMenu/>
        </IconButton>
        <Navbar.Brand  className=""  onClick={()=>navigate('/')} style={{cursor:'pointer'}}>
          {/* <img src="react192.png" className="me-1" alt="logo" style={{height:'30px'}} /> */}
          <img src={white} className={!isDark ? 'd-inline' : 'd-none'} alt="logo" style={{height:'30px'}} /> 
           {/* <img src="darkblue.png" className={!isDark ? 'd-inline' : 'd-none'}  alt='logo' style={{height:'30px'}} /> */}
          <img src={gold} className={isDark ? 'd-inline': 'd-none'} alt="logo" style={{height:'30px'}} />
          <strong className={!isDark ? 'ColoredLight' : 'ColoredDark'}>Softwork</strong>
        </Navbar.Brand>
        </div>
        <Nav  className="">
          <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={()=>navigate('/')}>Home</Nav.Link>
          <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={()=>navigate('/multisignature-wallet')}>MultisigWallet</Nav.Link>
          <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={()=>navigate('/english-auction')}>Englishauction</Nav.Link>
          <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={()=>navigate('/dutch-auction')}>Dutchauction</Nav.Link>
          <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={()=>navigate('/nft-mint')}>Nftmint</Nav.Link>
          <Nav.Link className={!isDark ? 'ColoredLight d-none d-md-inline' : 'ColoredDark d-none d-md-inline'} onClick={()=>navigate('/login')}>Login</Nav.Link>
        </Nav>
        <Nav className="" >
      
     <IconButton className={!isDark? 'd-inline' : 'd-none'} onClick={toggleTheme} >
     <p className={!isDark? 'd-inline h6 me-1' : 'd-none'}>Light</p>
        <MdLightMode/>
      </IconButton>
      <IconButton className={isDark? 'd-inline' : 'd-none'} onClick={toggleTheme}>
     <p className={isDark? 'd-inline h6 me-1' : 'd-none'}>Dark</p>
        <MdDarkMode/>
      </IconButton>
     </Nav>
      </Container>
     
      

    </Navbar>

    </div>
  )
};

export default Header;
