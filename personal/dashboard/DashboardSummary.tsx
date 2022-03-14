import { Box, Card, Grid, Typography } from '@mui/material';
import {VISIcon} from "../../layout/icons/vis-icon";
import {PgxIcon} from "../../layout/icons/pgx-icon";
import {TetherLogo} from "../../layout/icons/tether-icon";
import {FC, useState, useEffect} from "react";
import {useFetch} from "use-http";
import {Loading} from "../../utils/Loading";

interface DashboardSummaryProps {
    address: string
}

export const DashboardSummary: FC<DashboardSummaryProps> = ({ address }) => {

    const { get: getEarningsData, loading: loadingEarningsData, error: errorEarningsData } = useFetch(`${process.env.REACT_APP_BASE_API_URL}/earnings`, {
        loading: true,
        retries: 5,
        cacheLife: 2 * 60000, // 2 minutes
        persist: true
    });

    const [totalPega, setTotalPega] = useState<string>();
    const [visEarned, setVisEarned] = useState<string>();
    const [pgxEarned, setPgxEarned] = useState<string>();
    const [usdtEarned, setUsdtEarned] = useState<string>();

    const getData = async () => {
        const data = await getEarningsData(`/total/user/${address}`);

        if (data) {
            setVisEarned( (data.ownRacedVis + data.renteeVisShare).toLocaleString() );
            setPgxEarned( data.fixedRentalPgx.toLocaleString() );
            setUsdtEarned( data.totalPegaSellUSDT.toLocaleString() );
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                p: 2
            }}
        >
            <Card sx={{ boxShadow: 10 }}>
                <Grid
                    alignItems="center"
                    container
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        md={3}
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
                            Total Pega
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography
                                sx={{ mr: 1 }}
                                variant="h5"
                            >
                                57
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={3}
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
                                    xs: `1px solid ${theme.palette.divider}`
                                }
                            ),
                            p: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            component="h5"
                            gutterBottom
                            variant="overline"
                        >
                            VIS Earned
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                loadingEarningsData ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <VISIcon />
                                        <Typography
                                            sx={{ ml: 1 }}
                                            variant="h5"
                                        >
                                            { visEarned }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={3}
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
                                    sm: 'none',
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
                            PGX Earned
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                loadingEarningsData ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <PgxIcon />
                                        <Typography
                                            sx={{ ml: 1 }}
                                            variant="h5"
                                        >
                                            { pgxEarned }
                                        </Typography>
                                    </>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={3}
                        sm={6}
                        xs={12}
                        sx={{
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
                            USDT Earned
                        </Typography>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {
                                loadingEarningsData ? (
                                    <Loading/>
                                ) : (
                                    <>
                                        <TetherLogo />
                                        <Typography
                                            sx={{ ml: 1, mb: 1 }}
                                            variant="h5"
                                        >
                                            { usdtEarned }
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
