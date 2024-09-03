
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext } from "react"
import { useTheme } from '@mui/material/styles';
import { MdDarkMode, MdHome, MdLightMode, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router";
import { themeContext } from "../Context/themeContext";
import { RiAuctionFill, RiAuctionLine } from "react-icons/ri";

import { IoImages, IoLanguage, IoLogIn, IoWallet } from "react-icons/io5";

const Sidebar = ({ open, close }) => {
  const { isDark, toggleTheme } = useContext(themeContext)
  const navigate = useNavigate();

  return (
    <div className="">

      <Drawer className="d-sm-none d-block w-75" anchor="left" open={open} onClose={close}>
        <div className={isDark ? 'MySidebar h-100 bg-dark' : 'MySidebar h-100 bg-light'}>
          <ListItemButton className="p-3 w-100" onClick={() => navigate('/')}>
            <ListItemIcon>
              <MdHome size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
          <hr className="mt-0" />
          <ListItemButton onClick={() => navigate('/multisignature-wallet')}>
            <ListItemIcon>
              <IoWallet size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='MultiSig Wallet' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/english-auction')}>
            <ListItemIcon>
              <RiAuctionFill size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='English Auction' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/dutch-auction')}>
            <ListItemIcon>
              <RiAuctionLine size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Dutch Auction' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/nft-mint')}>
            <ListItemIcon>
              <IoImages size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Create NFTs' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/login')}>
            <ListItemIcon>
              <IoLogIn size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItemButton>
          <hr />
          {!isDark ? (
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <MdDarkMode size={24} /> {/* Increase size to 24px */}
              </ListItemIcon>
              <ListItemText primary='Dark mode' />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <MdLightMode size={24} /> {/* Increase size to 24px */}
              </ListItemIcon>
              <ListItemText primary='Light mode' />
            </ListItemButton>
          )}


          <ListItemButton onClick={() => navigate('/language')}>
            <ListItemIcon>
              <IoLanguage size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Language' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <MdSettings size={24} /> {/* Increase size to 24px */}
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItemButton>
        </div>
      </Drawer>

    </div >
  )
};

export default Sidebar;
