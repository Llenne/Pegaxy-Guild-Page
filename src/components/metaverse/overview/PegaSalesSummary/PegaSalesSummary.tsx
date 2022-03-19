import {FC} from "react";
import {Box, Card, Grid} from "@mui/material";
import {PegaTotalPopulationCard} from "./PegaTotalPopulationCard";
import {PegaSalesVolumeCard} from "./PegaSalesVolumeCard";
import {PegaTotalSoldCard} from "./PegaTotalSoldCard";

interface PegaSummaryData {
    dataset: Array<number>,
    total: number
}

interface PegaSalesSummaryProps {
    totalPega: number;

    totalPopulationData: PegaSummaryData,
    totalPopulationLabels: Array<string>

    salesVolumeData: PegaSummaryData,
    salesVolumeLabels: Array<string>,

    totalSoldData: PegaSummaryData,
    totalSoldLabels: Array<string>,

    loading: boolean
}

export const PegaSalesSummary: FC<PegaSalesSummaryProps> = ({
    totalPega,
    totalPopulationData,
    totalPopulationLabels,
    salesVolumeData,
    salesVolumeLabels,
    totalSoldData,
    totalSoldLabels,
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
                    lg={4}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <Card sx={{ boxShadow: 10, p: 2, pb: 0 }}>
                        <PegaTotalPopulationCard data={totalPopulationData} labels={totalPopulationLabels} totalPega={totalPega} loading={loading} />
                    </Card>
                </Grid>
                <Grid
                    item
                    lg={4}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <Card sx={{ boxShadow: 10, p: 2, pb: 0 }}>
                        <PegaSalesVolumeCard data={salesVolumeData} labels={salesVolumeLabels} loading={loading} />
                    </Card>
                </Grid>
                <Grid
                    item
                    lg={4}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <Card sx={{ boxShadow: 10, p: 2, pb: 0 }}>
                        <PegaTotalSoldCard data={totalSoldData} labels={totalSoldLabels} loading={loading}/>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
