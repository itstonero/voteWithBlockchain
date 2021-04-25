pragma solidity 0.5.16;

contract Election {

    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
        // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    mapping(uint => Candidate) public candidates;
    
    // Store Candidates Count
    uint public candidatesCount;

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

}