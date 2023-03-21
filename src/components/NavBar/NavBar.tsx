import React from "react";
import styled from "styled-components";

const NavWrap = styled.div`
  display: flex;
  width: 100%;
  height: 96px;
  gap: 2px;
  position: absolute;
  align-items: center;
  left: 0;
  top: 0;
  padding: 0 64px;
  z-index: 2;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.25) 100%
  );

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const NavBar = () => {
  return (
    <NavWrap>
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            id="Subtraction_7"
            data-name="Subtraction 7"
            d="M32,32H0V0H32V7.411H22.95V24.588l-3.484-5.448c-.012-.019-1.247-1.943-2.414-2.273a6.121,6.121,0,0,0,1.955-.908,4.677,4.677,0,0,0,1.33-1.4,4.346,4.346,0,0,0,.6-2.275c0-4.021-3.228-4.865-5.935-4.865-2.485,0-5.047,0-6.353,0H8.569V24.588h3.777V17.978H13.56a.341.341,0,0,1,.061,0c.221,0,1.018.132,2.009,1.837,1.016,1.747,2.436,4.074,2.848,4.745l.02.032H32V32Zm0-10.549H26.721V17.529H32v3.922ZM14.419,15.088c-.046,0-.077,0-.088,0H12.416V10.319H14.33a3.179,3.179,0,0,1,1.978.761,1.994,1.994,0,0,1,.55,1.477A2.336,2.336,0,0,1,14.419,15.088ZM32,14.391H26.721V10.556H32v3.835Z"
            fill="#6D7378"
          />
        </svg>
      </>
      <h1>supe</h1>
    </NavWrap>
  );
};

export default NavBar;
