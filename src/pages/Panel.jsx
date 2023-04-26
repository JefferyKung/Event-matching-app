import { useState, useEffect } from "react";
import { user } from "../utils/mongo.client";
import {useNavigate, useLocation } from "react-router-dom";

import Modal from '../components/Modal'
import Header from "../components/Header"
import MyEvent from "../components/MyEvent"
import AllEvent from "../components/AllEvent"

function Panel() {

  const [events, setEvents] = useState(null);
  const [myEvents, setMyEvents] = useState(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userValue, setUserValue] = useState();
  const [editingId, setEditingId] = useState(null);
  const [dateValue, setDateValue] = useState(new Date());
  const [searchLocation, setSearchLocation] = useState(null);

  const {state} = useLocation();
  const navigate = useNavigate();

  const {usern , userg} = state;
  const loggedInUserName =  userg && userg.userg.name  || usern && usern.emailfoundData.name;

  useEffect(() => {
    async function getEvents() {
      const listOfEvents = await user.functions.getAllEvent();
      setEvents(listOfEvents);
    }
    getEvents();

    async function getMyEvents() {
      const listOfMyEvents = await user.functions.getEventbyFilteringName(loggedInUserName);
      setMyEvents(listOfMyEvents);
    }
    getMyEvents();

  }, [userValue ]);

  const handleModalClose = () => {
    setModal(false);
    setIsEdit(false);
  };

  return (
    <>
      <Header loggedInUserName={loggedInUserName} userg={userg} setModal={setModal} navigate={navigate}/>
      
      <div className="md:grid md:grid-cols-2 px-3">
        <MyEvent 
          myEvents={myEvents} 
          setModal={setModal} 
          setIsEdit={setIsEdit} 
          setEditingId={setEditingId} 
          setUserValue={setUserValue}/>
        <AllEvent 
          setEvents={setEvents} 
          setDateValue={setDateValue} 
          dateValue={dateValue} 
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          events={events}/>           
      </div>
      
      <Modal
        isOpen={modal}
        isEdit={isEdit}
        closeModal={handleModalClose}
        setUserValue={setUserValue}
        editingId={editingId}
        loggedInUserName={loggedInUserName}
      />

      <footer className="h-20 w-full bg-slate-900 px-6 flex justify-between items-center mt-10">
        <h1 className=" text-slate-200 md:text-lg font-style: italic text-sm">Jeffery's EVENT matching app @ 2023</h1>
      </footer>
    
    </>
  );
}

export default Panel;
