#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod city_governance {
    use ink::storage::Mapping;
    use ink::prelude::vec::Vec;
    use ink::prelude::string::String;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum ProposalStatus {
        Active,
        Passed,
        Rejected,
        Executed,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct Proposal {
        pub id: u32,
        pub title: String,
        pub description: String,
        pub proposer: AccountId,
        pub votes_for: u128,
        pub votes_against: u128,
        pub status: ProposalStatus,
        pub execution_time: u64,
        pub budget: u128,
        pub ai_recommendation: String,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct CitizenProfile {
        pub reputation_score: u32,
        pub voting_power: u32,
        pub proposals_submitted: u32,
        pub votes_cast: u32,
        pub ai_contributions: u32,
    }

    #[ink(storage)]
    pub struct CityGovernance {
        proposals: Mapping<u32, Proposal>,
        citizen_profiles: Mapping<AccountId, CitizenProfile>,
        votes: Mapping<(u32, AccountId), bool>, // (proposal_id, voter) -> vote
        proposal_count: u32,
        total_supply: u128,
        admin: AccountId,
        ai_oracle: AccountId,
    }

    #[ink(event)]
    pub struct ProposalCreated {
        #[ink(topic)]
        proposal_id: u32,
        #[ink(topic)]
        proposer: AccountId,
        title: String,
    }

    #[ink(event)]
    pub struct VoteCast {
        #[ink(topic)]
        proposal_id: u32,
        #[ink(topic)]
        voter: AccountId,
        vote: bool,
        voting_power: u32,
    }

    #[ink(event)]
    pub struct ProposalExecuted {
        #[ink(topic)]
        proposal_id: u32,
        status: ProposalStatus,
    }

    impl CityGovernance {
        #[ink(constructor)]
        pub fn new(total_supply: u128, ai_oracle: AccountId) -> Self {
            let caller = Self::env().caller();
            Self {
                proposals: Mapping::default(),
                citizen_profiles: Mapping::default(),
                votes: Mapping::default(),
                proposal_count: 0,
                total_supply,
                admin: caller,
                ai_oracle,
            }
        }

        #[ink(message)]
        pub fn create_proposal(
            &mut self,
            title: String,
            description: String,
            budget: u128,
        ) -> Result<u32, &'static str> {
            let caller = self.env().caller();
            let proposal_id = self.proposal_count;
            
            // Get AI recommendation (in real implementation, this would call an oracle)
            let ai_recommendation = String::from("AI Analysis: High impact proposal with 87% success probability");

            let proposal = Proposal {
                id: proposal_id,
                title: title.clone(),
                description,
                proposer: caller,
                votes_for: 0,
                votes_against: 0,
                status: ProposalStatus::Active,
                execution_time: self.env().block_timestamp() + 604800000, // 7 days
                budget,
                ai_recommendation,
            };

            self.proposals.insert(proposal_id, &proposal);
            self.proposal_count += 1;

            // Update citizen profile
            let mut profile = self.citizen_profiles.get(caller).unwrap_or_default();
            profile.proposals_submitted += 1;
            profile.reputation_score += 100; // Reward for proposal creation
            self.citizen_profiles.insert(caller, &profile);

            self.env().emit_event(ProposalCreated {
                proposal_id,
                proposer: caller,
                title,
            });

            Ok(proposal_id)
        }

        #[ink(message)]
        pub fn vote(&mut self, proposal_id: u32, vote: bool) -> Result<(), &'static str> {
            let caller = self.env().caller();
            
            // Check if proposal exists and is active
            let mut proposal = self.proposals.get(proposal_id).ok_or("Proposal not found")?;
            if proposal.status != ProposalStatus::Active {
                return Err("Proposal not active");
            }

            // Check if already voted
            if self.votes.contains((proposal_id, caller)) {
                return Err("Already voted");
            }

            // Get citizen's voting power
            let profile = self.citizen_profiles.get(caller).unwrap_or_default();
            let voting_power = profile.voting_power.max(1);

            // Record vote
            self.votes.insert((proposal_id, caller), &vote);
            
            // Update proposal vote counts
            if vote {
                proposal.votes_for += voting_power as u128;
            } else {
                proposal.votes_against += voting_power as u128;
            }
            self.proposals.insert(proposal_id, &proposal);

            // Update citizen profile
            let mut updated_profile = profile;
            updated_profile.votes_cast += 1;
            updated_profile.reputation_score += 25; // Reward for voting
            self.citizen_profiles.insert(caller, &updated_profile);

            self.env().emit_event(VoteCast {
                proposal_id,
                voter: caller,
                vote,
                voting_power,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn execute_proposal(&mut self, proposal_id: u32) -> Result<(), &'static str> {
            let mut proposal = self.proposals.get(proposal_id).ok_or("Proposal not found")?;
            
            if proposal.status != ProposalStatus::Active {
                return Err("Proposal not active");
            }

            if self.env().block_timestamp() < proposal.execution_time {
                return Err("Voting period not ended");
            }

            // Determine outcome
            let total_votes = proposal.votes_for + proposal.votes_against;
            let quorum = self.total_supply / 10; // 10% quorum

            if total_votes < quorum {
                proposal.status = ProposalStatus::Rejected;
            } else if proposal.votes_for > proposal.votes_against {
                proposal.status = ProposalStatus::Passed;
                // In real implementation, execute the proposal logic here
            } else {
                proposal.status = ProposalStatus::Rejected;
            }

            self.proposals.insert(proposal_id, &proposal);

            self.env().emit_event(ProposalExecuted {
                proposal_id,
                status: proposal.status.clone(),
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_proposal(&self, proposal_id: u32) -> Option<Proposal> {
            self.proposals.get(proposal_id)
        }

        #[ink(message)]
        pub fn get_citizen_profile(&self, citizen: AccountId) -> CitizenProfile {
            self.citizen_profiles.get(citizen).unwrap_or_default()
        }

        #[ink(message)]
        pub fn update_ai_contribution(&mut self, citizen: AccountId, contribution_points: u32) -> Result<(), &'static str> {
            if self.env().caller() != self.ai_oracle {
                return Err("Only AI oracle can update contributions");
            }

            let mut profile = self.citizen_profiles.get(citizen).unwrap_or_default();
            profile.ai_contributions += contribution_points;
            profile.reputation_score += contribution_points * 5; // 5x multiplier for AI contributions
            profile.voting_power = (profile.reputation_score / 100).max(1);
            
            self.citizen_profiles.insert(citizen, &profile);
            Ok(())
        }
    }

    impl Default for CitizenProfile {
        fn default() -> Self {
            Self {
                reputation_score: 100,
                voting_power: 1,
                proposals_submitted: 0,
                votes_cast: 0,
                ai_contributions: 0,
            }
        }
    }
}
