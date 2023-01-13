import React from "react";
import styled from "styled-components";

export const Input = styled("input")`
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 2px solid #d9dee2;
  border-radius: 24px;
  outline: none;
  color: #6d7378;
  background-color: #f1f3f3;
  transition: all ease-in 0.3s;
  min-width: 128px;
  ::placeholder {
    color: #a9adb0;
  }
  &:hover {
    border: 2px solid #6d7378;
  }
`;

export const LargeInput = styled.textarea`
  width: 100%;
  height: 104px;
  padding: 12px 16px;
  border: 2px solid #d9dee2;
  border-radius: 28px;
  outline: none;
  font-size: 13px;
  color: #6d7378;
  background-color: #f1f3f3;
  vertical-align: text-top;
  resize: none;
  transition: all ease-in 0.3s;
  ::placeholder {
    color: #a9adb0;
  }
  &:hover {
    border: 2px solid #6d7378;
  }
`;
