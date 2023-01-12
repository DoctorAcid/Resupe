import React from "react";
import styled from "styled-components";

const NavWrap = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  position: absolute;
  align-items: center;
  top: 0;
  padding: 0 64px;
`;

const NavBar = () => {
  return (
    <NavWrap>
      <h1>Resupe</h1>
    </NavWrap>
  );
};

export default NavBar;
