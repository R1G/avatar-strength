export default ({onChange, selected, values}) => {   
    const handleChange = (e) => {
        onChange(e.target.value);
    }
    return (
      <select value={selected} onChange={handleChange}>
        {values.map((value) => <option key={value} value={value}> {value} </option>)}
      </select>
    );
  };