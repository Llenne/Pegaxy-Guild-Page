import React, {FC, useEffect, useState} from 'react';
import {
    Box, Button,
    Card,
    CardHeader, Grid, Link,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Theme,
    Typography, useMediaQuery,
    Dialog, DialogTitle, DialogContent, DialogContentText
} from "@mui/material";

import {DataTable} from "../../data-table/DataTable";
import {Loading} from "../../utils/Loading";
import {Scrollbar} from "../../layout/scrollbar/Scrollbar";
import AddIcon from '@mui/icons-material/Add';


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
          <DialogContentText>
            Enter your new member name and wallet address.
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Member Name"
            type="text"
            fullWidth
            sx={{mt: 2, mb: 2}}
          />
          <FormControl fullWidth sx={{mb: 2}}>
            <InputLabel id="demo-simple-select-label">Guild Role</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Guild Role"
            >
                <MenuItem value={10}>Admin</MenuItem>
                <MenuItem value={20}>Manager</MenuItem>
                <MenuItem value={30}>Member</MenuItem>
            </Select>
            </FormControl>
          <TextField
            autoFocus
            id="address"
            label="Wallet Address"
            type="text"
            fullWidth
          />
        </DialogContent>

    </Dialog>
  );
}

const emails = ['username@gmail.com', 'user02@gmail.com'];
export const GuildMembers: FC = () => {

    const [progress, setProgress] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

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

                    <SimpleDialog
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                    />
                    <Box >
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={3}
                            sx={{p: 3}}
                        >
                            <Grid item>
                                <Typography variant="h5">
                                    Guild Members
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handleClickOpen} 
                                    startIcon={<AddIcon/>}
                                    variant={"outlined"}
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        ml: 'auto',
                                    }}
                                >

                                    Add Members
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Scrollbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Address
                                    </TableCell>
                                    <TableCell>
                                        Member Role
                                    </TableCell>
                                    <TableCell>
                                        Pega Count
                                    </TableCell>
                                    <TableCell>
                                        LP Value
                                    </TableCell>
                                    <TableCell>
                                        Date Joined
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


// export interface MemberTableData {
// }

// interface MemberTableProps {
//     tableData: Array<MemberTableData> | Array<never>;
//     loading: boolean;
// }
// export const GuildMembers: FC<MemberTableProps> = ({tableData, loading}) => {

//     const [displayedTableData, setDisplayedTableData] = useState<Array<MemberTableData> | Array<never>>([]);


//     useEffect(() => {
//         setDisplayedTableData(tableData);
//     }, [tableData])

//     const tableColumns = React.useMemo(
//         () => [
//             {
//                 Header: 'Member Address',
//                 accessor: 'Member Address'
//             },
//             {
//                 Header: 'Member Name',
//                 accessor: 'Member Name',
//                 sortable: true,
//                 maxWidth: '100%'
//             },
//             {
//                 Header: 'Number of Pegas',
//                 accessor: 'Number of Pegas',
//                 sortable: true,
//                 maxWidth: '100%',
//                 Cell: ({ row }: any) => {
//                     return (
//                         <Typography variant={"body2"} sx={{ }}>
//                         </Typography>
//                     )
//                 },
//             },
//             {
//                 Header: 'Date Joined',
//                 accessor: 'Date Joined',
//                 sortable: true,
//                 Cell: ({ row }: any) => {
//                     return (
//                         <Typography variant={"body2"} sx={{ }}>
//                         </Typography>
//                     )
//                 },
//                 maxWidth: '100%'
//             },
//         ], []
//     )

//     return (
//         <>
//             {
//                 loading ? (
//                     <Loading/>
//                 ) : (
//                     <DataTable
//                         data={displayedTableData}
//                         columns={tableColumns}
//                         onSearchTermChange={() => {
//                         }}
//                         defaultSortBy={"name"}
//                         defaultSortDir={"asc"}
//                         manualPagination={false}
//                         manualSortBy={false}
//                     />
//                 )
//             }
//         </>
//     )
// }
