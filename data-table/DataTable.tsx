// @ts-nocheck
import React from 'react';
import {useAsyncDebounce, useExpanded, useGlobalFilter, usePagination, useSortBy, useTable} from "react-table";
import {
    Box,
    Card,
    TextField,
    Table as MaterialUiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    FormControl, Select, InputLabel,
    Typography, Button, Pagination, MenuItem, Grid,
    Avatar,
    Link
} from "@mui/material";
import {EmptyResults} from "./EmptyResults";

import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {Scrollbar} from "../layout/scrollbar/Scrollbar";
import { matchSorter } from 'match-sorter';
import {VISIcon} from "../layout/icons/vis-icon";
import {useSettings} from "../../hooks/use-settings";
import {usePreferencesDispatchContext, usePreferencesStateContext} from "../../contexts/preferences";
import {PreferencesActionType} from "../../contexts/preferences/actions";

import RDG from '../../assets/rdg-logo.png';
import {DiscordIcon} from "../../components/layout/icons/discord";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = val => !val

function GlobalFilter({
  globalFilter,
  setGlobalFilter,
}) {
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <TextField
            fullWidth
            label={'Search'}
            value={value || ""}
            onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }}
            variant="outlined"
        />
    )
}

export const DataTable = ({
    data,
    columns,
    loading = false,
    onSearchTermChange,
    defaultSortBy,
    defaultSortDir,
    manualPagination = true,
    manualSortBy = true,
    currentCustomFilter = 'all',
    onCustomFilterChange = (newFilter: string) => {}
}) => {
    const defaultSort = defaultSortBy && defaultSortDir ? (
        [ { id: defaultSortBy, desc: defaultSortDir === 'desc' }]
    ) : [];

    const preferences = usePreferencesStateContext();
    const preferencesDispatch = usePreferencesDispatchContext();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageOptions,
        pageCount,
        gotoPage,
        visibleColumns,
        getToggleHideAllColumnsProps,
        allColumns,
        setPageSize,
        state: {
            pageIndex,
            pageSize,
            sortBy,
            globalFilter
        },
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: preferences.pegaTableSize,
                pageIndex: 0,
                sortBy: defaultSort,
                hiddenColumns: columns.map(column => {
                    if (column.show === false) return column.accessor || column.id;
                }),
            },
            manualPagination: manualPagination,
            manualSortBy: manualSortBy,
            // disableMultiSort: true,
        },
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
    )

    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <Box sx={{ p: 2 }}>
                <Grid
                    container
                >
                    <Grid
                        md={3}
                        sm={12}
                        xs={12}
                        item
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Avatar
                            src={RDG}
                            sx={{maxWidth: 300, width: "100%", height:"auto", background: "transparent", mx: "auto", mb: 2}}
                        ></Avatar>
                    </Grid>
                    <Grid
                        md={3}
                        sm={12}
                        xs={12}
                        item
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography color={"primary"} variant={"button"} sx={{ display: 'block'}}>
                            Founder
                        </Typography>

                        <Box>
                            <Typography variant={"overline"} sx={{ display: 'block' }}>
                                { row.original.founder}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        md={3}
                        sm={12}
                        xs={12}
                        item
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography color={"primary"} variant={"button"} sx={{ display: 'block' }}>
                            Guild Statistics
                        </Typography>

                        <Box>
                            <Typography variant={"overline"} sx={{ display: 'block' }}>
                                Pega Count: <Typography variant='body2' display='inline-block' color='secondary'>{ row.original.pegaCount}</Typography> 
                            </Typography>
                            <Typography variant={"overline"} sx={{ display: 'block' }}>
                                Members Count: <Typography variant='body2' display='inline-block' color='secondary'>{ row.original.memberCount }</Typography>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        md={3}
                        sm={12}
                        xs={12}
                        item
                    >
                        <Typography color={"primary"} variant={"button"} sx={{ display: 'flex' }}>
                            Social Media
                        </Typography>

                        <Link href="#" sx={{ display: 'flex', alignItems: 'center' , my: 1 }}>
                            <FacebookOutlinedIcon/> 
                            <Typography variant={"overline"} color='inherit' sx={{ml: 1}}>Facebook</Typography>
                        </Link>
                        <Link href="#" sx={{ display: 'flex', alignItems: 'center' , my: 1 }}>
                            <TwitterIcon/> 
                            <Typography variant={"overline"} color='inherit' sx={{ml: 1}}>Twitter</Typography>
                        </Link>
                        <Link href="#" sx={{ display: 'flex', alignItems: 'center' , my: 1 }}>
                            <DiscordIcon/> 
                            <Typography variant={"overline"} color='inherit' sx={{ml: 1}}>Discord</Typography>
                        </Link>
                        <Link href="#" sx={{ display: 'flex', alignItems: 'center' , my: 1 }}>
                            <LanguageIcon/> 
                            <Typography variant={"overline"} color='inherit' sx={{ml: 1}}>Official Website</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        ),
        []
    )

    return (
        <Box>
            <Card sx={{ boxShadow: 10, mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, flexWrap: 'wrap', mt: 1, mb: 1, width: '100%' }}>
                    <Box sx={{ width: { md: 'auto', sm: '100%', xs: '100%' } }}>
                        <GlobalFilter
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </Box>
                    <Box sx={{ display: 'block', ml: { md: 'auto', sm: 0, xs: 0 }, }}>
                        
                        <FormControl fullWidth sx={{minWidth: 200}}>
                            <InputLabel id="demo-simple-select-label">Filter by Badge</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="badge-label"
                                label="Guild Role"
                                variant='outlined'
                            >
                                <MenuItem value={'Bronze'}>Bronze</MenuItem>
                                <MenuItem value={'Silver'}>Silver</MenuItem>
                                <MenuItem value={'Gold'}>Gold</MenuItem>
                                <MenuItem value={'Platinum'}>Platinum</MenuItem>
                                <MenuItem value={'HallOfFame'}>Hall Of Fame</MenuItem>
                                <MenuItem value={'Diamond'}>Diamond</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Card>
            <Card sx={{ boxShadow: 10 }}>
                {
                    data.length > 0 ? (
                        <Scrollbar>
                        <MaterialUiTable>
                            <TableHead sx={{ backgroundColor: "#5048e512" }}>
                                {headerGroups.map(headerGroup => (
                                    <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column: any) => {
                                            if (column.sortable) {
                                                return (
                                                    <TableCell key={column.name} sx={{ maxWidth: column.maxWidth ? column.maxWidth : 'auto' }} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                            <span>{ column.render('Header') }</span>
                                                            <span style={{ marginLeft: 6 }}>
                                                            {
                                                                column.isSorted ? column.isSortedDesc
                                                                        ? <ArrowDownwardIcon sx={{width: 15, height: 15}}/>
                                                                        : <ArrowUpwardIcon sx={{width: 15, height: 15}}/>
                                                                    : <SortIcon sx={{width: 15, height: 15}} />
                                                            }
                                                        </span>
                                                        </div>
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={column.name} sx={{ maxWidth: column.maxWidth ? column.maxWidth : 'auto' }} {...column.getHeaderProps()}>
                                                        <span>{ column.render('Header') }</span>
                                                    </TableCell>
                                                )
                                            }
                                        })}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody {...getTableBodyProps()}>
                                {
                                    page.map((row: any) => {
                                        prepareRow(row)
                                        return (
                                            <React.Fragment key={row.id}>
                                                <TableRow {...row.getRowProps()}>
                                                    {row.cells.map((cell: any) => {
                                                        return <TableCell sx={{ maxWidth: cell.column.maxWidth ? cell.column.maxWidth : 'auto' }} {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                                    })}
                                                </TableRow>

                                                { row.isExpanded ? (
                                                    <TableRow>
                                                        <TableCell colSpan={visibleColumns.length}>
                                                            { renderRowSubComponent({ row }) }
                                                        </TableCell>
                                                    </TableRow>
                                                ) : null}
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </TableBody>
                        </MaterialUiTable>
                        </Scrollbar>
                    ) : <EmptyResults/>
                }
            </Card>
            {
                page.length > 1 ? (
                    <Card sx={{ boxShadow: 10, mt: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'space-between' }, alignItems: 'center', p: 2, flexWrap: 'wrap' }}>
                            <Box>
                                <Typography variant="overline">{`Showing ${data.length >= pageSize ? pageSize : data.length} of ${data.length} Pega`}</Typography>
                            </Box>
                            <Box>
                                {
                                    pageOptions.length > 1 ? (
                                        <Pagination
                                            color={"primary"}
                                            count={pageOptions.length}
                                            page={pageIndex + 1}
                                            onChange={(e, value) => {
                                                const page = value ? Number(value) - 1 : 0;
                                                gotoPage(page)
                                            }}
                                        />
                                    ) : null
                                }
                            </Box>
                            <Box>
                                <TextField
                                    value={pageSize}
                                    select
                                    size="small"
                                    sx={{ m: 1, minWidth: 200 }}
                                    onChange={(e) => {
                                        preferencesDispatch({
                                            type: PreferencesActionType.UpdatePreferences,
                                            payload: {
                                                ...preferences,
                                                pegaTableSize: e.target.value
                                            }
                                        })
                                        setPageSize(e.target.value)
                                    }}
                                >
                                    {
                                        [10, 20, 30, 40, 50].map((option: number, idx: number) => {
                                            return (
                                                <MenuItem key={idx} value={option}>
                                                    Show {option} Pega
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </Box>
                        </Box>
                    </Card>
                ) : null
            }
        </Box>
    )
}
