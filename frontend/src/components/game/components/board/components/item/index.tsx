import "./styles.css";
import { LOWER_SECTION_OPTIONS } from "./helpers";
import React from "react";
import type {
  ItemType,
  valueDice,
  CategoriesType,
} from "../../../../../../interfaces";

interface ItemProps {
  label?: string;
  size?: number;
  type: ItemType;
  value: valueDice | CategoriesType;
}

const Item = ({
  label = "",
  size = 50,
  type = "UPPER_SECTION",
  value = 1,
}: ItemProps) => (
  <div
    className={`board-item ${type.toLowerCase()} ${
      type === "UPPER_SECTION" ? `dice-${value}` : ""
    }`}
    style={{ width: size, height: size }}
    title={label || value.toString()}
  >
    {type === "LOWER_SECTION" && LOWER_SECTION_OPTIONS[value as CategoriesType]}
  </div>
);

export default React.memo(Item);
