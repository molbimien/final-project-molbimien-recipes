import * as React from "react";
import styled from 'styled-components';

// importing material UI components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FaceIcon from '@mui/icons-material/Face';
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/material";

const HeaderContainer = styled.div`
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
    position: static;
    background-color: #DB398D;
    color: #fff;
`

const Header = () => {
    return (
        <HeaderContainer>
            <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar>
                {/*Inside the IconButton, we
                can render various icons*/}
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                > */}
                    {/*This is a simple Menu
                    Icon wrapped in Icon */}
                    {/* <MenuIcon />
                </IconButton> */}
                {/* The Typography component applies
                default font weights and sizes */}

                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 1 }}>
                    Molbimiens skafferi
                </Typography>
                <Button color="inherit">
                    <FaceIcon />
                </Button>
                </Toolbar>
            </Box>
            </Container>
        </HeaderContainer>
    );
}
export default Header
