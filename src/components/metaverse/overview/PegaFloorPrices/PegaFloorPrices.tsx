import React, {FC, useEffect, useState} from "react";
import {alpha, Avatar, Box, Button, Card, Grid, MenuItem, Slider, TextField, Tooltip, Typography} from "@mui/material";
import {Loading} from "../../../utils/Loading";
import {HozIcon} from "../../../layout/icons/bloodlines/hoz";
import {CamponaIcon} from "../../../layout/icons/bloodlines/campona";
import {KlinIcon} from "../../../layout/icons/bloodlines/klin";
import {ZanIcon} from "../../../layout/icons/bloodlines/zan";
import {TetherLogo} from "../../../layout/icons/tether-icon";
import {Timeframe} from "../../../../interfaces/timeframe";
import {useFetch} from "use-http";
import {useTheme} from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { sortBy } from 'lodash';
import {PegaBloodLine} from "../../../../interfaces/pega";
import {PegaFloorPriceCard} from "./PegaFloorPriceCard";

interface PegaFloorPricesProps {
    timeframe?: Timeframe
}

const breedCountMarks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
        label: '6',
    },
    {
        value: 7,
        label: '7',
    },
];

interface PegaFloorPriceData {
    bloodLine: string;
    breedType?: string;
    breedCount?: number;
    gender?: string;
    pegaIds: Array<number>;
    listingIds: Array<number>;
    price: number;
}

const buildFloorPricesQueryString = (
    breedCountFilter: Array<number>,
    breedTypeFilter: string,
    genderFilter: string
) => `&maxBreedCount=${Math.max(...breedCountFilter)}&minBreedCount=${Math.min(...breedCountFilter)}${breedTypeFilter !== 'Any' ? `&breedType=${breedTypeFilter}` : ``}${genderFilter !== 'Any' ? `&gender=${genderFilter}` : ``}`

export const PegaFloorPrices: FC<PegaFloorPricesProps> = () => {
    const theme = useTheme();

    const [breedCountFilterVisual, setBreedCountFilterVisual] = useState<Array<number>>([0,7]);
    const [breedCountFilter, setBreedCountFilter] = useState<Array<number>>([0,7]);
    const [breedTypeFilter, setBreedTypeFilter] = useState<string>("Any");
    const [genderFilter, setGenderFilter] = useState<string>("Any");

    const [hozFloorPriceData, setHozFloorPriceData] = useState<PegaFloorPriceData>();
    const [camponaFloorPriceData, setCamponaFloorPriceData] = useState<PegaFloorPriceData>();
    const [klinFloorPriceData, setKlinFloorPriceData] = useState<PegaFloorPriceData>();
    const [zanFloorPriceData, setZanFloorPriceData] = useState<PegaFloorPriceData>();

    const {
        get: getPricesData,
        loading: loadingPricesData,
        error: errorEarningsData
    } = useFetch(`${process.env.REACT_APP_BASE_API_URL}/pegas/prices`, {
        loading: true,
        retries: 5,
        cacheLife: 2 * 60000, // 2 minutes
        persist: true
    });

    const getData = async () => {
        const data = await getPricesData(`/floor?category=bloodLine,breedCount,gender,breedType${buildFloorPricesQueryString(breedCountFilter, breedTypeFilter, genderFilter)}`)

        const sorted = sortBy(data, ['price', 'bloodLine']);

        // console.log('sorted', sorted);

        let hozFloor, camponaFloor, klinFloor, zanFloor;

        for (let i = 0; i < sorted.length; i++) {
            if (!hozFloor &&
                sorted[i].bloodLine === PegaBloodLine.Hoz &&
                (sorted[i].breedCount >= breedCountFilter[0] && sorted[i].breedCount <= breedCountFilter[1]) &&
                (breedTypeFilter === 'Any' || sorted[i].breedType === breedTypeFilter) &&
                (genderFilter === 'Any' || sorted[i].gender === genderFilter)
            ) {
                hozFloor = sorted[i];
            }

            if (!camponaFloor &&
                sorted[i].bloodLine === PegaBloodLine.Campona &&
                (sorted[i].breedCount >= breedCountFilter[0] && sorted[i].breedCount <= breedCountFilter[1]) &&
                (breedTypeFilter === 'Any' || sorted[i].breedType === breedTypeFilter) &&
                (genderFilter === 'Any' || sorted[i].gender === genderFilter)
            ) {
                camponaFloor = sorted[i];
            }

            if (!klinFloor &&
                sorted[i].bloodLine === PegaBloodLine.Klin &&
                (sorted[i].breedCount >= breedCountFilter[0] && sorted[i].breedCount <= breedCountFilter[1]) &&
                (breedTypeFilter === 'Any' || sorted[i].breedType === breedTypeFilter) &&
                (genderFilter === 'Any' || sorted[i].gender === genderFilter)
            ) {
                klinFloor = sorted[i];
            }

            if (!zanFloor &&
                sorted[i].bloodLine === PegaBloodLine.Zan &&
                (sorted[i].breedCount >= breedCountFilter[0] && sorted[i].breedCount <= breedCountFilter[1]) &&
                (breedTypeFilter === 'Any' || sorted[i].breedType === breedTypeFilter) &&
                (genderFilter === 'Any' || sorted[i].gender === genderFilter)
            ) {
                zanFloor = sorted[i];
            }

            if (!!hozFloor && !!camponaFloor && !!klinFloor && !!zanFloor) {
                break;
            }
        }

        setHozFloorPriceData(hozFloor)
        setCamponaFloorPriceData(camponaFloor)
        setKlinFloorPriceData(klinFloor)
        setZanFloorPriceData(zanFloor)

        // console.log('hozFloor', hozFloor);
        // console.log('camponaFloor', camponaFloor);
        // console.log('klinFloor', klinFloor);
        // console.log('zanFloor', zanFloor);
    }

    useEffect(() => {
        getData();
    }, [breedTypeFilter, breedCountFilter, genderFilter])

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    p: 2,
                    pb: 1
                }}
            >
                <Card
                    sx={{
                        p: {
                            sm: 3,
                            xs: 2
                        },
                        boxShadow: 10
                    }}
                >
                    <Grid
                        container

                        sx={{
                            ml: 'auto',
                            justifyContent: "space-between",
                            flexDirection: {
                                xl: 'row',
                                lg: 'column',
                                md: "column",
                                sm: "column",
                                xs: "column"
                            },
                            alignItems: "center"
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: {
                                    xl: 0,
                                    lg: 3,
                                    md: 3,
                                    sm: 3,
                                    xs: 3
                                }
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                variant="h6"
                                sx={{
                                    textAlign: {
                                        md: 'left',
                                        sm: "center",
                                        xs: "center"
                                    }
                                }}
                            >
                                Pega Floor Prices
                            </Typography>
                            <Tooltip
                                title={"Data is updated every minute. However, Pegas may already be bought when the link to the marketplace is clicked, resulting in a blank marketplace page."}
                                placement={"right"}>
                                <InfoOutlinedIcon sx={{ml: 1}}/>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Grid
                                alignItems="center"
                                container
                                sx={{
                                    justifyContent: {
                                        md: "flex-end",
                                        sm: "center",
                                        xs: "center"
                                    }
                                }}
                            >
                                <Grid
                                    item
                                >
                                    <TextField
                                        value={genderFilter}
                                        label="Gender"
                                        select
                                        size="medium"
                                        sx={{
                                            m: 1,
                                            minWidth: 150,
                                            mr: 0,
                                            ml: {
                                                xs: 0
                                            }
                                        }}
                                        onChange={(e) => {
                                            setGenderFilter(e.target.value)
                                        }}
                                    >
                                        <MenuItem value="Any">
                                            Any
                                        </MenuItem>
                                        <MenuItem value="Male">
                                            Male
                                        </MenuItem>
                                        <MenuItem value="Female">
                                            Female
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                >
                                    <TextField
                                        value={breedTypeFilter}
                                        label="Breed Type"
                                        select
                                        size="medium"
                                        sx={{
                                            m: 1,
                                            minWidth: 150,
                                            mr: 2,
                                            ml: 2
                                        }}
                                        onChange={(e) => {
                                            setBreedTypeFilter(e.target.value)
                                        }}
                                    >
                                        <MenuItem value="Any">
                                            Any
                                        </MenuItem>
                                        <MenuItem value="Founding">
                                            Founding
                                        </MenuItem>
                                        <MenuItem value="Legendary">
                                            Legendary
                                        </MenuItem>
                                        <MenuItem value="Epic">
                                            Epic
                                        </MenuItem>
                                        <MenuItem value="Rare">
                                            Rare
                                        </MenuItem>
                                        <MenuItem value="Pacer">
                                            Pacer
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                >
                                    <Box sx={{
                                        width: {
                                            sm: 300,
                                            xs: 200
                                        },
                                        mr: 2,
                                        ml: 2
                                    }}>
                                        <Typography
                                            id="breed-count-slider"
                                            color={theme.palette.text.secondary}
                                            variant={"body2"}
                                            sx={{mb: 1, textAlign: 'center'}}
                                        >
                                            Breed Count
                                        </Typography>
                                        <Slider
                                            aria-labelledby={"breed-count-slider"}
                                            value={breedCountFilterVisual}
                                            step={1}
                                            valueLabelDisplay="off"
                                            marks={breedCountMarks}
                                            min={0}
                                            max={7}
                                            onChange={(e, newValue) => {
                                                setBreedCountFilterVisual(newValue as Array<number>);
                                            }}
                                            onChangeCommitted={(e, newValue) => {
                                                setBreedCountFilter(newValue as Array<number>)
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    pt: 0.25,
                    pb: 3,
                    px: 2
                }}
            >
                <Grid
                    container
                    spacing={1}
                >
                    <Grid
                        item
                        lg={3}
                        md={6}
                        xs={12}
                    >
                        <PegaFloorPriceCard
                            loading={loadingPricesData}
                            floorPriceData={hozFloorPriceData}
                            bloodLineIcon={<HozIcon/>}
                            bloodLineTitle={PegaBloodLine.Hoz}
                            iconBackgroundColor={"#e8ba24"}
                            iconBackgroundAlpha={0.1}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        md={6}
                        xs={12}
                    >
                        <PegaFloorPriceCard
                            loading={loadingPricesData}
                            floorPriceData={camponaFloorPriceData}
                            bloodLineIcon={<CamponaIcon/>}
                            bloodLineTitle={PegaBloodLine.Campona}
                            iconBackgroundColor={"#df452c"}
                            iconBackgroundAlpha={0.1}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        md={6}
                        xs={12}
                    >
                        <PegaFloorPriceCard
                            loading={loadingPricesData}
                            floorPriceData={klinFloorPriceData}
                            bloodLineIcon={<KlinIcon/>}
                            bloodLineTitle={PegaBloodLine.Klin}
                            iconBackgroundColor={"#35d3fd"}
                            iconBackgroundAlpha={0.1}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        md={6}
                        xs={12}
                    >
                        <PegaFloorPriceCard
                            loading={loadingPricesData}
                            floorPriceData={zanFloorPriceData}
                            bloodLineIcon={<ZanIcon/>}
                            bloodLineTitle={PegaBloodLine.Zan}
                            iconBackgroundColor={"#26bfad"}
                            iconBackgroundAlpha={0.1}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
