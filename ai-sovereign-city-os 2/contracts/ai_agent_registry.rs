#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod ai_agent_registry {
    use ink::storage::Mapping;
    use ink::prelude::vec::Vec;
    use ink::prelude::string::String;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum AgentStatus {
        Active,
        Learning,
        Maintenance,
        Offline,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct AIAgent {
        pub id: u32,
        pub name: String,
        pub zone: String,
        pub status: AgentStatus,
        pub performance_score: u32,
        pub decisions_made: u32,
        pub energy_saved: u128,
        pub cost_reduction: u128,
        pub last_update: u64,
        pub specialization: String,
        pub confidence_level: u32,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct AgentDecision {
        pub agent_id: u32,
        pub decision_type: String,
        pub parameters: String,
        pub impact_score: u32,
        pub timestamp: u64,
        pub validation_score: u32,
    }

    #[ink(storage)]
    pub struct AIAgentRegistry {
        agents: Mapping<u32, AIAgent>,
        decisions: Mapping<u32, Vec<AgentDecision>>,
        agent_count: u32,
        total_energy_saved: u128,
        total_cost_reduction: u128,
        admin: AccountId,
        governance_contract: AccountId,
    }

    #[ink(event)]
    pub struct AgentRegistered {
        #[ink(topic)]
        agent_id: u32,
        name: String,
        zone: String,
    }

    #[ink(event)]
    pub struct DecisionMade {
        #[ink(topic)]
        agent_id: u32,
        decision_type: String,
        impact_score: u32,
    }

    #[ink(event)]
    pub struct PerformanceUpdated {
        #[ink(topic)]
        agent_id: u32,
        performance_score: u32,
        energy_saved: u128,
    }

    impl AIAgentRegistry {
        #[ink(constructor)]
        pub fn new(governance_contract: AccountId) -> Self {
            let caller = Self::env().caller();
            Self {
                agents: Mapping::default(),
                decisions: Mapping::default(),
                agent_count: 0,
                total_energy_saved: 0,
                total_cost_reduction: 0,
                admin: caller,
                governance_contract,
            }
        }

        #[ink(message)]
        pub fn register_agent(
            &mut self,
            name: String,
            zone: String,
            specialization: String,
        ) -> Result<u32, &'static str> {
            if self.env().caller() != self.admin {
                return Err("Only admin can register agents");
            }

            let agent_id = self.agent_count;
            let agent = AIAgent {
                id: agent_id,
                name: name.clone(),
                zone: zone.clone(),
                status: AgentStatus::Learning,
                performance_score: 50, // Starting score
                decisions_made: 0,
                energy_saved: 0,
                cost_reduction: 0,
                last_update: self.env().block_timestamp(),
                specialization,
                confidence_level: 75,
            };

            self.agents.insert(agent_id, &agent);
            self.agent_count += 1;

            self.env().emit_event(AgentRegistered {
                agent_id,
                name,
                zone,
            });

            Ok(agent_id)
        }

        #[ink(message)]
        pub fn record_decision(
            &mut self,
            agent_id: u32,
            decision_type: String,
            parameters: String,
            impact_score: u32,
        ) -> Result<(), &'static str> {
            let mut agent = self.agents.get(agent_id).ok_or("Agent not found")?;
            
            let decision = AgentDecision {
                agent_id,
                decision_type: decision_type.clone(),
                parameters,
                impact_score,
                timestamp: self.env().block_timestamp(),
                validation_score: 0, // Will be updated later by validation
            };

            // Update agent stats
            agent.decisions_made += 1;
            agent.last_update = self.env().block_timestamp();
            agent.status = AgentStatus::Active;
            
            // Update performance based on impact
            let performance_delta = if impact_score > 80 { 5 } else if impact_score > 60 { 2 } else { 0 };
            agent.performance_score = (agent.performance_score + performance_delta).min(100);

            self.agents.insert(agent_id, &agent);

            // Store decision
            let mut agent_decisions = self.decisions.get(agent_id).unwrap_or_default();
            agent_decisions.push(decision);
            self.decisions.insert(agent_id, &agent_decisions);

            self.env().emit_event(DecisionMade {
                agent_id,
                decision_type,
                impact_score,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn update_performance(
            &mut self,
            agent_id: u32,
            energy_saved: u128,
            cost_reduction: u128,
        ) -> Result<(), &'static str> {
            let mut agent = self.agents.get(agent_id).ok_or("Agent not found")?;
            
            agent.energy_saved += energy_saved;
            agent.cost_reduction += cost_reduction;
            
            // Update global stats
            self.total_energy_saved += energy_saved;
            self.total_cost_reduction += cost_reduction;

            // Calculate new performance score based on impact
            let impact_factor = (energy_saved / 1000 + cost_reduction / 10000) as u32;
            agent.performance_score = (agent.performance_score + impact_factor).min(100);

            self.agents.insert(agent_id, &agent);

            self.env().emit_event(PerformanceUpdated {
                agent_id,
                performance_score: agent.performance_score,
                energy_saved: agent.energy_saved,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_agent(&self, agent_id: u32) -> Option<AIAgent> {
            self.agents.get(agent_id)
        }

        #[ink(message)]
        pub fn get_agent_decisions(&self, agent_id: u32) -> Vec<AgentDecision> {
            self.decisions.get(agent_id).unwrap_or_default()
        }

        #[ink(message)]
        pub fn get_total_stats(&self) -> (u128, u128, u32) {
            (self.total_energy_saved, self.total_cost_reduction, self.agent_count)
        }

        #[ink(message)]
        pub fn set_agent_status(&mut self, agent_id: u32, status: AgentStatus) -> Result<(), &'static str> {
            if self.env().caller() != self.admin {
                return Err("Only admin can update status");
            }

            let mut agent = self.agents.get(agent_id).ok_or("Agent not found")?;
            agent.status = status;
            agent.last_update = self.env().block_timestamp();
            self.agents.insert(agent_id, &agent);

            Ok(())
        }
    }
}
