import { useEffect, useState } from "react";
import { BSON } from "realm-web";
import CloseIcon from "../assets/svg/CloseIcon";
import { app, user } from "../utils/mongo.client";

const Modal = ({ isOpen, isEdit, closeModal, setUserValue, editingId,loggedInUserName }) => {
  const [value, setValue] = useState({
    name: loggedInUserName,
    event:"",
    date:"",
    timeslot:"",
    location: ""
  });

  // 
  const handleChange = (e) => {
    let { name, value } = e.target;
    setValue(prev => ({ ...prev, [name]: value }));
  };

    // 開關modal
  const handleModal = (e) => {
    if (e.target.classList.contains("open-nav")) {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      // edit mode on!
      console.log(value)
      const edit = await user.functions.editEvent(value)
      console.log(edit)
      setUserValue(edit._id)
      setValue({ 
        name: "",
        event:"",
        date:"",
        timeslot:"",
        location: ""});
      closeModal();
    } else {
      const create = user.functions.createEvent(
        value.name,
        value.event,
        value.date,
        value.timeslot,
        value.location
      );
      create.then((response) => {
        setUserValue(response.insertedId);
        setValue({ name: "",
          event:"",
          date:"",
          timeslot:"",
          location: ""
      });
        closeModal();
      });
    }
  };

  useEffect(() => {

    // setValue({name:{loggedInUserName}})
    console.log(loggedInUserName)
    if (isEdit) {
      //get data to edit 
      //在出來的modal上直接帶入原資料
      const getSingleEvent = async () => {
        const editingIdAsString = new BSON.ObjectId(editingId).toString()
        const getEvent = await user.functions.getSingleEventDataById(editingIdAsString)
        // console.log(getUser)
        setValue(getEvent)
      }

      getSingleEvent();
    }

    //clear the fields
    return () => {
      setValue({ name: loggedInUserName,
      event:"",
      date:"",
      timeslot:"",
      location: ""});
    };
  }, [isEdit]);

  return (
    <div
      className={`h-screen w-screen bg-slate-900 bg-opacity-30 z-30 top-0 fixed transform scale-105 transition-all ease-in-out duration-100   ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="flex flex-col justify-center items-center h-full w-full open-nav"
        onClick={handleModal}
      >
        <div className="flex justify-end w-11/12 lg:w-1/2 2xl:w-6/12">
          <div
            role="button"
            className="cursor-pointer w-6 h-6 rounded-full flex items-center justify-center bg-white"
            onClick={() => closeModal()}
          >
            <CloseIcon />
          </div>
        </div>
        <section className="w-11/12 lg:w-1/2 2xl:w-6/12 bg-white flex justify-center items-center mt-5 rounded-lg">
          <div className="w-11/12 py-8">
            <h2 className="capitalize text-xl text-gray-500 font-medium mb-4">
              {isEdit ? "Edit Event" : "add Event"}
            </h2>
            <form onSubmit={handleSubmit}>
              <fieldset className="mb-4">
                <label className="block text-sm text-gray-500 capitalize mb-1">
                  name
                </label>
                <input
                  type="text"
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                  required
                  disabled
                  className="w-full h-10 rounded-sm px-4 bg-gray-300 font-bold text-lg"
                />
              </fieldset>
             
              <fieldset className="mb-4">
                <label className="block text-sm text-gray-500 capitalize mb-1">
                  event in lowercase
                </label>
                <input
                  type="text"
                  name="event"
                  value={value.event}
                  onChange={handleChange}
                  required
                  className="w-full h-10 border border-gray-500 rounded-sm px-4"
                />
              </fieldset>
              <fieldset className="mb-4">
                <label className="block text-sm text-gray-500 capitalize mb-1">
                date
                </label>
                <input
                  type="date"
                  name="date"
                  value={value.date}
                  onChange={handleChange}
                  required
                  className="w-full h-10 border border-gray-500 rounded-sm px-4"
                />
              </fieldset>
              <fieldset className="mb-4">
                <label className="block text-sm text-gray-500 capitalize mb-1">
                timeslot
                </label>
                <input
                  type="text"
                  name="timeslot"
                  value={value.timeslot}
                  onChange={handleChange}
                  required
                  className="w-full h-10 border border-gray-500 rounded-sm px-4"
                />
              </fieldset>
              <fieldset className="mb-4">
                <label className="block text-sm text-gray-500 capitalize mb-1">
                  location
                </label>
                <input
                  type="text"
                  name="location"
                  value={value.location}
                  onChange={handleChange}
                  required
                  className="w-full h-10 border border-gray-500 rounded-sm px-4"
                />
              </fieldset>
              
              <button className="text-white capitalize px-6 py-2 bg-slate-900 rounded-md w-full">
                save
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Modal;
