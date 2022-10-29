import { useState, useEffect } from 'react'
import './App.scss'
import { processtarot } from './utils/processtarot';
import Yearchart from './components/YearChart';
const App = () => {
  const [err, setErr] = useState(false);

  const [userType, setUserType] = useState("solar")

  const handleChange = async (e) => {
    setUserType(e.target.value)
  }

  useEffect(() => console.log(userType), [userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const birthday = e.target[0].value;
    const startYear = e.target[3].value;
    const endYear = e.target[4].value;

    const mainObject = processtarot(userType, birthday, startYear, endYear)
    console.log({ mainObject })
    console.log(birthday, startYear, endYear, userType)

  };
  return (
    <div className="formContainer flex-col justify-center items-center bg-gray-50">
      <div className="formWrapper">
        <span className="logo">타로 생일수 확인</span>
        <form onSubmit={handleSubmit}>
          <input className="normal" placeholder="생년월일 8자리(19990101)" />
          <div className="flex justify-center gap-10 pb-3">
            <label htmlFor="solar">
              <input type='radio' id="solar" name='userType' onChange={handleChange} value='solar' defaultChecked />
              양력
            </label>
            <label htmlFor="lunar">
              <input type='radio' id="lunar" name='userType' onChange={handleChange} value='lunar' />
              음력
            </label>
          </div>
          <div className='flex'>
            <input className="range text-sm" placeholder="시작연도(1990)" />
            <input className="range text-sm" placeholder="종료연도(2020)" />
          </div>
          <button>생일수 분석</button>
          {err && <span>Something went wrong</span>}
        </form>
      </div>
      <div>
        <div>
          cards
        </div>
        <Yearchart />
      </div>
      {/* <Card
        cardType={1}
      /> */}
    </div>
  );
};

export default App;
