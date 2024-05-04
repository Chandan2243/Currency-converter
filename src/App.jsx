import { useEffect, useState } from "react";
import countryList from "./countryCodes";

function App (){
  const api = {key:"25a4756a01cc4285a10c014331700b4d",
              base: "https://openexchangerates.org/api/"};


  const [rates,setRates] = useState({});
  const [amount, setAmount] = useState('');
  const [selectedFromCurrency, setSelectedFromCurrency ] = useState('USD');
  const [selectedToCurrency, setSelectedToCurrency ] = useState('NPR');
  const [result, setResult] = useState("0.00");

  useEffect(()=>{
    fetch(`${api.base}latest.json?app_id=${api.key}&prettyprint=false&show_alternative=false`)
  .then(response => response.json())
  .then(data => {setRates(data.rates) })
  .catch(error => console.log("Error", error))},[])


  const convertCurrency = (amount, selectedFromCurrency, selectedToCurrency) => {
    if (!amount || !selectedFromCurrency || !selectedToCurrency) {
      return;
    }

    const amountInUSD = selectedFromCurrency === "USD" ? amount : amount / rates[selectedFromCurrency];
    const convertedAmount = amountInUSD * rates[selectedToCurrency];

    return convertedAmount;
  };

  const handleClick = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || isNaN(numericAmount) || numericAmount<=0) {
          alert("Please enter a valid amount.")
        return;
    }

    if (!selectedFromCurrency || !selectedToCurrency) {
      alert("Please fill all fields.");
      return;
    }
    
    const converted = convertCurrency(amount, selectedFromCurrency, selectedToCurrency);
    setResult(converted.toFixed(2));
  };

  const handleAmountChange = (e)=>{
      setAmount(e.target.value)

  }

  const handleSelectedFrom =(e)=>{
    setSelectedFromCurrency(e.target.value)
  }
  
  const handleSelectdTo = (e)=>{
    setSelectedToCurrency(e.target.value)
  }
 


  return (
    <>
    <h1 className="text-center font-serif text-3xl mt-20">Currency Converter</h1>
    <div className="w-4/5 h-80% md:w-1/5 md:h-80% bg-blue-800 mx-auto md:mt-5 py-5 px-5">
      <p className="text-white">Amount to convert:</p>
      <div className="amount flex justify-center">        
        <input className="w-full py-1 "
              type="number"
              onChange={handleAmountChange}
              value={amount}
              placeholder="Enter an amount"/>
      </div>
      <p className="text-white mt-5">From:</p>
      <div className="from  py-1 flex justify-center">       
        <select 
          className="w-full py-1"
          onChange={handleSelectedFrom}
          value={selectedFromCurrency}>
          <option>Select Country</option>
          {Object.entries(countryList).map(([currency, countryCode])=>(
            <option
              key={countryCode}
              value={currency}>{currency}</option>
            ))}
        </select>
      </div>
      <p className="text-white mt-5">To:</p>
      <div className="to py-1 flex justify-center">
        <select
          className="w-full py-1"
          onChange={handleSelectdTo}
          value={selectedToCurrency}
          >
          <option>Select Country</option>
          {Object.entries(countryList).map(([currency, countryCode])=>(
            <option
              key={countryCode}
              value={currency}>{currency}</option>
            ))}
          
        </select>
      </div>
      <div className="submit mt-5 text-center">
        <button 
          className="text-white w-full mt-5 bg-yellow-500"
          onClick={handleClick}>Convert
        </button>
      </div>
      <p className="mt-5 text-white">Result:</p>
      <div className="result w-full flex justify-center">
        <input type="text" className="w-full py-1" readOnly placeholder="0.00" value={result} /> 
      </div>
    </div>
    </>
  )
}

export default App;