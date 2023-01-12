import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Column } from "../components/Containers/Column";
import { Row } from "../components/Containers/Row";
import MainContainer from "../components/MainContent/MainContainer";
import NavBar from "../components/NavBar/NavBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./style.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-contect: center;
  align-items: center;
  width: 800px;
  max-width: 90%;
  opacity: 0;
  transition: opacity ease-in 0.3s;
  @media (max-width: 742px) {
    .shiftTitle {
      flex-direction: column;
      gap: 8px;
    }
  }
`;

const LargeButton = styled.div`
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
    border: 2px solid #6d7378;
  }

  &:hover svg path {
    fill: #6d7378;
  }
`;

const BottomSection = styled(Column)`
  position: absolute;
  height: 100%;
  width: fit-content;
  justify-content: space-between;
  top: 0;
  right: 0;
  padding: 32px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Content = styled.div`
  display: flex;
  transition: all ease-in 0.3s;
`;

const Main = () => {
  const addTask = useRef<HTMLDivElement>(null);
  const addButt = useRef<HTMLDivElement>(null);
  const submitText = useRef<HTMLDivElement>(null);
  const submitButt = useRef<HTMLDivElement>(null);
  const mainWrap = useRef<HTMLDivElement>(null);
  const mainContent = useRef<HTMLDivElement>(null);
  const [entry, setEntry] = useState([0]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (mainWrap.current) {
      mainWrap.current.style.opacity = "1";
    }
  });

  const handleEntry = () => {
    setEntry([...entry, entry.length]);
    setClicked(true);
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
    <Wrapper ref={mainWrap}>
      <NavBar />

      <TransitionGroup>
        <ContentWrap>
          {entry.map((index) => {
            if (index === 0) {
              return (
                <Content>
                  <MainContainer />
                </Content>
              );
            }
            return (
              <CSSTransition
                in={clicked}
                timeout={300}
                classNames="main"
                key={index}
              >
                <Content className="content">
                  <MainContainer />
                </Content>
              </CSSTransition>
            );
          })}
        </ContentWrap>
      </TransitionGroup>

      <BottomSection>
        <Column
          style={{
            position: "absolute",
            opacity: "1",
            top: "50px",
            right: "190px",
            width: "fit-content",
            transform: "rotate(-35deg)",
            transition: "opacity ease-in 0.3s",
          }}
          ref={addTask}
        >
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
        </Column>

        <LargeButton ref={addButt} className="addButton" onClick={handleEntry}>
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

        <Column
          ref={submitText}
          className="submitText"
          align="c"
          style={{
            position: "absolute",
            bottom: "236px",
            right: "180px",
            width: "fit-content",
            transform: "rotate(15deg)",
            transition: "opacity ease-in 0.3s",
          }}
        >
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
        </Column>

        <LargeButton ref={submitButt} className="submitButton">
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
    </Wrapper>
  );
};

export default Main;
