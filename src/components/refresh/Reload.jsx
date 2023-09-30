import reload from "../../assets/images/refresh.svg";

import classes from "./reload.module.css";

import { handleReload } from "../../utils/randoms";

const Reload = () => {
  return (
    <button
      className={classes.reloadContainer}
      onClick={handleReload}
      title="reload"
    >
      <img src={reload} alt="Closed Lock" className={classes.reload} />
    </button>
  );
};

export default Reload;
