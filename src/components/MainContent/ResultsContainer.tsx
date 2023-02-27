import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Column } from "../Containers/Column";
import { Row } from "../Containers/Row";
import { Input, LargeInput } from "../Inputs/inputs";
import { motion } from "framer-motion";
import { useWindowSize } from "../../custom_hooks/useWindowSize";

interface InputItems {
  id: number;
  name: string;
  isVisible: boolean;
}

interface Props {
  inputFields: InputItems[];
  clicked: boolean;
  inputHeight: number;
  // inputWidth: string;
  // inputWidthReverse: string;
}

const ReloadTask = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border: 2px solid #d9dee2;
  background-color: #fff;
  border-radius: 24px;
  height: 88px;
  width: 44px;
  transition: box-shadow ease-in 0.3s;
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

const MultiInputs = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

const InputContaner = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  width: 0;
  height: 0;
  opacity: 1;
`;

const TopSection = styled(motion.div)`
  display: flex;
  // flex-wrap: none;
  flex-direction: column;
  gap: 8px;
  width: 100%;
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

const MainContainer = ({ inputFields, clicked, inputHeight }: Props) => {
  const [screenWidth] = useWindowSize();
  const dateFileds = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (screenWidth > 464) {
      if (dateFileds.current) {
        dateFileds.current.style.flexWrap = "none";
      }
    }
    if (screenWidth < 464 && screenWidth !== 0) {
      if (dateFileds.current) {
        dateFileds.current.style.flexWrap = "wrap";
      }
    }
  }, [screenWidth]);

  return (
    <TopSection>
      <Row ref={dateFileds} gap="sm" justify="fe" align="fe">
        <Row className="shiftTitle" align="fs" gap="md" style={{ flex: "1" }}>
          <Input placeholder="Your job title..." />
          <ReloadButton>
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
        </Row>

        <Row gap="sm" style={{ flex: "1" }}>
          <Column gap="sm">
            <Input type={"date"} placeholder="__/__/___" />
          </Column>

          <Column gap="sm">
            <Input
              className="smallInput"
              type={"date"}
              placeholder="__/__/___"
            />
          </Column>
        </Row>
      </Row>

      <Row className="shiftTitle" align="fs" justify="c" gap="md">
        <Row
          gap="sm"
          animate={{
            justifyContent: clicked ? "flex-start" : "center",
          }}
        >
          <MultiInputs
            animate={{
              flexDirection: clicked ? "column" : "row",
            }}
            transition={{ delay: clicked ? 0 : 0.6 }}
          >
            <motion.div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
              animate={
                {
                  // width: clicked ? inputWidth : inputWidthReverse,
                }
              }
            >
              {inputFields.map((index, i) => {
                if (index.id === 1) {
                  return (
                    <InputContaner
                      key={index.id}
                      animate={{
                        height: clicked ? "48px" : "104px",
                      }}
                      style={{
                        height: "104px",
                        width: "100%",
                      }}
                    >
                      <LargeInput
                        style={{
                          padding: "12px 16px",
                        }}
                        placeholder={
                          "Tasks, responsibilities and achievements..."
                        }
                      />
                    </InputContaner>
                  );
                }
                return (
                  <InputContaner
                    className="input"
                    animate={{
                      width: index.isVisible ? "100%" : "0%",
                      height: index.isVisible ? "48px" : "0px",
                    }}
                    transition={{ type: "tween" }}
                    key={index.id}
                  >
                    <LargeInput
                      animate={{
                        padding: index.isVisible ? "12px 16px" : "0px",
                      }}
                      placeholder={"Tasks..."}
                    />

                    <ReloadButton
                      style={{ opacity: 0 }}
                      animate={{ opacity: index.isVisible ? 1 : 0 }}
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
                );
              })}
            </motion.div>
          </MultiInputs>
          {clicked ? (
            <ReloadButton>
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
          ) : (
            <Column
              style={{
                position: "absolute",
                height: "fit-content",
                width: "fit-content",
                right: "7px",
              }}
              animate={{
                position: clicked ? "relative" : "absolute",
                right: clicked ? 0 : 7,
              }}
              transition={{ delay: clicked ? 0.2 : 0 }}
            >
              <ReloadTask
                animate={{
                  height: inputHeight,
                }}
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
              </ReloadTask>
            </Column>
          )}
        </Row>
      </Row>

      <Row className="shiftTitle" align="fs" gap="md" style={{ flex: "1" }}>
        <Input placeholder="Brief statment of your role" />
        <ReloadButton>
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
      </Row>
    </TopSection>
  );
};
export default MainContainer;
