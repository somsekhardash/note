import React, { useState, useRef, useEffect } from "react";
import JSONForm from "./Form";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ModelForEdit from './ModelForEdit';

export class CNotification {
  constructor({ title, start, description }) {
    this.id = Date.now();
    this.title = title;
    this.start = start;
    this.allDay = true;
    this.extendedProps = {
      department: "check this out som",
    };
    this.description = description;
  }
}

export default function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.npoint.io/6bed2f2c8dc889607bd5")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return data?.length ? <DemoApp initialEvents={data} /> : "Loading...";
}

export function DemoApp({ initialEvents }) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([...initialEvents]);
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modelData, setModelData] = useState(null);
  const calendarRef = useRef(null);

  const saveData = (newEvent) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    };

    fetch("https://api.npoint.io/6bed2f2c8dc889607bd5", requestOptions)
      .then((response) => response.json())
      .then((data) => setLoading(false));
  };

  const onAddEvent = (data) => {
    const newEvent = new CNotification(data);
    const api = calendarRef.current.getApi();
    api.addEvent(newEvent);
    setLoading(true);
    saveData([...initialEvents, newEvent]);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: Date.now(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.event.title}</b>
        <i>{eventInfo.event.extendedProps.description}</i>
      </>
    );
  };

  const handleEventClick = (clickInfo) => {
    setShowModel(true);
    debugger;
    setModelData({...clickInfo.event});
    // if (
    //   alert(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const handleAddEvents = (events) => {
    debugger;
  };

  const handleChangeEvents = (events) => {
    saveData([
      ...initialEvents.filter((node) => node.id != events.event.id),
      new CNotification(events.event),
    ]);
    debugger;
  };

  const handleRemoveEvents = (events) => {
    debugger;
  };

  return (
    <div className="demo-app">
      <JSONForm onEventChange={(data) => onAddEvent(data)} />
      {showModel && modelData && <ModelForEdit data={modelData}/>}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          id="dash-calendar"
          ref={calendarRef}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          display="auto"
          weekends={weekendsVisible}
          initialEvents={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          eventAdd={handleAddEvents}
          eventChange={handleChangeEvents}
          eventRemove={handleRemoveEvents}
        />
      </div>
    </div>
  );
}

