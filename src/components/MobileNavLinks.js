import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { theme } from "../theme";
import NavLink from "./NavLink";

const Hamburger = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  cursor: pointer;
  z-index: 1001;
  span {
    position: absolute;
    background-color: ${theme.main.colors.text};
    height: 4px;
    width: 100%;
    transition: ease-in-out 0.2s;
    border-radius: 25px;
  }

  span:nth-of-type(1) {
    ${({ menuActive }) =>
      menuActive
        ? "top: 50%;transform: translateY(-50%) rotate(45deg);"
        : "top: 0;"}
  }

  span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    width: ${({ menuActive }) => (menuActive ? "0%" : "100%")};
  }

  span:nth-of-type(3) {
    ${({ menuActive }) =>
      menuActive
        ? "bottom: 50%;transform: translateY(50%) rotate(-45deg);"
        : "bottom: 0; width: 75%"}
  }
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background: ${theme.main.colors.background};
  transform: translateY(${({ menuActive }) => (menuActive ? "0%" : "-100%")});
  z-index: 1000;
  transition: ease-in-out 0.2s;
`;

const MobileNavLinks = () => {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuActive(false);
  }, [location]);

  return (
    <>
      <Hamburger
        menuActive={menuActive}
        onClick={() => setMenuActive(!menuActive)}
      >
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      <Menu menuActive={menuActive}>
        <NavLink to="/" text="Home" />
        <NavLink to="collections" text="Collections" />
      </Menu>
    </>
  );
};

export default MobileNavLinks;
