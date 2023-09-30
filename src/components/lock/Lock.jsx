/* eslint-disable react/prop-types */
import OpenedLock from "../../assets/images/open-lock.svg";
import ClosedLock from "../../assets/images/closed-lock.svg";

import classes from "./lock.module.css";

const Lock = ({ open }) => {
  return (
    <img
      src={open ? OpenedLock : ClosedLock}
      alt="Closed Lock"
      className={classes.lockImg}
    />
  );
};

export default Lock;
