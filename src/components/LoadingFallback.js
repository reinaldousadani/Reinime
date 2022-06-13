import { TailSpin } from "react-loader-spinner";
import styled from "@emotion/styled";
import { theme } from "../theme";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${theme.main.padding[4]};
  margin-bottom: ${theme.main.padding[4]};
`;

const LoadingFallback = ({
  height = "50",
  width = "50",
  color = theme.main.colors.text,
}) => {
  return (
    <Wrapper>
      <TailSpin
        height={height}
        width={width}
        color={color}
        ariaLabel="loading"
      />
    </Wrapper>
  );
};

export default LoadingFallback;
