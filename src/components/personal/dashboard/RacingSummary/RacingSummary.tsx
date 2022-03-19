import {Box, Card, Grid, Typography} from "@mui/material"
import {FC} from "react";
import {Loading} from "../../../utils/Loading";

interface RacingSummaryProps {
    totalRaces: number;
    totalGoldRaces: number;
    totalSilverRaces: number;
    totalBronzeRaces: number;
    totalLostRaces: number;
    winRate: string;
    loading: boolean;
}

export const RacingSummary: FC<RacingSummaryProps> = ({
    totalRaces,
    totalGoldRaces,
    totalSilverRaces,
    totalBronzeRaces,
    totalLostRaces,
    winRate,
    loading
}) => {
    return (
        <Box
            sx={{
                p: 2,
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
                        Racing Data Since Ownership
                    </Typography>
                </Box>
                <Grid
                    alignItems="center"
                    container
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        md={2}
                        sm={6}
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
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Total
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
                                            { totalRaces?.toLocaleString() }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={2}
                        sm={6}
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
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Gold
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
                                            { totalGoldRaces?.toLocaleString() }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={2}
                        sm={6}
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
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Silver
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
                                            { totalSilverRaces?.toLocaleString() }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={2}
                        sm={6}
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
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Bronze
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
                                            { totalBronzeRaces?.toLocaleString() }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={2}
                        sm={6}
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
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Lost
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
                                            { totalLostRaces?.toLocaleString() }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={2}
                        sm={6}
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
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h2"
                            gutterBottom
                            variant="overline"
                        >
                            Win Rate
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
                                            { winRate }
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
