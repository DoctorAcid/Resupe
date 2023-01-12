import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { Column } from "../Containers/Column";
import { Row } from "../Containers/Row";
import { Input, LargeInput } from "../Inputs/inputs";
import TitleTag from "../TitleTag/TitleTag";

const AddTasks = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  right: 7px;
  border: 2px solid #d9dee2;
  background-color: #fff;
  padding: 24px 12px;
  border-radius: 24px;
  height: 88px;
  transition: all ease-in 0.3s;
  &:hover {
    border: 2px solid #6d7378;
    background-color: #d9dee2;
    box-shadow: 8px 8px 40px 0px #0000000d;
    transform: scale(1.04);
  }

  &:hover svg path {
    fill: #6d7378;
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  padding: 0 18px;
  right: 0;
  transition: fill ease-in 0.3s;
  &:hover svg path {
    fill: red;
    transition: fill ease-in 0.3s;
  }
`;

const InputContaner = styled(Column)`
  width: 100%;
  transition: all ease-in 0.3s;
`;

const TopSection = styled(Column)`
  gap: 8px;
`;

const MainContainer = () => {
  const addTask = useRef<HTMLDivElement>(null);
  const addButt = useRef<HTMLDivElement>(null);
  const submitText = useRef<HTMLDivElement>(null);
  const submitButt = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLDivElement>(null);
  const largeInput = useRef<HTMLTextAreaElement>(null);
  const addTaskButt = useRef<HTMLDivElement>(null);
  const topSection = useRef<HTMLDivElement>(null);
  const [inputFields, setInputFields] = useState([0]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (textArea.current && clicked && inputFields.length > 2) {
      const height = String(textArea.current.offsetHeight) + "px";
      if (addTaskButt.current) {
        addTaskButt.current.style.height = height;
      }
    }
  });

  useEffect(() => {
    if (largeInput.current) {
      largeInput.current.style.opacity = "1";
    }
  });

  const handleClick = () => {
    setClicked(true);
    setInputFields([...inputFields, inputFields.length]);
    if (inputFields.length > 0) {
      if (textArea.current) {
        textArea.current.style.flexDirection = "column";
        textArea.current.style.gap = "8px";
      }

      if (largeInput.current) {
        largeInput.current.style.height = "48px";
      }

      if (addTaskButt.current) {
        addTaskButt.current.style.position = "relative";
        addTaskButt.current.style.height = "104px";
        addTaskButt.current.style.right = "0";
      }
    }
  };

  useEffect(() => {
    if (addButt.current) {
      addButt.current.addEventListener("mouseover", () => {
        if (addTask.current) {
          addTask.current.style.opacity = "0";
        }
      });

      addButt.current.addEventListener("mouseout", () => {
        if (addTask.current) {
          addTask.current.style.opacity = "1";
        }
      });
    }

    if (submitButt.current) {
      submitButt.current.addEventListener("mouseover", () => {
        if (submitText.current) {
          submitText.current.style.opacity = "0";
        }
      });

      submitButt.current.addEventListener("mouseout", () => {
        if (submitText.current) {
          submitText.current.style.opacity = "1";
        }
      });
    }
  });

  return (
    <TopSection ref={topSection}>
      <Row gap="sm" justify="fe" align="fe" style={{ flexWrap: "wrap" }}>
        <Row className="shiftTitle" align="fs" gap="md" style={{ flex: "1" }}>
          <TitleTag justify="fe" title="Job Lists" />
          <Input placeholder="Job List..." />
        </Row>

        <Row gap="sm" style={{ flex: "1" }}>
          <Column gap="sm">
            <TitleTag title="Start Date" marginLeft="14px" />
            <Input type={"date"} />
          </Column>

          <Column gap="sm">
            <TitleTag title="End Date" marginLeft="14px" />
            <Input className="smallInput" type={"date"} />
          </Column>
        </Row>
      </Row>

      <Row className="shiftTitle" align="fs" justify="c" gap="md">
        <TitleTag align="fs" title="Tasks, Responsibilities,& Achievements" />
        <Row gap="sm">
          <TransitionGroup style={{ width: "100%" }}>
            <Row ref={textArea}>
              {inputFields.map((field, index) => {
                if (index === 0) {
                  return (
                    <InputContaner>
                      <LargeInput
                        ref={largeInput}
                        key={index}
                        placeholder="text here..."
                        style={{
                          height: "104px",
                        }}
                      />
                    </InputContaner>
                  );
                }
                return (
                  <CSSTransition in={clicked} timeout={300} classNames="main">
                    <InputContaner className="content">
                      <LargeInput
                        ref={largeInput}
                        key={index}
                        placeholder="text here..."
                        style={{
                          height: "48px",
                        }}
                      />
                      <DeleteButton>
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
                  </CSSTransition>
                );
              })}
            </Row>
          </TransitionGroup>
          <AddTasks ref={addTaskButt} onClick={handleClick}>
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
        </Row>
      </Row>

      <Row className="shiftTitle" align="fs" gap="md" style={{ flex: "1" }}>
        <TitleTag
          align="fs"
          justify="fe"
          title="A Broad Sentence Describing The Role"
        />
        <Input placeholder="Job List..." />
      </Row>
    </TopSection>
  );
};
export default MainContainer;
