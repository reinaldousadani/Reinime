import styled from "@emotion/styled";
import NavLink from "./NavLink";

const NavContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const WebNavLinks = () => {
  return (
    <NavContent>
      <NavLink to="collections" text="Collections" />
    </NavContent>
  );
};

export default WebNavLinks;
