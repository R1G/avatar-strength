import React, {useState} from 'react';
import {GetFormulas} from './../lib/Util'
import Dropdown from './../component/Dropdown'
import Field from './../component/Field'

const Table = ({formula, weight, reps, enabled}) => {
  const formulas = GetFormulas(formula);
  const max = formulas.max(weight, reps);

  if(enabled) {
    return (
      <table>
        <thead>
          <tr>
            <th>Reps</th>
            <th>Percentage</th>
            <th>Weight</th>
          </tr>
        </thead>
        <TableData max={max} formula={formulas.weight}/>
      </table>
    );
  } else {
    return ( 
        <div className='Instructions'>
            <h2>Enter weight and reps above to see results</h2>
            <p>Your one-rep max is the most weight you can possibly lift at your current strength level.</p>
            <p>If you know how much weight you can lift for a certain amount of reps, this tool can estimate your one-rep max. </p>
            <p>e.g. I bench 135lbs for 5reps, my one-rep max is roughly 155lbs. The unit of measurement or the exercise itself are largely irrelevant. </p>
            <p>There exist several formulas to estimate your one-rep max in sports science. You can choose from some of the popular ones above. </p>
        </div>
    );
  }
}

const TableData = ({max, formula}) => {
    const rep_counts = [1,2,3,4,5,6,7,8,9,10];
    const rows = rep_counts.map((_reps) => 
      <TableRow key={_reps} reps={_reps} max={max} formula={formula}/>
    );
    return <tbody>{rows}</tbody>;
};

const TableRow = ({max, reps, formula}) => {
  const weight = Math.round(formula(max, reps));
  const percentage = Math.round((weight / max) * 100) / 100;
  return (
    <tr>
      <td>{reps}</td>
      <td>{percentage}</td>
      <td>{weight}</td>
    </tr>
  );
};

const checkInput = (_weight, _reps) => {
    const parsedWeight = parseInt(_weight, 10);
    const parsedReps = parseInt(_reps, 10);
    return !isNaN(parsedWeight) && !isNaN(parsedReps)
          && parsedWeight >= 0 && parsedReps > 0;
  }

export default () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [formula, setFormula] = useState('Brzycki');

  return (
    <div className="app">
      <header>
        <h1>ONE REP MAX CALCULATOR</h1>
        <fieldset>
          <Dropdown 
            selected={formula}
            onChange={setFormula}
            values={["Brzycki", "Epley", "Lombardi", "O'Connor"]}
          />
          <Field 
            value={weight}
            placeholder="Weight"
            onChange={setWeight}
            />
          <Field 
            value={reps}
            placeholder="Repetitions"
            onChange={setReps}
          />
        </fieldset>
      </header>

      <Table 
        enabled={checkInput(weight, reps)} 
        weight={weight} 
        reps={reps}
        formula={formula}
        />
    </div>
  );
};