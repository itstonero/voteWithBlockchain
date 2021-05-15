pragma solidity >=0.4.22 <0.8.0;

contract Electioneering {
    address public owner = msg.sender;
    uint public totalVotes = 0;
    uint public totalVoters = 0;
    uint public totalCandidates = 0;

    struct Voter
    {
        bool hasVoted;
        bool isAuthorized;
    }

    struct Candidate
    {
        string name;
        string bio;
        string agenda;
        uint votes;
        string photoUrl;
    }

    mapping(address => Voter) public voters;
    mapping(uint => Candidate) public candidates;

    modifier onlyCreator() 
    {
        require(msg.sender == owner,  "This function is restricted to the contract's owner");
        _;
    }
    
  function registerCandidate(string memory name, string memory bio, string memory agenda, string memory photoUrl) onlyCreator public returns(bool)
  {
    candidates[totalCandidates] = Candidate(name, bio, agenda, 0, photoUrl);
    totalCandidates += 1;
    return true;
  }
  
  function authorizeVoter(address voter) onlyCreator public returns(bool)
  {
      voters[voter] = Voter(false, true);
      totalVoters += 1;
      return true;
  }

  function castVote(address voter, uint candidateId) public returns(bool)
  {
      require(voters[voter].isAuthorized, "Unauthorized");
      require(!voters[voter].hasVoted, "Already Voted");
      require(candidateId < totalCandidates, "Unknown Candidate");
      voters[voter].hasVoted = true;
      candidates[candidateId].votes += 1;
      totalVotes += 1;
      return true;
  }
}