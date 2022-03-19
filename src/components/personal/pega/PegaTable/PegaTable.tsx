import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Tooltip, Typography} from "@mui/material";
import {DataTable} from "../../../data-table/DataTable";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Loading} from "../../../utils/Loading";
import {
    GameServices,
    getFriendlyServiceName,
    RentModes
} from "../../../../interfaces/game-services";
import {PegaBloodLine} from "../../../../interfaces/pega";
import {humanizerOptions, shortEnglishHumanizer} from "../../../../utils/humanizer";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {copyTextToClipboard} from "../../../../utils/copyToClipboard";

const BloodLineSortingDict = {
    "Hoz": 1,
    "Campona": 2,
    "Klin": 3,
    "Zan": 4
}

export interface PegaTableData {
    bloodLine: PegaBloodLine;
    bornTime: number;
    breedCount: number;
    breedCooldownMillis?: number;
    breedType: string;
    bronze: number;
    energy: number;
    fatherId: number;
    fire: number;
    gender: string;
    gold: number;
    id: number;
    lastBreedTime: number;
    lastReduceEnergy: number;
    lastRenterAddress: string | null;
    lastRenterIsDirect: boolean;
    lastRenterPrice: number;
    lastRenterRentAt: number;
    lastRenterRentDuration: number;
    lastRenterRentMode: string;
    lightning: number;
    lose: number;
    motherId: number;
    name: string;
    ownerAddress: string;
    ownerPegaRewards: string;
    raceCooldownMillis?: number;
    rentTimeEnd: number;
    renterAddress: string;
    renterPegaRewards: number;
    service: GameServices;
    silver: number;
    speed: number;
    strength: number;
    totalRaces: number;
    totalVISEarned: number;
    water: number;
    win: number;
    winRate: number;
    wind: number;
}

interface PegaTableProps {
    tableData: Array<PegaTableData> | Array<never>;
    loading: boolean;
}

export const PegaTable: FC<PegaTableProps> = ({tableData, loading}) => {
    const [pegaFilter, setPegaFilter] = useState<string>('all');

    const [displayedTableData, setDisplayedTableData] = useState<Array<PegaTableData> | Array<never>>([]);

    const handlePegaFilterChange = (newFilter: string) => {
        switch (newFilter) {
            case 'idle': {
                setPegaFilter('idle');
                return setDisplayedTableData(
                    tableData.filter((row: PegaTableData) => row.service === GameServices.Resting)
                )
            }
            case 'rented': {
                setPegaFilter('rented');
                return setDisplayedTableData(
                    tableData.filter((row: PegaTableData) => row.service === GameServices.Renting)
                )
            }
            case 'breed': {
                setPegaFilter('breed');
                return setDisplayedTableData(
                    tableData.filter((row: PegaTableData) => row.breedCooldownMillis === 0)
                )
            }
            case 'all': {
                setPegaFilter('all');
                return setDisplayedTableData(tableData);
            }
        }
    }

    useEffect(() => {
        setDisplayedTableData(tableData);
    }, [tableData])

    const tableColumns = React.useMemo(
        () => [
            {
                Header: () => null,
                id: 'expander',
                Cell: ({row}: { row: any }) => (
                    <Button {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <RemoveIcon/> : <AddIcon/>}
                    </Button>
                ),
                width: 20
            },
            {
                Header: 'Name',
                accessor: 'name',
                sortable: true,
                Cell: ({ row }: { row: any }) => (
                    <Tooltip title={"Open in New Window"} placement={"top"}>
                        <Button color={"inherit"} startIcon={<OpenInNewIcon/>} component={"a"} href={`https://play.pegaxy.io/my-assets/pega/${row.original.id}`} target={"_blank"} rel={"noreferrer"}>
                            { row.values.name }
                        </Button>
                    </Tooltip>
                )
            },
            {
                Header: 'Gender',
                accessor: 'gender',
                sortable: true,
                maxWidth: '100%'
            },
            {
                Header: 'Energy',
                accessor: 'energy',
                sortable: true,
                maxWidth: '100%',
                Cell: ({ row }: any) => {
                    return (
                        <Typography variant={"body2"} sx={{ }}>
                            { row.values.energy }
                        </Typography>
                    )
                },
            },
            {
                Header: '# Breed',
                accessor: 'breedCount',
                sortable: true,
                Cell: ({ row }: any) => {
                    return (
                        <Typography variant={"body2"} sx={{ }}>
                            { row.values.breedCount }
                        </Typography>
                    )
                },
                maxWidth: '100%'
            },
            {
                Header: 'Breed Type',
                accessor: 'breedType',
                sortable: true,
                show: false
            },
            {
                Header: 'Bloodline',
                accessor: 'bloodLine',
                show: true,
                sortable: true,
                sortType: (rowA: any, rowB: any, columnId: number, desc: boolean) => {
                    // @ts-ignore
                    return BloodLineSortingDict[rowA.values.bloodLine] > BloodLineSortingDict[rowB.values.bloodLine] ? -1 : 1
                }
            },
            {
                Header: () => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 20, height: 20, mr: 1, display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ maxWidth: '100%' }}/>
                        </Box>
                        <Typography
                            variant="overline"
                            sx={{ mt: 0.4 }}
                        >
                            Breed
                        </Typography>
                    </Box>
                ),
                accessor: 'breedCooldownMillis',
                sortable: true,
                Cell: ({ row }: { row: any }) => {
                    return row.values.breedCooldownMillis === 0 ? 'Ready' : shortEnglishHumanizer(row.values.breedCooldownMillis, humanizerOptions);
                }
            },
            {
                Header: () => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 20, height: 20, mr: 1, display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ maxWidth: '100%' }}/>
                        </Box>
                        <Typography
                            variant="overline"
                            sx={{ mt: 0.4 }}
                        >
                            Race
                        </Typography>
                    </Box>
                ),
                accessor: 'raceCooldownMillis',
                show: true,
                sortable: true,
                Cell: ({ row }: { row: any }) => {
                    return row.values.raceCooldownMillis === 0 ? 'Ready' : shortEnglishHumanizer(row.values.raceCooldownMillis, humanizerOptions);
                }
            },
            {
                Header: 'Status',
                accessor: 'service',
                sortable: true,
                Cell: ({ row }: { row: any }) => {
                    return getFriendlyServiceName(row.values.service);
                }
            },
            {
                Header: 'Last Renting Share',
                accessor: 'lastRenterPrice',
                sortable: true,
                Cell: ({ row }: { row: any }) => {
                    return `${ row.original.lastRenterRentMode === RentModes.ShareProfit ? `${ 100 - row.original.lastRenterPrice }% - ${ row.original.lastRenterPrice }%` : `${ row.original.lastRenterPrice} PGX`}`
                }
            },
            {
                Header: 'Last Renter',
                accessor: 'lastRenterAddress',
                sortable: true,
                Cell: ({row}: { row: any }) => (
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer'}}>

                        {
                            row.values.lastRenterAddress ? (
                                <>
                                    <Tooltip title={"Copy Address"} placement={"top"}>
                                        <Button color={"inherit"} endIcon={<ContentCopyIcon fontSize={"small"}/>} sx={{mr: 1}} onClick={() => copyTextToClipboard(row.values.lastRenterAddress)}>
                                            {`${row.values.lastRenterAddress.substring(0, 5)}...${row.values.lastRenterAddress.substring(row.values.lastRenterAddress.length - 5)}`}
                                        </Button>
                                    </Tooltip>
                                </>
                            ) : ''
                        }
                    </Box>
                )
            },
        ], []
    )

    return (
        <>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <DataTable
                        data={displayedTableData}
                        columns={tableColumns}
                        onSearchTermChange={() => {
                        }}
                        defaultSortBy={"name"}
                        defaultSortDir={"asc"}
                        manualPagination={false}
                        manualSortBy={false}
                        currentCustomFilter={pegaFilter}
                        onCustomFilterChange={handlePegaFilterChange}
                    />
                )
            }
        </>
    )
}
