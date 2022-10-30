import React from 'react';
import "./result.css";
import YearChart from '../Yearchart';
import Cardresult from '../Cardresult';

const Result = ({ data }) => {
  console.log("yearly", data.yearlyNums)
  return (
    <div className='flex w-full gap-2 flex-col'>
      <Cardresult data={data.specialNums} />
      <YearChart data={data.yearlyNums} />
    </div>
  );
};

export default Result;