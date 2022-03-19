import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

import {useTheme} from "@mui/material/styles";
import {Box, Card, CardHeader} from "@mui/material";
import {Scrollbar} from "../../layout/scrollbar/Scrollbar";
import {FC, useEffect, useState} from "react";
import {Loading} from "../../utils/Loading";

interface VISMintBurnRatioProps {
    datasets: Array<any>,
    labels: Array<string>,
    loading: boolean,
}

const getChartOptions = (theme: any, labels: Array<string>): ApexOptions => {
    return {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        colors: ['#1f87e6', '#ff5c7c'],
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 2
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        legend: {
            show: true,
            position: 'top',
            labels: {
                colors: theme.palette.text.secondary
            }
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 2
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
            categories: labels,
            labels: {
                offsetY: 5,
                style: {
                    colors: theme.palette.text.secondary
                }
            },
            tickAmount: 7,
        },
        // @ts-ignore
        yaxis: {
            labels: {
                offsetX: -10,
                style: {
                    colors: theme.palette.text.secondary
                },
                formatter: (val: number, opts?: any): string | string[] => {
                    return val.toLocaleString()
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

export const VISMintBurnRatio: FC<VISMintBurnRatioProps> = ({ datasets, labels, loading }) => {
    const theme = useTheme();

    const [internalLoading, setInternalLoading] = useState<boolean>(false);
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});
    const [chartSeries, setChartSeries] = useState<any>([]);

    useEffect(() => {
        setInternalLoading(true)
        const chartOptions = getChartOptions(theme, labels)
        setChartSeries(datasets);
        setChartOptions(chartOptions);
        setTimeout(() => {
            setInternalLoading(false)
        }, 100)

    }, [labels, datasets, theme.palette.mode])

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                p: 2,
                pb: 1
            }}
        >
            <Card sx={{ boxShadow: 10 }}>
                <CardHeader
                    title="VIS Mint vs Burn Ratio"
                />
                <Scrollbar>
                    <Box
                        sx={{
                            minWidth: 700,
                            px: 2
                        }}
                    >
                        {
                            loading || internalLoading ? (
                                <Box
                                    sx={{
                                        minHeight: 150,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mb: 10
                                    }}
                                >
                                    <Loading/>
                                </Box>
                            ) : (
                                <Chart
                                    height={375}
                                    options={chartOptions}
                                    series={chartSeries}
                                    type="bar"
                                />
                            )
                        }
                    </Box>
                </Scrollbar>
            </Card>
        </Box>
    )
}
