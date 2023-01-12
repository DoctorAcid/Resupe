import React from "react";
import styled from "styled-components";

export const Column = styled.div<{
  width?: string;
  padding?: "sm" | "md" | "lg" | string;
  gap?: "sm" | "md" | "lg" | string;
  align?: "sb" | "fs" | "fe" | "c";
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //border: 2px solid blue;
  gap: ${({ gap }) =>
    (gap === "sm" && "8px") ||
    (gap === "md" && "16px") ||
    (gap === "lg" && "24px") ||
    (gap ? gap : "")};
  width: ${({ width }) => (width ? width : "100%")};
  padding: ${({ padding }) =>
    (padding === "sm" && "16px") ||
    (padding === "md" && "24px") ||
    (padding === "lg" && "32px") ||
    (padding ? padding : "")};
  align-items: ${({ align }) =>
    (align === "sb" && "space-between") ||
    (align === "fs" && "flex-start") ||
    (align === "fe" && "flex-end") ||
    (align === "c" && "center")};
`;
