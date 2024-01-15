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
import { PickersDay } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import {answersFile} from './answers.js';

var answers = answersFile()

//test
var emptyKanji = {kanji:"404", reading: "404", meanings: ["404"], categories: ["404"]};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*
*
*   Select kanji categories and other options
*
*/
const GameStartOptions = (props) => {
  const { onClose, open, ...other } = props;
  const [lastAddedDate, setLastAddedDate] = useState("1970-01-01");
  const [kanjiAddedDays, setKanjiAddedDays] = useState([]);
  const [kanjiLimit, setKanjiLimit] = useState(100);
  const [fillToLimit, setFillToLimit] = useState(false)
  const [selectedKanji, setSelectedKanji] = useState({
    allKanji: false,
    numbers: false,
    days: false,
    interesting:false,
    mostUsed: false,
    lastAdded: false,
    hiragana: false,
    katakana: false,
    kyoikuGrade1: false,
    kyoikuGrade2: false,
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
    kyoikuGrade1: 0,
    kyoikuGrade2: 0,
  });

  const handleOk = () => {
    console.log("closing")
    let limitFillArr = answers.slice();

    let categories = Object.entries(selectedKanji)
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

      //remove kana from limitFillArr
      let kana = ["katakana","hiragana"];
      if(limitFillArr[i].categories.some(r=>kana.map((element) => {return element}).includes(r) )) {
        limitFillArr.splice(i,1)
      }
    }

    if(!answers.length){
      answers.push(emptyKanji);
    }
    else{
      //shuffle to guarantee even last of category 
      //gets sometimes picked if limit lower than category size
      shuffleArray(answers)
      if(fillToLimit){
        //2nd shuffle to get random added on stuff
        shuffleArray(limitFillArr)
        answers.push(...limitFillArr)
      }
      answers = answers.slice(0,kanjiLimit)
      //3rd shuffle to mix the two together
      shuffleArray(answers)
    }

    onClose(selectedKanji);
  };

  const handleCheck = (e) => {
    if(e.target.name == "fillToLimit"){
      setFillToLimit(!fillToLimit)
    }
    else if(e.target.name == "allKanji"){
      if(selectedKanji.allKanji){
        setSelectedKanji({
          ...selectedKanji,
          allKanji: false,
          numbers: false,
          days: false,
          interesting:false,
          mostUsed: false,
          lastAdded: false,
          kyoikuGrade1: false,
          kyoikuGrade2: false,
        })
      }else{
        setSelectedKanji({
          ...selectedKanji,
          allKanji: true,
          numbers: true,
          days: true,
          interesting:true,
          mostUsed: true,
          kyoikuGrade1: true,
          kyoikuGrade2: true,
          lastAdded: false,
        })
      }
    }else{
      setSelectedKanji({...selectedKanji, [e.target.name]: !selectedKanji[e.target.name]})
    }
  }

  const handleLimitChange = (e) => {
    setKanjiLimit(e.target.value);
  }

  //run once
  useEffect(() => {
    //loop through answers
    let temp = catCount;
    let date = lastAddedDate;
    let tempAddedDays = [];
    for(let i=0;i<answers.length;i++){
      //count kanji per category
      for(let j=0;j<answers[i].categories.length;j++){
        temp={...temp,[answers[i].categories[j]]: temp[answers[i].categories[j]] +1};
      }

      tempAddedDays.push(answers[i].date)

      //get latest date
      if(answers[i].date > date){
        date = answers[i].date
      }
    }
    setCatCount({...catCount,...temp});
    setLastAddedDate(date)
    setKanjiAddedDays([...kanjiAddedDays,...tempAddedDays.filter(onlyUnique)])
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

  //array filter to get rid of duplicates
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

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

  /*
  * Show different color for specific days, most copied from:
  * https://stackoverflow.com/questions/76044305/how-to-highlight-some-specific-days
  * https://stackoverflow.com/questions/75813698
  */
  const CustomDay = (props) => {
      //console.log(JSON.stringify(props));
      const matchedStyles = kanjiAddedDays.reduce((a, v) => {
          const date = new Date(props.day);
          return dayjs(date).isSame(v, "day") ? { backgroundColor: "#b2b2b2" } : a;
      }, {});
      return <PickersDay {...props} sx={{ ...matchedStyles }} />;
  };

  return (
    <>
      <Dialog open={open} {...other}>
        <DialogTitle>Kanji guesser options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose quiz contents<br/><br/>
          </DialogContentText>
          <Checkbox name="allKanji" checked={selectedKanji.allKanji} onChange={handleCheck}/>
          All Kanji<br/>
          <Checkbox name="numbers" checked={selectedKanji.numbers} onChange={handleCheck}/>
          Numbers ({catCount.numbers})<br/>
          <Checkbox name="days" checked={selectedKanji.days} onChange={handleCheck}/>
          Days ({catCount.days})<br/>
          <Checkbox  name="interesting" checked={selectedKanji.interesting} onChange={handleCheck} />
          Interesting ({catCount.interesting})<br/>
          <Checkbox name="mostUsed"  checked={selectedKanji.mostUsed} onChange={handleCheck} />
          Most Used ({catCount.mostUsed})<br/>
          <Checkbox name="kyoikuGrade1"  checked={selectedKanji.kyoikuGrade1} onChange={handleCheck} />
          Kyoiku Grade 1 ({catCount.kyoikuGrade1})<br/>
          <Checkbox name="kyoikuGrade2"  checked={selectedKanji.kyoikuGrade2} onChange={handleCheck} />
          Kyoiku Grade 2 ({catCount.kyoikuGrade2})<br/>
          <Checkbox name="lastAdded" checked={selectedKanji.lastAdded} onChange={handleCheck}/>
          Added after ({catCount.lastAdded})<br/>
          <DatePicker
            label="Added after"
            value={dayjs(lastAddedDate)}
            onChange={(addedAfter) => {
              let dayString=dayjs(addedAfter).format('YYYY-MM-DD');
              setSelectedKanji({...selectedKanji,lastAdded: true})
              setLastAddedDate(dayString);
            }}
            slots={{ day: CustomDay }}
          />
          <br/><br/>
          <Checkbox name="hiragana" checked={selectedKanji.hiragana} onChange={handleCheck}/>
          Hiragana ({catCount.hiragana})<br/>
          <Checkbox name="katakana" checked={selectedKanji.katakana} onChange={handleCheck}/>
          Katakana ({catCount.katakana})<br/>
          <hr/>
          Limit: <input id="kanjiLimit" name="kanjiLimit" value={kanjiLimit} type="number" onChange={handleLimitChange}/>
          <Checkbox name="fillToLimit" checked={fillToLimit} onChange={handleCheck}/>
          Fill to limit<br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/*
*   Kanji-guesser quiz
*
*   TODO: 
*   Writing kanji test
*   Save failed, to try next time
*   List view to see available kanji
*   Darken datepicker https://mui.com/material-ui/customization/dark-mode/
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
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    console.log("game started")
    console.log(JSON.stringify(answers))
    setOpen(false);
  };

  const guessChange = (e) => {
    if(!gameOver){
      setGuess(e.target.value);

      if(answers[currentKanji].meanings.findIndex(element => {
        return element.toLowerCase() === e.target.value.toLowerCase();
      }) !== -1){
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
