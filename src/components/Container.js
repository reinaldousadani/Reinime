import styled from "@emotion/styled";
import { theme } from "../theme";

import { mq } from "../theme";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent;
  padding-left: ${theme.main.padding["4"]};
  padding-right: ${theme.main.padding["4"]};
  padding-top: ${theme.main.padding["4"]};
  padding-bottom: ${theme.main.padding["4"]};
  ${mq[0]} {
    max-width: ${theme.main.breakPoints[0]}px;
    margin: auto;
  }
  ${mq[1]} {
    max-width: ${theme.main.breakPoints[1]}px;
  }
  ${mq[2]} {
    max-width: ${theme.main.breakPoints[2]}px;
  }
  ${mq[2]} {
    max-width: ${theme.main.breakPoints[2]}px;
  }
`;
export default Container;

// {
//     width: "100%",
//     paddingLeft: "10px",
//     paddingRight: "10px",
//     paddingTop: "10px",
//     paddingBottom: "10px",
//     [mq[0]]: {
//       maxWidth: theme.main.breakPoints[0],
//       marginLeft: "auto",
//       marginRight: "auto",
//     },
//     [mq[1]]: {
//       maxWidth: theme.main.breakPoints[1],
//     },
//     [mq[2]]: {
//       maxWidth: theme.main.breakPoints[2],
//     },
//     [mq[3]]: {
//       maxWidth: theme.main.breakPoints[3],
//     },
//   }
