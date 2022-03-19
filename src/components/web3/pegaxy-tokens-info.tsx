import React, {FC} from "react";
import {Box, Typography, useTheme, alpha, Button, Link} from "@mui/material";
import useTokenLiveData from "../../hooks/useTokenLiveData";
import LaunchIcon from '@mui/icons-material/Launch';
import PGXIcon from "../../assets/PGXIcon.png";
import VISIcon from "../../assets/VISIcon.png";

const PegaxyTokensInfo: FC = () => {
    const theme = useTheme();
    const {pgxPrice, visPrice} = useTokenLiveData();

    return (
        <Box color="neutral.200"
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: alpha(theme.palette.primary.light, 0.15),   
        }}>
        <Box
            color="neutral.200"
            sx={{
                display: 'flex',
                paddingY: 1.5,
                justifyContent: 'space-evenly',
                width: '100%'
            }}
        >
            <Button
                component={Link}
                sx={{ display: 'flex', alignItems: 'center' }}
                variant="text"
                startIcon={<div style={{
                    width: 20,
                    height: 20,
                    display: 'flex'
                }}>
                    <img style={{ maxWidth: '100%' }} src={PGXIcon} alt=""/>
                </div>}
                href="https://polygon-analytics.kyberswap.com/token/0xc1c93d475dc82fe72dbc7074d55f5a734f8ceeae"
                target="_blank"
            >
                
                <Typography
                    variant={"body1"}
                    fontWeight="600"
                    color="neutral.200"
                >
                    {pgxPrice?.toLocaleString() }
                    <Typography
                    fontSize="10px"
                    fontWeight="600"
                    sx={{ color: "neutral.400", ml: 0.3 }}
                    display='inline'
                >USD</Typography>
                </Typography>
            </Button>
            <Button
                component={Link}
                sx={{ display: 'flex', alignItems: 'center' }}
                variant="text"
                startIcon={<div style={{
                    width: 20,
                    height: 20,
                    display: 'flex'
                }}>
                    <img style={{ maxWidth: '100%' }} src={VISIcon} alt=""/>
                </div>}
                href="https://polygon-analytics.kyberswap.com/token/0xcc1b9517460d8ae86fe576f614d091fca65a28fc"
                target="_blank"
            >
                <Typography
                    variant={"body1"}
                    fontWeight="600"
                    color="neutral.200"
                >
                    {visPrice?.toLocaleString() }
                    <Typography
                fontSize="10px"
                fontWeight="600"
                sx={{ color: "neutral.400", ml: 0.3}}
                display='inline'
            >USD</Typography>
                </Typography>
            </Button>
     </Box>
     <Button
        component={Link}
        sx={{ mx: -2, borderRadius: 0}}
        variant="contained"
        color="secondary"
        fullWidth
        href="https://kyberswap.com/#/swap"
        target="_blank"
            >
                Swap Now!
            </Button>   
     </Box>
    )
}

export default PegaxyTokensInfo
