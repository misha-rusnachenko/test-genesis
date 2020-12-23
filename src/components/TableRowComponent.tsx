import React from 'react';
import { 
    TableRow, 
    TableCell,
    Avatar, 
    Grid,
    Theme, 
    makeStyles,
    useTheme
} from '@material-ui/core';

import { User } from '../definitions';

import firstMedal from '../assets/medals/1st.svg'
import secondMedal from '../assets/medals/2nd.svg'
import thirdMedal from '../assets/medals/3rd.svg'

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        '&:hover': {
            cursor: 'pointer'
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    cellIndex: {
        width: 15, 
        padding: '16px 8px',
        fontSize: 12
    },
    cellAvatar: {
        padding: 0,
        width: 40
    },
    cellPages: {
        paddingTop: 0
    }
}))

type TableRowProps = {
    topUsers?: boolean;
    user: User;
    index: number;
}

const TableRowComponent: React.FC<TableRowProps> = (
    { topUsers, user, index }: TableRowProps
) => {
    const classes = useStyles();
    const theme = useTheme();

    const setMedal = (grade: number) => {
        switch (grade) {
            case 1:
                return firstMedal;
            case 2:
                return secondMedal;
            case 3:
                return thirdMedal;
            default:
                return;
        }
    }

    const generateColor = (letter: string) => {
        const char = letter.toLowerCase();

        if (char < 'з') {
            return theme.palette.primary.light
        } else if (char >= 'з' && char < 'п') {
            return theme.palette.primary.main
        } else if (char >= 'п' && char < 'ч') {
            return theme.palette.secondary.light
        } else {
            return theme.palette.secondary.main
        }
    }

    return (
        <TableRow className={classes.row}>
            <TableCell 
                className={classes.cellIndex}
                align='center'
            >
                {index}
            </TableCell>
            <TableCell className={classes.cellAvatar}>
                <Avatar 
                    style={{ background: generateColor(user.name[0]) }}
                >
                    {user.name[0]}
                </Avatar>
            </TableCell>
            <TableCell>
                <Grid container>{user.name}</Grid>
                <Grid container>{user.count_pub} публ.</Grid>
            </TableCell>
            <TableCell>
                { topUsers && <img src={setMedal(index)} height='35px' /> }
            </TableCell>
            <TableCell 
                align='right' 
                className={classes.cellPages}
            >
                {user.pageviews}
            </TableCell>
        </TableRow>
    )
}

export default TableRowComponent