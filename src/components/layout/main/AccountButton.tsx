import {useEffect, useRef, useState} from "react";
import {Avatar, Box, ButtonBase, Typography} from "@mui/material";
import NavWalletIcon from "../../../assets/nav-wallet.png";
import {AccountPopover} from "./AccountPopover";
import useWeb3Auth from "../../../hooks/useWeb3Auth";
import {useTheme} from "@mui/material/styles";
import WarningIcon from '@mui/icons-material/Warning';
import {useAuthDispatchContext, useAuthStateContext} from "../../../contexts/auth";
import {AuthAsyncActionTypeEnum} from "../../../contexts/auth/actions";

export const AccountButton = () => {
    const theme = useTheme();
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const { user, loading: loadingUser, error: errorUser, storedToken } = useAuthStateContext();
    const authDispatch = useAuthDispatchContext();

    useEffect(() => {
        if (storedToken && !user && !loadingUser) {
            authDispatch({
                type: AuthAsyncActionTypeEnum.GetUser,
                payload: storedToken
            })
        }
    }, [])

    const handleOpenPopover = (): void => {
        setOpenPopover(true);
    };

    const handleClosePopover = (): void => {
        setOpenPopover(false);
    };

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
            >
                {
                    !user && !loadingUser ? (
                        <Box
                            sx={{
                                py: 1,
                                border: "1px solid #5048E5",
                                borderRadius: '20px',
                                width: 175,
                                right: 0,
                                marginRight: '-40px',
                            }}
                        >
                            <Typography
                                variant={"caption"}
                                sx={{
                                    mr: 3.75,
                                    color: theme.palette.text.primary
                                }}
                            >
                                Unverified Account
                            </Typography>
                        </Box>
                    ) : null
                }
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
            </Box>
            <AccountPopover
                user={user}
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    );
};
