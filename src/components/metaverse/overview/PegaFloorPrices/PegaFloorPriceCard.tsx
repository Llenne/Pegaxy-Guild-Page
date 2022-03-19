import {alpha, Avatar, Box, Button, Card, Typography} from "@mui/material";
import {Loading} from "../../../utils/Loading";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {TetherLogo} from "../../../layout/icons/tether-icon";
import React, {FC, ReactElement} from "react";
import {useTheme} from "@mui/material/styles";

interface PegaFloorPriceData {
    bloodLine: string;
    breedType?: string;
    breedCount?: number;
    gender?: string;
    pegaIds: Array<number>;
    listingIds: Array<number>;
    price: number;
}

interface PegaFloorPriceCardProps {
    loading: boolean;
    floorPriceData?: PegaFloorPriceData;
    bloodLineTitle: string;
    bloodLineIcon: ReactElement
    iconBackgroundColor: string;
    iconBackgroundAlpha: number;
}

export const PegaFloorPriceCard: FC<PegaFloorPriceCardProps> = ({
    loading,
    floorPriceData,
    bloodLineTitle,
    bloodLineIcon,
    iconBackgroundColor,
    iconBackgroundAlpha
}) => {
    const theme = useTheme()

    return (
        <Card sx={{p: 3, pb: 1, boxShadow: 10}}>
            <Box
                sx={{
                    justifyContent: "space-between",
                    alignItems: 'center',
                    display: 'flex',
                    mb: 3
                }}
            >
                <>
                    <Avatar
                        variant="rounded"
                        sx={{
                            backgroundColor: (theme) => alpha(iconBackgroundColor, iconBackgroundAlpha),
                            color: 'primary.main',
                            p: 1
                        }}
                    >
                        { bloodLineIcon }
                    </Avatar>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {
                            loading ? (
                                <Box>
                                    <Loading/>
                                </Box>
                            ) : (
                                <Button
                                    disabled={!floorPriceData || (!!floorPriceData && floorPriceData.listingIds?.length === 0)}
                                    component={floorPriceData ? "a" : "button"}
                                    href={floorPriceData && floorPriceData.listingIds?.length > 0 ? `https://play.pegaxy.io/marketplace/listing/${floorPriceData.listingIds[0]}` : '#'}
                                    target={"_blank"}
                                    rel={"noreferrer"}
                                    endIcon={!floorPriceData || (!!floorPriceData && floorPriceData.listingIds?.length === 0) ? false : <OpenInNewIcon sx={{color: theme.palette.text.primary}}/>}
                                >
                                    <Box
                                        sx={{width: 25, height: 25, mr: 1}}
                                    >
                                        <TetherLogo/>
                                    </Box>
                                    <Typography variant="h5" color={theme.palette.text.primary}>
                                        {floorPriceData ? floorPriceData.price?.toLocaleString() : '--'}
                                    </Typography>
                                </Button>
                            )
                        }
                    </Box>
                </>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography
                    color="textSecondary"
                    variant="overline"
                    sx={{ mx: 1 }}
                >
                    {`${bloodLineTitle}`}
                </Typography>
                {
                    loading || !floorPriceData ? null : (
                        <>
                            <Typography
                                color="textSecondary"
                                variant="overline"
                            >
                                {`•`}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="overline"
                                sx={{ mx: 1 }}
                            >
                                {`${floorPriceData?.breedType}`}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="overline"
                            >
                                {`•`}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="overline"
                                sx={{ mx: 1 }}
                            >
                                {`${floorPriceData?.gender}`}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="overline"
                            >
                                {`•`}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="overline"
                                sx={{ mx: 1 }}
                            >
                                {`${floorPriceData?.breedCount}/7`}
                            </Typography>
                            {/*<Typography*/}
                            {/*    color="textSecondary"*/}
                            {/*    variant="overline"*/}
                            {/*>*/}
                            {/*    {`${floorPriceData?.bloodLine} • ${floorPriceData?.breedType} • ${floorPriceData?.gender} • ${floorPriceData?.breedCount}/7`}*/}
                            {/*</Typography>*/}
                        </>
                    )
                }
            </Box>
        </Card>
    )
}
