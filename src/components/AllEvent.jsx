import React from 'react'
import { useState } from "react";
import { BSON } from "realm-web";
import { user } from "../utils/mongo.client";

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const AllEvent = ({setEvents,searchLocation,setSearchLocation, events ,dateValue,setDateValue}) => {

    // const [dateValue, setDateValue] = useState(new Date());

    const clearAll = async ()=>{
        const listOfEvents = await user.functions.getAllEvent();
        setEvents(listOfEvents);
        
      }

      const handleMajonButton = async ()=>{
        const eventOfMajonList = await user.functions.getEventbyFilteringEventCat('majon')
      
        // console.log(eventOfMajonList)
        setEvents(eventOfMajonList)
        // console.log(events)
      }
    
      const handleVolleyballButton = async ()=>{
        const eventOfVolleyballList = await user.functions.getEventbyFilteringEventCat('volleyball')
        
        // console.log(eventOfVolleyballList)
        setEvents(eventOfVolleyballList)
        // console.log(events)
      }
    
      const handleCasinoButton = async ()=>{
        const eventOfCasinoList = await user.functions.getEventbyFilteringEventCat('casino')
     
        // console.log(eventOfCasinoList)
        setEvents(eventOfCasinoList)
        // console.log(events)
      }

      const handleDateFilterBtn = async ()=>{
        // console.log(dateValue)
        let dateChoseByUser = formateDate(dateValue.toLocaleDateString())
    
        // console.log(dateChoseByUser)
        // console.log(dateChoseByUser.length)

        if (dateChoseByUser.length === 9) {
          dateChoseByUser = dateChoseByUser.slice(0,8)+"0"+dateChoseByUser.slice(8)
          // console.log(dateChoseByUser)
        }


        const eventFilterdByDate = await user.functions.getEventbyFilteringDate(dateChoseByUser)
        setEvents(eventFilterdByDate)  
        // console.log(eventFilterdByDate)
      }
    
    
      const formateDate = (input) => {
        var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1], 
        day = datePart[2];
    
        if(month > 10) {
          return year + "-" + month + "-" + day
        } else {
          return year + "-0" + month + "-" + day
        }
        
      }

      const locationSearchingBtnHandler = async (e) => {
        e.preventDefault();
        // console.log(searchLocation)
        const eventFilterByEvent = await user.functions.getEventbyFilteringLocation(searchLocation)
        setEvents(eventFilterByEvent)
        // console.log(eventFilterByEvent)
      }


  return (
    <section className="mt-10 flex justify-center px-6">

          
    <ul className="w-80%">
      <h1 className="text-5xl pb-2 pl-4 md:text-4xl">All Events</h1>
      <button className="btn bg-yellow-400 sm:text-base mb-5 mt-2" onClick={()=>clearAll()}>CLEAR</button>
      <p>filter by event :</p>
      <div className='button-container flex justify-evenly py-3 '>
            <button className="btn bg-indigo-500 sm:text-base mr-2" onClick={()=>handleMajonButton()}>MAJON</button> 
            <button className="btn bg-indigo-500 text-xs mr-2 " onClick={()=>handleVolleyballButton()}>VOLLEYBALL</button>  
            <button className="btn bg-indigo-500 sm:text-base mr-2" onClick={()=>handleCasinoButton()}>Casino</button>
            
      </div>

      <div className="mb-3">
          <p className="mb-3">filter by date :</p>
          <DatePicker onChange={setDateValue} value={dateValue} />
          <button className="btn bg-orange-400 sm:text-base ml-2" onClick={(e)=>handleDateFilterBtn(e)}>filter by date</button>
     </div>


     <div className="mb-3">
          <p className="mb-3">filter by location :</p>
          <form>
          <input type="text" className="border-4" placeholder="Type in a location" value={searchLocation} onChange={(e)=> setSearchLocation(e.target.value)}/>
          <button className="btn bg-orange-400 sm:text-base ml-2 lg:text-sm" onClick={locationSearchingBtnHandler}>filter by location</button>
          </form>
     </div>




      <div className="flex flex-wrap justify-center">
        {events &&
            events.map((event) => (
              <li
                key={event._id}
                className="border-2 p-4 mp-3 rounded-lg flex items-center justify-center w-2/5 mt-2 bg-green-200"
              >

                <section>
                  <h2 className="capitalize font-semibold mb-1">{event.event}</h2>
                  <p className="text-slate-500 font-medium text-sm mb-2">
                    {event.name}
                  </p>
                  <p className="capitalize text-gray-500 mb-1">
                    {event.location}
                  </p>
                  <p className="text-slate-500 font-medium text-sm mb-2">
                    {event.date.toString()}
                   
                  </p>
                  <p className="text-slate-500 font-medium text-sm mb-2">
                    {event.timeslot}
                  </p>
                  <button
                    className="text-sm text-white capitalize px-2 py-2 bg-slate-800 rounded-md"
                    onClick={() => {
                      alert(event.contact)
                    }}
                  >
                    Get Contact
                  </button>

                  
                  
                  <div className="flex">
                  </div>
                </section>
              </li>
        ))}
      </div>
    </ul>
  </section>

  )
}

export default AllEvent