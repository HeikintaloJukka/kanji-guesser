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
import {answersFile} from './answers.js';

var answers = answersFile()

//test
var emptyKanji = {kanji:"404", reading: "404", meanings: ["404"], categories: ["404"]};
answers.push(emptyKanji);
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
        <DialogTitle>Kanji guesser options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose quiz contents<br/><br/>
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

    if(!answers.length){
      answers.push(emptyKanji);
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
