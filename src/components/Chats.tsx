import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Chat} from './index';


const useStyles = makeStyles(() => (
    createStyles({
      "chats": {
          height: 400,
          padding: '0',
          overflow: 'auto'
      }  
    })
));

const Chats = (props: any) => {
    const classes = useStyles();

    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <List className={classes.chats} id={"scroll-area"}>
            {props.chats.map((chat: any, index: any) => {
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                return <Chat text={chat.text} type={chat.type} key={index.toString()} />
        })}
        </List>
    );
}

export default Chats;