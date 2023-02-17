import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface Props {
  text?: string;
  active?: boolean;
}

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 24px;
  display: flex;
  gap: 12px;
  width: max-content;
  max-width: 800px;
  background-color: #f8f8f8;
  border: 2px solid #f1f3f3;
  border-radius: 16px;
  padding: 16px 24px;
  z-index: -1;
  opacity: 0;
  box-shadow: 8px 8px 40px 0px #0000000d;

  @media (max-width: 864px) {
    max-width: 80%;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
`;

const index = ({ text, active }: Props) => {
  return (
    <Wrapper animate={{ opacity: active ? 1 : 0 }}>
      <IconContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            id="Union_12"
            data-name="Union 12"
            d="M0,9a9,9,0,1,1,9,9A9,9,0,0,1,0,9ZM2,9A7,7,0,1,0,9,2,7.008,7.008,0,0,0,2,9Zm6,4a1,1,0,1,1,1,1A1,1,0,0,1,8,13Zm0-3V5a1,1,0,1,1,2,0v5a1,1,0,1,1-2,0Z"
            fill="#6D7378"
          />
        </svg>
      </IconContainer>
      <span style={{ fontSize: "14px" }}>{text}</span>
    </Wrapper>
  );
};

export default index;
