// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract System {

    //uint256 private constant MAX_NUM_OF_TICKETS = 10;
    //uint256 private constant MAX_NUM_OF_PURCHASABLE_TICKETS_PER_ONE_USER = MAX_NUM_OF_TICKETS;
    uint256 private maxTicket;
    uint256 private maxPurchasableTicketsPerOneUser;
    uint256 private ticketPrice;

    bool private hasPurchaseFinished;
    uint256 private winnerTicketNumber = 0;    
    uint256 private remainingTime;
    address payable winnerAddress;
    address payable private winnerPayable;
    
    constructor(uint256 _maxTickets, uint256 _maxPurchasableTicketsPerOneUser) {
        maxTicket = _maxTickets;
        maxPurchasableTicketsPerOneUser = _maxPurchasableTicketsPerOneUser;
        
        //ticketPrice = (msg.value / 10) / MAX_NUM_OF_PURCHASABLE_TICKETS_PER_ONE_USER;
    }
    
    
    function buyTicket() public payable {
        require(!hasPurchaseFinished);
        //require((msg.value / 10) <= MAX_NUM_OF_PURCHASABLE_TICKETS_PER_ONE_USER); // max 10 tickets per user
        /*
        if (winnerPayable == payable(address(0))) {
            winnerAddress = msg.sender;
            
            uint256 ticketNumber = 0;
            for (;ticketNumber < MAX_NUM_OF_TICKETS ; ++ticketNumber) {
                if (winnerPayable == payable(address(0))) break; // no winner yet
                else continue; 
            }
            
            require((ticketNumber -1) < MAX_NUM_OF_TICKETS);
                
            winnerPayable = payable(msg.sender);
            winnerTicketNumber = ticketNumber-1;
        }*/
    }
    

/*
    function store(uint256 num) private {
        number = num;
    }

    function retrieve() public view returns (uint256){
        return number;
    }
    */
}