import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  marginLeft?: string;
  width?: string;
  justify?: "sb" | "fe" | "c";
  align?: "sb" | "fs" | "fe";
  titleOpacity: boolean;
  tooltip?: string;
  toolTipOpacity?: boolean;
  setToolTip: React.Dispatch<React.SetStateAction<string>>;
  setToolTipOpacity: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.div<{
  flex?: string;
  marginLeft?: string;
  width?: string;
  justify?: "sb" | "fe" | "c";
  align?: "sb" | "fs" | "fe";
  opacity?: string;
}>`
  display: flex;
  flex-direction: ${({ flex }) => (flex ? flex : "row")};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "")};
  gap: 4px;
  align-items: ${({ align }) =>
    (align === "sb" && "space-between") ||
    (align === "fs" && "flex-start") ||
    (align === "fe" && "flex-end") ||
    (align ? align : "center")};
  justify-content: ${({ justify }) =>
    (justify === "sb" && "space-between") ||
    (justify === "fe" && "flex-end") ||
    (justify === "c" && "center") ||
    (justify ? justify : "flex-start")};
  min-width: ${({ width }) => (width ? width : "160px")};
  width: ${({ width }) => (width ? width : "160px")};
  opacity: ${({ opacity }) =>
    (opacity === "true" && 1) || (opacity === "false" && 0)};
  @media (max-width: 992px) {
    min-width: fit-content;
    width: fit-content;
    text-align: left;
    margin-left: 14px;
    display: ${({ opacity }) =>
      (opacity === "true" && "flex") || (opacity === "false" && "none")};
  }
`;

const Hint = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  margin-top: 1px;
`;

const TitleTag = ({
  title,
  marginLeft,
  width,
  justify,
  align,
  titleOpacity,
  tooltip,
  setToolTip,
  toolTipOpacity,
  setToolTipOpacity,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseover", () => {
        if (tooltip) {
          setToolTip(tooltip);
        }
        setToolTipOpacity(true);
      });

      ref.current.addEventListener("mouseout", () => {
        setToolTipOpacity(false);
      });
    }
  });

  const Opacity = String(titleOpacity);

  return (
    <Wrapper
      marginLeft={marginLeft}
      width={width}
      justify={justify}
      align={align}
      opacity={Opacity}
    >
      <h3>{title}</h3>
      <Hint ref={ref}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 16 16"
        >
          <path
            id="Subtraction_8"
            data-name="Subtraction 8"
            d="M8,16a8,8,0,1,1,8-8A8.009,8.009,0,0,1,8,16Zm0-5a1,1,0,1,0,1,1A1,1,0,0,0,8,11ZM8,3A1,1,0,0,0,7,4V9A1,1,0,0,0,9,9V4A1,1,0,0,0,8,3Z"
            fill="#6d7378"
          />
        </svg>
      </Hint>
    </Wrapper>
  );
};

export default TitleTag;
