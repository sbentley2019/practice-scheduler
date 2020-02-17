import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const spotCounter = function(num, state, action) {
    const day = {
      ...state.days[num - 1],
      spots: state.days[num - 1].spots + action.spotChange
    };
    const days = state.days.map(item => {
      if (item.id === num) {
        return day;
      } else return item;
    });

    return days;
  };

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
      const days = spotCounter(Math.ceil(action.id / 5), state, action);

      return { ...state, days, appointments };
    }
  };

  function reducer(state, action) {
    return reducers[action.type](state, action) || state;
  }

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

    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.addEventListener("open", () => {
      ws.send("ping");
    });
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day });

  const bookInterview = function(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(data => {
      dispatch({ type: SET_INTERVIEW, id, interview, spotChange: -1 });
    });
  };

  const cancelInterview = function(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null, spotChange: 1 });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
