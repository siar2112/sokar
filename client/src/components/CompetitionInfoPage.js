import React, {useState, useEffect} from 'react';
import EventBoxInfo from './EventBox';

const CompetitionInfoPage = ({match}) => {
    const [competitionTeams, setCompetitionTeams] = useState([]); // State to store all teams of a specific event
    const { params: { id } } = match;

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
                body: JSON.stringify(id),
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

    return (
        <div>
            {/* Show competition details... */}
        </div>
    );
};

export default CompetitionInfoPage;