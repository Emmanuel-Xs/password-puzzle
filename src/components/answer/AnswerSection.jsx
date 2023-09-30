/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import AuthCode from "react-auth-code-input";
import classes from "./answer.module.css";
import Lock from "../lock/Lock";

import { useDispatch, useSelector } from "react-redux";
import { isGuessCorrect } from "../../app/store";

const OtpBox = ({ noOtp }) => {
  noOtp = noOtp || 3;
  const [answer, setAnswer] = useState("");
  const AuthInputRef = useRef(null);
  const dispatch = useDispatch();
  const isCorrect = useSelector((state) => state.puzzle.isCorrect);
  const isButtonVisible = answer.length >= noOtp;

  const handleGuess = (guess) => {
    setAnswer(guess);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(isGuessCorrect(answer.split("").map(Number)));
    if (isCorrect === "true") {
      AuthInputRef.current?.clear();
    }
  };

  let button = null;
  if (isButtonVisible) {
    button = <button className={classes.button}>Check!</button>;
  }
  useEffect(() => {
    if (isButtonVisible) {
      window.scrollTo(0, document.body.scrollHeight + 25);
    }
  }, [answer, noOtp]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Can You Crack the Password?</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.answerBox}>
          <Lock open={isCorrect === "true"} />

          <AuthCode
            length={noOtp}
            allowedCharacters="numeric"
            inputClassName={classes.answerInput}
            containerClassName={classes.answerContainer}
            onChange={handleGuess}
            ref={AuthInputRef}
          />
          {button}
        </div>
      </form>

      <p className={classes.desc}>A numeric lock has a {noOtp} digit key</p>
    </div>
  );
};

export default OtpBox;
