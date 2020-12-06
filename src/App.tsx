import React, { useState, useEffect, useCallback} from 'react';
import './assets/styles/style.css';
import {AnswersList, Chats} from './components/index';
// @ts-expect-error ts-migrate(6142) FIXME: Module './components/Forms/FormDialog' was resolve... Remove this comment to see the full error message
import FormDialog from './components/Forms/FormDialog';
import {db} from './firebase/index';

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId: any, nextDataset: any) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })

      setAnswers(nextDataset.answers)
      setCurrentId(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer: any, nextQuestionId: any) => {
    switch(true) {
      case (nextQuestionId === 'contact'):
          handleClickOpen()
          break;
      
      case (/^https:*/.test(nextQuestionId)):
          const a = document.createElement('a');
          a.href = nextQuestionId;
          a.target = '_blank';
          a.click();
          break;

      default:
          addChats({
              text: selectedAnswer,
              type: 'answer'
          })
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500) 
        break;
    }
  }

  const addChats = (chat: any) => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(prevChats: never[]) => any[]' i... Remove this comment to see the full error message
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = useCallback(() => {
      setOpen(false)
  }, [setOpen]);


  useEffect(() => { 
    (async() => {
      const initDataset = {};

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          initDataset[id] = data
        })
      })

      setDataset(initDataset)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      displayNextQuestion(currentId, initDataset[currentId])
    })()
  }, [])

  useEffect(() => {
      const scrollArea = document.getElementById('scroll-area')
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      } 
  })
  
  return(
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section className="c-section"> 
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="c-box">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Chats chats={chats} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AnswersList answers={answers} select={selectAnswer} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

export default App;