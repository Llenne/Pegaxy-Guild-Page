import {Box, Button,Stack,Container, Grid, Card, TextField, InputLabel ,Theme, Typography, useMediaQuery} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useWeb3React} from "@web3-react/core";
import {useEagerConnect, useInactiveListener} from "../../../web3/hooks";
import { width } from "@mui/system";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';


export const ApplicationPage: FC = () => {
    
    const { account: metamaskAccount } = useWeb3React();

    return (
        <>
            <Helmet>
                <title>Guild Application | Pegaxy</title>
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
                                <Box sx={{ mb: 4 }}>
                                    <Grid
                                        container
                                        justifyContent="space-between"
                                        spacing={3}
                                    >
                                        <Grid item>
                                            <Typography variant="h4">
                                                Guild Application
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                                    <Grid container spacing={2}>
                                        <Grid item md={6}>
                                            <Card variant="outlined" sx={{p: 4, backgroundColor:'transparent'}}>
                                                <Stack spacing={3}>
                                                    <TextField fullWidth focused label={'Guild Name'}></TextField>
                                                    <TextField fullWidth label={'Guild Founder'}></TextField>
                                                    <TextField fullWidth label={'Pega Count'}></TextField>
                                                    <TextField fullWidth label={'Founder Wallet'}></TextField>
                                                </Stack>
                                            </Card>
                                        </Grid>
                                        <Grid item md={6}>
                                            <Card variant="outlined" sx={{display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4, backgroundColor:'transparent', width: '100%', height: '100%'}}>
                                                <DriveFolderUploadIcon fontSize={"large"} sx={{mb: 2}}/>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                >
                                                    Upload Guild Logo
                                                    <input
                                                        type="file"
                                                        hidden
                                                    />
                                                </Button>
                                            </Card>
                                        </Grid>
                                        <Grid item md={12} sx={{ width: '100%', height: '100%'}}>
                                            <Card variant="outlined" sx={{p: 4, backgroundColor:'transparent'}}>
                                                <Stack direction='row' spacing={2}>
                                                    <TextField fullWidth label={'Facebook'}></TextField>
                                                    <TextField fullWidth label={'Twitter'}></TextField>
                                                    <TextField fullWidth label={'Discord'}></TextField>
                                                    <TextField fullWidth label={'Guild Website'}></TextField>
                                                </Stack>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Box>
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