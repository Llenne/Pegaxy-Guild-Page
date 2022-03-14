import {FC} from "react";
import {
    Box, Button,
    Card,
    CardHeader, Grid, Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Theme,
    Typography, useMediaQuery
} from "@mui/material";

import {Scrollbar} from "../../layout/scrollbar/Scrollbar";
import {Loading} from "../../utils/Loading";

export const GuildInvitation: FC = () => {


    const isXs = useMediaQuery(
        (theme: Theme) => theme.breakpoints.only('xs'),
        {
            noSsr: true
        }
    );

    return (
        <Grid
            container
            spacing={1}
        >
            <Grid
                item
                xs={12}
            >
                <Card sx={{ boxShadow: 10 }}>
                    <Box
                        sx={{
                            p: 3
                        }}
                    >
                        <Typography
                            variant={"h6"}
                        >
                            Guild Invitations
                        </Typography>
                    </Box>
                    <Scrollbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Guild Name
                                    </TableCell>
                                    <TableCell>
                                        Guild Rank
                                    </TableCell>
                                    <TableCell>
                                        Total Number of Pegas
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
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
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body2" component={"p"} sx={{ mb: 0 }}>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ mr: 1, width: 20, height: 20 }}>
                                            </Box>
                                            <Typography variant="body2" component={"p"} sx={{ mb: 0 }}>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ mr: 1, width: 20, height: 20 }}>
                                            </Box>
                                            <Typography variant="body2" component={"p"} sx={{ mb: 0 }}>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </Card>
            </Grid>
        </Grid>
    )
}
