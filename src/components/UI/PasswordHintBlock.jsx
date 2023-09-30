/* eslint-disable react/prop-types */
// import React from "react";
import classes from "./passwordHint.module.css";

const PasswordHintBlock = ({ array, description }) => {
  // array = array || [1, 5, 3];

  return (
    <div className={classes.hintContainer}>
      <div className={classes.hintBox}>
        {array.map((ele, idx) => (
          <div key={idx} className={classes.hintBlock}>
            <p>{ele}</p>
          </div>
        ))}
      </div>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default PasswordHintBlock;
