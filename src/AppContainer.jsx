import { useEffect } from "react";
import AnswerSection from "./components/answer/AnswerSection";
import HintSection from "./components/hint/HintSection";

import { useSelector, useDispatch } from "react-redux";
import { generateAnswer, generatePasswordHint } from "./app/store";
import ConfirmModal from "./components/confirmModal/ConfirmModal";
import Reload from "./components/refresh/Reload";

const AppContainer = () => {
  const answer = useSelector((state) => state.puzzle.answer);
  const passwordHints = useSelector((state) => state.puzzle.passwordHints);
  const isCorrect = useSelector((state) => state.puzzle.isCorrect);
  const dispatch = useDispatch();

  const noDigitKeys = 3;

  useEffect(() => {
    dispatch(generateAnswer(noDigitKeys));
  }, []);

  useEffect(() => {
    if (answer.length === noDigitKeys || passwordHints.length <= 0) {
      dispatch(generatePasswordHint());
      console.log(answer);
    }
  }, [answer, passwordHints]);

  useEffect(() => {
    if (passwordHints.length <= 0) {
      dispatch(generatePasswordHint());
    }
  }, [passwordHints]);

  return (
    <div>
      <ConfirmModal isCorrect={isCorrect} />
      <Reload />
      <AnswerSection noOtp={noDigitKeys} />
      <HintSection passwordHints={passwordHints} />
    </div>
  );
};

export default AppContainer;
