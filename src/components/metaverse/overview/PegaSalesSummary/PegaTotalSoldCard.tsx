import {Box, Divider, Typography} from "@mui/material";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import Chart from 'react-apexcharts';
import {FC, useEffect, useState} from "react";
import {Loading} from "../../../utils/Loading";

interface PegaTotalSoldCardData {
    dataset: Array<number>
    total: number
}

interface PegaTotalSoldCardProps {
    data: PegaTotalSoldCardData;
    labels: Array<string>;
    loading: boolean;
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
                offsetX: -10,
                style: {
                    colors: theme.palette.text.secondary
                }
            }
        },
        tooltip: {
            y: {
                formatter: (val: number, opts?: any): string => {
                    return val.toLocaleString()
                }
            }
        }
    }
}

export const PegaTotalSoldCard: FC<PegaTotalSoldCardProps> = ({ data, labels, loading }) => {
    const theme = useTheme();

    const [internalLoading, setInternalLoading] = useState<boolean>(false);
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});
    const [chartSeries, setChartSeries] = useState<any>([]);

    useEffect(() => {
        setInternalLoading(true)
        const chartOptions = getChartOptions(theme, labels)
        setChartSeries(data.dataset);
        setChartOptions(chartOptions);
        setTimeout(() => {
            setInternalLoading(false)
        }, 100)
    }, [data, labels, theme.palette.mode])

    return (
        <>
            <Box sx={{ mb: 1, textAlign: 'left' }}>
                <Typography
                    color="textSecondary"
                    sx={{mt: 1}}
                    variant="overline"
                >
                    Sold Pega
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
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                { data.total?.toLocaleString() }
                            </Typography>
                            {/*<Typography*/}
                            {/*    color="green"*/}
                            {/*    variant="h5"*/}
                            {/*>*/}
                            {/*    <Box sx={{ display: 'flex', alignItems: 'center' }}>*/}
                            {/*        <ArrowUpwardIcon/>*/}
                            {/*        <span>20%</span>*/}
                            {/*    </Box>*/}
                            {/*</Typography>*/}
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
