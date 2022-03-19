import {Box, Container, Grid, Typography} from "@mui/material";
import React, {FC} from "react";
import {Helmet} from "react-helmet";


export const NoMatchPage: FC = () => {
    return (
        <>
            <Helmet>
                <title>404 | Pegaxy Apollo</title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <Container maxWidth={"xl"}>
                    <Box sx={{ mb: 4 }}>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Grid item>
                                <Typography variant="h4">
                                    404
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
