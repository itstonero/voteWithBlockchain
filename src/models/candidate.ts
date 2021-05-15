export class Candidate
{
    id ?: number;
    name:string;
    bio: string;
    agenda: string;
    votes: number;
    photoUrl ?: string;

    constructor(_name : string, _bio : string, _agenda : string, totalVotes: number)
    {
        this.name = _name;
        this.bio = _bio;
        this.agenda = _agenda;
        this.votes = totalVotes;
    }
}

export interface IVoteCastingResult
{
    message : string;
    code : string;
}