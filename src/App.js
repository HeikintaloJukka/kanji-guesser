import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useCallback, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';

var answers = []
//numbers
answers.push(
{kanji:"一", reading: "ichi", meanings:["1"], categories: ["numbers"]},
{kanji:"二", reading: "ni", meanings:["2"], categories: ["numbers"]},
{kanji:"三", reading: "san", meanings:["3"], categories: ["numbers"]},
{kanji:"四", reading: "yo/yon", meanings:["4"], categories: ["numbers"]},
{kanji:"五", reading: "go", meanings:["5"], categories: ["numbers"]},
{kanji:"六", reading: "roku", meanings:["6"], categories: ["numbers"]},
{kanji:"七", reading: "shichi/nana", meanings:["7"], categories: ["numbers"]},
{kanji:"八", reading: "hachi", meanings:["8"], categories: ["numbers"]},
{kanji:"九", reading: "ku/kyu", meanings:["9"], categories: ["numbers"]},
{kanji:"十", reading: "jyu", meanings:["10"], categories: ["numbers"]},
{kanji:"百", reading: "hyaku", meanings:["100"], categories: ["numbers"]},
{kanji:"千", reading: "sen", meanings:["1000"], categories: ["numbers"]},
)

//days
answers.push(
{kanji:"土曜日",reading: "doyoubi", meanings:["saturday"], categories: ["days"]},
{kanji:"日曜日",reading: "nichiyoubi", meanings:["sunday"], categories: ["days"]},
)

//random interesting ones
answers.push(
{kanji:"古い", reading: "furui",meanings: ["old"], categories: ["interesting"]},
//{kanji:"大き", reading: "ooki",meanings: ["big"], categories: ["interesting"]},
{kanji:"買います", reading: "kaimasu", meanings: ["buy"], categories: ["interesting"]},
{kanji:"新しい", reading: "atarashi", meanings: ["new"], categories: ["interesting"]},
{kanji:"小さい", reading: "chiisai", meanings: ["small"], categories: ["interesting"]},
{kanji:"来ます", reading: "kimasu", meanings: ["come"], categories: ["interesting"]},
{kanji:"時間", reading: "jikan", meanings: ["time"], categories: ["interesting"]},
{kanji:"分ぐらい", reading: "fungurai", meanings: ["minute"], categories: ["interesting"]},
{kanji:"好きです", reading: "sukidesu", meanings: ["like"], categories: ["interesting"]},
{kanji:"問", reading: "mon/toi", meanings: ["questions", "question"], categories: ["interesting", "lastAdded"]},
{kanji:"何", reading: "nan", meanings: ["what"], categories: ["interesting", "lastAdded"]},
{kanji:"何時", reading: "nanji", meanings: ["when"], categories: ["interesting", "lastAdded"]},
{kanji:"水", reading: "mizu", meanings: ["water"], categories: ["interesting", "lastAdded"]},
{kanji:"食べます", reading: "tabemasu", meanings: ["eat"], categories: ["interesting", "lastAdded"]},
{kanji:"高", reading: "takai", meanings: ["expensive"], categories: ["interesting", "lastAdded"]},
{kanji:"少すこ", reading: "sukoshi", meanings: ["a bit"], categories: ["interesting", "lastAdded"]},
)

//mostUsed
answers.push(
{kanji:"日", reading: "hi", meanings: ["day"], categories: ["mostUsed"]},
{kanji:"人", reading: "hito", meanings: ["person"], categories: ["mostUsed"]},
//{kanji:"一", reading: "ichi", meanings: ["one"], categories: ["mostUsed"]},
{kanji:"大", reading: "dai", meanings: ["big"], categories: ["mostUsed"]},
{kanji:"年", reading: "nen", meanings: ["year"], categories: ["mostUsed"]},
{kanji:"本", reading: "hon", meanings: ["book"], categories: ["mostUsed"]},
{kanji:"中", reading: "chu", meanings: ["middle"], categories: ["mostUsed"]},
{kanji:"出", reading: "deru", meanings: ["come out"], categories: ["mostUsed", "lastAdded"]},
{kanji:"時", reading: "toki", meanings: ["time"], categories: ["mostUsed", "lastAdded"]},
{kanji:"行", reading: "gyi", meanings: ["to go","row"], categories: ["mostUsed", "lastAdded"]},
{kanji:"事", reading: "koto", meanings: ["matter","job"], categories: ["mostUsed", "lastAdded"]},
//{kanji:"分", reading: "fun", meanings: ["minute"], categories: ["mostUsed", "lastAdded"]},
{kanji:"会", reading: "kai", meanings: ["meeting"], categories: ["mostUsed", "lastAdded"]},
{kanji:"上", reading: "ue", meanings: ["above","upper"], categories: ["mostUsed", "lastAdded"]},
{kanji:"生", reading: "nama", meanings: ["raw","live"], categories: ["mostUsed", "lastAdded"]},
{kanji:"国", reading: "kuni", meanings: ["land","large place"], categories: ["mostUsed", "lastAdded"]},
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

const GameStartOptions = (props) => {
  //const [allKanji, setAllKanji] = useState(false);

  const { onClose, open, ...other } = props;
  const [value, setValue] = useState({
    allKanji: false,
    numbers: false,
    days: false,
    interesting:false,
    mostUsed: false,
    lastAdded: false
  });
  const handleOk = () => {
    onClose(value);
  };

  const handleCheck = (e) => {
    if(e.target.name == "allKanji"){
      if(value.allKanji){
        setValue({
          ...value,
          allKanji: false,
          numbers: false,
          days: false,
          interesting:false,
          mostUsed: false,
          lastAdded: false
        })
      }else{
        setValue({
          ...value,
          allKanji: true,
          numbers: true,
          days: true,
          interesting:true,
          mostUsed: true,
          lastAdded: false
        })
      }
    }else{
      setValue({...value, [e.target.name]: !value[e.target.name]})
    }
  }

  return (
    <>
      <Dialog open={open} {...other}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose quiz contents below
          </DialogContentText>
          All Kanji <Checkbox name="allKanji" checked={value.allKanji} onChange={handleCheck}/><br/>
          Numbers <Checkbox name="numbers" checked={value.numbers} onChange={handleCheck}/><br/>
          Days <Checkbox name="days" checked={value.days} onChange={handleCheck}/><br/>
          Interesting <Checkbox  name="interesting" checked={value.interesting} onChange={handleCheck} /><br/>
          Most Used <Checkbox name="mostUsed"  checked={value.mostUsed} onChange={handleCheck} /><br/>
          Last Added <Checkbox name="lastAdded" checked={value.lastAdded} onChange={handleCheck}/><br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const App = () => {
  const [guess, setGuess] = useState('');
  const [currentKanji, setCurrentKanji] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  //dialog stuff
  const [value, setValue] = useState('temp');
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    console.log("closing dialog")

    let categories = Object.entries(e)
    for(let i=categories.length-1;i>=0;i--){
      if(!categories[i][1]){
        categories.splice(i,1)
      }
    }

    for(let i=answers.length-1;i>=0;i--){
      //check questions categories against enabled ones if question doesn't have any enabled categories remove it
      if(!answers[i].categories.some( r=>categories.map((element) => {return element[0]}).includes(r) )) {
        answers.splice(i,1)
      }
    }

    setOpen(false);
  };

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
      <GameStartOptions
        id="game-options"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
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
