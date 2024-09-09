// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract EnglishAuction {
    address public owner;
    address public beneficiar;
    address public highestBidder;
    uint public highestBid = 1 ether;
    bool public ended;
    uint public endTime;
    uint public tokenId;
    uint public startTime;
    mapping(address => uint) public returnBal;
    mapping(uint => address) public ownerof;

    event AuctionEnd(address HighestBidder, uint HighestBid);
    event previews(address PreviewsHighestBidder, uint PreviewsHighestBid);

    function StartBidding(
        address _beneficiar,
        uint _duration,
        uint _tokenId
    ) public {
        owner = msg.sender;
        beneficiar = _beneficiar;
        startTime = block.timestamp;
        endTime = startTime + _duration;
        tokenId = _tokenId;
        ownerof[_tokenId] = beneficiar;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner Can Access");
        _;
    }
    modifier isExist(uint id) {
        require(tokenId == id, "Id Not Exist");
        _;
    }
    modifier TimeNotEnded() {
        require(!ended, "Auction Is Ended");
        require(block.timestamp < endTime, "Bidding time is over");
        _;
    }

    function Bid(uint id) public payable TimeNotEnded isExist(id) {
        require(
            msg.sender != owner && msg.sender != beneficiar,
            "Owner And Benefician Can't Bid"
        );
        require(!ended, "Time is Ended");
        require(
            msg.value > highestBid,
            "Please Increase Bid Amount, There Is Already Higher Bid"
        );

        address PreviewsHighestBidder = highestBidder;
        uint PreviewsHighestBid = highestBid;
        highestBidder = msg.sender;
        highestBid = msg.value;

        if (highestBid != 0) {
            returnBal[msg.sender] = msg.value;
        }
        emit previews(PreviewsHighestBidder, PreviewsHighestBid);
    }

    function Withdraw(uint id) public isExist(id) {
        require(ended, "Only Withdraw After Ended Bidding OR Time Over");
        require(
            msg.sender != highestBidder,
            "Can't Withdraw, Your Are Highest Bidder"
        );
        uint balance = returnBal[msg.sender];
        require(
            balance > 0,
            "Insuficiant Funds, You Have Not Enogh Balance to Withdraw"
        );

        returnBal[msg.sender] = 0;
        (bool sent, ) = payable(msg.sender).call{value: balance}("");
        require(sent, "Transfer failed to withdraw");
    }

    function EndTime(uint id) public isExist(id) onlyOwner {
        ended = true;
        owner = highestBidder;
        ownerof[id] = highestBidder;
        (bool sent, ) = beneficiar.call{value: highestBid}("");
        require(sent, "Transfer failed to beneficiar");

        emit AuctionEnd(highestBidder, highestBid);
    }

    function Cancel() public onlyOwner TimeNotEnded {
        ended = true;

        if (highestBid != 0) {
            returnBal[highestBidder] = highestBid;
            (bool sent, ) = highestBidder.call{value: highestBid}("");
            require(sent, "transfer failed to back highestbidder");
        }
    }

    function AuctionDetail()
        public
        view
        returns (
            address Owner,
            address Beneficiar,
            address HighestBidder,
            uint HighestBid,
            uint ToknId,
            uint EndedTime
        )
    {
        return (owner, beneficiar, highestBidder, highestBid, tokenId, endTime);
    }

    function checkTime() public view returns (uint Time) {
        if (block.timestamp > endTime) {
            return 0;
        } else {
            return endTime - block.timestamp;
        }
    }
    function reset() public {
        owner = address(0);
        beneficiar = address(0);
        highestBidder = address(0);
        highestBid = 0 ether;
        ended = false;
        endTime = 0;
        tokenId = 0;
        startTime = 0;
    }
}
