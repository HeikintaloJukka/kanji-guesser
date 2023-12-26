import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useCallback, useEffect} from 'react';
import Button from '@mui/material/Button';

var answers = []
//numbers
answers.push(
{kanji:"一", reading: "ichi", meanings:["1"]},
{kanji:"二", reading: "ni", meanings:["2"]},
{kanji:"三", reading: "san", meanings:["3"]},
{kanji:"四", reading: "yo/yon", meanings:["4"]},
{kanji:"五", reading: "go", meanings:["5"]},
{kanji:"六", reading: "roku", meanings:["6"]},
{kanji:"七", reading: "shichi/nana", meanings:["7"]},
{kanji:"八", reading: "hachi", meanings:["8"]},
{kanji:"九", reading: "ku/kyu", meanings:["9"]},
{kanji:"十", reading: "jyu", meanings:["10"]},
{kanji:"百", reading: "hyaku", meanings:["100"]},
{kanji:"千", reading: "sen", meanings:["1000"]},
)

//days
answers.push(
{kanji:"土曜日",reading: "doyoubi", meanings:["saturday"]},
{kanji:"日曜日",reading: "nichiyoubi", meanings:["sunday"]}
)

//random interesting ones
answers.push(
{kanji:"古い", reading: "furui",meanings: ["old"]},
//{kanji:"大き", reading: "ooki",meanings: ["big"]},
{kanji:"買います", reading: "kaimasu", meanings: ["buy"]},
{kanji:"新しい", reading: "atarashi", meanings: ["new"]},
{kanji:"小さい", reading: "chiisai", meanings: ["small"]},
{kanji:"来ます", reading: "kimasu", meanings: ["come"]},
{kanji:"時間", reading: "jikan", meanings: ["time"]},
{kanji:"分ぐらい", reading: "fungurai", meanings: ["minute"]},
{kanji:"好きです", reading: "sukidesu", meanings: ["like"]},
{kanji:"問", reading: "mon/toi", meanings: ["questions", "question"]},
{kanji:"何", reading: "nan", meanings: ["what"]},
{kanji:"何時", reading: "nanji", meanings: ["when"]},
{kanji:"水", reading: "mizu", meanings: ["water"]},
{kanji:"食べます", reading: "tabemasu", meanings: ["eat"]},
{kanji:"高たか", reading: "takai", meanings: ["expensive"]},
{kanji:"少すこ", reading: "sukoshi", meanings: ["a bit"]},
)

//most used
answers.push(
{kanji:"日", reading: "hi", meanings: ["day"]},
{kanji:"人", reading: "hito", meanings: ["person"]},
//{kanji:"一", reading: "ichi", meanings: ["one"]},
{kanji:"大", reading: "dai", meanings: ["big"]},
{kanji:"年", reading: "nen", meanings: ["year"]},
{kanji:"本", reading: "hon", meanings: ["book"]},
{kanji:"中", reading: "chu", meanings: ["middle"]},
{kanji:"出", reading: "deru", meanings: ["come out"]},
{kanji:"時", reading: "toki", meanings: ["time"]},
{kanji:"行", reading: "gyi", meanings: ["to go","row"]},
{kanji:"事", reading: "koto", meanings: ["matter","job"]},
//{kanji:"分", reading: "fun", meanings: ["minute"]},
{kanji:"会", reading: "kai", meanings: ["meeting"]},
{kanji:"上", reading: "ue", meanings: ["above","upper"]},
{kanji:"生", reading: "nama", meanings: ["raw","live"]},
{kanji:"国", reading: "kuni", meanings: ["land","large place"]},
)

//test
answers.push(
//{kanji:"国", reading: "kuni", meanings: ["land","large place"]},
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
  const [showReading, setShowReading] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const guessChange = (e) => {
    if(!gameOver){
      setGuess(e.target.value);

      if(answers[currentKanji].meanings.includes( e.target.value )){
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

    if(e.key == "ArrowLeft"){
      setShowReading(!showReading)
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

      <div style={{height: "0px"}}>
      {showReading &&
        <div style={{height: "0px",fontSize: "0.7em",marginTop:"-1em"}}>
          {
            answers[currentKanji].reading
          }
        </div>
      }
      </div>
      <div style={{fontSize: "3em"}}>{answers[currentKanji].kanji}</div>
      <div id="meanings" style={{height: "30px", fontSize: "0.7em",}}>
      {showHint &&
        <>
          {
            //for numbered .map( (element, i) => {return (i+1+ '. "' + element + '"')} ).join(', ')
            answers[currentKanji].meanings.map( (element) => {return ('"' + element + '"')} ).join(', ')
          }
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
      <div style={{position: "absolute",bottom: "1.5em", right: "0em", margin: "0.3em", fontSize: "0.5em"}}>
        ArrowRight to show hints
      </div>
      <div style={{position: "absolute",bottom: "0em", right: "0em", margin: "0.3em", fontSize: "0.5em"}}>
        ArrowLeft to show reading
      </div>
      </header>
    </div>
  );
}

export default App;
