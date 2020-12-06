import React from 'react';
import {Answer} from './index';

const AnswersList = (props: any) => {
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="c-grid__answer">
            {props.answers.map((value: any, index: any) => {
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                return <Answer content={value.content} nextId={value.nextId} key={index.toString()} select={props.select} />
            })}
        </div>
    );
}

export default AnswersList;