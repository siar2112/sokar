import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameBoxInfo from "./GameBoxInfo";
import './stylesFiles/CompetitionInfo.css';

const FullSchedulePage = () => {
    const [competitionGames, setCompetitionGames] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    let { id, name } = useParams();

    useEffect(() => {
        const getAllCompetitionGames = async () => {
            try {
                const response = await fetch('${process.env.REACT_APP_API_URL}/getAllCompetitionGames', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }),
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCompetitionGames(data);

                    const getUniqueCategories = (games) => {
                        const categories = games.map((game) => game.Category);
                        return [...new Set(categories)];
                    };

                    const uniqueCategories = getUniqueCategories(data);
                    setCategories(uniqueCategories);
                } else {
                    throw new Error('An unexpected error occurred');
                }
            } catch (error) {
                console.error(error);
            }
        };
        getAllCompetitionGames();
    }, [id]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGames = competitionGames.filter(
        game =>
            (categoryFilter === "" || game.Category === categoryFilter) &&
            (game.Team1_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.Team2_Name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <div style={{textAlign:"center",backgroundImage:"linear-gradient(to bottom right,blue,black)",
                paddingTop:"2.5%",width:"80%",marginLeft:"10%",paddingBottom:"1%",borderRadius:"30px"}}>
                <h1>{name}</h1>
            </div>
            <h1 style={{marginTop:"5%", marginLeft:"10%"}}>Upcoming games</h1>
            <p style={{marginLeft:"10%"}}>Enter the name of a team to find its upcoming games</p>
            <div style={{ marginTop: "2%", marginLeft: "10%" }}>
                <input style={{borderRadius:"16px", width: '50%', padding: '10px', fontSize:"1.5vw"}}
                       type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            </div>
            <div style={{ marginTop: "2%", marginLeft: "10%" }}>
                <label htmlFor="category-filter">Filter by category: </label>
                <select id="category-filter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                    <option value="">All</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <ul style={{listStyleType:"none", display:"block", marginTop:"2.5%"}}>
                {filteredGames.map((game, index) => (
                    <li style={{width:"75%", margin: "1%", marginLeft:"10%"}} key={index}>
                        <GameBoxInfo team1={game.Team1_Name} team2={game.Team2_Name} competitionName={game.CompetitionName}
                                     category={game.Category} team1_percentage={game.Team1_Win_percentage} team2_percentage={game.Team2_Win_percentage}
                                     importance={game.Importance} location={game.Location} date={game.GameDate} duration={game.Duration}
                                     gameID={game.GameID} team1_score={game.Team1_Goals} team2_score={game.Team2_Goals} type={game.Type} field={game.Field}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FullSchedulePage;
