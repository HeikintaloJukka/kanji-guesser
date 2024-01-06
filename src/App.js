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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {answersFile} from './answers.js';

var answers = answersFile()

//test
var emptyKanji = {kanji:"404", reading: "404", meanings: ["404"], categories: ["404"]};
//answers.push(emptyKanji);
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
  const [lastAddedDate, setLastAddedDate] = useState("1970-01-01");
  const [value, setValue] = useState({
    allKanji: false,
    numbers: false,
    days: false,
    interesting:false,
    mostUsed: false,
    lastAdded: false,
    hiragana: false,
    katakana: false,
    kyoikuGrade1: false
  });
  const [catCount, setCatCount] = useState({
    allKanji: 0,
    numbers: 0,
    days: 0,
    interesting:0,
    mostUsed: 0,
    lastAdded: 0,
    hiragana: 0,
    katakana: 0,
    kyoikuGrade1: 0
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
          lastAdded: false,
          kyoikuGrade1: false,
        })
      }else{
        setValue({
          ...value,
          allKanji: true,
          numbers: true,
          days: true,
          interesting:true,
          mostUsed: true,
          kyoikuGrade1: true,
          lastAdded: false
        })
      }
    }else{
      setValue({...value, [e.target.name]: !value[e.target.name]})
    }
  }

  //run once
  useEffect(() => {
    //loop through answers
    let temp = catCount;
    let date = lastAddedDate;
    for(let i=0;i<answers.length;i++){
      //count kanji per category
      for(let j=0;j<answers[i].categories.length;j++){
        temp={...temp,[answers[i].categories[j]]: temp[answers[i].categories[j]] +1};
      }

      //get latest date
      if(answers[i].date > date){
        date = answers[i].date
      }
    }
    setCatCount({...catCount,...temp});
    setLastAddedDate(date)
  }, []);

  useEffect(() => {
    console.log("date changed")
    //add tag for last added
    let count = 0;
    for(let i=0;i<answers.length;i++){
      //remove earlier lastAdded tags
      const index = answers[i].categories.indexOf("lastAdded");
      if (index > -1) {
        answers[i].categories.splice(index, 1);
      }

      //re add tag
      if(answers[i].date >= lastAddedDate){
        answers[i].categories.push("lastAdded");
        count++
      }
    }
    setCatCountOutOfUseEffect(count)
  }, [lastAddedDate]);

  //black magic, useeffect was apparently batch overriding earlier category setting with newer empty
  //https://stackoverflow.com/questions/57782905/setstate-override-existing-state
  const setCatCountOutOfUseEffect = (count) => {
    setCatCount(latestCatCount => {
      return {
        ...latestCatCount,
        lastAdded:count
      };
    });
  };

  return (
    <>
      <Dialog open={open} {...other}>
        <DialogTitle>Kanji guesser options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose quiz contents<br/><br/>
          </DialogContentText>
          <Checkbox name="allKanji" checked={value.allKanji} onChange={handleCheck}/>
          All Kanji<br/>
          <Checkbox name="numbers" checked={value.numbers} onChange={handleCheck}/>
          Numbers ({catCount.numbers})<br/>
          <Checkbox name="days" checked={value.days} onChange={handleCheck}/>
          Days ({catCount.days})<br/>
          <Checkbox  name="interesting" checked={value.interesting} onChange={handleCheck} />
          Interesting ({catCount.interesting})<br/>
          <Checkbox name="mostUsed"  checked={value.mostUsed} onChange={handleCheck} />
          Most Used ({catCount.mostUsed})<br/>
          <Checkbox name="kyoikuGrade1"  checked={value.kyoikuGrade1} onChange={handleCheck} />
          Kyoiku Grade 1 ({catCount.kyoikuGrade1})<br/>
          <Checkbox name="lastAdded" checked={value.lastAdded} onChange={handleCheck}/>
          Added after ({catCount.lastAdded})<br/>
          <DatePicker
            label="Added after"
            value={dayjs(lastAddedDate)}
            onChange={(addedAfter) => {
              let dayString=dayjs(addedAfter).format('YYYY-MM-DD');
              setValue({...value,lastAdded: true})
              setLastAddedDate(dayString);
            }}
          />
          <br/><br/>
          <Checkbox name="hiragana" checked={value.hiragana} onChange={handleCheck}/>
          Hiragana ({catCount.hiragana})<br/>
          <Checkbox name="katakana" checked={value.katakana} onChange={handleCheck}/>
          Katakana ({catCount.katakana})<br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/*
*   TODO: 
*   Allow setting max amount of kanji for quiz
*   Writing kanji test
*   Check duplicate answer list?
*   Fix last added number in bbuild
*   Show add dates in datepicker
*/
const App = () => {
  const [guess, setGuess] = useState('');
  const [currentKanji, setCurrentKanji] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [failedKanji, setFailedKanji] = useState([]);

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
    if(e.key == "ArrowDown"){
      if(showHint == false){
        setHintsUsed(hintsUsed+1)
        setFailedKanji([...failedKanji,answers[currentKanji]])
      }
      setShowHint(!showHint)
    }

    if(e.key == "ArrowUp"){
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

          {failedKanji.length > 0 &&
            <>
              <div style={{position: "absolute",bottom: "1.5em",}}>
                <div style={{fontSize: "0.7em",paddingTop: "1.5em",paddingBottom: "0.5em"}}>Failed:</div>
                <div style={{display:"flex", gap:"0.5em", width: "70vw",flexFlow: "row wrap",justifyContent: "center"}}>
                {failedKanji.map(failed => (
                  <div key={Math.random} style={{display: "flex", flexDirection:"column"}}>
                    <div>
                      {failed.kanji}
                    </div>
                    <div  style={{fontSize: "0.5em",}}>
                      {failed.meanings[0]}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </>
          }
        </>
      }
      <div style={{position: "absolute",bottom: "1.5em", right: "0em", margin: "0.3em", fontSize: "0.5em"}}>
        ArrowUp to show reading
      </div>
      <div style={{position: "absolute",bottom: "0em", right: "0em", margin: "0.3em", fontSize: "0.5em"}}>
        ArrowDown to show answer
      </div>
      </header>
    </div>
  );
}

export default App;
