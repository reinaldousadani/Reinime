import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";
import { theme } from "../theme";

const Wrapper = styled.div`
  display: flex;
  gap: ${theme.main.padding[2]};
  flex-wrap: wrap;
`;

const Genres = styled.div`
  padding-left: ${theme.main.padding[2]};
  padding-right: ${theme.main.padding[2]};
  padding-top: ${theme.main.padding[1]};
  padding-bottom: ${theme.main.padding[1]};
  border: 2px solid ${theme.main.colors.text};
  border-radius: ${theme.main.borderRadius.full};
`;

const AnimeGenres = ({ loading = false, genres = [] }) => {
  if (loading) return <Skeleton count={2} />;

  if (!genres || genres?.length === 0) return null;
  console.log(genres);
  return (
    <Wrapper>
      {genres.map((el, idx) => (
        <Genres key={el + `${idx}`}>{el}</Genres>
      ))}
    </Wrapper>
  );
};

export default AnimeGenres;
