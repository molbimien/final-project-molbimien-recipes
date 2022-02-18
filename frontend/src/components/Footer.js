import React from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

const Footer = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        bottom: "0",
        p: 2,
        bgcolor: "secondary.dark",
        color: "secondary.contrastText",
        position: {
          sx: "relative",
          xl: "absolute",
        },
      }}
    >
      <Box>Molbimien Solutions &trade; {new Date().getFullYear()}</Box>
    </Container>
  );
};

export default Footer;
