import React, {FC, useEffect, useState} from 'react';
import {Box, Grid, Card, Button,Chip, Theme, Typography, Stack, Divider, Tooltip, IconButton, Dialog, DialogTitle, List, ListItem, CardMedia} from "@mui/material";

import StarsIcon from '@mui/icons-material/Stars';
import DefaultBackground from '../../../assets/coverPhoto.png';
import HOFEmblem from '../../../assets/HOF-cut.png';
import RDG from '../../../assets/rdg-logo.png';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import {DiscordIcon} from "../../../components/layout/icons/discord";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';

import { grey } from '@mui/material/colors';
import { textAlign } from '@mui/system';
const plain = grey[50]; // #f44336

const styles = {
    emblem: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center'
    }
}

export const GuildBasicInfo: FC = () => {
    return (
        <Box mb={2}>
            <Card sx={
                    {
                        position: 'relative',
                        minHeight: 400,
                        backgroundColor: 'transparent',
                        overflow: (theme) => (
                                    {
                                        md: 'hidden',
                                        sm: 'visible',
                                        xs: 'visible'
                                    }
                                ),
                    }
            }>
                <Chip 
                    color='primary'
                    label="Verified" 
                    icon={<StarsIcon/>} 
                    sx={
                        {
                            position: 'absolute', 
                            left: (theme) => (
                                    {
                                        md: 30,
                                        sm: 20,
                                        xs: 10
                                    }
                                ),
                            top: (theme) => (
                                    {
                                        md: 30,
                                        sm: 20,
                                        xs: 10
                                    }
                                )
                        }
                    }
                ></Chip>
                <Box sx={{maxHeight: 400, overflow: 'hidden'}}>
                    <CardMedia
                        component="img"
                        image={DefaultBackground}
                        alt="Cover Photo"
                        sx={{objectFit: 'cover', objectPosition: 'center'}}
                    />

                    <Button
                        size='small'
                        startIcon={<CameraAltIcon/>}
                        sx={{
                            position: 'absolute',
                            color: '#000',
                            right: (theme) => (
                                    {
                                        md: 30,
                                        sm: 20,
                                        xs: 10
                                    }
                                ),
                            top: (theme) => (
                                    {
                                        md: 30,
                                        sm: 20,
                                        xs: 10
                                    }
                                ),
                            alignItems: 'center',
                            display: 'flex',
                            ml: 'auto',
                            backgroundColor: '#ffffff'
                        }}
                    >
                        Add Cover Photo
                    </Button>
                </Box>
                <Box sx={
                        {
                            position: (theme) => (
                                        {
                                            md: 'absolute',
                                            sm: 'relative',
                                            xs: 'relative'
                                        }
                                    ),
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 2
                        }
                    }>
                    <Grid container alignItems='flex-end' sx={{height: '100%'}}>
                        {/* Guild Profile Picture Grid */}
                        <Grid xs={12} sm={12} md={4}>
                            <Box  sx={
                                {
                                    position: 'relative',
                                    margin: (theme) => (
                                            {
                                                md: '0 auto 0 0',
                                                sm: '0 auto 0 auto',
                                                xs: '0 auto 0 auto'
                                            }
                                        ),
                                    maxHeight: (theme) => (
                                                    {
                                                        md: 301,
                                                        sm: 215,
                                                        xs: 183
                                                    }
                                                ),
                                    minHeight: (theme) => (
                                                    {
                                                        md: 301,
                                                        sm: 215,
                                                        xs: 183
                                                    }
                                                ),
                                    maxWidth: (theme) => (
                                                    {
                                                        md: 280,
                                                        sm: 200,
                                                        xs: 170
                                                    }
                                                ),
                                    minWidth: (theme) => (
                                                    {
                                                        md: 280,
                                                        sm: 200,
                                                        xs: 170
                                                    }
                                                )
                                }
                            }>
                                <Box sx={
                                    {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute', 
                                        left: (theme) => (
                                                    {
                                                        md: 30,
                                                        sm: 0,
                                                        xs: 0
                                                    }
                                                ),
                                        bottom: (theme) => (
                                                    {
                                                        md: 30,
                                                        sm: 100,
                                                        xs: 100
                                                    }
                                                ),
                                        zIndex: 1
                                    }
                                }>

                                <IconButton 
                                    id='changeProfile'
                                    sx={
                                        {
                                            position: 'absolute', right: 0, bottom:'20%', zIndex: 2, backgroundColor: '#ffffff', borderRadius: '50%'
                                        }
                                    }><CameraAltIcon sx={{color: '#000'}}/></IconButton>
                                    <img
                                        id='badge-border'
                                        src={HOFEmblem}
                                        style={
                                            {
                                                width: '100%', 
                                                height: '100%'
                                            }
                                        }
                                    />
                                </Box>
                                <Box sx={
                                    {
                                        position: 'absolute',
                                        backgroundColor: '#242a38',
                                        left: (theme) => (
                                                    {
                                                        md: 30,
                                                        sm: 0,
                                                        xs: 0
                                                    }
                                                ),
                                        bottom: (theme) => (
                                                    {
                                                        md: 30,
                                                        sm: 100,
                                                        xs: 100
                                                    }
                                                ),
                                        minWidth: (theme) => (
                                                        {
                                                            md: 280,
                                                            sm: 200,
                                                            xs: 170
                                                        }
                                                    ),
                                        maxWidth: (theme) => (
                                                        {
                                                            md: 280,
                                                            sm: 200,
                                                            xs: 170
                                                        }
                                                    ),
                                        minHeight: (theme) => (
                                                        {
                                                            md: 280,
                                                            sm: 200,
                                                            xs: 170
                                                        }
                                                    ),
                                        maxHeight: (theme) => (
                                                        {
                                                            md: 280,
                                                            sm: 200,
                                                            xs: 170
                                                        }
                                                    ),
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        overflow: 'hidden'
                                    }
                                }>
                                    <img
                                        id='badge-border'
                                        src={RDG}
                                        style={{objectFit: 'contain',objectPosition: 'center', width: '100%', height: '100%'}}
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        {/*  Guild Profile Other Info  */}
                        <Grid xs={12} sm={12} md={8} mt={{md: 0, sm: '-80px', xs: '-80px'}}>
                            <Box
                                mb={{md: '30px', sm: 1, xs: 1}}
                            >
                                <Stack direction='row' spacing={1} justifyContent={{md: 'flex-start', sm: 'center', xs: 'center'}}>
                                    <Typography variant='h3' component='h2'>Real Deal Guild</Typography>
                                    <IconButton><EditIcon /></IconButton>
                                </Stack>
                                <Stack direction='row' divider={<Divider orientation="vertical" flexItem />} spacing={2} justifyContent={{md: 'flex-start', sm: 'center', xs: 'center'}}>
                                    <Typography variant='body2'>Badge: Hall Of Fame</Typography>
                                    <Typography variant='body2'>Founder: Corey Wilton</Typography>
                                </Stack>
                            </Box>
                            <Box m={{md: '30px 0 30px', sm: '15px 0 30px', xs:'15px 0 30px'}} >
                                <Stack direction="row" spacing={3} alignItems="center" justifyContent={{md: 'flex-start', sm: 'center', xs: 'center'}}>
                                    <IconButton sx={{backgroundColor: '#404757'}} href="#"><FacebookOutlinedIcon sx={{color: '#ffffff'}}/></IconButton>
                                    <IconButton sx={{backgroundColor: '#404757'}} href="#"><TwitterIcon sx={{color: '#ffffff'}}/></IconButton>
                                    <IconButton sx={{backgroundColor: '#404757'}} href="#"><DiscordIcon/></IconButton>
                                    <IconButton sx={{backgroundColor: '#404757'}} href="#"><LanguageIcon sx={{color: '#ffffff'}}/></IconButton>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: '100%',
                    width: '100%',
                    background: (theme) => (
                        {
                            md: 'linear-gradient( transparent,#111827)',
                            sm: 'transparent',
                            sx: 'transparent'
                        }
                    ),
                    zIndex: 1
                }}>

                </Box>
            </Card>
        </Box>
    )
}