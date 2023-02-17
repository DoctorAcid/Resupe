import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Column } from "../Containers/Column";
import { Row } from "../Containers/Row";
import { Input, LargeInput } from "../Inputs/inputs";
import TitleTag from "../TitleTag/TitleTag";
import { motion } from "framer-motion";
import ResultsContainer from "./ResultsContainer";
import { useWindowSize } from "../../custom_hooks/useWindowSize";

interface InputItems {
  id: number;
  name: string;
  isVisible: boolean;
}

interface Props {
  setTopPosition: React.Dispatch<React.SetStateAction<boolean>>;
  titleOpacity: boolean;
  topPosition: boolean;
  submitHandler: boolean;
  toolTipOpacity?: boolean;
  titleSection: boolean;
  setToolTipContent: React.Dispatch<React.SetStateAction<string>>;
  setToolTipOpacity: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTasks = styled(motion.button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border: 2px solid #d9dee2;
  background-color: #fff;
  padding: 24px 12px;
  border-radius: 24px;
  height: 88px;
  transition: box-shadow ease-in 0.3s;

  &:disabled {
    background-color: #f8f8f8;

    &:hover {
      border: 2px solid #d9dee2;
      box-shadow: none;
    }

    &:hover svg path {
      fill: #d9dee2;
    }
  }

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

const DeleteButton = styled(motion.button)`
  position: absolute;
  right: 0;
  opacity: 0;
  padding: 0 16px;
  background-color: transparent;
  border: none;

  &:disabled {
    display: none;
  }

  &:hover svg path {
    fill: red;
    transition: fill ease-in 0.3s;
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

const TopSection = styled(Column)`
  flex: 49%;
  gap: 8px;
  max-width: 800px;
  // border: 2px solid red;
`;

const FlexWrap = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  width: 100%;
  align-items: flex-end;
  @media (max-width: 1346px) {
    flex-direction: column;
  }
`;

const ResultsContWrap = styled(motion.div)``;

const ResultsWrap = styled(motion.div)``;

const MainContainer = ({
  topPosition,
  setTopPosition,
  titleOpacity,
  submitHandler,
  toolTipOpacity,
  setToolTipContent,
  setToolTipOpacity,
  titleSection,
}: Props) => {
  const textArea = useRef<HTMLDivElement>(null);
  const largeInput = useRef<HTMLDivElement>(null);
  const topSection = useRef<HTMLDivElement>(null);
  const [inputFields, setInputFields] = useState<InputItems[]>([
    { id: 1, name: "input1", isVisible: false },
  ]);

  const [clicked, setClicked] = useState(false);
  const [inputHeight, setInputHeight] = useState(88);
  const [inputWidth, setInputWidth] = useState("");
  const [inputWidthReverse, setInputWidthReverse] = useState("100%");
  const [resultsContWidth, setResultsContWidth] = useState("");
  const [resultsContHeight, setResultsContHeight] = useState("220px");
  const [resultsContPadding, setResultsContPadding] = useState("");
  // const [resultsColumnDiv, setresultsColumnDiv] = useState(false);
  const [toolTip, setToolTip] = useState("");

  const [width] = useWindowSize();

  useEffect(() => {
    if (toolTip) {
      setToolTipContent(toolTip);
    }
  });

  useEffect(() => {
    if (width < 1346) {
      setResultsContWidth("100%");
      setResultsContHeight("max-content");
      setResultsContPadding("174px");
      // setresultsColumnDiv(true);
    }
    if (width < 742) {
      setResultsContPadding("0px");
    }
    if (width > 1346) {
      setResultsContWidth("512px");
      setResultsContHeight("220px");
      setResultsContPadding("0px");
      // setresultsColumnDiv(false);
    }
  }, [width]);

  function addButtonHeight() {
    if (inputFields.length === 1) {
      return 104;
    }
    return inputHeight + 56;
  }

  function reduseButtonHeight() {
    if (inputFields.length === 2) {
      setInputHeight(88);
      return inputHeight;
    }
    return inputHeight - 56;
  }

  const handleClick = () => {
    setClicked(true);
    setTopPosition(!topPosition);
    setInputHeight(addButtonHeight);
    setInputFields([
      ...inputFields,
      {
        id: inputFields.length + 1,
        name: "input" + (inputFields.length + 1),
        isVisible: true,
      },
    ]);

    setResultsContHeight("max-content");

    if (inputFields.length === 1) {
      if (textArea.current) {
        const inputWidth = textArea.current.offsetWidth;
        const width = String(inputWidth - 52) + "px";
        setInputWidth(width);

        setTimeout(() => {
          setInputWidth("100%");
        }, 800);
      }
    }

    if (largeInput.current) {
      largeInput.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  const removeInput = (index: number) => {
    setTopPosition(!topPosition);
    setInputFields(
      inputFields.map((input) => {
        if (input.id === index) {
          return { ...input, isVisible: false };
        }
        return input;
      })
    );

    setTimeout(() => {
      setInputFields(inputFields.filter((i) => i.id !== index));
    }, 300);

    if (inputFields.length === 2) {
      setInputHeight(88);
    }

    setInputHeight(reduseButtonHeight);

    if (inputFields.length === 2) {
      setClicked(false);
      setTimeout(() => {
        setInputWidthReverse("100%");
      }, 800);
    }

    if (inputFields.length === 2 && textArea.current) {
      const inputWidth = textArea.current.offsetWidth;
      const width = String(inputWidth + 52) + "px";
      setInputWidthReverse(width);
    }
  };

  return (
    <FlexWrap>
      <TopSection animate={{ gap: clicked ? "24px" : "8px" }} ref={topSection}>
        <Row gap="sm" justify="fe" align="fe" style={{ flexWrap: "wrap" }}>
          <Row className="shiftTitle" align="fs" gap="md" style={{ flex: "1" }}>
            {titleSection ? (
              <TitleTag
                justify="fe"
                title="Job Lists"
                titleOpacity={titleOpacity}
                tooltip="Just or nothing to say I wrote this text!"
                setToolTip={setToolTip}
                setToolTipOpacity={setToolTipOpacity}
                toolTipOpacity={toolTipOpacity}
              />
            ) : null}
            <Input placeholder="Your job title..." />
          </Row>

          <Row gap="sm" style={{ flex: "1" }}>
            <Column gap="sm">
              {titleSection ? (
                <TitleTag
                  title="Start Date"
                  marginLeft="14px"
                  titleOpacity={titleOpacity}
                  tooltip="Just or nothing to say I wrote this text!"
                  setToolTip={setToolTip}
                  setToolTipOpacity={setToolTipOpacity}
                  toolTipOpacity={toolTipOpacity}
                />
              ) : null}
              <Input type={"date"} placeholder="__/__/___" />
            </Column>

            <Column gap="sm">
              {titleSection ? (
                <TitleTag
                  title="End Date"
                  marginLeft="14px"
                  titleOpacity={titleOpacity}
                  tooltip="Just or nothing to say I wrote this text!Just or nothing to say I wrote this text!"
                  setToolTip={setToolTip}
                  setToolTipOpacity={setToolTipOpacity}
                  toolTipOpacity={toolTipOpacity}
                />
              ) : null}
              <Input
                className="smallInput"
                type={"date"}
                placeholder="__/__/___"
              />
            </Column>
          </Row>
        </Row>

        <Row className="shiftTitle" align="fs" justify="c" gap="md">
          {titleSection ? (
            <TitleTag
              align="fs"
              title="Tasks, Responsibilities,& Achievements"
              titleOpacity={titleOpacity}
              tooltip="Just or nothing to say I wrote this text!Just or nothing to say I wrote this text!Just or nothing to say I wrote this text!"
              setToolTip={setToolTip}
              setToolTipOpacity={setToolTipOpacity}
              toolTipOpacity={toolTipOpacity}
            />
          ) : null}
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
              ref={textArea}
            >
              <motion.div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
                animate={{
                  width: clicked ? inputWidth : inputWidthReverse,
                }}
              >
                {inputFields.map((index, i) => {
                  if (index.id === 1) {
                    return (
                      <InputContaner
                        ref={largeInput}
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
                      ref={largeInput}
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
                      <DeleteButton
                        animate={{
                          opacity: index.isVisible ? "1" : "0",
                        }}
                        style={{
                          transition: index.isVisible
                            ? "all ease-in 1.4s"
                            : "all ease-in 0.1s",
                        }}
                        onClick={() => removeInput(index.id)}
                        // disabled={submitHandler}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="15.999"
                          viewBox="0 0 14 15.999"
                        >
                          <path
                            id="Union_11"
                            data-name="Union 11"
                            d="M3,16a2,2,0,0,1-2-2V4H13V14a2,2,0,0,1-2,2ZM9.5,6.5v7a.5.5,0,0,0,1,0v-7a.5.5,0,1,0-1,0Zm-3,0v7a.5.5,0,0,0,1,0v-7a.5.5,0,1,0-1,0Zm-3,0v7a.5.5,0,0,0,1,0v-7a.5.5,0,1,0-1,0ZM0,3A2,2,0,0,1,2,1H5A1,1,0,0,1,6,0H8A1,1,0,0,1,9,1h3a2,2,0,0,1,2,2Z"
                            fill="#d9dee2"
                          />
                        </svg>
                      </DeleteButton>
                    </InputContaner>
                  );
                })}
              </motion.div>
            </MultiInputs>
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
              <AddTasks
                onClick={handleClick}
                animate={{
                  height: inputHeight,
                }}
                // disabled={submitHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    id="Union_4"
                    data-name="Union 4"
                    d="M7,15V9H1A1,1,0,1,1,1,7H7V1A1,1,0,1,1,9,1V7h6a1,1,0,0,1,0,2H9v6a1,1,0,1,1-2,0Z"
                    fill="#d9dee2"
                  />
                </svg>
              </AddTasks>
            </Column>
          </Row>
        </Row>

        <Row className="shiftTitle" align="fs" gap="md" style={{ flex: "1" }}>
          {titleSection ? (
            <TitleTag
              align="fs"
              justify="fe"
              title="A Broad Sentence Describing The Role"
              titleOpacity={titleOpacity}
              tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              setToolTip={setToolTip}
              setToolTipOpacity={setToolTipOpacity}
              toolTipOpacity={toolTipOpacity}
            />
          ) : null}
          <Input placeholder="Brief statment of your role" />
        </Row>
      </TopSection>

      {submitHandler ? (
        <>
          {/* {resultsColumnDiv ? (
            <motion.div
              style={{
                position: "relative",
                bottom: "0px",
                width: resultsContWidth,
                borderRadius: "2px",
                height: "0px",
                opacity: 1,
                zIndex: -1,
              }}
              animate={{
                width: submitHandler ? "400px" : resultsContWidth,
                opacity: submitHandler ? 0 : 1,
                display: submitHandler ? "none" : "flex",
              }}
              transition={{ delay: 1 }}
            >
              <motion.div
                style={{ opacity: 0, marginTop: "-128px" }}
                animate={{
                  opacity: submitHandler ? 1 : 0,
                  marginTop: submitHandler ? "0px" : "-128px",
                }}
              >
                <Column gap="sm" animate={{ gap: clicked ? "24px" : "8px" }}>
                  <div
                    style={{
                      width: "4px",
                      height: "48px",
                      borderRadius: "2px",
                      backgroundColor: "#d9dee2",
                    }}
                  />
                  <Column gap="sm">
                    {inputFields.map((items, index) => {
                      if (items.id === 1) {
                        return (
                          <div
                            key={index}
                            style={{
                              width: "4px",
                              height: clicked ? "48px" : "104px",
                              borderRadius: "2px",
                              backgroundColor: "#d9dee2",
                            }}
                          />
                        );
                      }
                      return (
                        <div
                          key={index}
                          style={{
                            width: "4px",
                            height: "48px",
                            borderRadius: "2px",
                            backgroundColor: "#d9dee2",
                          }}
                        />
                      );
                    })}
                  </Column>
                  <div
                    style={{
                      width: "4px",
                      height: "48px",
                      borderRadius: "2px",
                      backgroundColor: "#d9dee2",
                    }}
                  />
                </Column>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              style={{
                position: "relative",
                right: "0",
                width: "0px",
                borderRadius: "2px",
                // height: "216px",
                opacity: 1,
                zIndex: -1,
              }}
              animate={{
                opacity: submitHandler ? 0 : 1,
                display: submitHandler ? "none" : "flex",
              }}
              transition={{ delay: 1 }}
            >
              <motion.div
                style={{ opacity: 0, marginLeft: "-24px" }}
                animate={{
                  opacity: submitHandler ? 1 : 0,
                  marginLeft: submitHandler ? "0px" : "-24px",
                }}
              >
                <Column gap="sm" animate={{ gap: clicked ? "24px" : "8px" }}>
                  <div
                    style={{
                      width: "4px",
                      height: "48px",
                      borderRadius: "2px",
                      backgroundColor: "#d9dee2",
                    }}
                  />
                  <Column gap="sm">
                    {inputFields.map((items, index) => {
                      if (items.id === 1) {
                        return (
                          <div
                            key={index}
                            style={{
                              width: "4px",
                              height: clicked ? "48px" : "104px",
                              borderRadius: "2px",
                              backgroundColor: "#d9dee2",
                            }}
                          />
                        );
                      }
                      return (
                        <div
                          key={index}
                          style={{
                            width: "4px",
                            height: "48px",
                            borderRadius: "2px",
                            backgroundColor: "#d9dee2",
                          }}
                        />
                      );
                    })}
                  </Column>
                  <div
                    style={{
                      width: "4px",
                      height: "48px",
                      borderRadius: "2px",
                      backgroundColor: "#d9dee2",
                    }}
                  />
                </Column>
              </motion.div>
            </motion.div>
          )} */}

          {/* <div
            style={{ border: "2px solid red", width: "100%", flex: "1" }}
          ></div> */}

          <ResultsWrap
            style={{
              display: "flex",
              // flex: "49%",
              position: "relative",
              flexWrap: "wrap",
              alignItems: "flex-end",
              height: resultsContHeight,
              width: "0px",
              overflow: "hidden",
              paddingLeft: resultsContPadding,
              maxWidth: resultsContWidth,
              // border: "2px solid red",
            }}
            animate={{
              // position: submitHandler ? "relative" : "absolute",
              width: submitHandler ? resultsContWidth : "0px",
            }}
            transition={{ duration: 1 }}
          >
            <ResultsContWrap
              style={{
                position: "relative",
                display: "flex",
                // flex: "49%",
                // marginLeft: "-256px",
                // scaleX: 0,
                width: "100%",
                opacity: 0,
              }}
              animate={{
                // marginLeft: submitHandler ? "0px" : "-256px",
                // scaleX: submitHandler ? 1 : 0,
                opacity: submitHandler ? 1 : 0,
              }}
              transition={{ duration: 1, delay: 1 }}
            >
              <ResultsContainer
                inputFields={inputFields}
                clicked={clicked}
                inputHeight={inputHeight}
                inputWidth={inputWidth}
                inputWidthReverse={inputWidthReverse}
              />
            </ResultsContWrap>
          </ResultsWrap>
        </>
      ) : null}
    </FlexWrap>
  );
};
export default MainContainer;
