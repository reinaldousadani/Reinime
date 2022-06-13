import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";
import { theme } from "../theme";

const BannerBackground = styled.div`
  width: 100%;
  aspect-ratio: ${({ width }) =>
    width > theme.main.breakPoints[1] ? "3/1" : "2/1"};
  border-radius: ${theme.main.borderRadius["2xl"]};
  overflow: hidden;
  background-image: ${({ imgSrc }) => (imgSrc ? `url("${imgSrc}")` : "")};
  background-size: cover;
  background-position: center;
`;

const Banner = ({ loading = false, imgSrc = "a", width = 0 }) => {
  if (!imgSrc && !loading) return null;
  if (loading)
    return (
      <Skeleton
        style={{
          width: "100%",
          aspectRatio: width > theme.main.breakPoints[1] ? "3/1" : "2/1",
          borderRadius: theme.main.borderRadius["2xl"],
        }}
      />
    );
  return <BannerBackground width={width} imgSrc={imgSrc} />;
};

export default Banner;
