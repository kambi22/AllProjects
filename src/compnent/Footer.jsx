import { Facebook, Instagram, LinkedIn, YouTube } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { themeContext } from '../Context/themeContext';

const Footer = (props) => {
    const {isDark} = useContext(themeContext);
  return (
    <div className=''>
      <Navbar className={isDark ? 'ColoredDark Footer' : 'ColoredLight Footer'} >
                <Container className=' d-flex justify-content-between'>
                <Row className='w-100 mt-3'>
                    <Col className='mt-auto d-sm-inline d-none' >
                        <h5><strong>MyBank</strong></h5>
                        <p>© 2024 MyBank. All rights reserved.</p>
                    </Col>
                    <Col >
                        <h5><strong>Contact us</strong></h5>
                        <p>Name: Satnam Singh</p>
                        <p>Phone: +77400-36662</p>
                        <p>Gmail: kambikot8@gmail.com</p>
                        <p>Address: Moga, Punjab (India)</p>
                    </Col>
                    <Col >
                        <h5><strong>About me</strong></h5>
                        <p>Name: Satnam Singh</p>
                        <p>Education: bachelor of computer application(BCA)</p>
                        <p>Collage: Baba Mangal Singh Collage,Bughipure(Moga)</p>
                        <p>University: MRSPTU (Bathinda)</p>
    
                    </Col>
                     <Col className='Colored'>
                    <h5><strong>Follow On Social Media</strong></h5>
                    <a href="https://www.linkedin.com/in/satnam-singh-2771a4316/">
                    <IconButton size='large' className='' style={{height:'30px',width:'30px'}}>
                        <LinkedIn/>
                    </IconButton>
                    </a>
                    <a href="https://www.instagram.com/satnamsingh4092/">
                    <IconButton size='large' className='' style={{height:'30px',width:'30px'}}>
                        <Instagram/>
                    </IconButton>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100044330944377">
                    <IconButton size='large' className='' style={{height:'30px',width:'30px'}}>
                        <Facebook/>
                    </IconButton>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100044330944377">
                    <IconButton size='large' className='' style={{height:'30px',width:'30px'}}>
                        <YouTube/>
                    </IconButton>
                    </a>
                   
                   
                    </Col> 
                </Row>
                </Container> 
             </Navbar>
           
    </div>
  )
};

export default Footer;
