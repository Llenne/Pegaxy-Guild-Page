import {Box, Card, Grid} from "@mui/material"
import {FC} from "react";
import {EarningsChartCard} from "./EarningsChartCard";
import {Loading} from "../../../utils/Loading";
import {VISIcon} from "../../../layout/icons/vis-icon";
import {PgxIcon} from "../../../layout/icons/pgx-icon";
import {TetherLogo} from "../../../layout/icons/tether-icon";

export interface EarningsSummaryData {
    dataset: Array<any>
    total: number
}

interface EarningsSummaryProps {
    visEarnedData: EarningsSummaryData
    visEarnedLabels: Array<string>

    pgxEarnedData: EarningsSummaryData
    pgxEarnedLabels: Array<string>

    usdtEarnedData: EarningsSummaryData
    usdtEarnedLabels: Array<string>

    loading: boolean
}

export const EarningsSummary: FC<EarningsSummaryProps> = ({
    visEarnedData,
    visEarnedLabels,
    pgxEarnedData,
    pgxEarnedLabels,
    usdtEarnedData,
    usdtEarnedLabels,
    loading
}) => {


    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                p: 2
            }}
        >
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <Card sx={{ boxShadow: 10, p: 2 }}>
                        {
                            loading ? (
                                <Box
                                    sx={{
                                        minHeight: 150,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mb: 1
                                    }}
                                >
                                    <Loading/>
                                </Box>
                            ) : (
                                <EarningsChartCard
                                    title={"VIS Earned"}
                                    currencyIcon={<VISIcon/>}
                                    data={visEarnedData}
                                    labels={visEarnedLabels}
                                    loading={loading}
                                />
                            )
                        }
                    </Card>
                </Grid>
                <Grid
                    item
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <Card sx={{ boxShadow: 10, p: 2 }}>
                        {
                            loading ? (
                                <Box
                                    sx={{
                                        minHeight: 150,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mb: 1
                                    }}
                                >
                                    <Loading/>
                                </Box>
                            ) : (
                                <EarningsChartCard
                                    title={"PGX Earned"}
                                    currencyIcon={<PgxIcon/>}
                                    data={pgxEarnedData}
                                    labels={pgxEarnedLabels}
                                    loading={loading}
                                />
                            )
                        }
                    </Card>
                </Grid>
                <Grid
                    item
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <Card sx={{ boxShadow: 10, p: 2 }}>
                        {
                            loading ? (
                                <Box
                                    sx={{
                                        minHeight: 150,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mb: 1
                                    }}
                                >
                                    <Loading/>
                                </Box>
                            ) : (
                                <EarningsChartCard
                                    title={"USDT Earned"}
                                    currencyIcon={<TetherLogo/>}
                                    data={usdtEarnedData}
                                    labels={usdtEarnedLabels}
                                    loading={loading}
                                />
                            )
                        }
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
