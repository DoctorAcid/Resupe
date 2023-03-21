import { FC } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LargeInput } from "./inputs";

interface InputItems {
  id: number;
  name: string;
  isVisible: boolean;
}

type Props = {
  id: number;
  isVisible: boolean;
};

const InputContaner = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  width: 0;
  height: 0;
  opacity: 1;
`;

const ReloadButton = styled(motion.div)`
  position: absolute;
  right: 7px;
  top: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border: 2px solid #d9dee2;
  background-color: #fff;
  border-radius: 24px;
  height: 34px;
  width: 48px;
  &:hover {
    transition: border ease-in 0.3s;
    border: 2px solid #6d7378;
    box-shadow: 8px 8px 40px 0px #0000000d;
  }

  &:hover svg path {
    transition: all ease-in 0.3s;
    fill: #6d7378;
  }
`;

const SortableInputs: FC<Props> = ({ id, isVisible }) => {
  return (
    <div>
      <InputContaner
        className="input"
        animate={{
          width: isVisible ? "100%" : "0%",
          height: isVisible ? "48px" : "0px",
        }}
        transition={{ type: "tween" }}
        key={id}
      >
        <LargeInput
          animate={{
            padding: isVisible ? "12px 16px" : "0px",
          }}
          placeholder={"Tasks..."}
        />

        <ReloadButton
          style={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
        >
          <svg
            id="Component_12_1"
            data-name="Component 12 – 1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="15"
            viewBox="0 0 20 15"
          >
            <path
              id="Union_13"
              data-name="Union 13"
              d="M6.169,17.447A7.556,7.556,0,0,1,6.139,2.6V0L8.865,2.6a7.556,7.556,0,0,1-.017,14.846V20Zm-4.5-7.428a5.871,5.871,0,0,0,4.559,5.728l2.622-2.5V15.73A5.878,5.878,0,0,0,8.731,4.281L6.139,6.751V4.311A5.872,5.872,0,0,0,1.667,10.019Z"
              transform="translate(20) rotate(90)"
              fill="#d9dee2"
            />
          </svg>
        </ReloadButton>
      </InputContaner>
    </div>
  );
};

export default SortableInputs;
