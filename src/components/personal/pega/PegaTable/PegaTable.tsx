import React, {FC, useEffect, useState} from 'react';
import {Box, Button, IconButton, Tooltip, Typography} from "@mui/material";
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
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

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
                Header: 'Guild Name',
                accessor: 'guildName',
                sortable: true,
                Cell: ({ row }: { row: any }) => (
                    <Tooltip title={"Open in New Window"} placement={"top"}>
                        <Button color={"inherit"} startIcon={<OpenInNewIcon/>} component={"a"} href={`https://play.pegaxy.io/my-assets/pega/`} target={"_blank"} rel={"noreferrer"}>
                            {row.values.guildName}
                        </Button>
                    </Tooltip>
                )
            },
            {
                Header: 'Guild Role',
                accessor: 'role',
                sortable: true,
                maxWidth: '100%'
            },
            {
                Header: 'Pega Count',
                accessor: 'pegas',
                sortable: true,
                maxWidth: '100%',
            },
            {
                Header: 'LP Value',
                accessor: 'lp',
                sortable: true,
                maxWidth: '100%'
            },
            {
                Header: 'Date Joined',
                accessor: 'date',
                sortable: true,
                show: false
            },
            {
                Header: 'Action',
                sortable: true,
                Cell: ({row}: { row: any }) => (
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer'}}>
                        <Tooltip title={"Edit Member"} placement={"top"}>
                            <IconButton color={"inherit"}><EditIcon fontSize={"small"}/></IconButton>
                        </Tooltip>
                        <Tooltip title={"Remove Member"} placement={"top"}>
                            <IconButton color={"inherit"}><PersonRemoveIcon fontSize={"small"}/></IconButton>
                        </Tooltip>
                    </Box>
                )
            },
        ], []
    )


    return (
        <DataTable
            data={
                [{
                    'guildName': 'Real Deal Guild',
                    'role': 'Manager',
                    'pegas': 81,
                    'lp': '827,829 VIS',
                    'date': 'January 5, 2022'
                }]
            }
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
