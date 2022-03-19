import {Box, Container, Grid, Typography} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {LeaderboardTopEarningGuilds} from "../../../components/metaverse/leaderboard/LeaderboardTopEarningGuilds";
import {Timeframe} from "../../../interfaces/timeframe";
import {useFetch} from "use-http";
import {timeframeToEpochSeconds} from "../../../utils/timeframeToDate";
import {LeaderboardTopEarningScholars} from "../../../components/metaverse/leaderboard/LeaderboardTopEarningScholars";


export const LeaderboardPage: FC = () => {
    const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.Month);

    const [topEarningGuilds, setTopEarningGuilds] = useState<any>([]);
    const [topEarningScholars, setTopEarningScholars] = useState<any>([]);

    const { get, loading: loadingLeaderboardData, error: errorLeaderboardData } = useFetch(`${process.env.REACT_APP_BASE_API_URL}/leaderboard`, {
        loading: true,
        retries: 5,
        cacheLife: 2 * 60000, // 2 minutes
        persist: true
    });

    const getDataGuildLeaderboard = async () => {
        const data = await get(`/owner/earnings/user?limit=10${timeframeToEpochSeconds(timeframe) ? '&since=' + timeframeToEpochSeconds(timeframe) : ''}`);


        if (data && data.length > 0) {
            setTopEarningGuilds(data)
        }
    }

    const getDataScholarLeaderboard = async () => {
        const data = await get(`/renter/earnings/user?limit=10${timeframeToEpochSeconds(timeframe) ? '&since=' + timeframeToEpochSeconds(timeframe) : ''}`)

        if (data && data.length > 0) {
            setTopEarningScholars(data)
        }
    }

    useEffect(() => {
        getDataGuildLeaderboard();
        getDataScholarLeaderboard();
    }, [timeframe])

    return (
        <>
            <Helmet>
                <title>Leaderboard | Pegaxy Apollo</title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 6
                }}
            >
                <Container maxWidth={"lg"}>
                    <Box>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                            sx={{ mb: 4 }}
                        >
                            <Grid
                                item
                            >
                                <Typography variant="h4">
                                    Leaderboard
                                </Typography>
                            </Grid>
                            {/*<Grid*/}
                            {/*    item*/}
                            {/*    sx={{*/}
                            {/*        display: 'flex',*/}
                            {/*        alignItems: 'center',*/}
                            {/*        m: -1*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <TextField*/}
                            {/*        value={timeframe}*/}
                            {/*        label="Period"*/}
                            {/*        select*/}
                            {/*        size="small"*/}
                            {/*        sx={{ m: 1, minWidth: 200 }}*/}
                            {/*        onChange={(e) => {*/}
                            {/*            const timeframe: Timeframe = e.target.value as Timeframe;*/}
                            {/*            setTimeframe(timeframe)*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        <MenuItem value="day">*/}
                            {/*            Last day*/}
                            {/*        </MenuItem>*/}
                            {/*        <MenuItem value="week">*/}
                            {/*            Last week*/}
                            {/*        </MenuItem>*/}
                            {/*        <MenuItem value="biweek">*/}
                            {/*            Last 15 days*/}
                            {/*        </MenuItem>*/}
                            {/*        <MenuItem value="month">*/}
                            {/*            Last month*/}
                            {/*        </MenuItem>*/}
                            {/*        <MenuItem value="all">*/}
                            {/*            All*/}
                            {/*        </MenuItem>*/}
                            {/*    </TextField>*/}
                            {/*</Grid>*/}
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                sm={12}
                            >
                                <LeaderboardTopEarningGuilds data={topEarningGuilds} loading={loadingLeaderboardData}/>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={12}
                            >
                                <LeaderboardTopEarningScholars data={topEarningScholars} loading={loadingLeaderboardData} />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
