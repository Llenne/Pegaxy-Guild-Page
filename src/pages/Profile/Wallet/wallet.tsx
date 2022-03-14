import {Box, Button, Container, Grid, Card, TextField, Theme, Typography, useMediaQuery} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useWeb3React} from "@web3-react/core";
import { GuildInvitation } from "../../../components/profile/wallet/GuildInvitation";

export const Wallet: FC = () => {
    
    const { account: metamaskAccount } = useWeb3React();

    return (
        <>
            <Helmet>
                <title>Wallet Profile | Pegaxy</title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 6
                }}
            >
                <Container
                    maxWidth={"lg"}
                    sx={{
                        display: metamaskAccount ? 'block' : 'flex',
                        height: metamaskAccount ? 'auto' : 'calc(100vh - 180px)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {
                        metamaskAccount ? (
                            <>
                                <Box sx={{ mb: 2 }}>
                                    <Grid
                                        container
                                        justifyContent="space-between"
                                        spacing={3}
                                    >
                                        <Grid item>
                                            <Typography variant="h4">
                                                Wallet Profile
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',boxShadow: 10,mb: 2, py: 3, px: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item md={5}>
                                            <TextField
                                            id="wallet-address"
                                            label="Wallet Address"
                                            value="0x3aCD628eb165b1A8734C6DbDDFad1F563b1Bac22"
                                            fullWidth
                                            disabled
                                            />
                                        </Grid>
                                        <Grid item md={5}>
                                            <TextField
                                            id="guild-name"
                                            label="Guild Name"
                                            value="Real Deal Guild"
                                            fullWidth
                                            disabled
                                            />
                                        </Grid>
                                        <Grid item md={2}>
                                            <TextField
                                            id="pega-count"
                                            label="Number of Pegas"
                                            value="54"
                                            fullWidth
                                            disabled
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                                <GuildInvitation/>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        maxWidth: 400,
                                        textAlign: 'center',
                                        mb: 3
                                    }}
                                >
                                    You need to connect your Polygon account to access this page
                                </Typography>
                            </Box>
                        )
                    }
                </Container>
            </Box>
        </>
    )
}