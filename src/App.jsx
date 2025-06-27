import { useState, useEffect } from 'react';
import LetterForm from './components/LetterForm';
import LetterRead from './components/LetterList';

function App() {
  const [view, setView] = useState("home");
  const [letters, setLetters] = useState(() => {
    const saved = localStorage.getItem('letters');
    return saved ? JSON.parse(saved) : [];
  });

  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('letters', JSON.stringify(letters));
  }, [letters]);

  const handleSendLetter = (letter) => {
    setLetters(prev => [...prev, letter]);
    setView("home");

    setSendSuccess(true);
    setTimeout(() => setSendSuccess(false), 3000); 
  };

  function handleCancel() {
    setView('home');
  }

  return (
    <>
      <div className='app-container'>
        {view === "home"  && ( 
          <div className='home-card'>
              <h1>Dear Future Me</h1>
              <button onClick={() => setView("write")}>Write A Letter</button>
              <button onClick={() => setView("read")}>Read A Letter</button>

              {sendSuccess && (
                <p style={{color: '#c9aa7f', marginTop: '1rem'}}>Letter sent successfully!</p>
              )}
          </div>
        )}
        
        {view === "write" && (
          <LetterForm onSend={handleSendLetter} onCancel={handleCancel} />
        )}
        
        {view === "read" && (
          <LetterRead letters={letters} onCancel={handleCancel} />
        )}
      </div>
    </>
  )
}

export default App;
