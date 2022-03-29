import React from "react";
import Header from './components/Header'
import Dropdown from "./components/Dropdown";
import ChordList from "./components/ChordList";
import Button from "./components/Button";
import Form from "./components/Form"
import SavedProgression from "./components/SavedProgression";

import Axios from 'axios';

function App() {

  //save progression functionality - takes in text from Form
  const onSave = (text) => {

    Axios.post('https://guitar-chord-progression.herokuapp.com/create', {
      key: key,
      progression: text.text, 
    }).then(()=>{ 
      console.log("success");
    });
    getFavorites();
  };

  const getFavorites = () => {
    Axios.get('https://guitar-chord-progression.herokuapp.com/favorites').then((response)=>{ 
      setFavoriteList(response.data);
    });
  }

  const deleteSavedProgression = (id) => {
    Axios.delete(`https://guitar-chord-progression.herokuapp.com/delete/${id}`).then(()=>{
      console.log("successful deletion");
    });
    getFavorites();
  };

  const optionsKey = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'F', value: 'F' },
    { label: 'G', value: 'G' },
    { label: "C#/D♭", value: 'C#/D♭' },
    { label: 'D#/E♭', value: 'D#/E♭' },
    { label: 'F#/G♭', value: 'F#/G♭' },
    { label: 'G#/A♭', value: 'G#/A♭' },
    { label: 'A#/B♭', value: 'A#/B♭' },
  ];
  const optionsNumberOfChords = [
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  const [key, setKey] = React.useState("A");
  const [numberOfChords, setNumberOfChords] = React.useState("3");
  const [showChange, setShowChange] = React.useState(false);
  const [favoriteList, setFavoriteList] = React.useState([]);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleNumberOfChordsChange = (event) => {
    setNumberOfChords(event.target.value);
  };

  //when clicking start button, show correct chords and progressions
  const onShow = () => {
    setShowChange(true);
  };

  //param: string - music key
  //returns array of strings -chords- in respective key
  const calculateNotesInKey = (musicKey) => {
    let notesInKey = [];

    //C, C sharp/D flat, D, D sharp/E flat, E, F F sharp/G flat, G, G sharp/A flat, A, A sharp/B flat, and B - all notes
    const allNotesInWesternMusic = ["C", "C#/D♭", "D","D#/E♭", "E", "F", "F#/G♭","G", "G#/A♭","A","A#/B♭","B"];
    const n = allNotesInWesternMusic.length; // the length of arr  
    let i = allNotesInWesternMusic.indexOf(musicKey); // the index of arr you're trying to access

    //For Future Work:
    //WHWWHWW - minor scale - i (minor) ii (dim) bIII (major) iv (minor) v (minor) bVI (major) bVII (major)


    // WWHWWWH - major scale
    notesInKey.push(allNotesInWesternMusic[(i % n + n)%n]);
    i+=2; //W
    notesInKey.push(allNotesInWesternMusic[(i % n + n)%n]);
    i+=2; //W
    notesInKey.push(allNotesInWesternMusic[(i % n + n)%n]);
    i++; //H
    notesInKey.push(allNotesInWesternMusic[(i % n + n)%n]);
    i+=2; //W
    notesInKey.push(allNotesInWesternMusic[(i % n + n)%n]);
    i+=2; //W
    notesInKey.push(allNotesInWesternMusic[(i % n + n)%n]);
    i+=2; //W
    notesInKey.push(allNotesInWesternMusic[(i % n + n)%n]);
    //H step would take us back to root note

    return notesInKey;
  };

  const calculateChordProgression = (chordsInKey) => {

    let arrayOfProgressions = [];
    let toReturnArray = [];

    const noteI = {noteNum: "I", noteInKey: chordsInKey[0]};
    const noteii = {noteNum: "ii", noteInKey: chordsInKey[1]};
    const noteiii = {noteNum: "iii", noteInKey: chordsInKey[2]};
    const noteIV = {noteNum: "IV", noteInKey: chordsInKey[3]};
    const noteV = {noteNum: "V", noteInKey: chordsInKey[4]};
    const notevi = {noteNum: "vi", noteInKey: chordsInKey[5]};
    const notevii = {noteNum: "vii", noteInKey: chordsInKey[6]};

    const arrOfObj = [noteI,noteii,noteiii,noteIV, noteV,notevi,notevii];

    if (numberOfChords === '3') {
      arrayOfProgressions = ["I-IV-V","V-I-IV","I-vi-V","I-ii-V","V-IV-I","ii-V-I"];
    } else if (numberOfChords === '4'){
      arrayOfProgressions = ["I-V-IV-V","I-V-vi-IV","I-vi-IV-V","vi-IV-I-V","I-IV-vi-V","vi-ii-V-I","I-vi-ii-V","I-IV-V-IV"];
    } else if (numberOfChords === '5') {
      arrayOfProgressions = [];
    }

    const getNote = (splitElement, arrOfObj) => {
      for (let i = 0; i < arrOfObj.length; i++){
          if (splitElement === arrOfObj[i].noteNum){
            return arrOfObj[i].noteInKey;
        }
      }
    };

    for (let i = 0; i < arrayOfProgressions.length; i++){
      let split = arrayOfProgressions[i].split("-");
      let temp = "";
      for (let k = 0; k < split.length; k++){


        temp += getNote(split[k], arrOfObj);
        temp += " - ";

        
      }
      temp = temp.substring(0, temp.length-2);
      toReturnArray.push(arrayOfProgressions[i] + " ( " + temp + " )");
    }

    return toReturnArray;
  };

  const addChordNumberAndRelation = (arrOfNotes) => {
    arrOfNotes[0] = "I - " + arrOfNotes[0] + " major";
    arrOfNotes[1] = "ii - " + arrOfNotes[1] + " minor";
    arrOfNotes[2] = "iii - " + arrOfNotes[2] + " minor";
    arrOfNotes[3] = "IV - " + arrOfNotes[3] + " major";
    arrOfNotes[4] = "V - " + arrOfNotes[4] + " major";
    arrOfNotes[5] = "vi - " + arrOfNotes[5] + " minor";
    arrOfNotes[6] = "vii - " + arrOfNotes[6] + " dim";
    return arrOfNotes;
  }


  let chordsInKey = [];
  let chordProgression = [];
  chordsInKey = calculateNotesInKey(key);
  chordProgression = calculateChordProgression(chordsInKey, numberOfChords);
  chordsInKey = addChordNumberAndRelation(chordsInKey);

//#ff9e2c
  return (
    <section className = "container">
      <div className ="left-half">
          <Header/>
          <Dropdown
          label="Key "
          options={optionsKey}
          value={key}
          onChange={handleKeyChange}
        />
        <Dropdown
          label="Number of Chords "
          options={optionsNumberOfChords}
          value={numberOfChords}
          onChange={handleNumberOfChordsChange}
        />
        <Button
          color = 'black' text = 'Start' onClick={onShow}
        />
        <h4>The chords in {key}</h4>
        {showChange ? <ChordList list={chordsInKey} /> : ''}
        <h4>Some progressions in {key}</h4>
        {showChange ? <ChordList list={chordProgression} /> : ''}

        
      
      </div>
      <div className="right-half">
        <Form
            onSave = {onSave}
        />
        <Button
          color = 'black' text = 'Show Favorites' onClick={getFavorites}
        />

        {favoriteList.length > 0 ? favoriteList 
        .filter((value) => value.musicKey === key)
        .map((val, index) => (
            <SavedProgression key={index} savedProgression = {val} onDelete={deleteSavedProgression}  /> 
        )) : ''}

      </div>
    </section>
    
  );
}

export default App;
