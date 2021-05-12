pragma solidity >=0.4.22 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Electioneering.sol";

contract TestElectionVoteCasting {
    Electioneering election;
    address voter;
    bool result;

    constructor() public
    {
        election = Electioneering(DeployedAddresses.Electioneering());
        voter = tx.origin;
    }

    function testExceptionsForNonAuthorizedUser() public {
        (result , ) = address(this).call(abi.encodePacked(this.voterIsNotAuthorized.selector));
        Assert.isFalse(result   , "Unauthorized Users Should Not Be Allowed to vote");
    }
    function testExceptionsForNonRegisterContestants() public {
        (result , ) = address(this).call(abi.encodePacked(this.candidateDoesNotExist.selector));
        Assert.isFalse(result   , "Voting is not allowed for Non-Existing Contestant");
    }

    function testExceptionsForMultipleVotes() public {
        (result, ) = address(this).call(abi.encodePacked(this.candidateMultipleVoting.selector));
        Assert.isFalse(result, "Multiple Voting is not allowed");
    }

    function voterIsNotAuthorized() public {
        election.castVote(voter, 1);
    }

    function candidateDoesNotExist() public {
        election.authorizeVoter(voter);
        election.castVote(voter, 1);
    }

    function candidateMultipleVoting() public {
        election.registerCandidate("Tony", "Bio", "Always");
        election.castVote(voter, 0);
        election.castVote(voter, 0);
    }
}