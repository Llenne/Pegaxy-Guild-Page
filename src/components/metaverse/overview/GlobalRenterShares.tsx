import {FC, useEffect, useState} from "react";
import {ApexOptions} from "apexcharts";
import {Box, Card, CardHeader} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Loading} from "../../utils/Loading";
import Chart from "react-apexcharts";
import {Scrollbar} from "../../layout/scrollbar/Scrollbar";

interface GlobalRenterSharesProps {
    data: Array<any>,
    labels: Array<string>,
    loading: boolean
}

const getChartOptions = (theme: any, labels: Array<string>, dataset: Array<any>): ApexOptions => {
    return {
        chart: {
            background: 'transparent',
            type: 'bar',
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false
            },
            offsetX: -15,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '50%',
                dataLabels: {
                    hideOverflowingLabels: true
                }
            },
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 1
        },
        xaxis: {
            type: 'category',
            categories: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            tickAmount: 10,

            axisBorder: {
                show: false
            },
            axisTicks: {
                show: true
            },
            labels: {
                show: true
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
            labels: {
                show: false,
                style: {
                    colors: theme.palette.text.secondary
                },
            }
        },
        tooltip: {
            x: {
                show: false,
                formatter: (val: number, opts?: any): string => {
                    return val + '%'
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: -10,
            offsetY: 15,
            labels: {
                colors: theme.palette.text.secondary
            }
        },
        theme: {
            mode: theme.palette.mode,
            monochrome: {
                enabled: true,
                color: theme.palette.info.dark,
                shadeTo: 'dark',
                shadeIntensity: 0.75
            }
        },
        grid: {
            show: true,
            borderColor: theme.palette.text.secondary,
            xaxis: {
                lines: {
                    show: true
                }
            },
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            formatter: function (val, opts ) {
                const percentValue = `${Number(val).toFixed(0)}%`;
                if (Number(val) < 3) return '';
                return `${percentValue}`
            },
        },
    }
}

export const GlobalRenterShares: FC<GlobalRenterSharesProps> = ({ data, labels, loading }) => {
    const theme = useTheme();

    const [internalLoading, setInternalLoading] = useState<boolean>(false);
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});
    const [chartSeries, setChartSeries] = useState<any>([]);

    useEffect(() => {
        setInternalLoading(true)
        const chartOptions = getChartOptions(theme, labels, data)
        setChartSeries(data);
        setChartOptions(chartOptions);
        setTimeout(() => {
            setInternalLoading(false)
        }, 100)
    }, [data, labels, theme.palette.mode])

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
                    sx={{ pb: 0 }}
                    title={"Global Renter Shares"}
                />
                <Scrollbar>
                    <Box
                        sx={{
                            px: 2,
                            py: 1,
                            maxHeight: 225,
                            minWidth: 700,
                            overflowY: 'hidden'
                        }}
                    >
                        {
                            loading || internalLoading ? (
                                <Box
                                    sx={{
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
                                    height={200}
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
