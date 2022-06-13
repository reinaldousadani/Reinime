import styled from "@emotion/styled";
import React from "react";
import { theme } from "../theme";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.main.padding[2]};
`;

const StyledCollectionCard = styled.div`
  color: ${theme.main.colors.white};
  background-color: ${({ bannerImg }) =>
    !bannerImg
      ? `${theme.main.colors.text}`
      : `${bannerImg.length > 7 ? "" : bannerImg}`};
  background-image: ${({ bannerImg }) => `url("${bannerImg}")`};
  background-size: cover;
  flex: 1;
  aspect-ratio: 3/1;
  border-radius: ${theme.main.borderRadius["2xl"]};
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  padding-top: ${theme.main.padding[4]};
  padding-left: ${theme.main.padding[4]};
  padding-right: ${theme.main.padding[4]};
  padding-bottom: ${theme.main.padding[4]};
  display: flex;
  align-items: flex-end;
`;

const StyledCollectionTitleWrapper = styled.div`
  width: 100%;
`;

const StyledCollectionTitle = styled.p`
  font-size: ${theme.main.fontSizes["2xl"]};
  font-weight: ${theme.main.fontWeights.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const StyledActionWrapper = styled.div`
  position: absolute;
  top: ${theme.main.padding[2]};
  right: ${theme.main.padding[2]};
  display: flex;
  gap: ${theme.main.padding[2]};
`;

const CollectionCard = ({
  title = "",
  bannerImg = "",
  onClick = () => {},
  onRenameClick = () => {},
  onDeleteClick = () => {},
  noAction = false,
}) => {
  return (
    <Wrapper>
      <StyledCollectionCard bannerImg={bannerImg}>
        <Overlay onClick={onClick}>
          {!noAction && (
            <StyledActionWrapper>
              <Button
                onClick={onRenameClick}
                type="text"
                style={{ color: theme.main.colors.white }}
              >
                Rename
              </Button>
              <Button onClick={onDeleteClick} type="danger">
                Delete
              </Button>
            </StyledActionWrapper>
          )}
          <StyledCollectionTitleWrapper>
            <StyledCollectionTitle>{title}</StyledCollectionTitle>
          </StyledCollectionTitleWrapper>
        </Overlay>
      </StyledCollectionCard>
    </Wrapper>
  );
};

export default CollectionCard;
