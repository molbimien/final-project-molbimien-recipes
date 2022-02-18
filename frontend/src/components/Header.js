import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Link, Box, Button, Typography } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  position: static;
  background-color: #db398d;
  color: #fff;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const Header = () => {
  const headingFont = createTheme({
    typography: {
      fontFamily: ["Charmonman"].join(","),
    },
  });

  return (
    <HeaderContainer>
      <Container>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link component={RouterLink} to={"/"}>
            <ThemeProvider theme={headingFont}>
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1 }}
                color="primary.contrastText"
              >
                Molbimiens skafferi
              </Typography>
            </ThemeProvider>
          </Link>
          <Button
            color="inherit"
            component={RouterLink}
            to={"/lagg-till-recept"}
          >
            <NoteAddIcon />
          </Button>
        </Box>
      </Container>
    </HeaderContainer>
  );
};
export default Header;
