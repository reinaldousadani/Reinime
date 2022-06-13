import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";
import { theme } from "../theme";
import Button from "./Button";
import React, { useState } from "react";

const Wrapper = styled.div`
  max-width: 100%;
`;

const Description = styled.p`
  font-size: ${theme.main.fontSizes.md};
  line-height: ${theme.main.fontSizes.lg};
  max-height: 100%;
  overflow: hidden;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  ${({ extended }) =>
    !extended
      ? "display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;"
      : ""}
`;

const AnimeDescription = ({ loading = false, description = "" }) => {
  const [extended, setExtended] = useState(false);
  const formatDescriptionText = (desc = "") => {
    if (!desc) return [];
    const regex = /<[^>]*>/gi;
    const splitted = desc.split(regex);
    return splitted;
  };

  const extendables = description.length > 150;

  if (loading) {
    return (
      <Wrapper>
        <Skeleton
          style={{
            height: "100%",
          }}
        />
      </Wrapper>
    );
  }
  if (!description) return null;
  return (
    <Wrapper>
      <Description extended={extended}>
        {formatDescriptionText(description).map((el, idx) => {
          return (
            <React.Fragment key={el + `${idx}`}>
              {el}
              <br></br>
            </React.Fragment>
          );
        })}
      </Description>
      {extendables && (
        <Button type="text" onClick={() => setExtended(!extended)}>
          Show {extended ? "less" : "more"}...
        </Button>
      )}
    </Wrapper>
  );
};

export default AnimeDescription;
