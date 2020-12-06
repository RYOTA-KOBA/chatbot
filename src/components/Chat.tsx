import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../assets/img/no-profile.png' ... Remove this comment to see the full error message
import NoPlofile from '../assets/img/no-profile.png';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../assets/img/minato.jpg' or i... Remove this comment to see the full error message
import Minato from '../assets/img/minato.jpg';


const Chat = (props: any) => {
    const isQuestion = (props.type === 'question');
    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ListItem className={classes}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ListItemAvatar>
                {isQuestion ? (
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Avatar alt="icon" src={Minato} />
                ) : (
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Avatar alt="icon" src={NoPlofile} />
                )}
                
            </ListItemAvatar>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="p-chat__bubble">{props.text}</div>
        </ListItem>
    )
}

export default Chat;