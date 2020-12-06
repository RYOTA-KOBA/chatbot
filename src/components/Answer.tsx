import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => (
    createStyles({
        "button": {
            borderColor: '#FFB549',
            color: '#FFB549',
            fontWeight: 600,
            marginBottom: '8px',
            "&:hover": {
                backgroundColor: '#FFB549',
                color: '#fff'
            }
        }
    })
));

const Answer = (props: any) => {
    const classes = useStyles();

    return(
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Button
        className={classes.button}
        variant="outlined" 
        onClick={()=>{props.select(props.content, props.nextId)}}
    >
        {props.content}
    </Button>
    )
}

export default Answer;