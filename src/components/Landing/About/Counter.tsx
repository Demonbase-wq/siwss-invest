'use client'; // Add this directive
import React from 'react';
import CountUp from 'react-countup';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, suffix, prefix }) => {
  return (
    <CountUp className='text-primary text-[20px] lg:text-[30px] font-bold' start={0} end={end} duration={2.5} suffix={suffix} prefix={prefix} />
  );
};

export default Counter;
