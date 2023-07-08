import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const CompetitionInfoPage = () => {
    const [competitionTeams, setCompetitionTeams] = useState([]); // State to store all teams of a specific event
    let { id } = useParams();

    useEffect(() => {
        getAllCompetitionTeams();
    }, []); // Empty dependency array means this effect runs once on component mount.

    const getAllCompetitionTeams = async()=>{
        try {
            const response = await fetch('http://localhost:9000/getAllCompetitionTeams', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id}), // corrected here,
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setCompetitionTeams(data); // Store events data
            } else {
                throw new Error('An unexpected error occurred');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Helper function to group teams by category
    const groupByCategory = (teams) => {
        return teams.reduce((groupedTeams, team) => {
            (groupedTeams[team.Category] = groupedTeams[team.Category] || []).push(team);
            return groupedTeams;
        }, {});
    };

    const groupedTeams = groupByCategory(competitionTeams);

    return (
        <div>
            {Object.keys(groupedTeams).map(category => (
                <div key={category}>
                    <h2>Category: {category}</h2>
                    {groupedTeams[category].map(team => (
                        <div key={team.TeamID}>
                            <p>{team.Name}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CompetitionInfoPage;