/* eslint-disable react/prop-types */
import PasswordHintBlock from "../UI/PasswordHintBlock";
import classes from "./hint.module.css";

const HintSection = ({ passwordHints }) => {
  return (
    <div>
      <h2>HINT</h2>
      <div className={classes.container}>
        {passwordHints.map((element, index) => (
          <PasswordHintBlock
            key={index}
            array={element.passwordHintArr}
            description={element.passwordHintStr}
          />
        ))}
      </div>
    </div>
  );
};

export default HintSection;
