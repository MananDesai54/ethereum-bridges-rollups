// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Balance {
    uint256 public balance = 0;
    
    event balanceChanged(uint256 balance);

    constructor() public {
        balance++;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function addBalance(uint256 _value) public {
        balance = balance + _value;
        emit balanceChanged(balance);
    }

    function subBalance(uint256 _value) public {
        balance = balance - _value;
        emit balanceChanged(balance);
    }
}
