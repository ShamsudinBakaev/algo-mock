import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBotMessage, addUserMessage } from '../redux/sessionSlice';
import axios from 'axios';

const Chat = () => {
  const [inputText, setInputText] = React.useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const uuid = useSelector((state) => state.currentSessionUUID);

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      return;
    }

    try {
      dispatch(addUserMessage(inputText));

      const response = await axios.post(`http://127.0.0.1:8000/message/${uuid}`, {
        message: inputText,
      });

      setInputText('');
      // dispatch(addMessage(response.data.message));
      dispatch(addBotMessage(response.data.message));
      // console.log(response.data.message);
    } catch (error) {
      console.error('Ошибка при отправке сообщения: ', error);
    }
  };

  const handleGetHint = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/hint/${uuid}`);

      // console.log(response.data);
      // dispatch(addMessage(response.data.message));
      dispatch(addBotMessage(response.data.message));
    } catch (error) {
      console.error('Ошибка при отправке запроса /hint:', error);
    }
  };

  return (
    <div className="chat">
      <div className="block-messages">
        {messages.map((message, index) => {
          const [sender, text] = message;

          if (sender === 'user') {
            // Сообщение от пользователя
            return (
              <div key={index} className="message from-user">
                <div className="avatar">
                  <img src="/user-avatar.svg" alt="" />
                </div>
                <div className="text">
                  <p>{text}</p>
                </div>
              </div>
            );
          } else if (sender === 'bot') {
            // Сообщение от бота
            return (
              <div key={index} className="message from-ai">
                <div className="avatar">
                  <img src="/chatgpt-avatar.svg" alt="" />
                </div>
                <div className="text">
                  <p>{text}</p>
                </div>
              </div>
            );
          }
          return null; // В случае неизвестного отправителя
        })}
        {/* <div className="message from-ai">
          <div className="avatar">
            <img src="/chatgpt-avatar.svg" alt="" />
          </div>
          <div className="text">
            <p></p>
          </div>
        </div>

        <div className="message from-user">
          <div className="avatar">
            <img src="/user-avatar.svg" alt="" />
          </div>
          <div className="text">
            <p></p>
          </div>
        </div> */}
      </div>

      <div className="bottom">
        <div className="help">
          <p onClick={handleGetHint}>Подсказка</p>
        </div>
        <div className="input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Напиши чату GPT"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="send-message" onClick={handleSendMessage}>
            <img src="/send-message.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
