import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { Column } from "../Containers/Column";
import { Row } from "../Containers/Row";
import { Input, LargeInput } from "../Inputs/inputs";
import TitleTag from "../TitleTag/TitleTag";

interface InputItems {
  id: number;
  name: string;
  isVisible: boolean;
}

interface Props {
  setTopPosition: React.Dispatch<React.SetStateAction<boolean>>;
  titleOpacity: boolean;
  setMainWrapHeight: React.Dispatch<React.SetStateAction<boolean>>;
}

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
    box-shadow: 8px 8px 40px 0px #0000000d;
  }

  &:hover svg path {
    transition: all ease-in 0.3s;
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
  width: 0;
  transition: all ease-in 0.3s;
`;

const TopSection = styled(Column)`
  gap: 8px;
`;

const MainContainer = ({
  setTopPosition,
  titleOpacity,
  setMainWrapHeight,
}: Props) => {
  const textArea = useRef<HTMLDivElement>(null);
  const largeInput = useRef<HTMLDivElement>(null);
  const addTaskButt = useRef<HTMLDivElement>(null);
  const topSection = useRef<HTMLDivElement>(null);
  const TAWrap = useRef<HTMLDivElement>(null);
  const [inputFields, setInputFields] = useState<InputItems[]>([
    { id: 1, name: "input1", isVisible: false },
  ]);

  const [lInputHeight, setLInputHeight] = useState(true);

  const [inputHeight, setInputHeight] = useState(88);

  function addHeight() {
    if (inputFields.length === 1) {
      return 104;
    }
    return inputHeight + 56;
  }

  function reduseHeight() {
    if (inputFields.length === 2) {
      setLInputHeight(true);
      setInputHeight(88);
      return inputHeight;
    }
    return inputHeight - 56;
  }

  useEffect(() => {
    if (largeInput.current) {
      largeInput.current.style.width = "100%";
    }
  });

  const handleClick = () => {
    setInputHeight(addHeight);

    setLInputHeight(false);

    setInputFields([
      ...inputFields,
      {
        id: inputFields.length + 1,
        name: "input" + (inputFields.length + 1),
        isVisible: true,
      },
    ]);

    if (largeInput.current) {
      largeInput.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }

    if (topSection.current) {
      const position = topSection.current.getBoundingClientRect().top;
      if (position < 160) {
        setMainWrapHeight(true);
      }
    }

    if (inputFields.length === 1) {
      setTimeout(() => {
        if (addTaskButt.current) {
          addTaskButt.current.style.position = "relative";
        }
        if (textArea.current) {
          textArea.current.style.width = "100%";
        }
        if (TAWrap.current) {
          TAWrap.current.style.alignItems = "flex-start";
        }
      }, 600);

      if (addTaskButt.current) {
        addTaskButt.current.style.right = "0";
      }

      if (textArea.current) {
        const inputWidth = textArea.current.offsetWidth;
        const width = String(inputWidth - 52) + "px";
        textArea.current.style.width = width;
        textArea.current.style.flexDirection = "column";
        textArea.current.style.gap = "8xp";
      }
    }
  };

  const removeInput = (index: number) => {
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

    setInputHeight(reduseHeight);

    if (inputFields.length === 2) {
      setLInputHeight(true);
      setInputHeight(88);
    }

    if (topSection.current) {
      const position = topSection.current.getBoundingClientRect().top;
      if (position > 160) {
        setMainWrapHeight(false);
      }
    }

    if (inputFields.length === 2) {
      if (textArea.current) {
        const inputWidth = textArea.current.offsetWidth;
        const width = String(inputWidth) + "px";
        textArea.current.style.width = width;
        setTimeout(() => {
          if (textArea.current) {
            const inputWidth = textArea.current.offsetWidth;
            const width = String(inputWidth + 52) + "px";
            textArea.current.style.width = width;
          }
        }, 0);
      }

      if (addTaskButt.current) {
        addTaskButt.current.style.right = "7px";
      }

      setTimeout(() => {
        if (textArea.current) {
          textArea.current.style.width = "100%";
        }

        if (addTaskButt.current) {
          addTaskButt.current.style.position = "absolute";
        }
      }, 300);

      if (TAWrap.current) {
        TAWrap.current.style.alignItems = "center";
      }
    }
  };

  return (
    <TopSection ref={topSection}>
      <Row gap="sm" justify="fe" align="fe" style={{ flexWrap: "wrap" }}>
        <Row className="shiftTitle" align="fs" gap="md" style={{ flex: "1" }}>
          <TitleTag
            justify="fe"
            title="Job Lists"
            titleOpacity={titleOpacity}
          />
          <Input placeholder="Your job title..." />
        </Row>

        <Row gap="sm" style={{ flex: "1" }}>
          <Column gap="sm">
            <TitleTag
              title="Start Date"
              marginLeft="14px"
              titleOpacity={titleOpacity}
            />
            <Input type={"date"} placeholder="__/__/___" />
          </Column>

          <Column gap="sm">
            <TitleTag
              title="End Date"
              marginLeft="14px"
              titleOpacity={titleOpacity}
            />
            <Input
              className="smallInput"
              type={"date"}
              placeholder="__/__/___"
            />
          </Column>
        </Row>
      </Row>

      <Row className="shiftTitle" align="fs" justify="c" gap="md">
        <TitleTag
          align="fs"
          title="Tasks, Responsibilities,& Achievements"
          titleOpacity={titleOpacity}
        />
        <Row gap="sm" ref={TAWrap}>
          <TransitionGroup style={{ width: "100%" }}>
            <Row
              gap="sm"
              ref={textArea}
              align="fs"
              style={{ transition: "all ease-in 0.3s" }}
            >
              {inputFields.map((index) => {
                if (index.id === 1) {
                  return (
                    <InputContaner
                      ref={largeInput}
                      key={index.id}
                      style={{
                        height: lInputHeight ? "104px" : "48px",
                      }}
                    >
                      <LargeInput
                        placeholder={
                          "Your tasks, responsibilities and achievements..."
                        }
                        style={{
                          height: lInputHeight ? "104px" : "48px",
                        }}
                      />
                    </InputContaner>
                  );
                }
                return (
                  <CSSTransition
                    in={true}
                    timeout={300}
                    classNames="main"
                    key={index.id}
                  >
                    <InputContaner
                      ref={largeInput}
                      className="input"
                      style={{
                        opacity: index.isVisible ? "" : 0,
                        marginTop: index.isVisible ? "0px" : "-48px",
                        width: index.isVisible ? "" : "0px",
                      }}
                    >
                      <LargeInput
                        placeholder={
                          "More tasks, responsibilities and achievements..."
                        }
                        style={{
                          height: "48px",
                        }}
                      />
                      <DeleteButton onClick={() => removeInput(index.id)}>
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
          <AddTasks
            ref={addTaskButt}
            onClick={handleClick}
            style={{ height: inputHeight }}
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
        </Row>
      </Row>

      <Row className="shiftTitle" align="fs" gap="md" style={{ flex: "1" }}>
        <TitleTag
          align="fs"
          justify="fe"
          title="A Broad Sentence Describing The Role"
          titleOpacity={titleOpacity}
        />
        <Input placeholder="Brief statment of your role" />
      </Row>
    </TopSection>
  );
};
export default MainContainer;
