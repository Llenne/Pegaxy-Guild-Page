import {Box, CircularProgress} from "@mui/material";

export const Loading = () => {
    return (
        <Box sx={{
            maxWidth: '100%'
        }}>
            <CircularProgress />
        </Box>
    )
}
