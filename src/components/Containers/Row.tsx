import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Row = styled(motion.div)<{
  width?: string;
  padding?: "sm" | "md" | "lg" | string;
  gap?: "sm" | "md" | "lg" | string;
  justify?: "sb" | "fe" | "c";
  align?: "sb" | "fs" | "fe";
}>`
  display: flex;
  position: relative;
  align-items: ${({ align }) =>
    (align === "sb" && "space-between") ||
    (align === "fs" && "flex-start") ||
    (align === "fe" && "flex-end") ||
    (align ? align : "center")};
  //border: 2px solid red;
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
  justify-content: ${({ justify }) =>
    (justify === "sb" && "space-between") ||
    (justify === "fe" && "flex-end") ||
    (justify === "c" && "center") ||
    (justify ? justify : "flex-start")};
`;
