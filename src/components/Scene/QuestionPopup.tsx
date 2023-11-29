// QuestionPopup.tsx
import React, { useState } from 'react';

interface QuestionPopupProps {
  onAnswer: (answer: string) => void;
}

const QuestionPopup: React.FC<QuestionPopupProps> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleAnswer = () => {
    onAnswer(answer);
    setAnswer('');
  };

  return (
    <div>
      <p>Guess the content behind the image:</p>
      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={handleAnswer}>Submit</button>
    </div>
  );
};

export default QuestionPopup;
