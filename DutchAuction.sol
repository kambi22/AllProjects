// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERCC721 {
    function transferFrom(address from, address to, uint tokenId) external;
    function ownerOf(uint tokenId) external view returns (address);
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}

contract DutchAuction {
    address public owner;
    address public buyer;
    IERCC721 public nftItem;
    uint public tokenId;
    uint private startTime;
    uint private endTime;
    uint public startPrice;
    uint public endPrice;
    bool public isActive;

    event BuyEvent(address indexed buyer, uint currentPrice, uint refund, string message);
    event AuctionEnded(uint finalPrice, string message);
    event AuctionCreated(address indexed owner, uint startPrice, uint endPrice, uint startTime, uint endTime);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can access this");
        _;
    }

    modifier auctionActive() {
        require(isActive, "Auction is not active");
        _;
    }

    function createAuction(uint _startPrice, uint _endPrice, uint _duration, address _nftItem, uint _tokenId) public {
        owner = msg.sender;
        startPrice = _startPrice * 1 ether;
        endPrice = _endPrice * 1 ether;
        startTime = block.timestamp;
        endTime = startTime + _duration;
        nftItem = IERCC721(_nftItem);
        tokenId = _tokenId;

        // Ensure the auction contract is approved to transfer the NFT
        require(nftItem.isApprovedForAll(owner, address(this)), "Auction contract is not approved to transfer this NFT");

        // Ensure the caller owns the NFT
        require(nftItem.ownerOf(tokenId) == owner, "Caller does not own the NFT");

        isActive = true;
        emit AuctionCreated(owner, startPrice, endPrice, startTime, endTime);
    }

    function getCurrentPrice() public view returns (uint) {
        if (block.timestamp >= endTime) {
            return endPrice; // If time has passed, return end price
        }
        uint elapsedTime = block.timestamp - startTime;
        uint totalDuration = endTime - startTime;
        uint priceDecrease = startPrice - endPrice;
        uint currentPrice = startPrice - (priceDecrease * elapsedTime / totalDuration);
        return currentPrice;
    }
    
    function buy() external payable auctionActive {
        uint currentPrice = getCurrentPrice();
        require(msg.value >= currentPrice, "Insufficient funds to buy the item");

        isActive = false;
        buyer = msg.sender;


        // Transfer NFT to the buyer
        nftItem.transferFrom(owner, buyer, tokenId);

        // Transfer funds to the owner
        (bool success, ) = payable(owner).call{value: currentPrice}("");
        require(success, "Transfer to owner failed");

        // Refund excess payment
        uint refund = msg.value - currentPrice;
        if (refund > 0) {
            (success, ) = payable(buyer).call{value: refund}("");
            require(success, "Refund failed");
        }

        emit BuyEvent(buyer, currentPrice, refund, "Item successfully purchased");
    }

    function endAuction() public onlyOwner auctionActive {
        isActive = false;

        // If the NFT wasn't sold, return it to the owner
        if (buyer == address(0)) {
            nftItem.transferFrom(owner, owner, tokenId);
        }

        emit AuctionEnded(getCurrentPrice(), "Auction ended by owner");
    }

    function getAuctionDetails() public view returns (
        uint _startPrice,
        uint _currentPrice,
        uint _endPrice,
        uint _startTime,
        uint _endTime,
        uint _tokenId,
        bool _isActive,
        address _owner,
        address _buyer,
        IERCC721 _nftItem
    ) {
        return (
            startPrice,
            getCurrentPrice(),
            endPrice,
            startTime,
            endTime,
            tokenId,
            isActive,
            owner,
            buyer,
            nftItem
        );
    }
    function resetAuction() public  {
        
            startPrice = 0;
            endPrice = 0;
            startTime = 0;
            endTime = 0;
            tokenId = 0;
            isActive = false;
            owner = address(0);
            buyer = address(0);
            
       
    }
}
