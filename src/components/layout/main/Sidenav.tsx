import { ReactNode, useMemo } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';
import {NavLink, useLocation} from 'react-router-dom';
import { SidenavSection } from './SidenavSection';
import LogoSmallWhite from '../../../assets/logo-small-white.png';
import {ApolloLogo} from "../icons/apollo-logo";

interface SidenavProps {
    onClose: () => void;
    open: boolean;
}

interface Item {
    title: string;
    children?: Item[];
    chip?: ReactNode;
    icon?: ReactNode;
    path?: string;
    depth?: Number
}

interface Section {
    title?: string;
    items: Item[];
    privateSection: boolean;
}

const getSections = (): Section[] => [
    {
        title: 'Profile',
        items: [
            {
                title: 'Wallet Profile',
                path: '/profile/Wallet',
                depth: 0,
            },
            {
                title: 'Guild Profile',
                path: '/profile/guild',
                depth: 0,
            }
        ],
        privateSection: true
    },
    {
        title: 'Menu',
        items: [
            {
                title: 'Verified Guild',
                path: '/personal/verified',
                depth: 0,
            },
            {
                title: 'Leaderboard',
                path: '/leaderboard',
                depth: 0,
            },
            {
                title: 'Guild Application',
                path: '/personal/application',
                depth: 0,
            }
        ],
        privateSection: true
        },
    // {
    //     title: 'Sort By',
    //     items: [
    //         {
    //             title: 'Pega Count',
    //             path: '',
    //             depth: 0,
    //         },
    //         {
    //             title: 'Verified Guild',
    //             path: '',
    //             depth: 0,
    //         },
    //     ],
    //     privateSection: false
    // }
];

export const Sidenav: FC<SidenavProps> = (props) => {
    const { onClose, open } = props;
    const lgUp = useMediaQuery(
        (theme: Theme) => theme.breakpoints.up('lg'),
        {
            noSsr: true
        }
    );
    const sections = useMemo(() => getSections(), []);

    const { pathname } = useLocation();


    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >

                <div>
                    <Box sx={{ p: 3, pb: 1 }}>
                        <NavLink
                            to="/"
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <img
                                style={{
                                    maxWidth: '100%',
                                    height: 40
                                }}
                                src={LogoSmallWhite} alt=""/>
                            <Box
                                sx={{
                                    ml: 4,
                                    mr: 2,
                                    mt: 1
                                }}
                            >
                                <ApolloLogo />
                            </Box>
                        </NavLink>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748', // dark divider
                        mt: 2
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>

                    {sections.map((section) => {
                        // if (!metamaskAccount && section.privateSection) {
                        //     return null
                        // }

                        return (
                            //@ts-ignore
                            <SidenavSection
                                key={section.title}
                                path={pathname}
                                sx={{
                                    mt: 2,
                                    '& + &': {
                                        mt: 2
                                    }
                                }}
                                {...section}
                            />
                        )
                    })}
                </Box>

                <Divider
                    sx={{
                        borderColor: '#2D3748'  // dark divider
                    }}
                />
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        borderRightColor: 'divider',
                        borderRightStyle: 'solid',
                        borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

Sidenav.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};
