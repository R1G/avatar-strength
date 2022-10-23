import React, {useState} from "react";
import Field from "./../component/Field";
import Dropdown from "./../component/Dropdown";

function Results({gender, units, weight, height, neck, waist}) {
    const CheckInput = () => {
        const we = weight > 0;
        const he = height > 0;
        const ne = neck > 0;
        const wa = waist > 0;
        return we && he && ne && wa;
    }

    if(CheckInput()) {
        let bf = 0;
        if(gender == 'Male') {
            bf = 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
        } else if(gender == 'Female') {
            bf = 163.205 * Math.log10(waist*2 - neck) - 97.684 * Math.log10(height) - 78.387;
        }
        return (<h1>{Math.round(bf).toString() + '%'}</h1>);
    }
    return (<h3>Enter your measurements to see results</h3>);
}

export default () => {
    const [gender, setGender] = useState('Male');
    const [units, setUnits] = useState('Imperial');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [neck, setNeck] = useState('');
    const [waist, setWaist] = useState('');
    const [hips, setHips] = useState('');

    return (
        <div className="app">
            <header>
                <h1>Body Fat Percentage Calculator</h1>
            </header>
            <Dropdown
                onChange = {setGender} 
                selected = {gender}
                values = {["Male", "Female", "Other"]}
            /> 
            <Dropdown 
                onChange = {setUnits}
                selected = 'Imperial'
                values = {['Metric', 'Imperial']}
            />
            <Field placeholder='Weight' onChange={setWeight} value={weight} /> 
            <Field placeholder='Height' onChange={setHeight} value={height} /> 
            <Field placeholder='Neck Circumference' onChange={setNeck} value={neck} /> 
            <Field placeholder='Waist Circumference' onChange={setWaist} value={waist} />
            <Results gender={gender} units={units} weight={weight} height={height} neck={neck} waist={waist} />
        </div>
    );
};