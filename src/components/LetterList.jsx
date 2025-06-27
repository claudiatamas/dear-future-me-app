import { useState } from 'react';

export default function LetterRead({ letters, onCancel }) {

  const [openedLetterIndex, setOpenedLetterIndex] = useState(null);

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10); 

  const lettersToday = letters.filter(l => l.date === todayStr);

  const futureLetters = letters
    .filter(l => l.date > todayStr)
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  const nextLetterDate = futureLetters.length > 0 ? futureLetters[0].date : null;

  return (
    <div className="letter-read">
      {lettersToday.length === 0 ? (
        <div>
          <p>No letter for today.</p>
          {nextLetterDate ? (
            <p>Next letter is for {nextLetterDate}</p>
          ) : (
            <p>No upcoming letters.</p>
          )}
        </div>
      ) : (
        <div>
          <h2>Letters for Today</h2>
          <ul>
            {lettersToday.map((letter, i) => (
              <li key={i} style={{marginBottom: '1rem'}}>
                <strong>{letter.title}</strong>{' '}
                <button className='btn' onClick={() => 
                    openedLetterIndex === i ? setOpenedLetterIndex(null) : setOpenedLetterIndex(i)
                    }>
                    {openedLetterIndex === i ? 'Close Letter' : 'Open Letter'}
                    </button>

                {openedLetterIndex === i && (
                  <div style={{marginTop: '0.5rem', whiteSpace: 'pre-wrap', backgroundColor: '#2f2a21', padding: '1rem', borderRadius: '0.5rem', color:'#c9aa7f'}}>
                    {letter.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
    </div>
  );
}
