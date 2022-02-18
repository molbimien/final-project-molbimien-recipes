import React from 'react'
import { Box } from "@mui/system";
import { Container } from "@mui/material";

const Footer = () => {
    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                position:'relative',
                bottom:'0',
                p: 2,
                bgcolor: 'secondary.dark',
                color: 'secondary.contrastText',
                // marginTop: '50px',
            }}
        >
            <Box>
                Molbimien Solutions &trade; {new Date().getFullYear()}
            </Box>
        </Container>
    )
}

export default Footer