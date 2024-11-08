// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "contracts/4_System.sol";
import "contracts/4_Ticket.sol";

contract User {

    string private userName;
    Ticket[] private tickets = new Ticket[](0);


    constructor(){
        userName="Unknown";
    }

    function purchaseTicket() public{
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