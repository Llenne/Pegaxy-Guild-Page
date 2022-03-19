import React from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box,
    Divider, 
    IconButton,
    Toolbar, 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material';
import { Menu as MenuIcon } from '../icons/menu';

import {injected} from "../../../web3/connectors";
import { ConnectButton } from '../../web3/metamask-connect-btn';
import { ThemeModeButton } from '../theme-mode/ThemeModeButton';
import useWeb3Auth from "../../../hooks/useWeb3Auth";
import { AccountButton } from './AccountButton';

interface NavbarProps extends AppBarProps {
    onOpenSidebar?: () => void;
}

const NavbarRoot = styled(AppBar)(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        ...(
            theme.palette.mode === 'light'
                ? {
                    boxShadow: theme.shadows[3]
                }
                : {
                    backgroundColor: theme.palette.background.paper,
                    borderBottomColor: theme.palette.divider,
                    borderBottomStyle: 'solid',
                    borderBottomWidth: 1,
                    boxShadow: 'none'
                }
        )
    })
);



export const Navbar: FC<NavbarProps> = (props) => {
    const { onOpenSidebar, ...other } = props;

    const { setActivatingConnector, activate, metamaskAccount } = useWeb3Auth();

    const handleConnectClick = () => {
        setActivatingConnector(injected)
        activate(injected);
    }

    // @ts-ignore
    return (
        <>
            <NavbarRoot
                sx={{
                    left: {
                        lg: 280
                    },
                    width: {
                        lg: 'calc(100% - 280px)'
                    }
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 88,
                        height: 88,
                        left: 0,
                        px: 2,
                        display: 'flex',
                        justifyContent: {
                            xs: 'space-between',
                            lg: 'end'
                        }
                    }}
                >
                    <IconButton
                        onClick={onOpenSidebar}
                        sx={{
                            display: {
                                xs: 'inline-flex',
                                lg: 'none'
                            }
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        
                        <ThemeModeButton />
                        <Divider sx={{ ml: 1, mr: 2}} orientation="vertical" variant="middle" flexItem />
                        { metamaskAccount ? (
                            <AccountButton />
                        ) : (
                            <ConnectButton
                                onConnect={() => handleConnectClick()}
                            />
                        )}
                    </Box>
                </Toolbar>
            </NavbarRoot>
        </>
    );
};

Navbar.propTypes = {
    onOpenSidebar: PropTypes.func
};
