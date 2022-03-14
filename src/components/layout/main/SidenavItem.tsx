import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, ListItem, Button } from '@mui/material';
import type { ListItemProps } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface SidenavItemProps extends ListItemProps {
    active?: boolean;
    children?: ReactNode;
    chip?: ReactNode;
    icon?: ReactNode;
    info?: ReactNode;
    path: string;
    title: string;
}

export const SidenavItem: FC<SidenavItemProps> = (props) => {
    const {
        active,
        icon,
        info,
        path,
        title,
    } = props;

    // Leaf
    // @ts-ignore
    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 2
            }}
        >
            <NavLink
                to={path}
                style={{
                    width: '100%',
                    textDecoration: 'none'
                }}
            >
                <Button
                    startIcon={icon}
                    // @ts-ignore
                    sx={{
                        backgroundColor: active && 'rgba(255,255,255, 0.08)',
                        borderRadius: 1,
                        color: active ? 'secondary.main' : 'neutral.300',
                        fontWeight: active && 'fontWeightBold',
                        justifyContent: 'flex-start',
                        pl: "16px !important",
                        pr: 3,
                        textAlign: 'left',
                        textTransform: 'none',
                        width: '100%',
                        '& .MuiButton-startIcon': {
                            color: active ? 'secondary.main' : 'neutral.400'
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255, 0.08)'
                        }
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        {title}
                    </Box>
                    {info}
                </Button>
            </NavLink>
        </ListItem>
    );
};

SidenavItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    icon: PropTypes.node,
    info: PropTypes.node,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

SidenavItem.defaultProps = {
    active: false,
};
