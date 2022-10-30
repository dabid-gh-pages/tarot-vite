import { useState, useEffect } from 'react'
import './App.scss'
import { processtarot } from './utils/processtarot';
import Result from './components/Result';
import Loader from './components/Loader/index.jsx';

const App = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("solar")
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = async (e) => {
    setUserType(e.target.value)
  }

  useEffect(() => console.log(userType), [userType]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        console.log({ result })
      }, 2000);
    }
  }, [result]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const birthday = e.target[0].value;
    const startYear = e.target[3].value;
    const endYear = e.target[4].value;

    const mainObject = processtarot(userType, birthday, startYear, endYear)
    setResult(mainObject)
    if (mainObject) {
      setIsResult(true)
    }
    console.log({ mainObject })
    console.log(birthday, startYear, endYear, userType)

  };
  return (
    <div className="formContainer flex-col justify-center items-center p-8">
      <div className="formWrapper">
        <span className="logo">타로 생일수 확인</span>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between'>
            <input className="normal text-sm" placeholder="생년월일 (19990101)" />
            <div className="flex flex-col items-center justify-center gap-1">
              <label htmlFor="solar">
                <input type='radio' id="solar" name='userType' onChange={handleChange} value='solar' defaultChecked />
                양력
              </label>
              <label htmlFor="lunar">
                <input type='radio' id="lunar" name='userType' onChange={handleChange} value='lunar' />
                음력
              </label>
            </div>

          </div>
          <div className='flex'>
            <input className="range text-sm" placeholder="시작연도(1990)" />
            <input className="range text-sm" placeholder="종료연도(2020)" />
          </div>
          <button>생일수 분석</button>
          {err && <span>Something went wrong</span>}
        </form>
      </div>
      {loading && <Loader />}
      {isResult && !loading && <Result data={result} />}

    </div>
  );
};

export default App;
