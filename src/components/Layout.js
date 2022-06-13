import Navbar from "./Navbar";
import Container from "./Container";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
