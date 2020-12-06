import React, { useState, useEffect, useCallback} from 'react';
import './assets/styles/style.css';
import {AnswersList, Chats} from './components/index';
import FormDialog from './components/Forms/FormDialog';
import {db} from './firebase/index';

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  interface Dataset {
    "answers": Array<Answer>,
    "question": string
  }

  interface Answer {
    "answers": [
      {"content": string, "nextId": string}
    ]
  }


  const displayNextQuestion = (nextQuestionId: string, nextDataset: Dataset) => {
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
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500) 
        break;
    }
  }

  const addChats = (chat: any) => {
    setChats((prevState) => {
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
          initDataset[id] = data
        })
      })

      setDataset(initDataset)
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
    <section className="c-section"> 
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

export default App;