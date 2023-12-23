import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useCallback, useEffect} from 'react';
import Button from '@mui/material/Button';

var answers = []
//numbers
answers.push(
{kanji:"一", meaning:"1"},
{kanji:"二", meaning:"2"},
{kanji:"三", meaning:"3"},
{kanji:"四", meaning:"4"},
{kanji:"五", meaning:"5"},
{kanji:"六", meaning:"6"},
{kanji:"七", meaning:"7"},
{kanji:"八", meaning:"8"},
{kanji:"九", meaning:"9"},
{kanji:"十", meaning:"10"},
{kanji:"百", meaning:"100"},
{kanji:"千", meaning:"1000"},
)

//days
answers.push(
{kanji:"土曜日",meaning:"saturday"},
{kanji:"日曜日",meaning:"sunday"}
)

//random interesting ones
answers.push(
{kanji:"古い", meaning: "old"},
//{kanji:"大き", meaning: "big"},
{kanji:"買います", meaning: "buy"},
{kanji:"新しい", meaning: "new"},
{kanji:"小さい", meaning: "small"},
{kanji:"来ます", meaning: "come"},
{kanji:"時間", meaning: "time"},
{kanji:"分ぐらい", meaning: "minute"},
{kanji:"好きです", meaning: "like"},
{kanji:"問", meaning: "questions"},
)

//most used
answers.push(
{kanji:"日", meaning: "day"},
{kanji:"人", meaning: "person"},
//{kanji:"一", meaning: "one"},
{kanji:"大", meaning: "big"},
{kanji:"年", meaning: "year"},
{kanji:"本", meaning: "book"},
{kanji:"中", meaning: "middle"}
)
shuffleArray(answers)


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const App = () => {
  const [guess, setGuess] = useState('');
  const [currentKanji, setCurrentKanji] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const guessChange = (e) => {
    if(!gameOver){
      setGuess(e.target.value);

      if(e.target.value == answers[currentKanji].meaning){
        toast("Correct!")
        setScore(score+1)
        setShowHint(false);

        console.log([answers.length, currentKanji])
        if(answers.length <= currentKanji+1)
        {
          setGameOver(true)
          e.target.disabled = true;
          toast("Finished!")
        }
        else {
          setGuess("");
          setCurrentKanji(currentKanji+1)
        }
      }
    }
  }

  const resetGame = (e) => {
    window.location.reload()
  }

  /*
  * Keylog for shortcut
  */
  const handleKeyPress = (e) => {
    //console.log(`Key pressed: ${e.key}`);
    if(e.key == "ArrowRight"){
      if(showHint == false){
        setHintsUsed(hintsUsed+1)
      }
      setShowHint(!showHint)
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
      <>
        <div style={{fontSize: "3em"}}>{answers[currentKanji].kanji}</div>
      </>
      <div style={{height: "30px"}}>{showHint &&
        <>
          "{answers[currentKanji].meaning}"
        </>
      }
      </div>
      Guess:
      <input 
        type="text"
        onChange={guessChange}
        value={guess}
      />
      <div style={{fontSize: "0.7em",paddingTop: "0.3em",}}>{score} / {answers.length} 
        {hintsUsed > 0 && 
          <div style={{color: "red"}}>-{hintsUsed}</div>
        }
      </div>
      {gameOver &&
        <>
          <Button  style={{marginTop: "1em"}} onClick={resetGame} variant="contained">Reset</Button>
        </>
      }

      <div style={{position: "absolute",bottom: "0", right: "0", margin: "0.3em", fontSize: "0.7em"}}>ArrowRight to show hints</div>
      </header>
    </div>
  );
}

export default App;
