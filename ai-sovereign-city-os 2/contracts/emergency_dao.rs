#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod emergency_dao {
    use ink::storage::Mapping;
    use ink::prelude::vec::Vec;
    use ink::prelude::string::String;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum EmergencyType {
        Fire,
        Flood,
        PowerOutage,
        CyberAttack,
        NaturalDisaster,
        MedicalEmergency,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum IncidentStatus {
        Reported,
        Verified,
        Responding,
        Resolved,
        PayoutApproved,
        PayoutExecuted,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct EmergencyIncident {
        pub id: u32,
        pub incident_type: EmergencyType,
        pub location: String,
        pub description: String,
        pub reporter: AccountId,
        pub status: IncidentStatus,
        pub severity: u32, // 1-10 scale
        pub estimated_cost: u128,
        pub actual_cost: u128,
        pub ai_confidence: u32,
        pub timestamp: u64,
        pub response_time: u64,
        pub affected_citizens: u32,
    }

    #[ink(storage)]
    pub struct EmergencyDAO {
        incidents: Mapping<u32, EmergencyIncident>,
        fund_balance: u128,
        contributions: Mapping<AccountId, u128>,
        incident_count: u32,
        total_payouts: u128,
        admin: AccountId,
        ai_oracle: AccountId,
        min_payout_votes: u32,
        payout_votes: Mapping<u32, Mapping<AccountId, bool>>,
    }

    #[ink(event)]
    pub struct EmergencyReported {
        #[ink(topic)]
        incident_id: u32,
        #[ink(topic)]
        reporter: AccountId,
        incident_type: EmergencyType,
        severity: u32,
    }

    #[ink(event)]
    pub struct FundContribution {
        #[ink(topic)]
        contributor: AccountId,
        amount: u128,
        new_balance: u128,
    }

    #[ink(event)]
    pub struct EmergencyPayout {
        #[ink(topic)]
        incident_id: u32,
        amount: u128,
        recipient: AccountId,
    }

    impl EmergencyDAO {
        #[ink(constructor)]
        pub fn new(ai_oracle: AccountId, min_payout_votes: u32) -> Self {
            let caller = Self::env().caller();
            Self {
                incidents: Mapping::default(),
                fund_balance: 0,
                contributions: Mapping::default(),
                incident_count: 0,
                total_payouts: 0,
                admin: caller,
                ai_oracle,
                min_payout_votes,
                payout_votes: Mapping::default(),
            }
        }

        #[ink(message, payable)]
        pub fn contribute_to_fund(&mut self) -> Result<(), &'static str> {
            let caller = self.env().caller();
            let amount = self.env().transferred_value();
            
            if amount == 0 {
                return Err("Contribution must be greater than 0");
            }

            self.fund_balance += amount;
            let current_contribution = self.contributions.get(caller).unwrap_or(0);
            self.contributions.insert(caller, &(current_contribution + amount));

            self.env().emit_event(FundContribution {
                contributor: caller,
                amount,
                new_balance: self.fund_balance,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn report_emergency(
            &mut self,
            incident_type: EmergencyType,
            location: String,
            description: String,
            severity: u32,
            affected_citizens: u32,
        ) -> Result<u32, &'static str> {
            let caller = self.env().caller();
            let incident_id = self.incident_count;

            if severity > 10 {
                return Err("Severity must be between 1-10");
            }

            let incident = EmergencyIncident {
                id: incident_id,
                incident_type: incident_type.clone(),
                location,
                description,
                reporter: caller,
                status: IncidentStatus::Reported,
                severity,
                estimated_cost: 0,
                actual_cost: 0,
                ai_confidence: 0,
                timestamp: self.env().block_timestamp(),
                response_time: 0,
                affected_citizens,
            };

            self.incidents.insert(incident_id, &incident);
            self.incident_count += 1;

            self.env().emit_event(EmergencyReported {
                incident_id,
                reporter: caller,
                incident_type,
                severity,
            });

            Ok(incident_id)
        }

        #[ink(message)]
        pub fn ai_verify_incident(
            &mut self,
            incident_id: u32,
            confidence: u32,
            estimated_cost: u128,
        ) -> Result<(), &'static str> {
            if self.env().caller() != self.ai_oracle {
                return Err("Only AI oracle can verify incidents");
            }

            let mut incident = self.incidents.get(incident_id).ok_or("Incident not found")?;
            
            incident.ai_confidence = confidence;
            incident.estimated_cost = estimated_cost;
            
            if confidence >= 80 {
                incident.status = IncidentStatus::Verified;
            }

            self.incidents.insert(incident_id, &incident);
            Ok(())
        }

        #[ink(message)]
        pub fn vote_for_payout(&mut self, incident_id: u32, approve: bool) -> Result<(), &'static str> {
            let caller = self.env().caller();
            let incident = self.incidents.get(incident_id).ok_or("Incident not found")?;

            if incident.status != IncidentStatus::Verified {
                return Err("Incident not verified");
            }

            // Check if already voted
            if let Some(votes) = self.payout_votes.get(incident_id) {
                if votes.contains(caller) {
                    return Err("Already voted");
                }
            }

            // Record vote
            let mut votes = self.payout_votes.get(incident_id).unwrap_or_default();
            votes.insert(caller, &approve);
            self.payout_votes.insert(incident_id, &votes);

            // Check if enough votes for payout
            let mut approve_count = 0;
            for (_, vote) in votes.iter() {
                if vote {
                    approve_count += 1;
                }
            }

            if approve_count >= self.min_payout_votes {
                self.execute_payout(incident_id)?;
            }

            Ok(())
        }

        #[ink(message)]
        pub fn execute_payout(&mut self, incident_id: u32) -> Result<(), &'static str> {
            let mut incident = self.incidents.get(incident_id).ok_or("Incident not found")?;
            
            if incident.status != IncidentStatus::Verified {
                return Err("Incident not verified");
            }

            let payout_amount = incident.estimated_cost;
            
            if payout_amount > self.fund_balance {
                return Err("Insufficient funds");
            }

            // Execute payout
            self.fund_balance -= payout_amount;
            self.total_payouts += payout_amount;
            incident.status = IncidentStatus::PayoutExecuted;
            incident.actual_cost = payout_amount;

            self.incidents.insert(incident_id, &incident);

            // In real implementation, transfer funds to affected parties
            self.env().emit_event(EmergencyPayout {
                incident_id,
                amount: payout_amount,
                recipient: incident.reporter,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_incident(&self, incident_id: u32) -> Option<EmergencyIncident> {
            self.incidents.get(incident_id)
        }

        #[ink(message)]
        pub fn get_fund_stats(&self) -> (u128, u128, u32) {
            (self.fund_balance, self.total_payouts, self.incident_count)
        }

        #[ink(message)]
        pub fn get_contribution(&self, contributor: AccountId) -> u128 {
            self.contributions.get(contributor).unwrap_or(0)
        }
    }
}
