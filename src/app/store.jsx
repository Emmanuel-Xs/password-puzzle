import { configureStore, createSlice } from "@reduxjs/toolkit";

import {
  generateUniqueRandomDigits,
  arePasswordHintsCorrect,
  checkUserGuess,
  getArrayOfUniqueSubset,
} from "../utils/randoms";

const initialState = {
  answer: [],
  userGuess: [],
  isCorrect: "not checked",
  passwordHints: [],
};

export const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    generateAnswer(state, action) {
      state.answer = generateUniqueRandomDigits(action.payload);
    },
    generatePasswordHint(state) {
      const dummyArr = getArrayOfUniqueSubset(state.answer);

      if (arePasswordHintsCorrect(state.answer, dummyArr)) {
        state.passwordHints = dummyArr;
      }
    },
    isGuessCorrect(state, action) {
      state.isCorrect = `${checkUserGuess(state.answer, action.payload)}`;
    },
    clearIsCorrect(state) {
      state.isCorrect = "not checked";
    },
  },
});

export const {
  generateAnswer,
  generatePasswordHint,
  isGuessCorrect,
  clearIsCorrect,
} = puzzleSlice.actions;

const store = configureStore({
  reducer: { puzzle: puzzleSlice.reducer },
});

export default store;
