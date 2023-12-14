import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSessionUUID, addBotMessage } from '../redux/sessionSlice';

const FirstPage = () => {
  const [selectedLevel, setSelectedLevel] = React.useState('easy');
  const dispatch = useDispatch();

  // const uuid = useSelector((state) => state.currentSessionUUID);
  // const messages = useSelector((state) => state.messages);

  // console.log('Список сообщений: ', messages);
  // console.log('Текущий UUID: ', uuid);

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    // console.log(selectedLevel);
  };

  const handleStartInterview = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/start', {
        level: selectedLevel,
      });

      dispatch(setSessionUUID(response.data.uuid));
      // dispatch(addMessage(response.data.task));
      dispatch(addBotMessage(response.data.task));

      // Обработка ответа, например, вывод информации в консоль
      console.log('Ответ от сервера:', response.data);

      // Здесь ты можешь сохранить данные из ответа, если нужно
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <div className="first-page">
      <div className="header">
        <div className="logo">MockAlgo</div>
      </div>

      <div className="main">
        <p className="title">Пройди тестовое алгоритмическое собеседование онлайн!</p>
        <p className="description">
          Это поможет подготовиться к реальному интервью на позицию разработчика
        </p>

        <div className="difficulty-levels">
          <button
            value="easy"
            className={selectedLevel === 'easy' ? 'active' : ''}
            onClick={() => handleLevelChange('easy')}>
            Простое
          </button>
          <button
            value="medium"
            className={selectedLevel === 'medium' ? 'active' : ''}
            onClick={() => handleLevelChange('medium')}>
            Среднее
          </button>
          <button
            value="hard"
            className={selectedLevel === 'hard' ? 'active' : ''}
            onClick={() => handleLevelChange('hard')}>
            Сложное
          </button>
        </div>

        <div className="start-session">
          <Link to="/start" onClick={handleStartInterview}>
            Начать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
