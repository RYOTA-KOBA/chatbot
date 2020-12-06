import React, { useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextInput} from "./index";
// import {WEBHOOK_URL} from '../../webhookConfig'


const FormDialog = (props: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription]);

  const validateEmailFormat = (email: any) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
  }

  // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i=(i+1)|0) {
        if (args[i] === "") {
            isBlank = true;
        }
    }
    return isBlank
  };

  const submitForm = () => {
    const isBlank = validateRequiredInput(name, email, description);
    
    const isValidEmail = validateEmailFormat(email);
    
    if (isBlank) {
        alert('必須入力欄が空白です。')
        return false
    } else if (!isValidEmail) { 
        alert('メールアドレスの書式が異なります。')
        return false
    } else {
        const payload = {
            text: 'お問い合わせがありました\n'
                + 'お名前: ' + name + '\n'
                + 'メールアドレス: ' + email + '\n'
                + '【問い合わせ内容】\n' + description
        };
       
        const url = 'https://hooks.slack.com/services/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';

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload)
        }).then(() => {
          alert('送信が完了しました。追ってご連絡いたします!✋');
          setName("")
          setEmail("")
          setDescription("")
          return props.handleClose();
        });
    }
  };
  

  return(
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogContent>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <TextInput 
          label={"お名前(必須)"}
          multiline={false}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <TextInput 
          label={"メールアドレス(必須)"}
          multiline={false}
          rows={1}
          value={email}
          type={"email"}
          onChange={inputEmail}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <TextInput 
          label={"お問い合わせ内容(必須)"}
          multiline={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
      </DialogContent>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogActions>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button onClick={props.handleClose} color="primary">キャンセル</Button>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button onClick={submitForm} color="primary" autoFocus>送信する</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog;

