// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721 {
    uint256 public tokenId;
    address public admin;
    address public owner;
    mapping (uint => bool) public isMinted;
    event MintAttempt(address indexed to, uint256 indexed tokenId);

        constructor(string memory name, string memory symbol) ERC721(name, symbol) {
            admin = msg.sender;
        }

 

    function mint(address to,uint _tokenId) external  {
       //require(!_exists(_tokenId), "Token ID already minted");
       require(!isMinted[_tokenId], "Nft is already minted on this id");

        isMinted[_tokenId] = true;
        owner = to;
        _safeMint(to, _tokenId);
        tokenId = _tokenId;

        emit MintAttempt(to, tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://api.example.com/metadata/";

    }
        function setApprovalForAllToAuction(address auctionContract,uint  _tokenId) public {
        // The caller of this function will set approval for the auction contract to manage all their NFTs
        require(isMinted[_tokenId], "Please mint nft before to approval on this id");

        setApprovalForAll(auctionContract, true);
    }
    function checkisApprovedForAll(address _owner, address operator) public view returns (bool) {
        return isApprovedForAll(_owner, operator);
        
    }

 

    // Burn function to permanently remove an NFT
    function burn(uint256 _tokenId) external {
        // Check if the caller is the owner of the token or the admin
         require(isMinted[_tokenId],"Token id is not minted");
         require(msg.sender == owner || msg.sender == admin, "Only owner or admin can burn nft");
        // Burn the NFT
        isMinted[_tokenId] = false;
        _burn(_tokenId);
    }
    
}
