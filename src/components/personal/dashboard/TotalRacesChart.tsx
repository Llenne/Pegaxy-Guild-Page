import { Box, Card, CardHeader, Divider, IconButton, Typography } from '@mui/material';
import {useTheme} from "@mui/material/styles";
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import {FC} from "react";

const data = {
    series: [
        {
            color: '#C9B037',
            data: 100,
            name: 'Gold'
        },
        {
            color: '#D7D7D7',
            data: 100,
            name: 'Silver'
        },
        {
            color: '#AD8A56',
            data: 100,
            name: 'Bronze'
        }
    ]
};

interface TotalRacesChartSerie {
    color: string;
    data: number;
    name: string;
}

interface TotalRacesChartDataset {
    series: Array<TotalRacesChartSerie>
}

interface TotalRacesChartProps {
    data?: TotalRacesChartDataset
}

export const TotalRacesChart: FC<TotalRacesChartProps> = () => {
    const theme = useTheme();

    const chartOptions: ApexOptions = {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        colors: data.series.map((item) => item.color),
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        labels: data.series.map((item) => item.name),
        legend: {
            show: false
        },
        stroke: {
            show: false
        },
        theme: {
            mode: theme.palette.mode
        }
    };

    const chartSeries = data.series.map((item) => item.data);

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                p: 2
            }}
        >
            <Card sx={{ boxShadow: 10 }}>
                <Box
                    sx={{
                        p: 4,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        color="textPrimary"
                        component="h2"
                        variant="h6"
                    >
                        Total Races
                    </Typography>
                    <Typography
                        color="textPrimary"
                        component="h2"
                        variant="h5"
                    >
                        1,000,000
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Chart
                        height={150}
                        options={chartOptions}
                        series={chartSeries}
                        type="donut"
                    />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex' }}>
                    {data.series.map((item) => (
                        <Box
                            key={item.name}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                                justifyContent: 'center',
                                px: 2,
                                py: 3,
                                textAlign: 'center',
                                '&:not(:last-of-type)': {
                                    borderRight: 1,
                                    borderColor: 'divider'
                                }
                            }}
                        >
                            <Typography variant="h5">
                                {item.data}
                                %
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="overline"
                            >
                                {item.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Card>
        </Box>
    )
}
