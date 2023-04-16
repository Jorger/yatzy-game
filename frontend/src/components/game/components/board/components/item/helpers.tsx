import type { CategoriesType } from "../../../../../../interfaces";
import Icon from "../../../../../icon";

export const LOWER_SECTION_OPTIONS: Record<
  CategoriesType,
  JSX.Element | string
> = {
  THREE_KIND: "3x",
  FOUR_KIND: "4x",
  FULL_HOUSE: <Icon type="full-house" fill="white" />,
  SMALL_STRAIGHT: (
    <div className="board-item-straight">
      <Icon type="cards" fill="white" />
      <div>Small</div>
    </div>
  ),
  LARGE_STRAIGHT: (
    <div className="board-item-straight">
      <Icon type="cards" fill="white" />
      <div>Large</div>
    </div>
  ),
  YATZY: <div className="board-item-yatzy">Yatzy</div>,
  CHANCE: "?",
};
