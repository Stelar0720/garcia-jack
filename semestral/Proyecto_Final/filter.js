export const filterAgents = (agents, query) => {
    return agents.filter(agent =>
        agent.name.toLowerCase().includes(query.toLowerCase())
    );
};
