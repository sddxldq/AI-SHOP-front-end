import React, { useState, useRef, useEffect, useContext } from 'react';
import ChatMessage from './ChatMessage';
import { ChatContext } from '../context/chatContext';
import Thinking from './Thinking';
import { MdSend } from 'react-icons/md';
import Filter from 'bad-words';
import { davinci } from '../utils/davinci';
import { dalle } from '../utils/dalle';
import { deepai } from '../utils/deepai';
import Toggles from './Toggles';
import DeepAITunes from './DeepAITunes';

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const options = ['ChatGPT', 'DALL·E', 'DeepAI'];
  const [selected, setSelected] = useState(options[0]);
  const [messages, addMessage] = useContext(ChatContext);
  const [translate, setTranslate] = useState("");
  const [rephrase, setRephrase] = useState(false);
  const [summarize, setSummarize] = useState(false);
  const [randomized, setRandomized] = useState(false);

  const [deepAIImageStyle, setDeepAIImageStyle] = useState("");

  // Callback function to receive data from the child Toggles component for chatGPT
  const handleTranslate = (childData) => {
    setTranslate(childData);
  };

  const handleRephrase = () => {
    setRephrase(!rephrase);
  };

  const handleSummarize = () => {
    setSummarize(!summarize);
  };

  const handleRandomized = () => {
    setRandomized(!randomized);
  };

   // Callback function to receive data from the child Selector component for deepAI
  const handleDeepAIImageStyle = (childData) => {
    setDeepAIImageStyle(childData);
  };

  const GPTcallbacks = {
    translate: translate, rephrase: rephrase, summarize: summarize, randomized: randomized,
    handleTranslate: handleTranslate,
    handleRephrase: handleRephrase,
    handleSummarize: handleSummarize,
    handleRandomized: handleRandomized,
  };

  const DeepAIcallbacks = {
    deepAIImageStyle: deepAIImageStyle,
    handleDeepAIImageStyle: handleDeepAIImageStyle,
  };


  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `${selected}`,
    };

    addMessage(newMsg);
  };

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e) => {
    e.preventDefault();
    
    const filter = new Filter();
    const cleanPrompt = filter.isProfane(formValue)
      ? filter.clean(formValue)
      : formValue;

    let customizedMessage = cleanPrompt;
    if (translate !== "") {
      customizedMessage = 'translate "' + cleanPrompt + '" into ' + translate;
      if (rephrase) {
        customizedMessage = customizedMessage + ", and then rephrase in " + translate;
      }
      if (summarize) {
        customizedMessage = customizedMessage + ", and then summarize in " + translate;
      }
    }else{
      if (rephrase) {
        customizedMessage = 'rephrase "' + customizedMessage + '"'
      }
      if (!rephrase&&summarize) {
        customizedMessage = 'summarize "' + customizedMessage + '"'
      }
      if (rephrase&&summarize) {
        customizedMessage = customizedMessage + ", and then summarize"
      }
    }
    

    const newMsg = cleanPrompt;
    const aiModel = selected;

    setThinking(true);
    setFormValue('');
    updateMessage(newMsg, false, aiModel);

    console.log(selected);
    try {
      if (aiModel === options[0]) {
        console.log(customizedMessage)
        const data = await davinci(customizedMessage);
        data && updateMessage(data, true, aiModel);
      } else if (aiModel === options[1]) {
        const response = await dalle(cleanPrompt);
        const data = response[0];
        console.log(data)
        data && updateMessage(data, true, aiModel);
      } else {
        const deepAIParms = {
          text: cleanPrompt,
          style: deepAIImageStyle
        }
        const response = await deepai(deepAIParms);
        console.log(response)
        const data = response;
        data && updateMessage(data, true, aiModel);
      }
    } catch (err) {
      window.alert(`Error: ${err} please try again later`);
    }

    setThinking(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 👇 Get input value
      sendMessage(e);
    }
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className='chatview'>
      <main className='chatview__chatarea'>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={{ ...message }} />
        ))}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
      </main>
      <div>
        {selected === 'ChatGPT' && <Toggles onData={GPTcallbacks} />}
        {selected === 'DeepAI' && <DeepAITunes onData={DeepAIcallbacks} />}
        <form className='form' onSubmit={sendMessage}>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className='dropdown'>
            <option>{options[0]}</option>
            <option>{options[1]}</option>
            <option>{options[2]}</option>
          </select>
          <div className='flex items-stretch justify-between w-full'>
            <textarea
              ref={inputRef}
              className='chatview__textarea-message'
              value={formValue}
              onKeyDown={handleKeyDown}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <button
              type='submit'
              className='chatview__btn-send'
              disabled={!formValue}>
              <MdSend size={30} />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default ChatView;
