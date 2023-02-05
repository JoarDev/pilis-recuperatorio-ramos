import { useContext } from "react";
import { QuestionContext } from "../context/questionContext";

export const useQuestion = () => useContext(QuestionContext)