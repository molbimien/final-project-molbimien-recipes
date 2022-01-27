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
                bgcolor: 'text.secondary',
                color: 'text.secondary',
            }}
        >
            <Box>
                Molbimien Solutions &trade; {new Date().getFullYear()}
            </Box>
        </Container>
    )
}

export default Footer