import {FC, useEffect, useState} from "react";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import {Card, Box, Typography} from "@mui/material";
import {Loading} from "../../utils/Loading";
import Chart from "react-apexcharts";

interface VISEarningsChartProps {
    dataset: Array<number>
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

export const VISEarningsChart: FC<VISEarningsChartProps> = ({dataset, labels, loading}) => {
    const theme = useTheme()

    const [internalLoading, setInternalLoading] = useState(false);

    const [chartSeries, setChartSeries] = useState<any>([]);
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});

    useEffect(() => {
        setInternalLoading(true)
        const chartOptions = getChartOptions(theme, labels)
        setChartSeries(dataset);
        setChartOptions(chartOptions);
        setTimeout(() => {
            setInternalLoading(false)
        }, 100)
    }, [dataset, labels, theme.palette.mode]);

    return (
        <Card sx={{ boxShadow: 10, p: 2 }}>
            <Box sx={{ mb: 1, textAlign: 'left' }}>
                <Typography
                    color="textPrimary"
                    sx={{mt: 1}}
                    variant="h6"
                >
                    VIS Earnings
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
                    <Box>
                        <Chart
                            height={200}
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                        />
                    </Box>
                )
            }
        </Card>
    )
}
