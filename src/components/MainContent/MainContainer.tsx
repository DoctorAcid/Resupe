import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Column } from "../Containers/Column";
import { Row } from "../Containers/Row";
import { Input } from "../Inputs/inputs";
import SortableInputs from "../Inputs/SortableInputs";
import TitleTag from "../TitleTag/TitleTag";
import { motion } from "framer-motion";
import ResultsContainer from "./ResultsContainer";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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

// const DeleteButton = styled(motion.button)`
//   position: absolute;
//   right: 0;
//   opacity: 0;
//   padding: 0 16px;
//   background-color: transparent;
//   border: none;

//   &:disabled {
//     display: none;
//   }

//   &:hover svg path {
//     fill: red;
//     transition: fill ease-in 0.3s;
//   }
// `;

const MultiInputs = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

const TopSection = styled(motion.div)`
  // flex: 49%;
  // gap: 8px;
  // max-width: 800px;
  // border: 2px solid red;
`;

const FlexWrap = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
  padding-left: 160px;
  @media (max-width: 1280px) {
    flex-direction: column;
  }
  @media (max-width: 992px) {
    padding-left: 0px;
  }
`;

const TitleWrap = styled(motion.div)`
  position: absolute;
  left: -176px;
  @media (max-width: 992px) {
    position: relative;
    left: 0;
  }
`;

const DateField = styled(Column)`
  max-width: 149px;
  @media (max-width: 468px) {
    max-width: 100%;
  }
`;

const ResultsContWrap = styled(motion.div)``;

const ResultsWrap = styled(motion.div)`
  @media (max-width: 1280px) {
    margin-top: -256px;
  }
`;

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
  const topSection = useRef<HTMLDivElement>(null);
  const [inputFields, setInputFields] = useState<InputItems[]>([
    { id: 1, name: "input1", isVisible: true },
  ]);

  const [clicked, setClicked] = useState(false);
  const [inputHeight, setInputHeight] = useState(88);
  const [inputWidth, setInputWidth] = useState("");
  const [inputWidthReverse, setInputWidthReverse] = useState("100%");
  const [toolTip, setToolTip] = useState("");

  useEffect(() => {
    if (toolTip) {
      setToolTipContent(toolTip);
    }
  });

  const addButtonHeight = () => {
    if (inputFields.length === 1) {
      return 104;
    }
    return inputHeight + 56;
  };

  const getNextId = () => {
    let nextId: number = inputFields.length + 1;
    for (let i = 0; i < inputFields.length; i++) {
      if (inputFields[i].id === nextId) {
        nextId++;
        i = -1;
      }
    }
    return nextId;
  };

  const addEntryField = () => {
    let newID = getNextId();
    setInputFields([
      ...inputFields,
      {
        id: newID,
        name: "input" + String(newID),
        isVisible: true,
      },
    ]);
  };

  const inputWidthOrganize = () => {
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
  };

  useEffect(() => {
    inputFields.map((input) => {
      if (!input.isVisible) {
        setTimeout(() => {
          setInputFields(inputFields.filter((i) => i.id !== input.id));
        }, 300);
      }
      return null;
    });
  }, [inputFields]);

  useEffect(() => {
    inputFields.some((index) => {
      if (!index.isVisible) {
        if (inputFields.length === 2) {
          setInputHeight(88);
          setClicked(false);
          setTimeout(() => {
            setInputWidthReverse("100%");
          }, 800);

          if (textArea.current) {
            const inputWidth = textArea.current.offsetWidth;
            const width = String(inputWidth + 52) + "px";
            setInputWidthReverse(width);
          }
        }
      }

      return null;
    });
  }, [inputFields]);

  const handleClick = (entryFieldCallback: () => void) => {
    entryFieldCallback();
    setClicked(true);
    setTopPosition(!topPosition);
    setInputHeight(addButtonHeight);
    inputWidthOrganize();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setInputFields((items) => {
        const oldIndex = items.findIndex((items) => items.id === active.id);
        const newIndex = items.findIndex((items) => items.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <FlexWrap>
      <TopSection
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          gap: "8px",
          maxWidth: "480px",
        }}
        transition={{ delay: submitHandler ? 1 : 0 }}
        ref={topSection}
      >
        <Row gap="sm" justify="fe" align="fe" style={{ flexWrap: "wrap" }}>
          <Row
            className="shiftTitle"
            align="fs"
            gap="md"
            style={{ flex: "1", position: "relative" }}
          >
            {titleSection ? (
              <TitleWrap>
                <TitleTag
                  justify="fe"
                  title="Job Lists"
                  titleOpacity={titleOpacity}
                  tooltip="Just or nothing to say I wrote this text!"
                  setToolTip={setToolTip}
                  setToolTipOpacity={setToolTipOpacity}
                  toolTipOpacity={toolTipOpacity}
                />
              </TitleWrap>
            ) : null}
            <Input placeholder="Your job title..." />
          </Row>

          <Row gap="sm" style={{ flex: "1" }}>
            <DateField gap="sm">
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
            </DateField>

            <DateField gap="sm">
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
            </DateField>
          </Row>
        </Row>

        <Row className="shiftTitle" align="fs" justify="c" gap="md">
          {titleSection ? (
            <TitleWrap>
              <TitleTag
                align="fs"
                title="Tasks, Responsibilities,& Achievements"
                titleOpacity={titleOpacity}
                tooltip="Just or nothing to say I wrote this text!Just or nothing to say I wrote this text!Just or nothing to say I wrote this text!"
                setToolTip={setToolTip}
                setToolTipOpacity={setToolTipOpacity}
                toolTipOpacity={toolTipOpacity}
              />
            </TitleWrap>
          ) : null}
          <Row
            gap="sm"
            animate={{
              justifyContent: clicked ? "flex-start" : "center",
            }}
          >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <MultiInputs
                style={{
                  touchAction: "none",
                }}
                animate={{
                  flexDirection: clicked ? "column" : "row",
                }}
                transition={{ delay: clicked ? 0 : 0.6 }}
                ref={textArea}
              >
                <SortableContext
                  items={inputFields}
                  strategy={verticalListSortingStrategy}
                >
                  <motion.div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      minHeight: "104px",
                      // border: "2px solid red",
                    }}
                    animate={{
                      width: clicked ? inputWidth : inputWidthReverse,
                    }}
                  >
                    {inputFields.map((index) => {
                      // if (inputFields.length > 1) {
                      return (
                        // <InputContaner
                        //   ref={largeInput}
                        //   key={index.id}
                        //   style={{
                        //     height: "0px",
                        //     width: "100%",
                        //   }}
                        //   animate={{
                        //     height: index.isVisible ? "48px" : "0px",
                        //   }}
                        // >
                        <SortableInputs
                          id={index.id}
                          key={index.id}
                          isVisible={index.isVisible}
                          inputFields={inputFields}
                          setInputFields={setInputFields}
                          topPosition={topPosition}
                          setTopPosition={setTopPosition}
                          inputHeight={inputHeight}
                          setInputHeight={setInputHeight}
                          clicked={clicked}
                          placeholder="Tasks..."
                        />
                        // </InputContaner>
                      );
                      // }
                      // return (
                      //   <InputContaner
                      //     ref={largeInput}
                      //     key={index.id}
                      //     style={{
                      //       height: "104px",
                      //       width: "100%",
                      //       border: "2px solid red",
                      //     }}
                      //   >
                      //     <SortableInputs
                      //       id={index.id}
                      //       // key={index.id}
                      //       isVisible={index.isVisible}
                      //       inputFields={inputFields}
                      //       setInputFields={setInputFields}
                      //       topPosition={topPosition}
                      //       setTopPosition={setTopPosition}
                      //       inputHeight={inputHeight}
                      //       setInputHeight={setInputHeight}
                      //       clicked={clicked}
                      //       placeholder="Tasks, responsibilities & achievements"
                      //     />
                      //   </InputContaner>
                      // );
                    })}
                  </motion.div>
                </SortableContext>
              </MultiInputs>
            </DndContext>
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
                onClick={() => handleClick(addEntryField)}
                animate={{
                  height: inputHeight,
                }}
                transition={{ type: "tween" }}
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
            <TitleWrap>
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
            </TitleWrap>
          ) : null}
          <Input placeholder="Brief statment of your role" />
        </Row>
      </TopSection>

      {submitHandler ? (
        <ResultsWrap
          style={{
            display: "flex",
            flex: 0,
            position: "relative",
            flexWrap: "wrap",
            alignItems: "flex-end",
            width: "0%",
            overflow: "hidden",
            maxWidth: "480px",
          }}
          animate={{
            flex: submitHandler ? 1 : 0,
            marginTop: 0,
            width: submitHandler ? "100%" : "0%",
          }}
          transition={{ duration: 1 }}
        >
          <ResultsContWrap
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              opacity: 0,
            }}
            animate={{
              opacity: submitHandler ? 1 : 0,
            }}
            transition={{ duration: 1, delay: 1 }}
          >
            <ResultsContainer
              inputFields={inputFields}
              clicked={clicked}
              inputHeight={inputHeight}
            />
          </ResultsContWrap>
        </ResultsWrap>
      ) : null}
    </FlexWrap>
  );
};
export default MainContainer;
