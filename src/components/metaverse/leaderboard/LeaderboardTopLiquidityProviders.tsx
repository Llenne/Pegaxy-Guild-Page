import {FC} from "react";
import {
    Box, Button,
    Card,
    CardHeader, Grid, Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Theme,
    Typography, useMediaQuery
} from "@mui/material";
import {Scrollbar} from "../../layout/scrollbar/Scrollbar";
import {Loading} from "../../utils/Loading";
import {VISIcon} from "../../layout/icons/vis-icon";
import useVISPoolLiquidityProviders, {PoolLiquidityProvider} from "../../../hooks/useVISLiquidityProviders";
import {TetherLogo} from "../../layout/icons/tether-icon";
import useTokenLiveData from "../../../hooks/useTokenLiveData";

export const LeaderboardTopLiquidityProviders: FC = () => {
    const { visPrice } = useTokenLiveData();

    const {
        loading,
        totalProviders,
        totalVis,
        totalUsdt,
        totalUsdValue,
        liquidityPositions
    } = useVISPoolLiquidityProviders("0xecf185d8114664e42dae0701eaff1a50a3613a05", visPrice);

    const isXs = useMediaQuery(
        (theme: Theme) => theme.breakpoints.only('xs'),
        {
            noSsr: true
        }
    );

    return (
        <Grid
            container
            spacing={1}
        >
            <Grid
                item
                xs={12}
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
                            VIS / USDT Main Pool Liquidity
                        </Typography>
                        {
                            !isXs ? (
                                <Button
                                    component={"a"}
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://polygonscan.com/address/0xecf185d8114664e42dae0701eaff1a50a3613a05"
                                    sx={{ mt: 1.5 }}
                                >
                                    0xecf185d8114664e42dae0701eaff1a50a3613a05
                                </Button>
                            ) : null
                        }
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
                                Number of L.Providers
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                sx={{ ml: 1 }}
                                            >
                                                { totalProviders }
                                            </Typography>
                                        </Box>
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
                                VIS Pooled
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <VISIcon/>
                                            <Typography
                                                variant="h5"
                                                sx={{ ml: 1 }}
                                            >
                                                { totalVis }
                                            </Typography>
                                        </Box>
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
                                textAlign: 'center',
                                borderRight: (theme) => (
                                    {
                                        md: `1px solid ${theme.palette.divider}`
                                    }
                                ),
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
                                    justifyContent: 'center'
                                }}
                            >
                                {
                                    loading ? (
                                        <Loading/>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <TetherLogo/>
                                            <Typography
                                                variant="h5"
                                                sx={{ ml: 1, mb: 0.5 }}
                                            >
                                                { totalUsdt }
                                            </Typography>
                                        </Box>
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
                                Total USD Value
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                sx={{ ml: 1, mb: 0.5 }}
                                            >
                                                ${ totalUsdValue }
                                            </Typography>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Grid>
                    </Grid>
                    <Button
                        sx={{pl: 2, borderRadius: 0}}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        component={Link}
                        target="_blank"
                        rel="noreferrer"
                        href={"https://kyberswap.com/#/add/0xc2132D05D31c914a87C6611C10748AEb04B58e8F/0xcC1B9517460D8aE86fe576f614d091fCa65a28Fc/0xecf185d8114664e42dae0701eaff1a50a3613a05"}
                    >
                        Add Liquidity
                    </Button>
                </Card>
            </Grid>

            <Grid
                item
                xs={12}
            >
                <Card sx={{ boxShadow: 10 }}>
                    <Box
                        sx={{
                            p: 3
                        }}
                    >
                        <Typography
                            variant={"h6"}
                        >
                            Top 50 VIS/USDT Liquidity Providers
                        </Typography>
                    </Box>
                    {
                        loading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: 100,
                                    width: '100%',
                                    mb: 6
                                }}
                            >
                                <Loading/>
                            </Box>
                        ) : (
                            <Scrollbar>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Position
                                            </TableCell>
                                            <TableCell>
                                                Address
                                            </TableCell>
                                            <TableCell>
                                                Share of Pool
                                            </TableCell>
                                            <TableCell>
                                                VIS Pooled
                                            </TableCell>
                                            <TableCell>
                                                USDT Pooled
                                            </TableCell>
                                            <TableCell>
                                                USD Value
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            liquidityPositions.map((row: PoolLiquidityProvider, index: number) => (
                                                <TableRow
                                                    key={row.publicAddress}
                                                    sx={{
                                                        '&:last-child td': {
                                                            border: 0
                                                        }
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                alignItems: 'center',
                                                                display: 'flex'
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{ ml: 2 }}
                                                                variant="body2"
                                                            >
                                                                {
                                                                    (index + 1) === 1 ? `1 🥇` :
                                                                        (index + 1) === 2 ? `2 🥈` :
                                                                            (index + 1) === 3 ? `3 🥉` :
                                                                                index + 1
                                                                }
                                                                {/*{`${row.publicAddress.substring(0, 6)}...${row.publicAddress.substring(row.publicAddress.length - 6)}`}*/}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                alignItems: 'center',
                                                                display: 'flex'
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{ ml: 2 }}
                                                                variant="body2"
                                                            >
                                                                {row.publicAddress}
                                                                {/*{`${row.publicAddress.substring(0, 6)}...${row.publicAddress.substring(row.publicAddress.length - 6)}`}*/}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography variant="body2" component={"p"} sx={{ mb: 0 }}>
                                                                { row.poolShare } %
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Box sx={{ mr: 1, width: 20, height: 20 }}>
                                                                <VISIcon/>
                                                            </Box>
                                                            <Typography variant="body2" component={"p"} sx={{ mb: 0 }}>
                                                                {row.visBalance}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Box sx={{ mr: 1, width: 20, height: 20 }}>
                                                                <TetherLogo/>
                                                            </Box>
                                                            <Typography variant="body2" component={"p"} sx={{ mb: 0 }}>
                                                                { row.usdtBalance }
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography variant="body2" component={"p"} sx={{ mb: 0 }}>
                                                                ${ row.usdValue }
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        )
                    }
                </Card>
            </Grid>
        </Grid>
    )
}
