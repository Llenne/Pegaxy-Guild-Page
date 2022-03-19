import {Box, Button, Container, Grid, Card, TextField, Theme, Typography, useMediaQuery} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useWeb3React} from "@web3-react/core";
import { GuildInvitation } from "../../../components/profile/wallet/GuildInvitation";
import {VISIcon} from "../../../components/layout/icons/vis-icon";
import {TetherLogo} from "../../../components/layout/icons/tether-icon";

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
                                <Grid container spacing={2} mb={2}>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <Card sx={{p: 2, minHeight: 94}}>
                                            <Typography variant='overline'>Wallet Address</Typography>
                                            <Typography variant='caption' component='h5' display='block'>0x3aCD628eb165b1A8734C6DbDDFad1F563b1Bac22</Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <Card sx={{p: 2}}>
                                            <Typography variant='overline'>Guild Status</Typography>
                                            <Typography variant='h5'>Joined</Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <Card sx={{p: 2}}>
                                            <Typography variant='overline'>Guild Name</Typography>
                                            <Typography variant='h5'>Real Deal Guild</Typography>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Box
                                    mb={2}
                                    sx={{
                                        backgroundColor: 'background.default',
                                    }}
                                >
                                    <Card sx={{ boxShadow: 10 }}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                textAlign: (theme) => (
                                                    {
                                                        md: 'center',
                                                        sm: 'left',
                                                        xs: 'left'
                                                    }
                                                ),
                                                borderBottom: (theme) => (
                                                    {
                                                        xs: `1px solid ${theme.palette.divider}`
                                                    }
                                                ),
                                            }}
                                        >
                                            <Typography
                                                variant={"h6"}
                                            >
                                                Liquidity Pooled
                                            </Typography>
                                        </Box>
                                        <Grid
                                            alignItems="center"
                                            container
                                            justifyContent="space-between"
                                        >
                                            <Grid
                                                item
                                                md={4}
                                                sm={12}
                                                xs={12}
                                                sx={{
                                                    borderRight: (theme) => (
                                                        {
                                                            md: `1px solid ${theme.palette.divider}`
                                                        }
                                                    ),
                                                    borderBottom: (theme) => (
                                                        {
                                                            md: 'none',
                                                            sm: `1px solid ${theme.palette.divider}`,
                                                            xs: `1px solid ${theme.palette.divider}`
                                                        }
                                                    ),
                                                    p: 3,
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <Typography
                                                    color="textSecondary"
                                                    component="h2"
                                                    gutterBottom
                                                    variant="overline"
                                                >
                                                    Pega Count
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'flex-start'
                                                    }}
                                                >
                                                <Typography
                                                    variant="h5"
                                                >
                                                   54
                                                </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid
                                                item
                                                md={4}
                                                sm={12}
                                                xs={12}
                                                sx={{
                                                    borderRight: (theme) => (
                                                        {
                                                            md: `1px solid ${theme.palette.divider}`
                                                        }
                                                    ),
                                                    borderBottom: (theme) => (
                                                        {
                                                            md: 'none',
                                                            sm: `1px solid ${theme.palette.divider}`,
                                                            xs: `1px solid ${theme.palette.divider}`
                                                        }
                                                    ),
                                                    p: 3,
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <Typography
                                                    color="textSecondary"
                                                    component="h2"
                                                    gutterBottom
                                                    variant="overline"
                                                >
                                                    VIS Pooled
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'flex-start'
                                                    }}
                                                >
                                                    <VISIcon/>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{ ml: 1}}
                                                    >
                                                         242,856
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                                               
                                            <Grid
                                                item
                                                md={4}
                                                sm={4}
                                                xs={12}
                                                sx={{
                                                    borderRight: (theme) => (
                                                        {
                                                            md: `none`
                                                        }
                                                    ),
                                                    borderBottom: (theme) => (
                                                        {
                                                            md: 'none',
                                                            sm: `1px solid ${theme.palette.divider}`,
                                                            xs: `1px solid ${theme.palette.divider}`
                                                        }
                                                    ),
                                                    p: 3,
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <Typography
                                                    color="textSecondary"
                                                    component="h2"
                                                    gutterBottom
                                                    variant="overline"
                                                >
                                                    USDT Pooled
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'flex-start'
                                                    }}
                                                >
                                                    <TetherLogo/>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{ml: 1}}
                                                    >
                                                         4,500
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Box>


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