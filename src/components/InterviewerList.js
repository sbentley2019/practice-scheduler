import React, { useState } from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const [interviewer, setInterviewer] = useState(props.value);

  const interviewers = props.interviewers.map(person => (
    <InterviewerListItem
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={person.id === interviewer}
      setInterviewer={() => setInterviewer(person.id)}
    />
  ));
  return <ul className="interviewers__list">{interviewers}</ul>;
}
