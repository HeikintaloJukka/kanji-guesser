import './App.css';
import './animista.css';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useCallback, useEffect} from 'react';
import Button from '@mui/material/Button';
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
var emptyKanji = {kanji:"404", reading: "404", meanings: ["404"], categories: ["404"], date:"1970-01-01"};

const slideIn = cssTransition({
  enter: "slide-in-right",
  exit: "slit-out-vertical"
});

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {  
    var j = Math.floor(Math.random() * (i + 1));
              
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }  
  return array;
}

function shuffleArrayInplace(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//array filter to get rid of duplicates
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
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
  const [enableKanjiLimit, setEnableKanjiLimit] = useState(false)
  const [fillToLimit, setFillToLimit] = useState(false)
  const [addPreviousFailed, setAddPreviousFailed] = useState(false)
  const [clickButtonMode, setClickButtonMode] = useState(false)
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
    kyoikuGrade3: false,
    kyoikuGrade4: false,
    kyoikuGrade5: false,
    kyoikuGrade6: false,
    kyoikuGradeExtra: false,
    joyoKanjiSect1: false,
    joyoKanjiSect2: false,
    joyoKanjiSect3: false,
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
    kyoikuGrade3: 0,
    kyoikuGrade4: 0,
    kyoikuGrade5: 0,
    kyoikuGrade6: 0,
    kyoikuGradeExtra: 0,
    joyoKanjiSect1: 0,
    joyoKanjiSect2: 0,
    joyoKanjiSect3: 0,
  });

  const handleOk = () => {
    console.log("closing")
    let limitFillArr = answers.slice();

    let categories = Object.entries(selectedKanji)
    for(let i=categories.length-1;i>=0;i--){
      if(categories[i][1] !== true){
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

    //get failed answers from localstorage
    if(addPreviousFailed && (localStorage.getItem("failedKanji") && JSON.parse(localStorage.getItem("failedKanji")).length > 0)){
      let parsedStorage = JSON.parse(localStorage.getItem("failedKanji"));
      //get rid of containing object
      for(let i=0;i<parsedStorage.length;i++){
        parsedStorage[i] = parsedStorage[i].failedKanji
      }

      //only want unique fails over multiple attempts
      //can't use onlyUnique filter since object references don't match even if their content does
      //so content compare from
      //https://stackoverflow.com/questions/43245563
      const uniqueFromStorageArr = parsedStorage.flat(1).filter((value, index, self) => {
        return self.findIndex(v => v.kanji === value.kanji) === index;
      })

      answers.push(...uniqueFromStorageArr)
    }

    if(!answers.length){
      answers.push(emptyKanji);
    }
    else{
      //shuffle to guarantee even last of category 
      //gets sometimes picked if limit lower than category size
      shuffleArrayInplace(answers)
      if(enableKanjiLimit){
        if(fillToLimit){
          //2nd shuffle to get random added on stuff
          shuffleArrayInplace(limitFillArr)
          answers.push(...limitFillArr)
        }
        answers = answers.slice(0,kanjiLimit)
        //3rd shuffle to mix the two together
        shuffleArrayInplace(answers)
      }
    }

    //pass variables to parent
    onClose({
      clickButtonMode: clickButtonMode
    });
  };

  const handleCheck = (e) => {
    if(e.target.name === "fillToLimit"){
      setFillToLimit(!fillToLimit)
    }
    else if(e.target.name === "clickButtonMode"){
      setClickButtonMode(!clickButtonMode)
    }
    else if(e.target.name === "enableKanjiLimit"){
      setEnableKanjiLimit(!enableKanjiLimit)
    }
    else if(e.target.name === "addPreviousFailed"){
      setAddPreviousFailed(!addPreviousFailed)
    }
    else if(e.target.name === "allKanji"){
      if(selectedKanji.allKanji){
        setSelectedKanji(prevState => ({
          ...prevState,
          allKanji: false,
          numbers: false,
          days: false,
          interesting:false,
          mostUsed: false,
          lastAdded: false,
          kyoikuGrade1: false,
          kyoikuGrade2: false,
          kyoikuGrade3: false,
          kyoikuGrade4: false,
          kyoikuGrade5: false,
          kyoikuGrade6: false,
          kyoikuGradeExtra: false,
          joyoKanjiSect1: false,
          joyoKanjiSect2: false,
          joyoKanjiSect3: false,
        }))
      }else{
        setSelectedKanji(prevState => ({
          ...prevState,
          allKanji: true,
          numbers: true,
          days: true,
          interesting:true,
          mostUsed: true,
          kyoikuGrade1: true,
          kyoikuGrade2: true,
          kyoikuGrade3: true,
          kyoikuGrade4: true,
          kyoikuGrade5: true,
          kyoikuGrade6: true,
          kyoikuGradeExtra: true,
          joyoKanjiSect1: true,
          joyoKanjiSect2: true,
          joyoKanjiSect3: false,
          lastAdded: false,
        }))
      }
    }else{
      setSelectedKanji(prevState => {
        return {...prevState, [e.target.name]: !prevState[e.target.name]}
      })
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
    setCatCount(prevState => {
     return {...prevState,...temp}
    });
    setLastAddedDate(date)
    setKanjiAddedDays(prevState => {
      return [...prevState,...tempAddedDays.filter(onlyUnique)]
    })

    //clear older than 6 hours failedKanji from localstorage
    if(localStorage.getItem("failedKanji")){
      let tempFailedKanji = JSON.parse(localStorage.getItem("failedKanji"));
      for(let i=tempFailedKanji.length-1;i>=0;i--){
        //older than 2 days
        if(dayjs(Date.now()).diff(tempFailedKanji[i].date,"hour") >= 6){
          tempFailedKanji.splice(i,1)
        }
      }
      localStorage.setItem("failedKanji",JSON.stringify(tempFailedKanji));
    }

    //eslint-disable-next-line
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
    setCatCount(prevState => {
      return {...prevState,lastAdded:count};
    });
  }, [lastAddedDate]);

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
        <DialogTitle class="tracking-in-expand" style={{textAlign: "center"}}>Kanji guesser options</DialogTitle>
        <DialogContent >
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
          <Checkbox name="kyoikuGrade3"  checked={selectedKanji.kyoikuGrade3} onChange={handleCheck} />
          Kyoiku Grade 3 ({catCount.kyoikuGrade3})<br/>
          <Checkbox name="kyoikuGrade4"  checked={selectedKanji.kyoikuGrade4} onChange={handleCheck} />
          Kyoiku Grade 4 ({catCount.kyoikuGrade4})<br/>
          <Checkbox name="kyoikuGrade5"  checked={selectedKanji.kyoikuGrade5} onChange={handleCheck} />
          Kyoiku Grade 5 ({catCount.kyoikuGrade5})<br/>
          <Checkbox name="kyoikuGrade6"  checked={selectedKanji.kyoikuGrade6} onChange={handleCheck} />
          Kyoiku Grade 6 ({catCount.kyoikuGrade6})<br/>
          <Checkbox name="kyoikuGradeExtra"  checked={selectedKanji.kyoikuGradeExtra} onChange={handleCheck} />
          Kyoiku Grade Pref ({catCount.kyoikuGradeExtra})<br/>
          <Checkbox name="joyoKanjiSect1"  checked={selectedKanji.joyoKanjiSect1} onChange={handleCheck} />
          Joyo kanji section 1 ({catCount.joyoKanjiSect1})<br/>
          <Checkbox name="joyoKanjiSect2"  checked={selectedKanji.joyoKanjiSect2} onChange={handleCheck} />
          Joyo kanji section 2 ({catCount.joyoKanjiSect2})<br/>
          <Checkbox name="joyoKanjiSect3"  checked={selectedKanji.joyoKanjiSect3} onChange={handleCheck} />
          Joyo kanji section 3 ({catCount.joyoKanjiSect3})<br/>
          <Checkbox name="lastAdded" checked={selectedKanji.lastAdded} onChange={handleCheck}/>
          Added after ({catCount.lastAdded})<br/>
          <DatePicker
            label="Added after"
            value={dayjs(lastAddedDate)}
            onChange={(addedAfter) => {
              let dayString=dayjs(addedAfter).format('YYYY-MM-DD');
              setSelectedKanji(prevState => {
                return {...prevState,lastAdded: true}
              })
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
          <Checkbox name="enableKanjiLimit" checked={enableKanjiLimit} onChange={handleCheck}/>
          Use limit:
          <span style={{paddingRight:"0.5em"}}/>
          <input id="kanjiLimit" name="kanjiLimit" value={kanjiLimit} type="number" onChange={handleLimitChange} disabled={!enableKanjiLimit}/>
          <br/>
          <Checkbox name="fillToLimit" checked={fillToLimit} onChange={handleCheck} disabled={!enableKanjiLimit}/>
          Fill to limit<br/>
          <hr/>
          <Checkbox name="addPreviousFailed" checked={addPreviousFailed} onChange={handleCheck} />
          Add previously failed<br/>
          <Checkbox name="clickButtonMode" checked={clickButtonMode} onChange={handleCheck} />
          Click button mode (Mobile)<br/>
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
*   TODO MEMO: 
*   Remove dupes in limitfill
*   Show total when selecting
*   Writing kanji test
*   List view to see available kanji
*   try out https://ui.shadcn.com/
*   Add play again
*/
const App = () => {
  const [guess, setGuess] = useState('');
  const [currentKanji, setCurrentKanji] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [scorePenalty, setScorePenalty] = useState(0);
  const [failedKanji, setFailedKanji] = useState([]);
  const [isMobile, setIsMobile] = useState(false)
  const [clickButtonMode, setClickButtonMode] = useState(false)
  const [answerButtons, setAnswerButtons] = useState([])
  const [currentKanjiFailed, setCurrentKanjiFailed] = useState(false)
  const [gameFinishedBonus, setGameFinishedBonus]= useState(0)

  //dialog stuff
  const [open, setOpen] = useState(true);
  const handleClose = (settings) => {
    console.log("game started")
    console.log(JSON.stringify(answers))
    setClickButtonMode(settings.clickButtonMode)
    //workaround to set buttons after game starts
    setGameOver(false);
    setOpen(false);
  };

  //update clickable button answers
  useEffect(() => {
    let tempAnswers = [
      answers[currentKanji],
      answers[getRandomInt(0, answers.length)],
      answers[getRandomInt(0, answers.length)],
      answers[getRandomInt(0, answers.length)]
    ]
    tempAnswers = shuffleArray(tempAnswers)
    setAnswerButtons(tempAnswers)
  }, [gameOver,currentKanji]);

  const failedAnswer = useCallback((e) => {
    setGuess("");
    setCurrentKanjiFailed(true)
    toast.error("Fail. Answer: "+answers[currentKanji].meanings.map( (element) => {return ('"' + element + '"')} ).join(', '))
    setFailedKanji(prevState => {
      return [...prevState,answers[currentKanji]]
    })
  },[currentKanji])

  const gameOverCheck = (e) => {
    if(answers.length <= currentKanji+1 || gameOver)
    {
      setGameOver(true)
      toast.success("Finished!")
      setGameFinishedBonus(prevState => {
        return prevState +1;
      })
      return true;
    }
    setGuess("");
    setCurrentKanji(prevState => {
      return prevState +1;
    })
    return false;
  }

  //don't show success if already failed on currentKanji
  //this effect clears flag wehen moving to next question
  useEffect(() => {
    setCurrentKanjiFailed(false)
  }, [currentKanji])

  const checkAnswerMobile = (answer) => {
    if(!checkAnswer(answer)){
      failedAnswer();
      setScorePenalty(prevState => {
        return prevState +1;
      })
      gameOverCheck();
    }
  }

  const checkAnswer = (answer) => {
    if(answers[currentKanji].meanings.findIndex(element => {
      return element.toLowerCase() === answer.toLowerCase();
    }) !== -1){
      console.log([answers.length, currentKanji])
      if(currentKanjiFailed === false){
        toast.success("Correct!")
      }
      setShowHint(false);
      gameOverCheck();
      return true;
    }
    return false;
  }

  const guessChange = (e) => {
    if(!gameOver){
      setGuess(e.target.value);

      checkAnswer(e.target.value);
    }
  }

  const resetGame = (e) => {
    /*Save failed to localstorage to try again, in format:
      [{
          failedKanji: [failedkanji],
          date: date
      }]*/
    if(failedKanji.length !== 0){
      let failed = [];
      //exists
      if(localStorage.getItem("failedKanji") && JSON.parse(localStorage.getItem("failedKanji")).length > 0){
        failed.push(...JSON.parse(localStorage.getItem("failedKanji")))
      }
      failed.push({failedKanji: failedKanji.filter(onlyUnique),date:Date.now()})
      localStorage.setItem("failedKanji",JSON.stringify(failed))
    }

    //reset
    window.location.reload()
  }

  const updateShowHint = useCallback((e) => {
    if(showHint === false){
      setHintsUsed(prevState => {
        return prevState+1;
      })
    }
    setShowHint(!showHint)
  },[showHint])

  /*
  * Keylog for shortcut
  * https://devtrium.com/posts/how-keyboard-shortcut
  */
  const handleKeyPress = useCallback((e) => {
    //console.log(`Key pressed: ${e.key}`);

    //show answer
    if(e.key === "ArrowDown" || (e.shiftKey === true && e.key === " ")){
      //block from typing space in input
      e.preventDefault();
      if(showHint === false){
        failedAnswer();
      }
      updateShowHint();

    }

    //showhint
    if(e.key === "ArrowUp"){
      setShowReading(!showReading)
    }

    //clear localstorage
    if(e.shiftKey === true && e.key === "N"){
      localStorage.clear();
      toast("Storage cleared")
    }

    //endgame
    if(e.key === "Escape"){
      toast("Game end")
      setGameOver(true)
    }

    //re-render only when below change
  }, [showReading, updateShowHint, failedAnswer, showHint]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  //https://stackoverflow.com/questions/44480053
  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])

  /*
  *  Conditional rendering
  * 
  */
  let guessField="";
  if(clickButtonMode){
    guessField = <>
      <div style={{display:"grid",columnGap:"0.5em",rowGap:"0.5em", gridTemplateColumns: "1fr 1fr", padding:"0.5em"}}>
        <Button 
          disabled={gameOver}
          onClick={() => checkAnswerMobile(answerButtons[0].meanings[0])} 
          variant="contained"
        >{answerButtons[0].meanings[0]}</Button>
        <Button
          disabled={gameOver}
          onClick={() => checkAnswerMobile(answerButtons[1].meanings[0])}
          variant="contained"
        >{answerButtons[1].meanings[0]}</Button>
        <Button
          disabled={gameOver}
          onClick={() => checkAnswerMobile(answerButtons[2].meanings[0])} 
          variant="contained"
        >{answerButtons[2].meanings[0]}</Button>
        <Button
          disabled={gameOver}
          onClick={() => checkAnswerMobile(answerButtons[3].meanings[0])} 
          variant="contained"
        >{answerButtons[3].meanings[0]}</Button>
      </div>
    </>
  } 
  else 
  {
    guessField = <>
      <input 
        disabled={gameOver}
        type="text"
        onChange={guessChange}
        value={guess}
      />
    </>
  }

  let hintHints ="";
  if (isMobile) {  
    hintHints=<>
      <Button 
        style={{position: "absolute",bottom: "3em", right: "0em", padding: "0.3em", fontSize: "0.5em", width: "15vw", minWidth: "100px"}} 
        onClick={() => setShowReading(!showReading)} 
        variant="contained"
      >Show Reading</Button>
      <Button 
        style={{position: "absolute",bottom: "0em", right: "0em", padding: "0.3em", fontSize: "0.5em", width: "15vw", minWidth: "100px"}} 
        onClick={() => updateShowHint()} 
        variant="contained"
      >Show Answer</Button>
    </>
  } 
  else 
  {
    hintHints = <>
      <div style={{position: "absolute",bottom: "1.5em", right: "0em", padding: "0.3em", fontSize: "0.5em"}}>
        ArrowUp to show reading
      </div>
      <div style={{position: "absolute",bottom: "0em", right: "0em", padding: "0.3em", fontSize: "0.5em"}}>
        ArrowDown to show answer
      </div>
    </>;

  }

  /*
  *  Return app visuals
  * 
  */
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={slideIn}
      />
      <GameStartOptions
        id="game-options"
        keepMounted
        open={open}
        onClose={handleClose}
      />
      <header className="App-header">
      <div style={{height: "0px",fontSize: "0.7em",paddingBottom:"1em"}}>
      {showReading &&
        <div>
          {
            answers[currentKanji].reading
          }
        </div>
      }
      </div>
      <div style={{fontSize: "3em"}}>
        <a href={"https://jisho.org/search/"+answers[currentKanji].kanji+" %23kanji"} target="_blank" rel="noreferrer" style={{color: "white",textDecoration: "none"}}>
          {answers[currentKanji].kanji}
        </a>
      </div>
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
      {guessField}
      <div style={{fontSize: "0.7em",paddingTop: "0.3em",}}>{currentKanji+gameFinishedBonus} / {answers.length} 
        {(hintsUsed + scorePenalty) > 0 && 
          <div style={{color: "red"}}>-{hintsUsed+scorePenalty}</div>
        }
      </div>
      {gameOver &&
        <>
          <div style={{paddingTop: "1em", zIndex: "10"}}>
            <Button onClick={resetGame} variant="contained">Reset</Button>
          </div>

          {failedKanji.length > 0 &&
            <>
              <div style={{position: "absolute",bottom: "1.5em",}}>
                <div style={{fontSize: "0.7em",paddingTop: "1.5em",paddingBottom: "0.5em"}}>Failed:</div>
                <div style={{display:"flex", gap:"0.5em", width: "70vw",flexFlow: "row wrap",justifyContent: "center"}}>
                {failedKanji.map(failed => (
                  <div key={Math.random} style={{display: "flex", flexDirection:"column"}}>
                    <div>
                      <a href={"https://jisho.org/search/"+failed.kanji+" %23kanji"} target="_blank" rel="noreferrer" style={{color: "white",textDecoration: "none"}}>
                        {failed.kanji}
                      </a>
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
      {hintHints}
      </header>
    </div>
  );
}

export default App;
