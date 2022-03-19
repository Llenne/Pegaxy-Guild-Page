import {Box, Card, CardHeader} from "@mui/material"
import {ProfitShareBucketsData} from "./RentingSummary";
import {RentModes} from "../../../../interfaces/game-services";
import {FC, useEffect, useState} from "react";
import {ApexOptions} from "apexcharts";
import {useTheme} from "@mui/material/styles";
import {Scrollbar} from "../../../layout/scrollbar/Scrollbar";
import {Loading} from "../../../utils/Loading";
import Chart from "react-apexcharts";

interface RentingBucketsChartCardProps {
    title: string
    type: RentModes
    buckets: Array<ProfitShareBucketsData>
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
            },
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 1
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            categories: [''],
            labels: {
                show: false
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
            y: {
                formatter: (val: number, opts?: any): string => {
                    return Number(val.toFixed(0)).toLocaleString()
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            showForSingleSeries: true,
            position: 'top',
            horizontalAlign: 'left',
            offsetX: -10,
            offsetY: 30,
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
                shadeIntensity: 0.5
            }
        },
        grid: {
            show: false
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            formatter: function (val, { seriesIndex } ) {
                const percentValue = `${Number(val).toFixed(1)}%`;
                return `${percentValue}`
            },
        }
    }
}

const getFormattedLabel = (type: RentModes, value: number) => {
    switch (type) {
        case RentModes.ShareProfit:
            return `${100 - value}% - ${value}%`;
        case RentModes.PayRentFee:
            return `${value} PGX`
        default:
            return '';
    }
}

export const RentingBucketsChartCard: FC<RentingBucketsChartCardProps> = ({
    title,
    type,
    buckets
}) => {
    const theme = useTheme();

    const [internalLoading, setInternalLoading] = useState<boolean>(false);
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});
    const [chartSeries, setChartSeries] = useState<any>([]);

    useEffect(() => {
        setInternalLoading(true)

        let series: Array<any> = [];
        let labels: Array<string> = [];

        for (let i = 0; i < buckets.length; i++) {
            labels.push(
                getFormattedLabel(type, buckets[i].bucket)
            )
            series.push({
                name: getFormattedLabel(type, buckets[i].bucket),
                data: [buckets[i].total]
            })
        }

        const chartOptions = getChartOptions(theme, labels, series)
        setChartSeries(series);
        setChartOptions(chartOptions);
        setTimeout(() => {
            setInternalLoading(false)
        }, 100)
    }, [buckets, theme.palette.mode])

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
            }}
        >
            <Card sx={{ boxShadow: 10 }}>
                <CardHeader
                    sx={{ pb: 0 }}
                    title={title}
                />
                <Scrollbar>
                    <Box
                        sx={{
                            px: 2,
                            maxHeight: 175,
                            overflowY: 'hidden'
                        }}
                    >
                        {
                            internalLoading ? (
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
