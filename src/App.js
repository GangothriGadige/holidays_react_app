import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://holidayapi.com/v1/holidays?pretty&key=e1da110b-93fe-4412-bc35-7d56c4c2e405&country=IN&year=2021`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Holidays&Dates</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {data&& 
        data.holidays.map(({name,date}) => (
            <li>
              <p>{name}:{date}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
