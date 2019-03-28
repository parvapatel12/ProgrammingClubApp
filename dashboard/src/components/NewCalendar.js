import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class BigCalendar extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "IPC 2 Long"
      },
      {
        start: new Date(2019, 2, 11),
        end: new Date(2019, 2, 11),
        title: "Some title 2"
      }
    ]
  };

  render() {
    return (
      <div className="App">
        <div style={CalendarStyle}>
          <h3>Events Page</h3>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            style={{ height: "70vh" }}
          />
        </div>
      </div>
    );
  }
}
const CalendarStyle = {
  width: "80%",
  align: "center",
  display: "inline-block"
};

export default BigCalendar;
