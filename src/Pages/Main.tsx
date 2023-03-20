import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Column } from "../components/Containers/Column";
import { Row } from "../components/Containers/Row";
import MainContainer from "../components/MainContent/MainContainer";
import NavBar from "../components/NavBar/NavBar";
import "./style.css";
import { motion } from "framer-motion";
import ToolTip from "../components/ToolTip";
import { useWindowSize } from "../custom_hooks/useWindowSize";

const Wrap = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  height: max-content;
  width: 100%;
  max-width: 90%;
  margin-left: -128px;
  opacity: 1;
  @media (max-width: 920px) {
    margin-left: -64px;
  }

  @media (max-width: 742px) {
    margin-left: 0px;
    .shiftTitle {
      flex-direction: column;
      gap: 8px;
    }
  }
`;

const LargeButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  border-radius: 64px;
  background-color: #fff;
  border: 2px solid #d9dee2;
  transition: all ease-in 0.3s;
  cursor: pointer;
  &:disabled {
    background-color: #f8f8f8;
    cursor: default;
    &:hover {
      transform: scale(1);
      border: 2px solid #d9dee2;
      background-color: #f8f8f8;
      box-shadow: none;
    }

    &:hover svg path {
      fill: #d9dee2;
    }
  }
  &:hover {
    transform: scale(1.1);
    background-color: #d9dee2;
    box-shadow: 8px 8px 40px 0px #0000000d;
  }

  &:hover svg path {
    fill: #fff;
  }

  @media (max-width: 742px) {
    width: 64px;
    height: 64px;
  }
`;

const BottomSection = styled(Column)`
  position: fixed;
  height: 100%;
  width: fit-content;
  justify-content: space-between;
  right: 0;
  padding: 32px;
  z-index: 2;
  @media (max-width: 1200px) {
    flex-direction: row;
    height: auto;
    width: 100%;
    bottom: 0;
  }

  @media (max-width: 742px) {
    padding: 16px;
  }
`;

const ContentWrap = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 128px 0;
  max-width: 100%;
  @media (max-width: 742px) {
    padding: 64px 0;
  }
`;

const Content = styled(motion.div)`
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  overflow: hidden;
  padding-left: 174px;
  @media (max-width: 742px) {
    padding-left: 0px;
  }
`;

const CurrentContent = styled(motion.div)`
  @media (max-width: 742px) {
    flex-direction: column;
    justify-content: flex-end;
    gap: 32px;
  }
`;

const DeleteButton = styled(motion.div)`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 100%;
  padding: 12px 16px;
  left: -128px;
  border: 2px solid #f1f3f3;
  border-radius: 32px;
  transition: all ease-in 0.3s;
  z-index: 1;

  &:hover {
    background-color: #fff;
    border: 2px solid transparent;
  }

  &:hover svg path {
    fill: red;
    transition: all ease-in 0.3s;
  }

  @media (max-width: 742px) {
    position: relative;
    width: 100%;
    height: 44px;
    left: 0;

    svg {
      width: 14px;
    }
  }
`;

const SubmitTaskText = styled(Column)`
  position: absolute;
  align-items: center;
  bottom: 236px;
  right: 180px;
  width: fit-content;
  transform: rotate(15deg);
  transition: opacity ease-in 0.3s;
  @media (max-width: 742px) {
    display: none;
  }
`;

const AddTaskText = styled(Column)`
  position: absolute;
  opacity: 1;
  top: 50px;
  right: 190px;
  width: fit-content;
  transform: rotate(-35deg);
  transition: opacity ease-in 0.3s;
  @media (max-width: 1200px) {
    right: none;
    left: 24px;
    top: -24px;
    transform: rotate(15deg);
  }
  @media (max-width: 742px) {
    display: none;
  }
`;

const Popup = styled(motion.div)`
  position: fixed;
  bottom: 32px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 8px 18px 8px 16px;
  border-radius: 8px;
  width: max-content;
  background-color: #6d7378;
  color: #fff;
  font-size: 12px;
  box-shadow: 8px 8px 40px 0px #0000000d;
  opacity: 0;
  transition: opacity ease-in 0.6s;
  z-index: 2;
`;

const Main = () => {
  const mainWrap = useRef<HTMLDivElement>(null);
  const newEntry = useRef<HTMLDivElement>(null);
  const addingText = useRef<HTMLDivElement>(null);
  const submitingText = useRef<HTMLDivElement>(null);
  const mainContent = useRef<HTMLDivElement>(null);

  const [entryInputs, setEntryInputs] = useState([
    { id: 1, name: "input1", isVisible: false, isSubmit: false },
  ]);

  const [reRender, setReRender] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popUpOpacity, setPopUpOpacity] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [topPosition, setTopPosition] = useState(false);
  const [resultsContPad, setResultsContPad] = useState("");
  const [toolTipContent, setToolTipContent] = useState("");
  const [toolTipOpacity, setToolTipOpacity] = useState(false);
  const [primaryResultsContWidth, setPrimaryResultsContWidth] =
    useState("512px");
  const [resultsContWidth, setResultsContWidth] = useState("512px");
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width < 1419) {
      setResultsContWidth("565px");
      setPrimaryResultsContWidth("");
      setResultsContPad("174px");
    }
    if (width < 742) {
      setResultsContPad("0px");
    }
    if (width > 1418) {
      setResultsContWidth("512px");
      setPrimaryResultsContWidth("512px");
      setResultsContPad("0px");
    }
  }, [width]);

  useEffect(() => {
    if (mainWrap.current) {
      const top = mainWrap.current.offsetHeight;
      if (height > 940) {
        if (top > 960) {
          setTopPosition(true);
        }
        if (top < 960) {
          setTopPosition(false);
        }
      } else {
        if (top > 600) {
          setTopPosition(true);
        } else setTopPosition(false);
      }
    }
  }, [clicked, reRender, height]);

  useEffect(() => {
    if (entryInputs.length > 1) {
      if (addingText.current) {
        addingText.current.style.opacity = "0";
      }
    }
    if (entryInputs.length === 1) {
      if (addingText.current) {
        addingText.current.style.opacity = "1";
      }
    }
  }, [entryInputs.length]);

  /*---  Styling functions ---*/

  const buttonHint = () => {
    if (addingText.current && submitingText.current) {
      const opacity1: string = window.getComputedStyle(
        addingText.current
      ).opacity;
      const opacity2: string = window.getComputedStyle(
        submitingText.current
      ).opacity;

      if (opacity1 !== "0" || opacity2 !== "0") {
        addingText.current.style.opacity = "0";
        submitingText.current.style.opacity = "0";
      }
    }
  };

  const popUp = (text: string) => {
    setPopUpOpacity(true);

    setPopupText(text);

    setTimeout(() => {
      setPopUpOpacity(false);
    }, 1200);
  };

  const removeContainerVisibility = (index: number) => {
    setEntryInputs(
      entryInputs.map((input) => {
        if (input.id === index) {
          return { ...input, isVisible: false };
        }
        return input;
      })
    );
  };

  const scrollToView = () => {
    if (topPosition) {
      setTimeout(() => {
        newEntry.current?.lastElementChild?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 600);
    }
  };

  /*---  Entry I/O functions ---*/

  const getNextID = () => {
    let nextID: number = entryInputs.length + 1;
    if (entryInputs.some((entryInputs) => entryInputs.id === nextID)) {
      nextID++;
    }
    return nextID;
  };

  const addEntry = () => {
    let id: number = getNextID();
    setEntryInputs([
      ...entryInputs,
      {
        id: id,
        name: `Entry ${String(id)}`,
        isVisible: true,
        isSubmit: false,
      },
    ]);
  };

  const removeEntry = (index: number) => {
    setTimeout(() => {
      setEntryInputs(entryInputs.filter((i) => i.id !== index));
    }, 300);
  };

  const submitEntry = () => {
    setEntryInputs(
      entryInputs.map((input) => {
        return { ...input, isSubmit: true };
      })
    );
  };

  const clickStateHandler = () => {
    setTimeout(() => {
      setClicked(!clicked);
    }, 300);
  };

  /*---  Entry handling functions ---*/

  const handleEntry = (entryCallback: () => void) => {
    entryCallback();
    popUp("Added");
    scrollToView();
    clickStateHandler();
  };

  const handleSubmit = (submitCallback: () => void) => {
    submitCallback();
    popUp("Submited");
    buttonHint();
    clickStateHandler();
  };

  const handleRemove = (index: number, callback: (index: number) => void) => {
    removeContainerVisibility(index);
    callback(index);
    popUp("Removed");
    clickStateHandler();
  };

  return (
    <Wrap
      style={{
        overflowX: "hidden",
        justifyContent: topPosition ? "flex-start" : "center",
      }}
    >
      <NavBar />

      <Wrapper ref={mainWrap}>
        <ContentWrap>
          {entryInputs.map((index, i) => {
            if (index.id === 1) {
              return (
                <Content
                  key={index.id}
                  style={{
                    marginTop: "0px",
                    padding: "48px 0",
                    opacity: 1,
                  }}
                >
                  <MainContainer
                    topPosition={reRender}
                    titleOpacity={true}
                    setTopPosition={setReRender}
                    submitHandler={index.isSubmit}
                    titleSection={true}
                    setToolTipContent={setToolTipContent}
                    setToolTipOpacity={setToolTipOpacity}
                    toolTipOpacity={toolTipOpacity}
                    resultsContPad={resultsContPad}
                    resultsContWidth={primaryResultsContWidth}
                  />
                </Content>
              );
            }
            return (
              <Content
                className="content mainContent"
                id="newEntry"
                ref={newEntry}
                style={{
                  height: "max-content",
                  opacity: 0,
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                animate={{
                  paddingTop: index.isVisible ? "48px" : "0px",
                  paddingBottom: index.isVisible ? "48px" : "0px",
                  opacity: index.isVisible ? 1 : 0,
                }}
                transition={{
                  duration: index.isVisible ? 0.8 : 0.3,
                }}
                key={index.id}
              >
                <CurrentContent
                  ref={mainContent}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    opacity: 0,
                    height: "0%",
                    width: "100%",
                    top: 0,
                  }}
                  animate={{
                    height: index.isVisible ? "max-content" : "0%",
                    opacity: index.isVisible ? 1 : 0,
                  }}
                  transition={{
                    duration: index.isVisible ? 0.8 : 0.3,
                  }}
                >
                  <MainContainer
                    topPosition={reRender}
                    setTopPosition={setReRender}
                    titleOpacity={false}
                    submitHandler={index.isSubmit}
                    titleSection={false}
                    setToolTipContent={setToolTipContent}
                    setToolTipOpacity={setToolTipOpacity}
                    toolTipOpacity={toolTipOpacity}
                    resultsMaxWidth={"562px"}
                    resultsContWidth={resultsContWidth}
                  />
                  <DeleteButton
                    onClick={() => handleRemove(index.id, removeEntry)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="22"
                      viewBox="0 0 18 22"
                    >
                      <path
                        id="Union_11"
                        data-name="Union 11"
                        d="M3.286,22a2,2,0,0,1-2-2V5.5H16.715V20a2,2,0,0,1-2,2ZM12.215,8.893v9.715a.643.643,0,1,0,1.285,0V8.893a.643.643,0,1,0-1.285,0Zm-3.857,0v9.715a.643.643,0,0,0,1.286,0V8.893a.643.643,0,0,0-1.286,0Zm-3.857,0v9.715a.643.643,0,0,0,1.286,0V8.893a.643.643,0,0,0-1.286,0ZM0,4.125v-.75a2,2,0,0,1,2-2H6.429A1.375,1.375,0,0,1,7.8,0H10.2a1.375,1.375,0,0,1,1.375,1.375H16a2,2,0,0,1,2,2v.75Z"
                        fill="#d9dee2"
                      />
                    </svg>
                  </DeleteButton>
                </CurrentContent>
              </Content>
            );
          })}
        </ContentWrap>
      </Wrapper>

      <BottomSection>
        <AddTaskText ref={addingText}>
          <Row gap="4px" justify="c">
            <h3>Click</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                id="Union_6"
                data-name="Union 6"
                d="M-1989,159.826a8,8,0,0,1,8-8,8,8,0,0,1,8,8,8,8,0,0,1-8,8A8,8,0,0,1-1989,159.826Zm1,0a7.008,7.008,0,0,0,7,7,7.009,7.009,0,0,0,7-7,7.008,7.008,0,0,0-7-7A7.008,7.008,0,0,0-1988,159.826Zm6.5,3v-2.5h-2.5v-1h2.5v-2.5h1v2.5h2.5v1h-2.5v2.5Z"
                transform="translate(1989 -151.826)"
                fill="#707070"
              />
            </svg>
            <h3>To</h3>
          </Row>
          <h3>Create Your Second Entry!</h3>
          <Row
            style={{
              position: "absolute",
              width: "fit-content",
              bottom: "0",
              right: "0",
            }}
          >
            <svg
              style={{ position: "absolute", top: "0" }}
              xmlns="http://www.w3.org/2000/svg"
              width="20.127"
              height="37.082"
              viewBox="0 0 20.127 37.082"
            >
              <path
                id="Union_7"
                data-name="Union 7"
                d="M21.308,32.38l1.65,1.072a37.615,37.615,0,0,0,2.219-5.217,19.928,19.928,0,0,0,.4-12.66C23.406,9.156,17.265,4.241,7.32.965l.313-.95C17.9,3.4,24.252,8.526,26.525,15.261a18.354,18.354,0,0,1,.874,7.156,24.268,24.268,0,0,1-1.286,6.171A38.079,38.079,0,0,1,23.8,34l1.7,1.1L21.226,37.1Z"
                transform="translate(-7.32 -0.014)"
                fill="#707070"
              />
            </svg>
          </Row>
        </AddTaskText>

        <LargeButton
          className="addButton"
          onClick={() => handleEntry(addEntry)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="23.999"
            viewBox="0 0 24 23.999"
          >
            <path
              id="Union_4"
              data-name="Union 4"
              d="M10.5,22.5v-9h-9a1.5,1.5,0,1,1,0-3h9v-9a1.5,1.5,0,1,1,3,0v9h9a1.5,1.5,0,0,1,0,3h-9v9a1.5,1.5,0,0,1-3,0Z"
              fill="#d9dee2"
            />
          </svg>
        </LargeButton>

        <SubmitTaskText ref={submitingText}>
          <Row gap="4px" justify="c">
            <h3>Click</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.999"
              height="16"
              viewBox="0 0 15.999 16"
            >
              <path
                id="Union_9"
                data-name="Union 9"
                d="M-2019.723-447.77a8,8,0,0,1,8-8,8,8,0,0,1,8,8,8,8,0,0,1-8,8A8,8,0,0,1-2019.723-447.77Zm1,0a7.008,7.008,0,0,0,7,7,7.008,7.008,0,0,0,7-7,7.008,7.008,0,0,0-7-7A7.008,7.008,0,0,0-2018.723-447.77Zm3.99.176.707-.706,1.418,1.418,3.186-3.187.707.707-3.536,3.535,0,0-.357.357Z"
                transform="translate(2019.723 455.77)"
                fill="#707070"
              />
            </svg>
            <h3>To</h3>
          </Row>
          <h3>Generate Results!</h3>
          <Row
            style={{
              position: "absolute",
              width: "fit-content",
              bottom: "0",
              right: "0",
            }}
          >
            <svg
              style={{ position: "absolute", top: "0" }}
              xmlns="http://www.w3.org/2000/svg"
              width="47.333"
              height="61.486"
              viewBox="0 0 47.333 61.486"
            >
              <path
                id="Union_10"
                data-name="Union 10"
                d="M43.3,59.647a39.958,39.958,0,0,1-11.913-4.918,17,17,0,0,1-6.377-7.1c-2.4-5.2-1.654-11.136-.866-17.426.559-4.458,1.136-9.067.57-13.557-.866-6.859-5.25-11.574-13.03-14.014A38.571,38.571,0,0,0,.043,1.012L0,.013A38.838,38.838,0,0,1,11.956,1.671,22.394,22.394,0,0,1,20.7,6.509a16.094,16.094,0,0,1,5,10.013c.582,4.615,0,9.287-.57,13.806-.769,6.144-1.5,11.947.782,16.882,2.444,5.295,8.055,8.955,17.607,11.462L44,56.615l3.335,3.335-4.46,1.536Z"
                transform="translate(0 0)"
                fill="#707070"
              />
            </svg>
          </Row>
        </SubmitTaskText>

        <LargeButton
          onClick={() => handleSubmit(submitEntry)}
          className="submitButton"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="18"
            viewBox="0 0 24 18"
          >
            <path
              id="Path_9"
              data-name="Path 9"
              d="M2505.751-940.235l-7.821-7.9a1.493,1.493,0,0,1,0-2.1,1.458,1.458,0,0,1,2.076,0l5.744,5.8,13.243-13.372a1.458,1.458,0,0,1,2.076,0,1.493,1.493,0,0,1,0,2.1Z"
              transform="translate(-2497.5 958.235)"
              fill="#d9dee2"
            />
          </svg>
        </LargeButton>
      </BottomSection>

      <Popup animate={{ opacity: popUpOpacity ? "1" : "0" }}>
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
            fill="#f1f3f3"
          />
        </svg>
        Entry {popupText}!
      </Popup>
      <ToolTip text={toolTipContent} active={toolTipOpacity} />
    </Wrap>
  );
};

export default Main;
