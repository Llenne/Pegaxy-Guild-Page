import {Box, Card, Grid, Typography} from "@mui/material";
import {VISIcon} from "../../layout/icons/vis-icon";
import {FC, useEffect} from "react";
import {Loading} from "../../utils/Loading";

interface VISSummaryProps {
    totalVISBurned: number
    totalVISMinted: number
    netVISMintBurn: number
    loading: boolean
}

export const VISSummary: FC<VISSummaryProps> = ({ totalVISBurned, totalVISMinted, netVISMintBurn, loading }) => {
    return (
        <Box sx={{
            p: 2,
            pt: 0,
        }}>
            <Grid
                container
                spacing={1}
                flexGrow={1}
            >
                <Grid
                    item
                    flex={1}
                    justifyContent={"center"}
                >
                    <Card sx={{ boxShadow: 10, p: 2, height: '100%' }}>
                        <Box sx={{ mb: 1, textAlign: 'center' }}>
                            <Typography
                                color="textSecondary"
                                sx={{mt: 1}}
                                variant="overline"
                            >
                                Total VIS Minted in Period
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mt: 1,
                                    textAlign: 'center'
                                }}
                            >
                                {
                                    loading ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Loading/>
                                        </Box>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <VISIcon/>
                                            <span style={{ marginLeft: 6 }}>{totalVISMinted.toLocaleString()}</span>
                                        </div>
                                    )
                                }
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid
                    item
                    flex={1}
                >
                    <Card sx={{ boxShadow: 10, p: 2, height: '100%' }}>
                        <Box sx={{ mb: 1, textAlign: 'center' }}>
                            <Typography
                                color="textSecondary"
                                sx={{mt: 1, mb: 2}}
                                variant="overline"
                            >
                                Total VIS Burned in Period
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mt: 1,
                                    textAlign: 'center'
                                }}
                            >
                                {
                                    loading ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Loading/>
                                        </Box>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <VISIcon/>
                                            <span style={{ marginLeft: 6 }}>{totalVISBurned.toLocaleString()}</span>
                                        </div>
                                    )
                                }
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid
                    item
                    flex={1}
                >
                    <Card sx={{ boxShadow: 10, p: 2, height: '100%' }}>
                        <Box sx={{ mb: 1, textAlign: 'center' }}>
                            <Typography
                                color="textSecondary"
                                sx={{mt: 1, mb: 2}}
                                variant="overline"
                            >
                                VIS % Burned in Period
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mt: 1,
                                    textAlign: 'center',
                                }}
                            >
                                {
                                    loading ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Loading/>
                                        </Box>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <VISIcon/>
                                            <span style={{ marginLeft: 6 }}>{((totalVISBurned / totalVISMinted) * 100).toFixed(0) + '%'}</span>
                                        </div>
                                    )
                                }
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
