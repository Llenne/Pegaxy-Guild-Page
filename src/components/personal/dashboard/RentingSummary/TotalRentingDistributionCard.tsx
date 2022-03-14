import {Box, Card, Grid, Typography} from "@mui/material";
import {FC} from "react";
import {Loading} from "../../../utils/Loading";

interface TotalRentingDistributionCardProps {
    totalPega: number;
    totalMarketPega: number;
    totalRentedPega: number;
    totalProfitSharePega: number;
    totalPayRentFeePega: number;
    loading: boolean;
}

export const TotalRentingDistributionCard: FC<TotalRentingDistributionCardProps> = ({
    totalPega,
    totalMarketPega,
    totalRentedPega,
    totalProfitSharePega,
    totalPayRentFeePega,
    loading
}) => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
            }}
        >
            <Card sx={{ boxShadow: 10 }}>
                <Box
                    sx={{
                        p: 2,
                        textAlign: 'center',
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
                        Pegas
                    </Typography>
                </Box>
                <Grid
                    alignItems="center"
                    container
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Grid
                        item
                        sx={{
                            minWidth: 150,
                            flex: 1,
                            borderRight: (theme) => (
                                {
                                    md: `1px solid ${theme.palette.divider}`
                                }
                            ),
                            p: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Total Pega
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                loading ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <Typography
                                            variant="h5"
                                        >
                                            { totalPega }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            minWidth: 150,
                            flex: 1,
                            borderRight: (theme) => (
                                {
                                    md: `1px solid ${theme.palette.divider}`
                                }
                            ),
                            p: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Rented Pega
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                loading ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <Typography
                                            variant="h5"
                                        >
                                            { totalRentedPega }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            minWidth: 150,
                            flex: 1,
                            borderRight: (theme) => (
                                {
                                    md: `1px solid ${theme.palette.divider}`
                                }
                            ),
                            p: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Share Profit
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                loading ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <Typography
                                            variant="h5"
                                        >
                                            { totalProfitSharePega }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            minWidth: 150,
                            flex: 1,
                            borderRight: (theme) => (
                                {
                                    md: `1px solid ${theme.palette.divider}`
                                }
                            ),
                            p: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            PGX Fee
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                loading ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <Typography
                                            variant="h5"
                                        >
                                            { totalPayRentFeePega }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            minWidth: 150,
                            flex: 1,
                            p: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            For Sale
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                loading ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <Typography
                                            variant="h5"
                                        >
                                            { totalMarketPega }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}
