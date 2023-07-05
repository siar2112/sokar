import React, {useState,useEffect} from 'react';
import EventBoxInfo from './EventBox';


const FindEventsPage = () =>{
    return(
        <div>
            <EventBoxInfo competitionName="champions league"
                          startDate="2023-12-21" location="Montreal" type="5vs5"/>
        </div>
    );
}

export default FindEventsPage;