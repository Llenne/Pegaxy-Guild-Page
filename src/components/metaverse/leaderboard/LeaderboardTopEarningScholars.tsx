import {FC} from "react";
import {
    Box,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Scrollbar} from "../../layout/scrollbar/Scrollbar";
import {Loading} from "../../utils/Loading";
import {VISIcon} from "../../layout/icons/vis-icon";

interface LeaderboardTopEarningScholarsData {
    address: string;
    index: number;
    rank: number;
    vis: number;
}

interface LeaderboardTopEarningScholarsProps {
    data: Array<LeaderboardTopEarningScholarsData>;
    loading: boolean;
}

export const LeaderboardTopEarningScholars: FC<LeaderboardTopEarningScholarsProps> = ({ data, loading }) => {
    return (
        <Box>
            <Card sx={{ boxShadow: 10 }}>
                <CardHeader
                    title={"Top Earning Renters (All-Time)"}
                    // action={(
                    //     <Tooltip title="Refresh rate is 24h">
                    //         <InformationCircleOutlinedIcon sx={{ color: 'action.active' }} />
                    //     </Tooltip>
                    // )}
                />
                {
                    loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 100,
                                width: '100%',
                                mb: 6
                            }}
                        >
                            <Loading/>
                        </Box>
                    ) : (
                        <Scrollbar>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Address
                                        </TableCell>
                                        <TableCell>
                                            VIS Earned
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.map((row: LeaderboardTopEarningScholarsData) => (
                                            <TableRow
                                                key={row.index}
                                                sx={{
                                                    '&:last-child td': {
                                                        border: 0
                                                    }
                                                }}
                                            >
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            alignItems: 'center',
                                                            display: 'flex'
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{ ml: 2 }}
                                                            variant="body2"
                                                        >
                                                            {`${row.address.substring(0, 6)}...${row.address.substring(row.address.length - 6)}`}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ mr: 1, width: 20, height: 20 }}>
                                                            <VISIcon/>
                                                        </Box>
                                                        <Typography variant="body2" component={"p"} sx={{ mb: 0 }}>
                                                            { Number(row.vis.toFixed(2)).toLocaleString() }
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    )
                }
            </Card>
        </Box>
    )
}
