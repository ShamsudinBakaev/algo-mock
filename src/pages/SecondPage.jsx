import React from 'react';
import { Link } from 'react-router-dom';
import Chat from '../components/Chat';
import CodeEditor from '../components/CodeEditor';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages, setSessionUUID } from '../redux/sessionSlice';
import axios from 'axios';

const SecondPage = () => {
  const dispatch = useDispatch();
  const uuid = useSelector((state) => state.currentSessionUUID);
  const messages = useSelector((state) => state.messages);

  // _____________________________________

  const stages = ['1 этап', '2 этап', '3 этап'];
  const [activeStageIndex, setActiveStageIndex] = React.useState(0);

  const sendStageToBackend = async (newStage) => {
    try {
      await axios.post(`http://127.0.0.1:8000/stage_switch/${uuid}`, {
        new_stage: newStage,
      });
      // console.log(`Успешно отправлен этап на бэкенд: ${newStage}`);
    } catch (error) {
      console.error('Ошибка при отправке этапа на бэкенд:', error);
    }
  };

  const handleNextStage = async () => {
    let newStage;
    if (activeStageIndex === 0) {
      newStage = 'second';
    } else if (activeStageIndex === 1) {
      newStage = 'third';
    }

    if (newStage) {
      await sendStageToBackend(newStage);
      setActiveStageIndex(activeStageIndex + 1);
    }
  };

  // _____________________________________

  console.log('Список сообщений: ', messages);
  console.log('Текущий UUID: ', uuid);

  const handleFinish = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/finish/${uuid}`);

      // console.log(response);
      dispatch(setSessionUUID(null));
      dispatch(clearMessages());
    } catch (error) {
      console.error('Ошибка при выполнении запроса /finish:', error);
    }
  };

  return (
    <div className="second-page">
      <div className="control-panel top">
        <div className="buttons">
          <Link to="/" className="go-out-button" onClick={handleFinish}>
            <img src="/go-out.svg" alt="" />
            Выйти
          </Link>
          <div className="stages">
            {stages.map((stage, index) => (
              <button key={index} className={`stage ${index === activeStageIndex ? 'active' : ''}`}>
                {stage}
              </button>
            ))}
            {/* <button className="stage">1 этап</button>
            <button className="stage">2 этап</button>
            <button className="stage">Проверка</button> */}
          </div>
        </div>

        <div className="timer">
          <img src="/timer.svg" alt="" />
          15:51
        </div>
      </div>

      <div className="main">
        <p className="title">Ознакомься с заданием. Потом напиши в чат GPT как будешь его решать</p>
        <div className="main-components">
          <Chat />
          <CodeEditor />
        </div>
      </div>

      <div className="control-panel bottom">
        <div className="stages">
          {/* <button>Проверка</button> */}
          <button onClick={handleNextStage}>Перейти к следующему этапу</button>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
