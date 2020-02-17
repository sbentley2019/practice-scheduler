import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducers = {
  SET_DAY(state, action) {
    return {
      ...state,
      day: action.day
    };
  },
  SET_APPLICATION_DATA(state, action) {
    return {
      ...state,
      days: action.days,
      appointments: action.appointments,
      interviewers: action.interviewers
    };
  },
  SET_INTERVIEW(state, action) {
    const appointment = {
      ...state.appointments[action.id],
      interview: action.interview ? { ...action.interview } : null
    };
    const appointments = { ...state.appointments, [action.id]: appointment };
    return { ...state, appointments };
  }
};

function reducer(state, action) {
  return reducers[action.type](state, action) || state;
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(all => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  const bookInterview = function(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(data => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  };

  const cancelInterview = function(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
