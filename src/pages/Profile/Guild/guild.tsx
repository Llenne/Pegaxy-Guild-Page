import {Box, Container, Grid, Card, Avatar,Chip, Theme, Typography, Stack, Link, Tooltip, IconButton, Dialog, DialogTitle, List, ListItem} from "@mui/material";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import React, {FC, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useWeb3React} from "@web3-react/core";
import RDG from '../../../assets/rdg-logo.png';
import {DiscordIcon} from "../../../components/layout/icons/discord";
import {PegaIcon} from "../../../components/layout/icons/pegasus";
import {VISIcon} from "../../../components/layout/icons/vis-icon";
import {TetherLogo} from "../../../components/layout/icons/tether-icon";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import { GuildMembers } from "../../../components/profile/guild/GuildMembers";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const emails = ['username@gmail.com', 'user02@gmail.com'];
export default function LinearWithValueLabel() {
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

    React.useEffect(() => {
    const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 5 : prevProgress + 5));
    }, 800);
    return () => {
        clearInterval(timer);
    };
    }, []);

    return (
    <Box sx={{ width: '100%' }}>
        <Grid 
        container
        justifyContent="flex-end"
        alignItems="center">
            <Box sx={{display: 'flex',justifyContent:"space-between", alignItems:"center"}}>
                <Typography variant="body2">Next Badge Requirements:</Typography>  
                <Tooltip title="Number of Pegas Needed">
                    <IconButton onClick={handleClickOpen} sx={{p:0}}><HelpOutlineIcon/></IconButton>
                </Tooltip> 
            </Box>  
        </Grid>
        <LinearProgressWithLabel color="primary" value={progress} />
        <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Box>

    
    );
}
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
      <DialogTitle>Next Badge Requirements:</DialogTitle>
      <List sx={{ pt: 0, verticalAlign: 'middle'}}>
        <ListItem>
            <Box display='flex' alignItems='center'>
                <PegaIcon/><Typography variant="h6" ml={2}> 6,000</Typography>
            </Box>
        </ListItem>
        <ListItem>
            <Box display='flex' alignItems='center'>
                <VISIcon/><Typography variant="h6" ml={2}> 123,456,789</Typography>
            </Box>
        </ListItem>
        <ListItem>
            <Box display='flex' alignItems='center'>
                <TetherLogo/><Typography variant="h6" ml={2}> 123,456,789</Typography>
            </Box>
        </ListItem>
      </List>

    </Dialog>
  );
}


export const Guild: FC = () => {
    
    const { account: metamaskAccount } = useWeb3React();

    return (
        <>
            <Helmet>
                <title>Guild Profile | Pegaxy</title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 6
                }}
            >
                <Container
                    maxWidth={"lg"}
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
                                <Box mb={4}>
                                    <Grid
                                        container
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Typography variant="h4">
                                                Guild Profile
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} 
                                            sx={{
                                                mt: (theme) => (
                                                    {
                                                        md: 0,
                                                        sm: 2,
                                                        xs: 2
                                                    }
                                                ),
                                            }}
                                        >
                                            <LinearWithValueLabel />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Card sx={{ position: 'relative',display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',boxShadow: 10,mb: 2, p:4}}>
                                        <Chip label="VERIFIED" color="primary" sx={{position: 'absolute', top: 20, left: 20}}></Chip>
                                        <IconButton sx={{p:0, position: 'absolute', top: 20, right: 20}}><SettingsIcon/></IconButton>
                                        <Grid container spacing={2} sx={{mb: 2, width:"100%"}}>
                                            <Grid xs={12} sm={12} md={12} sx={{textAlign: "center", mb: 1}}>
                                                <Avatar
                                                    src={RDG}
                                                    sx={{maxWidth: 300, width: "100%", height:"auto", background: "transparent", mx: "auto", mb: 2}}
                                                ></Avatar>
                                                <Typography variant="h5" display="block" sx={{mb:0}}>Real Deal Guild</Typography> 
                                                <Typography color="secondary" variant="button" display="block">Hall Of Fame</Typography> 
                                            </Grid>
                                            <Grid xs={12} sm={12} md={12} sx={{ position: 'relative',display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                                                    <Link href="#"><FacebookOutlinedIcon/></Link>
                                                    <Link href="#"><TwitterIcon/></Link>
                                                    <Link href="#"><DiscordIcon/></Link>
                                                    <Link href="#"><LanguageIcon/></Link>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                </Card>
                                <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',boxShadow: 10,mb: 2, py:2}}>
                                    
                                        <Grid
                                            alignItems="center"
                                            container
                                            justifyContent="space-between"
                                        >
                                            <Grid
                                                item
                                                md={3}
                                                sm={3}
                                                xs={3}
                                                sx={{
                                                    borderRight: (theme) => (
                                                        {
                                                            md: `1px solid ${theme.palette.divider}`,
                                                            sm: `1px solid ${theme.palette.divider}`,
                                                            xs: `1px solid ${theme.palette.divider}`
                                                        }
                                                    ),
                                                    p: 1,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Typography
                                                    color="textSecondary"
                                                    component="h2"
                                                    gutterBottom
                                                    variant="overline"
                                                >
                                                    Members
                                                </Typography>
                                                <Typography variant="h5">
                                                    20
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                md={3}
                                                sm={3}
                                                xs={3}
                                                sx={{
                                                    borderRight: (theme) => (
                                                        {
                                                            md: `1px solid ${theme.palette.divider}`,
                                                            sm: `1px solid ${theme.palette.divider}`,
                                                            xs: `1px solid ${theme.palette.divider}`
                                                        }
                                                    ),
                                                    p: 1,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Typography
                                                    color="textSecondary"
                                                    component="h2"
                                                    gutterBottom
                                                    variant="overline"
                                                >
                                                    Pegas
                                                </Typography>
                                                <Typography variant="h5">
                                                    5,000
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                md={3}
                                                sm={3}
                                                xs={3}
                                                sx={{
                                                    borderRight: (theme) => (
                                                        {
                                                            md: `1px solid ${theme.palette.divider}`,
                                                            sm: `1px solid ${theme.palette.divider}`,
                                                            xs: `1px solid ${theme.palette.divider}`
                                                        }
                                                    ),
                                                    p: 1,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Typography
                                                    color="textSecondary"
                                                    component="h2"
                                                    gutterBottom
                                                    variant="overline"
                                                >
                                                    USDT Pooled
                                                </Typography>
                                                <Typography variant="h5">
                                                    999
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                md={3}
                                                sm={3}
                                                xs={3}
                                                sx={{
                                                    borderRight: (theme) => (
                                                        {
                                                            md: `none`
                                                        }
                                                    ),
                                                    p: 1,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Typography
                                                    color="textSecondary"
                                                    component="h2"
                                                    gutterBottom
                                                    variant="overline"
                                                >
                                                    VIS Pooled
                                                </Typography>
                                                <Typography variant="h5">
                                                    999
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                </Card>
                                <GuildMembers/>
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