import {Box, Grid} from "@mui/material"
import {FC} from "react";
import {TotalRentingDistributionCard} from "./TotalRentingDistributionCard";
import {RentingBucketsChartCard} from "./RentingBucketsChartCard";
import {RentModes} from "../../../../interfaces/game-services";

export interface ProfitShareBucketsData {
    bucket: number;
    total: number;
}

interface RentingSummaryProps {
    totalPega: number;
    totalRentedPega: number;
    totalMarketPega: number;

    totalProfitSharePega: number;
    totalPayRentFeePega: number;

    profitShareBuckets: Array<ProfitShareBucketsData>;
    payRentFeeBuckets: Array<ProfitShareBucketsData>;

    loading: boolean;
}

export const RentingSummary: FC<RentingSummaryProps> = ({
    totalPega,
    totalMarketPega,
    totalRentedPega,
    totalPayRentFeePega,
    totalProfitSharePega,
    profitShareBuckets,
    payRentFeeBuckets= [],
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
                    xs={12}
                    item
                >
                    <TotalRentingDistributionCard
                        totalPega={totalPega}
                        totalMarketPega={totalMarketPega}
                        totalRentedPega={totalRentedPega}
                        totalProfitSharePega={totalProfitSharePega}
                        totalPayRentFeePega={totalPayRentFeePega}
                        loading={loading}
                    />
                </Grid>
                {
                    !loading && profitShareBuckets.length > 0 ? (
                        <Grid
                            md={payRentFeeBuckets.length === 0 ? 12 : 6}
                            sm={12}
                            xs={12}
                            item
                        >
                            <RentingBucketsChartCard
                                title={"Share Profit Buckets"}
                                type={RentModes.ShareProfit}
                                buckets={profitShareBuckets}
                            />
                        </Grid>
                    ) : null
                }
                {
                    !loading && payRentFeeBuckets.length > 0 ? (
                        <Grid
                            md={profitShareBuckets.length === 0 ? 12 : 6}
                            sm={12}
                            xs={12}
                            item
                        >
                            <RentingBucketsChartCard
                                title={"Pay Rent Fee Buckets"}
                                type={RentModes.PayRentFee}
                                buckets={payRentFeeBuckets}
                            />
                        </Grid>
                    ) : null
                }
            </Grid>
        </Box>
    )
}
