import { useState } from 'react';
import Frog from './Frog';
import GameContext from './GameContext';
import Lake from './Lake';
import { isAdjusting, swap } from './helpers'

function App() {
  const initialState = () => {
    let arr = [...Array(60).fill(null)];
    arr[0] = new Frog('female', 0, ['tall', 'slim']);
    arr[1] = new Frog('male', 1, ['short', 'fat']);
    return arr
  }

  const [fields, setFields] = useState(initialState());
  const [checked, setChecked] = useState([]);

  const handleChange = (id) => {
    if (checked.includes(id)) {
      setChecked(prev => prev.filter(elem => elem !== id))
    }
    else if (checked.length < 2) {
      setChecked(prev => [...prev, id])
    }
    else {
      setChecked(prev => [prev[1], id])
    }
  }

  const handleJump = () => {
    let frogs = checked.filter(elem => fields[elem] instanceof Frog);
    let empties = checked.filter(elem => fields[elem] === null);

    if (checked.length === 2 && frogs[0] >= 0 && empties[0]) {
      let frogIndx = frogs[0];
      let emptyIndx = empties[0];
      let possiblePositions = fields[frogIndx].getJumpCoverage();

      if (possiblePositions.includes(emptyIndx)) {
        setFields(prev => {
          console.log(prev[frogIndx].getJumpCoverage());
          prev[frogIndx].updatePosition(emptyIndx);

          return swap(prev, frogIndx, emptyIndx)
        })
      }
      setChecked([])
    }
    else setChecked([])
  }

  const handleReproduce = () => {
    if (checked.length === 2) {
      let frogsIndx = checked.filter(elem => fields[elem] instanceof Frog);

      let frogs = [];
      frogsIndx.forEach(frogIndx => frogs.push(fields[frogIndx]));

      let female = [...frogs.filter(frog => frog.gender === 'female')]

      let canReproduce = frogsIndx.length === 2 && female.length === 1 && isAdjusting(...frogsIndx);
      let possibleChildPositions = female[0].getChildPositions().filter(position => fields[position] === null);

      if (canReproduce && possibleChildPositions.length > 0) {
        let childPosition = Math.min(...possibleChildPositions);
        let childGender = (Math.random() >= 0.5) ? "male" : "female";
        let characteristics = frogs.map(frog => frog.getCharacteristic());

        fields[childPosition] = new Frog(childGender, childPosition, characteristics)
        setChecked([])

      }
      else setChecked([])
    }
    else setChecked([])
  }

  return (
    <GameContext.Provider value={[checked, fields]}>
      <Lake fields={fields} onChange={handleChange} />
      <button onClick={handleJump}>JUMP</button>
      <button onClick={handleReproduce}>REPRODUCE</button>
    </GameContext.Provider>
  );
}

export default App;
