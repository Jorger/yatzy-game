import GITHUB from "./github";
import GOOGLE from "./google";
import MICROSOFT from "./microsoft";

const PASSPORT_STRATEGIES = {
  GITHUB,
  GOOGLE,
  MICROSOFT,
};

export type Strategies = keyof typeof PASSPORT_STRATEGIES;

export default PASSPORT_STRATEGIES;
