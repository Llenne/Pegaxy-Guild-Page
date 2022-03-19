import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import {PegaTable, PegaTableData} from "../../../components/personal/pega/PegaTable/PegaTable";
import {useWeb3React} from "@web3-react/core";
import {ConnectButton} from "../../../components/web3/metamask-connect-btn";
import {useFetch} from "use-http";
import {calculateBreedCooldown, calculateRaceCooldown} from "../../../utils/calculations";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { json2csvAsync } from 'json-2-csv';
import moment from 'moment';

export const PegaPage = () => {
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

    useEffect(() => {
        if (metamaskAccount) {
            getData()
        }
    }, [metamaskAccount])

    const handleExportToCSV = async () => {
        if (pegaList) {
            const csv = await json2csvAsync(pegaList, {
                emptyFieldValue: ''
            })

            let exportedFilename = `pega_list_${moment().format('YYYY_MM_DD_HH_mm_ss')}.csv` || 'export.csv';

            let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            if ((navigator as any).msSaveBlob) { // IE 10+
                (navigator as any).msSaveBlob(blob, exportedFilename);
            } else {
                let link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    let url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", exportedFilename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Pega | Pegaxy Apollo</title>
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
                                                Pega
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                onClick={handleExportToCSV}
                                                startIcon={<ArticleOutlinedIcon/>}
                                                variant={"outlined"}
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    ml: 'auto',
                                                }}
                                            >

                                                Export to CSV
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box>
                                    <PegaTable tableData={pegaList} loading={loadingPegaData}/>
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
                                <Box>
                                    <ConnectButton />
                                </Box>
                            </Box>
                        )
                    }
                </Container>
            </Box>
        </>
    )
}
