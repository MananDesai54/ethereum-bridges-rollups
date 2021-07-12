// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Balance {
    uint256 balance = 0;

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function updateBalance(uint256 _balance) public {
        balance = _balance;
    }
}
