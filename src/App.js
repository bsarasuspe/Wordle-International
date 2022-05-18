import {
  Main,
  Header,
  GameSection,
  TileContainer,
  TileRow,
  Tile,
  KeyboardSection,
  KeyboardRow,
  KeyboardButton,
  Flex,
  ShareModal,
  Heading,
  Row,
  ShareButton,
} from "./styled";
import { BackspaceIcon } from "./icons";
import "./App.css";
import React, { useEffect, useRef, useState, DropDown, DropDownItem, DropDownMenu, DropDownToggle} from "react";
import Modal from "react-modal";
import JsonDataES from './json/hiztegiJSON-ES.json';
import JsonDataEU from './json/hiztegiJSON-EUS.json';
import JsonDataEN from './json/hiztegiJSON-EN.json';

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

const keyboardColors = {
    "q": "default", "w": "default", "e": "default", "r": "default", "t": "default", "y": "default", "u": "default", "i": "default", "o": "default", "p": "default",
    "a": "default", "s": "default", "d": "default", "f": "default", "g": "default", "h": "default", "j": "default", "k": "default", "l": "default", "ñ": "default",
"enter": "default", "z": "default", "x": "default", "c": "default", "v": "default", "b": "default", "n": "default", "m": "default", "backspace": "default"};

const texts = {
    "es": ["ES", "Ayuda", "La palabra que has metido no existe.", "¡Has ganado!", "Compartir", "¡Copiado!", "¡Has perdido!", "Cerrar", "Elige el idioma:", "La respuesta era:", "Palabras posibles:"],
    "en": ["EN", "Help", "The word you entered does not exist.", "You won!", "Share", "Copied!", "You lost!", "Close", "Choose the language:", "The answer was:", "Posible words:"],
    "eu": ["EU", "Laguntza", "Sartu duzun hitza ez da existitzen.", "Irabazi duzu!", "Partekatu", "Kopiatuta!", "Galdu egin duzu!", "Itxi", "Aukeratu hizkuntza:", "Emaitza hau zen:", "Hitz posibleak:"]
};

const allKeys = keyboardRows.flat();

const wordLength = 5;

var keyboardDisabled = false;

var wordsArrayES = [];
var wordsArrayEU = [];
var wordsArrayEN = [];

var hasLetter = [];

var wordsArrayLaguntza = []; // Laguntza eskatzerakoan agertuko diren hitzak gordetzeko

var showWord = "";

const newGame = {
  0: Array.from({ length: wordLength }).fill(""),
  1: Array.from({ length: wordLength }).fill(""),
  2: Array.from({ length: wordLength }).fill(""),
  3: Array.from({ length: wordLength }).fill(""),
  4: Array.from({ length: wordLength }).fill(""),
  5: Array.from({ length: wordLength }).fill(""),
};

let lang = "es";

const fetchWord = (word) => {
    var wordsArray = [];
    if (lang == "es") {
        wordsArray = wordsArrayES;
    } else if (lang == "eu") {
        wordsArray = wordsArrayEU;
    } else {
        wordsArray = wordsArrayEN;
    }
    var lag = [];
    if (wordsArray.includes(word)) {
        return lag;
    } else {
        return null;
    }
/*  return fetch(`${API_URL}/${word}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log("err:", err));*/
    
};

function App() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    lang = params.get('language');
    if (lang == null) {
        lang = "es";
    };

    wordsArrayEU = [];
    wordsArrayES = [];
    wordsArrayEN = [];

    if (wordsArrayEU.length == 0) {
        JsonDataEU.hitzak && JsonDataEU.hitzak.map(item => {
            return (wordsArrayEU.push(item.hitza))
        });
    }

    if (wordsArrayES.length == 0) {
        JsonDataES.hitzak && JsonDataES.hitzak.map(item => {
            return (wordsArrayES.push(item.hitza))
        });
    }

    if (wordsArrayEN.length == 0) {
        JsonDataEN.hitzak && JsonDataEN.hitzak.map(item => {
            return (wordsArrayEN.push(item.hitza))
        });
    }

//  console.log(wordsArray);

    var wordOfTheDay = "merey";

    if (lang == "es") {
        const min = 0;
        const max = wordsArrayES.length;
        const rand = min + Math.random() * (max - min);
        wordOfTheDay = wordsArrayES[parseInt(rand)];
        if (wordsArrayLaguntza.length == 0) {
            wordsArrayLaguntza = wordsArrayES; // Erabiliko den hiztegiaren kopia bat gorde laguntzarako erabiltzeko
        }
    } else if (lang == "eu") {
        const min = 0;
        const max = wordsArrayEU.length;
        const rand = min + Math.random() * (max - min);
        wordOfTheDay = wordsArrayEU[parseInt(rand)];
        if (wordsArrayLaguntza.length == 0) {
            wordsArrayLaguntza = wordsArrayEU;
        }
    } else {
        const min = 0;
        const max = wordsArrayEN.length;
        const rand = min + Math.random() * (max - min);
        wordOfTheDay = wordsArrayEN[parseInt(rand)];
        if (wordsArrayLaguntza.length == 0) {
            wordsArrayLaguntza = wordsArrayEN;
        }
    }

  const [guesses, setGuesses] = useState({ ...newGame });
  const [markers, setMarkers] = useState({
    0: Array.from({ length: wordLength }).fill(""),
    1: Array.from({ length: wordLength }).fill(""),
    2: Array.from({ length: wordLength }).fill(""),
    3: Array.from({ length: wordLength }).fill(""),
    4: Array.from({ length: wordLength }).fill(""),
    5: Array.from({ length: wordLength }).fill(""),
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [isGameOverModalVisible, setGameOverModalVisible] = useState(false);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [isHelpModalVisible, setHelpModalVisible] = useState(false);
  const [isShared, setIsShared] = useState(false);

  let letterIndex = useRef(0);
  let round = useRef(0);

  const win = () => {
    document.removeEventListener("keydown", handleKeyDown);
    setModalVisible(true);
    keyboardDisabled = true;
    };

  const wordNotExist = () => {
    setErrorModalVisible(true);
    };

  const closeWordNotExist = () => {
    setErrorModalVisible(false);
    };

    const gameOver = () => {
        setGameOverModalVisible(true);
        document.removeEventListener("keydown", handleKeyDown);
        keyboardDisabled = true;
    };

    const closeGameOver = () => {
        setGameOverModalVisible(false);
    };

    const language = () => {
        setLanguageModalVisible(true);
    };

    const closeLanguage = () => {
        setLanguageModalVisible(false);
    };

    const help = () => {
        setHelpModalVisible(true);
    };

    const closeHelp = () => {
        setHelpModalVisible(false);
    };

  const submit = () => {
    const _round = round.current;

    const updatedMarkers = {
      ...markers,
    };

      const tempWord = wordOfTheDay.split("");
      showWord = wordOfTheDay;

    const leftoverIndices = [];

      var regBerde = "^"; //Laguntzarako hiztegia letra berdeen arabera filtratzeko expresio erregularra.
      var regHori = "^"; //Laguntzarako hiztegia letra horien arabera filtratzeko expresio erregularra.
      var regHoriLag = "^" //Expresio horian erabiliko den expresio laguntzaile bat.
      var regGris = "^[^"; //Laguntzarako hiztegia letra grisen arabera filtratzeko expresio erregularra.
      var regGrisLag = "^.{5}$" //Expresio grisean laguntzeko. Ez badago hitz grisik errorea ematen duelako.

    // Prioritize the letters in the correct spot
    tempWord.forEach((letter, index) => {
      const guessedLetter = guesses[_round][index];

      if (guessedLetter === letter) {
        updatedMarkers[_round][index] = "green";
          keyboardColors[letter] = "green";
          hasLetter.push(letter);
          tempWord[index] = "";

          regBerde = regBerde + guessedLetter; //asmatutako letra dagokion posizioan jartzen da expresioan.
      } else {
          regBerde = regBerde + "."; //posizio honetako letra edozein izan daitekela jartzen da expresioan.

        // We will use this to mark other letters for hints
        leftoverIndices.push(index);
      }
    });

      regBerde = regBerde + "$" //letra berdeen expresio erregularra bukatzen da.

    if (updatedMarkers[_round].every((guess) => guess === "green")) {
      setMarkers(updatedMarkers);
      win();
      return;
      }

    // Then find the letters in wrong spots
    if (leftoverIndices.length) {
      leftoverIndices.forEach((index) => {
        const guessedLetter = guesses[_round][index];
          const correctPositionOfLetter = tempWord.indexOf(guessedLetter);

        if (
          tempWord.includes(guessedLetter) &&
          correctPositionOfLetter !== index
        ) {
          // Mark yellow when letter is in the word of the day but in the wrong spot
            updatedMarkers[_round][index] = "yellow";
            keyboardColors[guessedLetter] = "yellow";
            tempWord[correctPositionOfLetter] = "";

            regHori = regHori + "(?=.*" + guessedLetter + ")" + "(?=" + regHoriLag + "[^" + guessedLetter + "])"; //letra horia hitzean dagoela baina ez dagoen posizioan ez dagoela jartzen da.
            regHoriLag = regHoriLag + ".";
        } else {
          // This means the letter is not in the word of the day.
            updatedMarkers[_round][index] = "grey";
            keyboardColors[guessedLetter] = "grey";

            regHoriLag = regHoriLag + "."; //expresio erregular horiko posizio horretan edozein letra egon daitekeela jartzen da.

            if (!hasLetter.includes(guessedLetter)) {
                regGris = regGris + guessedLetter; //expresio erregular grisean letra ez dagoela jartzen da.
                regGrisLag = regGris; //expresio erregular gris laguntzailea aldatzen da letra gris bat topatu delako.
            }
            
          }
      });

        regHori = regHori + ".*$"; //expresio erregular horia bukatzen da.

        if (regGrisLag === regGris) {
            regGrisLag = regGrisLag + "]{5}$";//letra grisak topatu badira, expresio erregular grisari amaiera eman.
        }

        if (_round == 5) {
            gameOver();
        }
    }

    setMarkers(updatedMarkers);
    round.current = _round + 1;
    letterIndex.current = 0;
      var kont = 0;
      var i = 0;
      while (i < wordsArrayLaguntza.length) {
          if (!(wordsArrayLaguntza[i].match(regBerde)) | !(wordsArrayLaguntza[i].match(regHori)) | !(wordsArrayLaguntza[i].match(regGrisLag))) { //ez bada expresio erregularretako bat betetzen bakarrik egin
              kont++;
              wordsArrayLaguntza.splice(i, 1); // baldintzak betetzen ez dituzten hitzak kentzen dira.
          } else {
              i++;
          }
      }
  };

  const erase = () => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex !== 0) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex - 1] = "";
        return newGuesses;
      });

      letterIndex.current = _letterIndex - 1;
    }
  };

  const publish = (pressedKey) => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex < wordLength) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex] = pressedKey.toLowerCase();
        return newGuesses;
      });

      letterIndex.current = _letterIndex + 1;
    }
  };

  const enterGuess = async (pressedKey) => {
    if (pressedKey === "enter" && !guesses[round.current].includes("")) {
      const validWord = fetchWord(guesses[round.current].join(""));

        if (Array.isArray(validWord)) {
            submit();
        } else {
            wordNotExist();
        }
    } else if (pressedKey === "backspace") {
      erase();
    } else if (pressedKey !== "enter") {
      publish(pressedKey);
    }
  };

  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const handleClick = (key) => {
    const pressedKey = key.toLowerCase();

    enterGuess(pressedKey);
  };

  const copyMarkers = () => {
    let shareText = `Wordle ${getDayOfYear()}`;
    let shareGuesses = "";

    const amountOfGuesses = Object.entries(markers)
      .filter(([_, guesses]) => !guesses.includes(""))
      .map((round) => {
        const [_, guesses] = round;

        guesses.forEach((guess) => {
          if (guess === "green") {
            shareGuesses += "🟩";
          } else if (guess === "yellow") {
            shareGuesses += "🟨";
          } else {
            shareGuesses += "⬛️";
          }
        });

        shareGuesses += "\n";

        return "";
      });

    shareText += ` ${amountOfGuesses.length}/6\n${shareGuesses}`;

    navigator.clipboard.writeText(shareText);
    setIsShared(true);
  };

  const handleKeyDown = (e) => {
    const pressedKey = e.key.toLowerCase();

    if (allKeys.includes(pressedKey)) {
      enterGuess(pressedKey);
    }
  };

  useEffect(() => {
    Modal.setAppElement("#share");

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Main>
              <Header><ShareButton onClick={language}>{texts[lang][0]}</ShareButton> WORDLE <ShareButton onClick={help}>{texts[lang][1]}</ShareButton></Header>
        <GameSection>
          <TileContainer>
            {Object.values(guesses).map((word, wordIndex) => (
              <TileRow key={wordIndex}>
                {word.map((letter, i) => (
                  <Tile key={i} hint={markers[wordIndex][i]}>
                    {letter}
                  </Tile>
                ))}
              </TileRow>
            ))}
          </TileContainer>
        </GameSection>
        <KeyboardSection>
          {keyboardRows.map((keys, i) => (
            <KeyboardRow key={i}>
              {i === 1 && <Flex item={0.5} />}
              {keys.map((key) => (
                  <KeyboardButton
                  disabled={keyboardDisabled}
                  key={key}
                  hint={keyboardColors[key]}
                  onClick={() => handleClick(key)}
                  flex={["enter", "backspace"].includes(key) ? 1.5 : 1}
                >
                  {key === "backspace" ? <BackspaceIcon /> : key}
                </KeyboardButton>
              ))}
              {i === 1 && <Flex item={0.5} />}
            </KeyboardRow>
          ))}
        </KeyboardSection>
      </Main>
      <div id="share">
        <Modal
          isOpen={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          contentLabel="Share">
          <ShareModal>
                      <Heading>{texts[lang][3]}</Heading>
            <Row>
              <h3>{texts[lang][4]}</h3>
              <ShareButton onClick={copyMarkers} disabled={isShared}>
                {isShared ? "Copied!" : "Share"}
              </ShareButton>
            </Row>
          </ShareModal>
              </Modal>
              <Modal
                  isOpen={isErrorModalVisible}
                  onRequestClose={() => setErrorModalVisible(false)}
                  style={{
                      content: {
                          top: "50%",
                          left: "50%",
                          right: "auto",
                          bottom: "auto",
                          marginRight: "-50%",
                          transform: "translate(-50%, -50%)",
                      },
                  }}
                  contentLabel="Share">
                  <ShareModal>
                      <Row>
                          <h3>{texts[lang][2]}</h3>
                      </Row>
                      <center><ShareButton onClick={closeWordNotExist}>{texts[lang][7]}</ShareButton></center>
                  </ShareModal>
              </Modal>
              <Modal
                  isOpen={isGameOverModalVisible}
                  onRequestClose={() => setGameOverModalVisible(false)}
                  style={{
                      content: {
                          top: "50%",
                          left: "50%",
                          right: "auto",
                          bottom: "auto",
                          marginRight: "-50%",
                          transform: "translate(-50%, -50%)",
                      },
                  }}
                  contentLabel="Share">
                  <ShareModal>
                      <Heading>{texts[lang][6]}</Heading>
                      <Row>
                          <h3>{texts[lang][9]} {showWord}</h3>
                      </Row>
                      <center><ShareButton onClick={closeGameOver}>{texts[lang][7]}</ShareButton></center>
                  </ShareModal>
              </Modal>
              <Modal
                  isOpen={isLanguageModalVisible}
                  onRequestClose={() => setLanguageModalVisible(false)}
                  style={{
                      content: {
                          top: "50%",
                          left: "50%",
                          right: "auto",
                          bottom: "auto",
                          marginRight: "-50%",
                          transform: "translate(-50%, -50%)",
                      },
                  }}
                  contentLabel="Share">
                  <ShareModal>
                      <Row>
                          <h3>{texts[lang][8]}</h3>
                      </Row>
                      
                      <Row><center><a href="./?language=en"><ShareButton>English</ShareButton></a>
                          <a href="./?language=eu"><ShareButton>Euskera</ShareButton></a>
                          <a href="./?language=es"><ShareButton>Castellano</ShareButton></a></center></Row>
                          <center><ShareButton onClick={closeLanguage}>{texts[lang][7]}</ShareButton></center>
                  </ShareModal>
              </Modal>
              <Modal
                  isOpen={isHelpModalVisible}
                  onRequestClose={() => setHelpModalVisible(false)}
                  style={{
                      content: {
                          top: "50%",
                          left: "50%",
                          right: "auto",
                          bottom: "auto",
                          marginRight: "-50%",
                          transform: "translate(-50%, -50%)",
                      },
                  }}
                  contentLabel="Share">
                  <ShareModal>
                      <Row>
                          <h3>{texts[lang][10]}</h3>
                      </Row>
                      <Row><div style={{ width: "250px"}}>
                          {wordsArrayLaguntza.map(word => <div style={{ float: "left" }}>{word} &nbsp;</div>)}
                      </div></Row>
                      
                      <center><ShareButton onClick={closeHelp}>{texts[lang][7]}</ShareButton></center>
                  </ShareModal>
              </Modal>
      </div>
    </>
  );
}

export default App;
