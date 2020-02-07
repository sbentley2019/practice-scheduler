import React, { useState } from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || 1);

  return (
    <ul className="interviewers__list">
      {props.interviewers.map(person => (
        <InterviewerListItem
          id={person.id}
          name={person.name}
          avatar={person.avatar}
          selected={person.id === interviewer}
          setInterviewer={setInterviewer}
        />
      ))}
    </ul>
  );
}
