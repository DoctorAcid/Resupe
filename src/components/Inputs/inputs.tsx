import styled from "styled-components";
import { motion } from "framer-motion";

export const Input = styled(motion.input)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 2px solid #d9dee2;
  border-radius: 24px;
  outline: none;
  color: #6d7378;
  background-color: #f1f3f3;
  min-width: 128px;
  ::placeholder {
    color: #a9adb0;
  }
  &:hover {
    border: 2px solid #6d7378;
    transition: all ease-in 0.3s;
  }
`;

export const LargeInput = styled(motion.textarea)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid #d9dee2;
  border-radius: 28px;
  outline: none;
  font-size: 13px;
  color: #6d7378;
  background-color: #f1f3f3;
  vertical-align: text-top;
  resize: none;
  ::placeholder {
    color: #a9adb0;
  }
  &:hover {
    border: 2px solid #6d7378;
    transition: all ease-in 0.3s;
  }
`;
