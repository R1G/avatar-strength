import React, {useState, useEffect} from "react";
import BodypartSelector from "../component/BodypartSelector";
import { MuscleTargetDict } from "../lib/Util";

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '110fc8c363msh862dd27d5500d04p11db32jsnd98030ab6217',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

const ResultsContainer = ({target}) => {
  if(target === "") {
    return <div>Waiting for user input</div>
  } else {
    return <Results target={target} />
  }
}

const Results = ({target}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let url = 'https://exercisedb.p.rapidapi.com/exercises/target/' + target;

    useEffect(() => {
      fetch('https://exercisedb.p.rapidapi.com/exercises/target/' + target, options)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [target])
  
    if(target==="") {
      return <div>Select a body part to learn more</div>
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}> {item.name} </li>
          ))}
        </ul>
      );
    }
  }

export default () => {    
    const [group, setGroup] = useState('');
    const [target, setTarget] = useState('');

    const composite = (x) => {
      setGroup(x);
      setTarget(MuscleTargetDict[x]);
    }
    console.log(target);

    return (
        <div className="app">
            <BodypartSelector group={group} onClick={composite}/>
            <ResultsContainer target={target} />
        </div>
        
    );
}