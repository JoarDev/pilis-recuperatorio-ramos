import { useContext } from "react";
import { ScoreContext } from "../context/scoreContext";

export const useScore = () => useContext(ScoreContext)