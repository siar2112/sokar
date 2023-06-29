import React from 'react';
import LinkButton from './linkButton';



const Carousel= ()=>{
    return(
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img style={{height:"700px"}} src="/joshua-hoehne-Rrcyop6jvDA-unsplash.jpg" className="d-block w-100" alt="Slide 1" />
                    <div className="carousel-caption" style={{ position: 'absolute', width:"30%", top: '30%', right:'90%', textAlign:'justify'}}>
                        <p style={{fontSize:"25px"}}> SoccerUnite is the place to find soccer near you, bringing together
                            local players, teams, and fans in a vibrant, unified community. Discover local leagues,
                            tournaments, or even start your own career with SoccerUnite's easy-to-use platform.
                            No matter your skill level or experience,
                            SoccerUnite provides the resources and connections to ignite your passion for soccer.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img style={{height:"700px"}} src="/emilio-garcia-AWdCgDDedH0-unsplash.jpg" className="d-block w-100" alt="Slide 2" />
                    <div className="carousel-caption" style={{ position: 'absolute', width:"30%", top: '20%', right:'90%', textAlign:'justify'}}>
                        <p style={{fontSize:"22px"}}> Always dreamed of being treated like a pro soccer star? SoccerUnite provides a detailed analysis of
                            your profile based on the results you display during the events on our
                            platform and ranks you among other local players.
                            You'll receive personalized feedback and stats, just like a professional player,
                            to help improve your game and track your progress over time. Create your account now
                            and rise to the challenge; take the first step towards
                            your soccer dreams today with SoccerUnite!</p>
                        <LinkButton style={{marginTop:"5%"}} link="/createAccount" buttonText="Start your journey"/>
                    </div>
                </div>
                <div className="carousel-item">
                    <img style={{height:"700px"}} src="/travel-nomades-JO19K0HDDXI-unsplash.jpg" className="d-block w-100" alt="Slide 3" />
                    <div className="carousel-caption">
                        <h1>Interested to know more about the rules?</h1>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;