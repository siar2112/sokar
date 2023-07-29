import React, {useState, useEffect} from 'react';
import EventBoxInfo from './EventBox';

const FindEventsPage = () =>{
    const [events, setEvents] = useState([]); // State to store events
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search input

    useEffect(() => {
        getAllEvents();
    }, []); // Empty dependency array means this effect runs once on component mount.

    const getAllEvents = async()=>{
        try {
            const response = await fetch('/getAllEvents', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const text = await response.text();
            console.log(text);
            if (response.ok) {
                const data = JSON.parse(text);
                setEvents(data); // Store events data
            } else {
                throw new Error('An unexpected error occurred');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Filter events based on search term
    const filteredEvents = events.filter(event =>
        event.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:"5%" }}>
                <h1 style={{fontSize:"3vw"}}>Find an event</h1>
                <p style={{fontSize:"1.6vw"}}> Enter a name or your location to find a competition near you </p>
                <input
                    style={{borderRadius:"16px", width: '50%', padding: '10px', fontSize:"1.5vw"}}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ul style={{listStyleType:"none", display:"flex", flexWrap: "wrap", marginTop:"5%"}}>
                {filteredEvents.slice(0, 6).map((event, index) => (
                    <li style={{width:"25%", margin: "2.5%"}} key={index}>
                        <EventBoxInfo
                            competitionID={event.CompetitionID}
                            competitionName={event.Name}
                            startDate={event.StartDate}
                            location={event.Location}
                            type={event.Type}
                            gameType={event.GameType}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FindEventsPage;
