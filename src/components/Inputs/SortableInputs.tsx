import { FC, useEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LargeInput } from "./inputs";

interface InputItems {
  id: number;
  name: string;
  isVisible: boolean;
}

type Props = {
  id: number;
  isVisible: boolean;
  inputFields: InputItems[];
  setInputFields: React.Dispatch<React.SetStateAction<InputItems[]>>;
  inputHeight: number;
  setInputHeight: React.Dispatch<React.SetStateAction<number>>;
  topPosition: boolean;
  setTopPosition: React.Dispatch<React.SetStateAction<boolean>>;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  // child: React.ReactElement;
};

const InputContaner = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  width: 0;
  height: 0;
  opacity: 1;
`;

const DeleteButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  opacity: 0;
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

const SortableInputs: FC<Props> = ({
  id,
  isVisible,
  inputFields,
  setInputFields,
  inputHeight,
  setInputHeight,
  topPosition,
  setTopPosition,
  clicked,
  setClicked,
}) => {
  const largeInput = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    largeInput.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [clicked]);

  const reduseButtonHeight = () => {
    if (inputFields.length === 2) {
      setInputHeight(88);
      return inputHeight;
    }
    return inputHeight - 56;
  };

  const removeVisibility = (id: number) => {
    setInputFields(
      inputFields.map((index) => {
        if (index.id === id) {
          return { ...index, isVisible: false };
        }
        return index;
      })
    );
  };

  const removeInput = (id: number, callBack: (id: number) => void) => {
    callBack(id);
    setInputHeight(reduseButtonHeight);
    setTopPosition(!topPosition);
    // setClicked(false);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <InputContaner
        className="input"
        ref={largeInput}
        animate={{
          width: isVisible ? "100%" : "0%",
          height: isVisible ? "48px" : "0px",
        }}
        transition={{ type: "tween" }}
      >
        <LargeInput
          animate={{
            padding: isVisible ? "12px 16px" : "0px",
          }}
          placeholder={"Tasks..."}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            padding: "0 8px",
            display: "flex",
            gap: "8px",
          }}
        >
          <DeleteButton
            onClick={() => removeInput(id, removeVisibility)}
            animate={{
              opacity: isVisible ? "1" : "0",
            }}
            style={{
              transition: isVisible ? "all ease-in 1.4s" : "all ease-in 0.1s",
            }}
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

          <motion.div
            {...listeners}
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: "6",
              opacity: 1,
            }}
            animate={{
              opacity: isVisible ? 1 : 0,
            }}
          >
            <svg
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5Z"
                fill="#D9DEE2"
              />
              <path
                d="M8 4.5C8 5.32843 7.32843 6 6.5 6C5.67157 6 5 5.32843 5 4.5C5 3.67157 5.67157 3 6.5 3C7.32843 3 8 3.67157 8 4.5Z"
                fill="#D9DEE2"
              />
              <path
                d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z"
                fill="#D9DEE2"
              />
              <path
                d="M8 10.5C8 11.3284 7.32843 12 6.5 12C5.67157 12 5 11.3284 5 10.5C5 9.67157 5.67157 9 6.5 9C7.32843 9 8 9.67157 8 10.5Z"
                fill="#D9DEE2"
              />
              <path
                d="M3 13.5C3 14.3284 2.32843 15 1.5 15C0.671573 15 0 14.3284 0 13.5C0 12.6716 0.671573 12 1.5 12C2.32843 12 3 12.6716 3 13.5Z"
                fill="#D9DEE2"
              />
            </svg>
          </motion.div>
        </div>
      </InputContaner>
    </div>
  );
};

export default SortableInputs;
