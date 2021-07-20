// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Rollup {
    address public sender;
    uint256 public latestBlock;

    struct RolledUpTxn {
        address from;
        uint256 timestamp;
        string data;
        bytes signature;
    }

    mapping(address => mapping(uint256 => bool)) public processedNonce;
    mapping(uint256 => RolledUpTxn) public rolledUpData;

    event rolledUpNewState(
        address from,
        uint256 timestamp,
        string data,
        uint256 nonce,
        bytes signature
    );

    constructor() {
        sender = msg.sender;
    }

    function mintTxnProof(
        address from,
        uint256 timestamp,
        string calldata data,
        uint256 nonce,
        bytes calldata signature
    ) external {
        bytes32 message = prefixed(
            keccak256(abi.encodePacked(from, timestamp, data, nonce))
        );
        require(recoverSigner(message, signature) == from, "Invalid Signature");
        require(processedNonce[from][nonce] == false, "State Already added");
        processedNonce[from][nonce] = true;
        rolledUpData[nonce] = RolledUpTxn(from, timestamp, data, signature);
        emit rolledUpNewState(from, timestamp, data, nonce, signature);
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }

    function recoverSigner(bytes32 message, bytes memory signature)
        internal
        pure
        returns (address)
    {
        uint8 v;
        bytes32 r;
        bytes32 s;
        (v, r, s) = splitSignature(signature);
        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory signature)
        internal
        pure
        returns (
            uint8,
            bytes32,
            bytes32
        )
    {
        require(signature.length == 65, "Invalid Signature");
        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(signature, 32))
            // second 32 bytes
            s := mload(add(signature, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(signature, 96)))
        }

        return (v, r, s);
    }

    function getRolledUpData(uint256 nonce)
        public
        view
        returns (RolledUpTxn memory)
    {
        return rolledUpData[nonce];
    }
}
