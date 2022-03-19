import {Box, Divider, Typography} from "@mui/material";
import {FC, ReactElement, useEffect, useState} from "react";
import {EarningsSummaryData} from "./EarningsSummary";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import {Loading} from "../../../utils/Loading";
import {TetherLogo} from "../../../layout/icons/tether-icon";
import Chart from "react-apexcharts";

interface EarningsChartCardProps {
    title: string
    currencyIcon: ReactElement
    data: EarningsSummaryData
    labels: Array<string>
    loading: boolean
}

const getChartOptions = (theme: any, labels: Array<string>): ApexOptions => {
    return {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            animations: {
                dynamicAnimation: {
                    enabled: true
                }
            }
        },
        colors: [theme.palette.primary.main],
        dataLabels: {
            enabled: false
        },
        fill: {
            gradient: {
                opacityFrom: 0.5,
                opacityTo: 0.1,
                shadeIntensity: 1,
                stops: [0, 100],
                type: 'vertical'
            },
            type: 'gradient'
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 2
        },
        markers: {
            size: 5,
            strokeColors: theme.palette.background.default,
            strokeWidth: 2
        },
        stroke: {
            curve: 'smooth',
        },
        theme: {
            mode: theme.palette.mode
        },
        xaxis: {
            axisBorder: {
                color: theme.palette.divider,
                show: true
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true
            },
            tickAmount: 8,
            categories: labels,
            labels: {
                offsetY: 5,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (value: number) => (value > 1000 ? `${value / 1000}K` : String(value)),
                offsetX: -10,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        },
        tooltip: {
            y: {
                formatter: (val: number, opts?: any): string => {
                    return Number(val.toFixed(0)).toLocaleString()
                }
            }
        }
    }
}

export const EarningsChartCard: FC<EarningsChartCardProps> = ({ title, currencyIcon, data, labels, loading }) => {
    const theme = useTheme()

    const [internalLoading, setInternalLoading] = useState(false);

    const [chartSeries, setChartSeries] = useState<any>([]);
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});

    useEffect(() => {
        setInternalLoading(true)
        const chartOptions = getChartOptions(theme, labels)
        setChartSeries(data.dataset);
        setChartOptions(chartOptions);
        setTimeout(() => {
            setInternalLoading(false)
        }, 100)
    }, [data, labels, theme.palette.mode]);

    return (
        <>
            <Box sx={{ mb: 1, textAlign: 'left' }}>
                <Typography
                    color="textSecondary"
                    sx={{mt: 1}}
                    variant="overline"
                >
                    { title }
                </Typography>
            </Box>
            {
                loading || internalLoading ? (
                    <Box
                        sx={{
                            minHeight: 150,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 4
                        }}
                    >
                        <Loading/>
                    </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2,
                                minHeight: 36
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                { currencyIcon }
                                <Typography
                                    color="textPrimary"
                                    variant="h5"
                                    sx={{
                                        mb: 0.5,
                                        ml: 1
                                    }}
                                >
                                    { data.total?.toLocaleString() }
                                </Typography>
                            </Box>
                        </Box>
                        <Divider/>
                        <Box>
                            <Chart
                                height={200}
                                options={chartOptions}
                                series={chartSeries}
                                type="area"
                            />
                        </Box>
                    </>
                )
            }
        </>
    )
}
