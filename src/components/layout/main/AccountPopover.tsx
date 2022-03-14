import type { FC } from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText,
    Popover, Tooltip,
    Typography
} from '@mui/material';
import React, {useEffect, useState} from "react";
import NavWalletIcon from '../../../assets/nav-wallet.png';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {copyTextToClipboard} from "../../../utils/copyToClipboard";
import useTokenBalances from "../../../hooks/useTokenBalances";
import useWeb3Auth from "../../../hooks/useWeb3Auth";
import {getNonce, verifyAddress} from "../../../api/auth";
import {toast} from "react-hot-toast";
import Web3 from 'web3';
import {Web3Provider} from "@ethersproject/providers";
import {IAuthUser, useAuthDispatchContext} from "../../../contexts/auth";
import {AuthActionType, AuthAsyncActionTypeEnum} from "../../../contexts/auth/actions";
import {Loading} from "../../utils/Loading";

interface AccountPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open: boolean;
    user?: IAuthUser | null;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
    const { anchorEl, onClose, open, user, ...other } = props;

    const {
        metamaskAccount,
        library,
        deactivate: disconnectMetamask,
        connector,
    } = useWeb3Auth();

    const authDispatch = useAuthDispatchContext();

    const {balances: tokenBalances, loading: tokenBalancesLoading} = useTokenBalances();

    const startAccountVerification = async () => {
        const data = await getNonce((metamaskAccount as string));

        if (!data.nonce) return toast.error('Unable to verify account, please try again later.')

        const provider = await connector?.getProvider();
        const web3 = new Web3((provider as any));

        try {
            const signature = await web3.eth.personal.sign(
                `Welcome to Pegaxy Apollo | ${data.nonce}`,
                (metamaskAccount as string),
                ''
            );

            const tokenData = await verifyAddress((metamaskAccount as string), signature);

            console.log('token data', tokenData);

            if (!tokenData.accessToken) return toast.error('Unable to verify account, please try again later.');

            authDispatch({
                type: AuthAsyncActionTypeEnum.GetUser,
                payload: tokenData.accessToken
            })

            toast.success('Account verified!');
        } catch (err) {
            console.log('sign error', err);
            return toast.error('Unable to verify account, please try again later.')
        }
    }

    const handleDisconnect = async () => {
        authDispatch({
            type: AuthActionType.ClearCurrentUser
        })

        await disconnectMetamask();
    }

    const getAddress = (isLong: boolean) => {
        const address = (user?.publicAddress || metamaskAccount) || '';

        if (isLong) return address

        return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`
    }

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom'
            }}
            keepMounted
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: 300 } }}
            transitionDuration={300}
            sx={{
                top: 40
            }}
            {...other}
        >
            <Box
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    display: 'flex'
                }}
            >
                <Avatar
                    src={""}
                    sx={{
                        backgroundColor: '#5048E5',
                        height: 40,
                        width: 40,
                        p: 0.75,
                    }}
                >
                    <img style={{ maxWidth: '100%', marginLeft: 2 }} src={NavWalletIcon} alt=""/>
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            ml: 1
                        }}
                    >
                        {
                            !!user?.publicAddress || !!metamaskAccount ? (
                                <Tooltip title={"Copy Address"} placement={"top"}>
                                    <Button color={"inherit"} endIcon={<ContentCopyIcon fontSize={"small"}/>} sx={{mr: 1}} onClick={() => copyTextToClipboard(getAddress(true))}>
                                        {`${getAddress(false)}`}
                                    </Button>
                                </Tooltip>
                            ) : null
                        }
                    </Box>
                </Box>
            </Box>
            {
                !user ? (
                    <>
                        <Divider/>
                        <Box sx={{ p: 2, pt: 0 }}>
                            <Button
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                variant="contained"
                                onClick={() => startAccountVerification()}
                            >
                                {'Verify Account'}
                            </Button>
                        </Box>
                    </>
                ) : null
            }
            <Divider/>
            <Box>
                {
                    !tokenBalancesLoading && tokenBalances ? (
                        <List sx={{ width: '100%' }}>
                            {
                                tokenBalances.map((tokenBalance) => (
                                    <ListItem key={tokenBalance.address}
                                              secondaryAction={
                                                  <Typography>
                                                      { Number(tokenBalance.value).toLocaleString() }
                                                  </Typography>
                                              }
                                    >
                                        <ListItemAvatar>
                                            { tokenBalance.icon }
                                        </ListItemAvatar>
                                        <ListItemText primary={tokenBalance.abbr} secondary={tokenBalance.name} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    ) : (
                        <Box
                            sx={{
                                minHeight: 200,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Loading/>
                        </Box>
                    )
                }
            </Box>
            <Divider/>
            <Box sx={{ p: 2, pt: 0 }}>
                <Button
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={() => handleDisconnect()}
                >
                    {'Disconnect'}
                </Button>
            </Box>
        </Popover>
    );
};

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired
};
