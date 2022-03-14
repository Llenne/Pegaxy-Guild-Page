import {Box, Button, Container, Grid, MenuItem, TextField, Theme, Typography, useMediaQuery} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useWeb3React} from "@web3-react/core";
import {useFetch} from "use-http";
import {useTheme} from "@mui/material/styles";

import {PegaTableData} from "../../../components/personal/pega/PegaTable/PegaTable";
import {VerifiedTable} from "../../../components/personal/verified/VerifiedTable";

import {calculateBreedCooldown, calculateRaceCooldown} from "../../../utils/calculations";

import { json2csvAsync } from 'json-2-csv';
import moment from 'moment';

import {useEagerConnect, useInactiveListener} from "../../../web3/hooks";
import {injected} from "../../../web3/connectors";


import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export const VerifiedPage: FC = () => {
    
    const { account: metamaskAccount } = useWeb3React();


    const [pegaList, setPegaList] = useState<Array<PegaTableData> | Array<never>>([]);
    const [pegaListToExport, setPegaListToExport] = useState<Array<PegaTableData> | Array<never>>([]);

    // pegas/owner/user/0x664Fe01207Dc37C84A97A8dCdC28bCc1Da6bEE57?bloodLine=Klin&gender=Male&breedType=Founding&minBreedCount=0&maxBreedCount=7&service=RENT_SERVICE

    const { get: getPegaData, loading: loadingPegaData, error: errorPegaData } = useFetch(`${process.env.REACT_APP_BASE_API_URL}/pegas/owner`, {
        loading: true,
        retries: 5,
        cacheLife: 2 * 60000, // 2 minutes
        persist: true
    });

    const getData = async () => {
        const data = await getPegaData(`/user/${metamaskAccount}`);

        // console.log('pega data', data);

        if (data && data.length > 0) {
            setPegaList(data.map((pega: PegaTableData) => ({
                ...pega,
                breedCooldownMillis: calculateBreedCooldown(pega),
                raceCooldownMillis: calculateRaceCooldown(pega),
                totalVISEarned: Number(Number((pega.ownerPegaRewards + pega.renterPegaRewards)).toFixed(2)),
                energy: calculateRaceCooldown(pega) !== 0 ? 0 : pega.energy
            })))
        }
    }

    return (
        <>
            <Helmet>
                <title>Verifed Guild | Pegaxy</title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 6
                }}
            >
                <Container
                    maxWidth={"xl"}
                    sx={{
                        display: metamaskAccount ? 'block' : 'flex',
                        height: metamaskAccount ? 'auto' : 'calc(100vh - 180px)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {
                        metamaskAccount ? (
                            <>
                                <Box sx={{ mb: 4 }}>
                                    <Grid
                                        container
                                        justifyContent="space-between"
                                        spacing={3}
                                    >
                                        <Grid item>
                                            <Typography variant="h4">
                                                Verified Guilds
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box>
                                    <VerifiedTable tableData={pegaList} loading={loadingPegaData}/>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        maxWidth: 400,
                                        textAlign: 'center',
                                        mb: 3
                                    }}
                                >
                                    You need to connect your Polygon account to access this page
                                </Typography>
                            </Box>
                        )
                    }
                </Container>
            </Box>
        </>
    )
}