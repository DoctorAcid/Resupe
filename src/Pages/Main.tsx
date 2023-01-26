import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Column } from "../components/Containers/Column";
import { Row } from "../components/Containers/Row";
import MainContainer from "../components/MainContent/MainContainer";
import NavBar from "../components/NavBar/NavBar";
import "./style.css";
import { motion } from "framer-motion";
import ResultsContainer from "../components/MainContent/ResultsContainer";

const Wrap = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-contect: center;
  align-items: center;
  width: 800px;
  max-width: 90%;
  margin-left: -128px;
  opacity: 0;
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

const LargeButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  border-radius: 64px;
  background-color: #fff;
  border: 2px solid #d9dee2;
  transition: all ease-in 0.3s;
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
  @media (max-width: 742px) {
    padding: 64px 0;
  }
`;

const Content = styled(motion.div)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-top: -48px;
  @media (max-width: 742px) {
    transform: scaleX(0);
  }
`;

const CurrentContent = styled(motion.div)`
  @media (max-width: 742px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const DeleteButton = styled(motion.div)`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  left: 64px;
  background-color: #f1f3f3;
  border-radius: 32px;
  transition: all ease-in 0.3s;
  z-index: 1;

  &:hover {
    background-color: #fff;
  }

  &:hover svg path {
    fill: red;
    transition: all ease-in 0.3s;
  }

  @media (max-width: 742px) {
    position: relative;
    width: 44px;
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

  const [entryInputs, setEntryInputs] = useState([
    { id: 1, name: "input1", isVisible: false },
  ]);

  const [reRender, setReRender] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [clicked, setClicked] = useState(false);
  const [topPosition, setTopPosition] = useState(false);
  const [submitHandler, setSubmitHandler] = useState(false);

  useEffect(() => {
    if (entryInputs.length > 2) {
      setTimeout(() => {
        if (newEntry.current) {
          newEntry.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }
      }, 400);
    }
  }, [entryInputs.length]);

  useEffect(() => {
    if (mainWrap.current) {
      const top = mainWrap.current.offsetHeight;
      if (top > 1080) {
        setTopPosition(true);
      }
      if (top < 1080) {
        setTopPosition(false);
      }
    }
  }, [clicked, reRender]);

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

  const handleEntry = () => {
    setPopupText("Added");

    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 800);

    setEntryInputs([
      ...entryInputs,
      {
        id: entryInputs.length + 1,
        name: "input" + String(entryInputs.length + 1),
        isVisible: true,
      },
    ]);
  };

  const handleSubmit = () => {
    setClicked(true);
    setSubmitHandler(true);

    setPopupText("Submited");

    setTimeout(() => {
      setClicked(false);
    }, 800);

    if (submitingText.current) {
      submitingText.current.style.opacity = "0";
    }
  };

  const removeContent = (index: number) => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 800);
    setPopupText("Removed");
    setTimeout(() => {
      setEntryInputs(entryInputs.filter((i) => i.id !== index));
    }, 600);

    setEntryInputs(
      entryInputs.map((input) => {
        if (input.id === index) {
          return { ...input, isVisible: false };
        }
        return input;
      })
    );
  };

  return (
    <Wrap
      style={{
        justifyContent: topPosition ? "flex-start" : "center",
      }}
    >
      <Wrapper
        animate={{ width: submitHandler ? "1600px" : "800px", opacity: "1" }}
        ref={mainWrap}
      >
        <NavBar />
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
                    transform: "scaleX(1)",
                  }}
                >
                  <MainContainer
                    topPosition={reRender}
                    titleOpacity={true}
                    setTopPosition={setReRender}
                  />
                  <motion.div
                    style={{
                      position: "absolute",
                      right: "0",
                      width: "4px",
                      borderRadius: "2px",
                      height: "216px",
                      opacity: 1,
                      zIndex: -1,
                    }}
                    animate={{
                      opacity: submitHandler ? 0 : 1,
                    }}
                    transition={{ delay: 1.7 }}
                  >
                    <motion.div
                      style={{ marginLeft: "-24px" }}
                      animate={{ marginLeft: submitHandler ? "16px" : "-24px" }}
                    >
                      <Column gap="sm">
                        <div
                          style={{
                            width: "4px",
                            height: "48px",
                            borderRadius: "2px",
                            backgroundColor: "#d9dee2",
                          }}
                        />
                        <div
                          style={{
                            width: "4px",
                            height: "104px",
                            borderRadius: "2px",
                            backgroundColor: "#d9dee2",
                          }}
                        />
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

                  <motion.div
                    style={{
                      position: "absolute",
                      width: "0px",
                      height: "216px",
                      right: "-16px",
                      overflow: "hidden",
                    }}
                    animate={{
                      position: submitHandler ? "relative" : "absolute",
                      width: submitHandler ? "512px" : "0px",
                    }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <motion.div
                      style={{
                        position: "relative",
                        width: "512px",
                        marginLeft: "-256px",
                        scaleX: 0,
                      }}
                      animate={{
                        marginLeft: submitHandler ? "0px" : "-256px",
                        scaleX: submitHandler ? 1 : 0,
                      }}
                      transition={{ duration: 1 }}
                    >
                      <ResultsContainer />
                    </motion.div>
                  </motion.div>
                </Content>
              );
            }
            return (
              <Content
                className="content mainContent"
                ref={newEntry}
                animate={{
                  marginTop: index.isVisible ? "0px" : "-64px",
                  scaleX: index.isVisible ? 1 : 0,
                }}
                transition={{
                  delay: index.isVisible ? 0 : 0.3,
                }}
                key={index.id}
              >
                <CurrentContent
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    opacity: 0,
                    marginTop: "-112px",
                    scaleY: 0,
                    top: 0,
                  }}
                  animate={{
                    marginTop: index.isVisible ? "0px" : "-112px",
                    scaleY: index.isVisible ? 1 : 0,
                    padding: index.isVisible ? "48px 0" : "0px",
                    opacity: index.isVisible ? "1" : "",
                  }}
                  transition={{
                    delay: index.isVisible ? 0.3 : 0,
                  }}
                >
                  <MainContainer
                    topPosition={reRender}
                    setTopPosition={setReRender}
                    titleOpacity={false}
                  />
                  <DeleteButton onClick={() => removeContent(index.id)}>
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

        <LargeButton className="addButton" onClick={handleEntry}>
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

        <LargeButton onClick={handleSubmit} className="submitButton">
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

      <Popup animate={{ opacity: clicked ? "1" : "0" }}>
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
    </Wrap>
  );
};

export default Main;
