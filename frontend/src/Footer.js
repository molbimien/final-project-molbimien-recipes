import { Box } from "@mui/system";
import { Container } from "@mui/material";

const Footer = () => {
    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                position:'absolute',
                bottom:'0px',
                p: 2,
                bgcolor: 'secondary.dark',
                color: 'secondary.contrastText',
            }}
        >
            <Box>
                Molbimien Solutions &trade; {new Date().getFullYear()}
            </Box>
        </Container>
    )
}

export default Footer