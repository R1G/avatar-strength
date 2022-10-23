import React, {useState} from 'react';
import './index.css';
//import Button from './component/Button'
import BodyfatCalculator from './bodyfat-calculator/BodyfatCalculator';
import OneRepMaxCalculator from './one-rep-max-calculator/OneRepMaxCalculator';
import ExerciseSelector from './exercise-selector/ExerciseSelector';

//import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import {
    withAuthenticator,
    Button,
    Heading,
    Image,
    View,
    Card,
  } from "@aws-amplify/ui-react";

function AppSelection({index}) {
    switch(index) {
        case 'Bodyfat Calculator':
            return <BodyfatCalculator />
        case 'Rep Max Calculator':
            return <OneRepMaxCalculator />
        case 'Exercise Selector':
            return <ExerciseSelector />
        default:
            return <></>;
    }
}
function Login({ signOut }) {
  return (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}




function Homepage() {
    const [appIndex, setAppIndex] = useState('');
    const appList = ["Bodyfat Calculator", "Rep Max Calculator", "Exercise Selector"];
    return (
        <div>
            <header>
                <h1>AVATAR STRENGTH</h1>
                <p>A collection of tools and trackers for athletes of all skill levels.</p>
                <div>
                    {appList.map(
                        (appName) => 
                            <Button 
                                key={appName}
                                value={(appName == appIndex) ? '' : appName}
                                label={appName} 
                                onChange={setAppIndex} 
                                isSelected={appName == appIndex}
                    />)}
                </div>
            </header>

            <AppSelection index={appIndex}/>
            <Login />
        </div>
    );
}

export default withAuthenticator(Homepage);