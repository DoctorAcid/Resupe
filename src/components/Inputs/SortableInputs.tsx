import { FC } from "react";
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
  position: absolute;
  right: 0;
  opacity: 0;
  padding: 0 32px;
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
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
    height: "100%",
  };

  const removeVisibility = (id: number) => {
    console.log("Remove clicked");
    setInputFields(
      inputFields.map((index) => {
        if (index.id === id) {
          return { ...index, isVisible: false };
        }
        return index;
      })
    );
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <InputContaner
        className="input"
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
        <motion.div
          {...listeners}
          style={{
            width: "16px",
            height: "24px",
            position: "absolute",
            right: "8px",
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
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="15"
            viewBox="0 0 8 15"
          >
            <g
              id="Group_2"
              data-name="Group 2"
              transform="translate(-1664 -401)"
            >
              <circle
                id="Ellipse_8"
                data-name="Ellipse 8"
                cx="1.5"
                cy="1.5"
                r="1.5"
                transform="translate(1664 401)"
                fill="#d9dee2"
              />
              <circle
                id="Ellipse_14"
                data-name="Ellipse 14"
                cx="1.5"
                cy="1.5"
                r="1.5"
                transform="translate(1664 407)"
                fill="#d9dee2"
              />
              <circle
                id="Ellipse_17"
                data-name="Ellipse 17"
                cx="1.5"
                cy="1.5"
                r="1.5"
                transform="translate(1669 404)"
                fill="#d9dee2"
              />
              <circle
                id="Ellipse_16"
                data-name="Ellipse 16"
                cx="1.5"
                cy="1.5"
                r="1.5"
                transform="translate(1664 413)"
                fill="#d9dee2"
              />
              <circle
                id="Ellipse_18"
                data-name="Ellipse 18"
                cx="1.5"
                cy="1.5"
                r="1.5"
                transform="translate(1669 410)"
                fill="#d9dee2"
              />
            </g>
          </svg>
        </motion.div>
        <DeleteButton
          onClick={() => removeVisibility(id)}
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
      </InputContaner>
    </div>
  );
};

export default SortableInputs;
