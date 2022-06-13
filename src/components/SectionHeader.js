import styled from "@emotion/styled";
import { theme } from "../theme";

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.main.colors.text};
  margin-bottom: ${theme.main.padding[4]};
`;

export default SectionHeader;
