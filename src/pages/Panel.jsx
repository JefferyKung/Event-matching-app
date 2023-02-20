import { useState, useEffect } from "react";
import { BSON } from "realm-web";

import { app, user, collectionEvent } from "../utils/mongo.client";
import UserIcon from "../assets/svg/UserIcon";
import Modal from '../components/Modal'
import { Link, useNavigate, useLocation } from "react-router-dom";
 

function App() {
  const [events, setEvents] = useState(null);
  const [myEvents, setMyEvents] = useState(null);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userValue, setUserValue] = useState();
  //先暫時把userValue看到eventValue，用意應該是偵測內容有無改變而已
  const [eventValue, setEventValue] = useState();
  const [editingId, setEditingId] = useState();
  const [isFiltered, setIsFilter]= useState(false);
  const {state} = useLocation();
  const {usern} = state;
  const loggedInUserName = usern.emailfoundData.name
  const navigate = useNavigate();


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

  }, [userValue]);

  const handleModalClose = () => {
    setModal(false);
    setIsEdit(false);
  };

  const handleDelete = async (id) => {
    const idAsString = new BSON.ObjectID(id).toString()
    const deletedEvent = await user.functions.deleteEvent(idAsString)
    console.log(deletedEvent)
    setUserValue(deletedEvent.deleteCount)
  }

  const handleMajonButton = async ()=>{
    const eventOfMajonList = await user.functions.getEventbyFilteringEventCat('majon')
  
    console.log(eventOfMajonList)
    setEvents(eventOfMajonList)
    console.log(events)
  }

  const handleVolleyballButton = async ()=>{
    const eventOfVolleyballList = await user.functions.getEventbyFilteringEventCat('volleyball')
    
    console.log(eventOfVolleyballList)
    setEvents(eventOfVolleyballList)
    console.log(events)
  }

  const handleCasinoButton = async ()=>{
    const eventOfCasinoList = await user.functions.getEventbyFilteringEventCat('casino')
 
    console.log(eventOfCasinoList)
    setEvents(eventOfCasinoList)
    console.log(events)
  }

  const clearAll = async ()=>{
    const listOfEvents = await user.functions.getAllEvent();
    setEvents(listOfEvents);
    
  }

  return (
    <>
      <header className="h-16 w-full bg-slate-900 px-6 flex justify-between items-center">
        <h1 className="text-x1 text-slate-200 md:text-xl font-style: italic">Jeffery's EVENT matching app</h1>
        <div className="flex flex-col md:flex-row  ml-1">
            <button
            className="text-sm text-slate px-4 bg-slate-200 rounded-md mr-2 w-full md:text-lg mb-1 md:mb-0"
            onClick={() => setModal(true)}
            //就會彈出空白的modal 
            >
            Create
            </button>
            <button
            className="text-sm text-slate px-4 bg-slate-200 rounded-md w-full md:text-lg"
            onClick={() => navigate("/") }
            
            >
            LogOut
            </button>
        </div>
      </header>
      <div className="md:grid md:grid-cols-2">
      <section className="mt-10 flex justify-center px-6">
          
          <ul className="w-80%">
            <h1 className="text-4xl pb-6 pl-4 ">MY Events -  {loggedInUserName}</h1>
            
            {myEvents &&
                myEvents.map((myevent) => (
                  <li
                    key={myevent._id}
                    className="border-2 p-4 mp-3 rounded-lg flex items-center bg-blue-300"
                  >
                    <section className="h-10 w-10 bg-slate-100 rounded-md flex justify-center items-center mr-8">
                      <UserIcon />
                    </section>
                    <section>
                      <h2 className="capitalize font-semibold mb-1">{myevent.event}</h2>
                      <p className="text-slate-500 font-medium text-sm mb-2">
                        {myevent.name}
                      </p>
                      <p className="capitalize text-gray-500 mb-1">
                        {myevent.location}
                      </p>
                      <p className="text-slate-500 font-medium text-sm mb-2">
                        {myevent.date}
                      </p>
                      <p className="text-slate-500 font-medium text-sm mb-2">
                        {myevent.timeslot}
                      </p>
                      <div className="flex">
                        <button
                          className="text-sm text-red-500 capitalize px-4 py-2 mr-4 border border-red-500 rounded-md  hover:bg-yellow-200 hover:-translate-y-0.5 
                          focus:ring focus:outline-none focus:ring-offset-2  focus:ring-indigo-900 focus:ring-opacity-50 transform transition "
                          onClick={() => handleDelete(myevent._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="text-sm text-white capitalize px-4 py-2 bg-slate-900 rounded-md"
                          onClick={() => {
                            setModal(true);
                            setIsEdit(true);
                            setEditingId(myevent._id);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </section>
                  </li>
                ))}
          </ul>
        </section>
        <section className="mt-10 flex justify-center px-6">
          
          <ul className="w-80%">
            <h1 className="text-5xl pb-2 pl-4 md:text-4xl">Events</h1>
            <div className='button-container flex justify-evenly py-3 '>
                  <button className="btn bg-indigo-500 sm:text-base mr-2" onClick={()=>handleMajonButton()}>MAJON</button> 
                  <button className="btn bg-indigo-500 text-xs mr-2 " onClick={()=>handleVolleyballButton()}>VOLLEYBALL</button>  
                  <button className="btn bg-indigo-500 sm:text-base mr-2" onClick={()=>handleCasinoButton()}>Casino</button>
                  <button className="btn bg-yellow-400 sm:text-base" onClick={()=>clearAll()}>CLEAR</button>
            </div>
            <div className="flex flex-wrap justify-center">
              {events &&
                  events.map((event) => (
                    <li
                      key={event._id}
                      className="border-2 p-4 mp-3 rounded-lg flex items-center justify-center w-2/5 mt-2 bg-green-200"
                    >
                      <section className="h-10 w-10 bg-slate-100 rounded-md flex justify-center items-center mr-4">
                        <UserIcon />
                      </section>
                      <section>
                        <h2 className="capitalize font-semibold mb-1">{event.event}</h2>
                        <p className="text-slate-500 font-medium text-sm mb-2">
                          {event.name}
                        </p>
                        <p className="capitalize text-gray-500 mb-1">
                          {event.location}
                        </p>
                        <p className="text-slate-500 font-medium text-sm mb-2">
                          {event.date}
                        </p>
                        <p className="text-slate-500 font-medium text-sm mb-2">
                          {event.timeslot}
                        </p>
                        <div className="flex">
                        </div>
                      </section>
                    </li>
              ))}
            </div>
          </ul>
        </section>
      </div>

      <Modal
        isOpen={modal}
        isEdit={isEdit}
        closeModal={handleModalClose}
        setUserValue={setUserValue}
        //代表有沒有改動? 要看modal才知道
        editingId={editingId}
        loggedInUserName={loggedInUserName}
      />
    </>
  );
}

export default App;
