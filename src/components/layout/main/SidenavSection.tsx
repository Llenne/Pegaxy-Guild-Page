import type {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {List, ListSubheader} from '@mui/material';
import type {ListProps} from '@mui/material';
import {SidenavItem} from './SidenavItem';

interface Item {
    path: string;
    icon?: ReactNode;
    chip?: ReactNode;
    info?: ReactNode;
    children?: Item[];
    title: string;
}

interface SidenavSectionProps extends ListProps {
    items: Item[];
    path: string;
    title?: string;
    privateSection: boolean;
}

const renderNavItems = ({
                            depth = 0,
                            items,
                            path
                        }: {
    depth?: number;
    items: Item[];
    path: string;
}): JSX.Element => (
    <List disablePadding>
        {items.reduce(
            // @ts-ignore
            (acc, item) => reduceChildRoutes({
                acc,
                item,
                path
            }),
            []
        )}
    </List>
);

const reduceChildRoutes = ({
   acc,
   item,
   path
}: {
    acc: JSX.Element[];
    item: Item;
    path: string;
}): Array<JSX.Element> => {
    const key = `${item.title ? item.title : 'title'}`;
    const exactMatch = path === item.path;

    acc.push(
        <SidenavItem
            active={exactMatch}
            chip={item.chip}
            icon={item.icon}
            info={item.info}
            key={key}
            path={item.path}
            title={item.title}
        />
    );

    return acc;
};

export const SidenavSection: FC<SidenavSectionProps> = (props) => {
    const {items, path, title, privateSection, ...other} = props;

    return (
        <List
            subheader={(
                <ListSubheader
                    disableGutters
                    disableSticky
                    sx={{
                        color: 'neutral.500',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        lineHeight: 2.5,
                        ml: 4,
                        textTransform: 'uppercase'
                    }}
                >
                    {title}
                </ListSubheader>
            )}
            {...other}
        >
            {renderNavItems({
                items,
                path
            })}
        </List>
    );
};

SidenavSection.propTypes = {
    items: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired
};
