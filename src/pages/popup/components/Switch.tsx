import React from "react";
import "./SwitchStyle.scss";
import { FC } from "react";
import { useRef } from "react";
import { useState } from "react";

type SwitchProps = {};

export const Switch: FC<SwitchProps> = ({}) => {
  const [isChecked, setIsChecked] = useState(true);

  const onClickSwitch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChecked(!isChecked);
  };

  return (
    <>
      <input type="checkbox" id="switch" checked={isChecked} />
      <label onClick={(e) => onClickSwitch(e)} htmlFor="switch"></label>
    </>
  );
};
