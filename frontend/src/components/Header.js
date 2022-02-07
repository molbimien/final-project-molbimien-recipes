import * as React from "react";
import { Link as RouterLink } from "react-router-dom"
import { Link } from '@mui/material'
import styled from 'styled-components';

// importing material UI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Container } from "@mui/material";

const HeaderContainer = styled.div`
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
    position: static;
    background-color: #DB398D;
    color: #fff;
    padding-top: 16px;
    padding-bottom: 16px;
`

const Header = () => {
    return (
        <HeaderContainer>
            <Container>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    }}>
                <Link
                    component={RouterLink}
                    to={"/"}
                >
                    <Typography
                        variant="h6"
                        component="div"sx={{ flexGrow: 1 }}
                        color='primary.contrastText'
                    >
                        Molbimiens skafferi
                    </Typography>
                </Link>
                <Button color="inherit">
                    <NoteAddIcon />
                </Button>
            </Box>
            </Container>
        </HeaderContainer>
    );
}
export default Header
