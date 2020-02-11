import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  let dayClass = classnames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  const formatSpots = function() {
    let str = "";

    switch (props.spots) {
      case 0:
        str += "no spots";
        break;
      case 1:
        str += "1 spot";
        break;
      default:
        str += props.spots + " spots";
    }

    return str + " remaining";
  };

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
