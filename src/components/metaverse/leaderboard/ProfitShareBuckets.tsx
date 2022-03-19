import {Box, Card, CardContent, CardHeader, Container, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {ApexOptions} from "apexcharts";
import Chart from 'react-apexcharts';

const data = {
    series: [
        {
            color: '#7783DB',
            label: '1% - 10%',
            data: 37530
        },
        {
            color: '#7BC67E',
            label: '11% - 20%',
            data: 30000
        },
        {
            color: '#FFB547',
            label: '21% - 30%',
            data: 19232
        },
        {
            color: '#F06191',
            label: '31% - 40%',
            data: 7000
        },
        {
            color: '#64B6F7',
            label: '41% - 50%',
            data: 3541
        },
        {
            color: '#455a64',
            label: '51% - 100%',
            data: 1500
        },
    ]
};

export const ProfitShareBuckets = () => {
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
        labels: data.series.map((item) => item.label),
        legend: {
            show: false
        },
        stroke: {
            colors: [theme.palette.background.paper],
            width: 1
        },
        theme: {
            mode: theme.palette.mode
        }
    };

    const chartSeries = data.series.map((item) => item.data);

    return (
        <Card sx={{ boxShadow: 10 }}>
            <CardHeader title="Renter Profit Share Percentages" sx={{ pb: 1, px: 3 }}/>
            <CardContent sx={{ pt: 2 }}>
                <Chart
                    height={260}
                    options={chartOptions}
                    series={chartSeries}
                    type="pie"
                />
                {data.series.map((item) => (
                    <Box
                        key={item.label}
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            p: 1
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: item.color,
                                borderRadius: '50%',
                                height: 8,
                                width: 8
                            }}
                        />
                        <Typography
                            sx={{ ml: 2 }}
                            variant="subtitle2"
                        >
                            {item.label}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography
                            color="textSecondary"
                            variant="subtitle2"
                        >
                            {item.data.toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}
