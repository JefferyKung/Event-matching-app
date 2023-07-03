import React from 'react'
import { BSON } from "realm-web";
import { user } from "../utils/mongo.client";

const MyEvent = ({myEvents,setModal,setIsEdit,setEditingId,setUserValue}) => {

    const handleDelete = async (id) => {
        const idAsString = new BSON.ObjectID(id).toString()
        const deletedEvent = await user.functions.deleteEvent(idAsString)
        // console.log(deletedEvent)
        setUserValue(deletedEvent.deleteCount)
      }


  return (
    <section className="mt-10 flex justify-center px-8 ">
          
    <ul className="w-80%">
      <h1 className="text-4xl pb-6 pl-4 ">My Events </h1>

        <div className="flex flex-wrap justify-center">
        {myEvents &&
          myEvents.map((myevent) => (
            <li
              key={myevent._id}
              className="border-5 p-4 m-3 rounded-lg flex items-center bg-blue-200 justify-center "
            >
      
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
        </div>
      
      
    </ul>
  </section>
  )
}

export default MyEvent