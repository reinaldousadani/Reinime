import { theme } from "../theme";

const NotFoundPage = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: theme.main.colors.text }}>404</h1>
        <p style={{ color: theme.main.colors.text }}>Four oh Four</p>
        <p style={{ color: theme.main.colors.text }}>
          Cant find the page you lookin for
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
