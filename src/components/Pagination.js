import ReactPaginate from "react-paginate";
import styled from "@emotion/styled";
import { theme } from "../theme";
import { useWindowSize } from "../hooks/useWindowSize";

const CustomPagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style-type: none;
  overflow: visible;
  font-size: ${theme.main.fontSizes.md};
  font-weight: ${theme.main.fontWeights.bold};
  li a {
    padding: 0.1rem 1rem;
    cursor: pointer;
    border: 2px solid transparent;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    border-radius: ${theme.main.borderRadius["xl"]};
    border-color: ${theme.main.colors.text};
  }
  li.disabled a {
    visibility: hidden;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const Pagination = (props) => {
  const { width } = useWindowSize();

  return (
    <CustomPagination
      previousLabel={width > theme.main.breakPoints[1] ? "<" : "Prev"}
      nextLabel={width > theme.main.breakPoints[1] ? ">" : "Next"}
      breakLabel="..."
      activeClassName={"active"}
      pageRangeDisplayed={width > theme.main.breakPoints[1] ? 2 : 0}
      marginPagesDisplayed={width > theme.main.breakPoints[1] ? 1 : 0}
      {...props}
    />
  );
};

export default Pagination;
