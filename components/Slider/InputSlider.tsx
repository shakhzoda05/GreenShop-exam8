"use client"


import React, { SetStateAction, useCallback, useContext, useState } from 'react'
import { Context } from '@/context/Context';

type RangeType = {
  setValue: React.Dispatch<SetStateAction<number[]>>;
  value?:number[];
};

const InputSlider: React.FC<RangeType> = ({ setValue}) => {
  const {prductsPrice} = useContext(Context)
  const [leftValue, setLeftValue] = useState(prductsPrice.min || 25)
  const [rightValue, setRightValue] = useState(prductsPrice.max || 777);


  const getTrackStyle = useCallback(() => {
    const left = ((leftValue - 25) / (777 - 25)) * 100
    const right = ((rightValue - 25) / (777 - 25)) * 100
    return {
      background: `linear-gradient(to right, 
        #e5e7eb 0%, 
        #e5e7eb ${left}%, 
        #22c55e ${left}%, 
        #22c55e ${right}%, 
        #e5e7eb ${right}%, 
        #e5e7eb 100%)`
    }
  }, [leftValue, rightValue])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), rightValue - 1)
    setValue([value, rightValue]);
    setLeftValue(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), leftValue + 1)
    setRightValue(value)
    setValue([leftValue, value])
  }

  return (
    <div className="pt-2">
      <div className="relative h-2 max-md:w-[172px] md:mx-0 mx-auto">
        <div
          className="absolute h-2 w-full rounded-full"
          style={getTrackStyle()}
        />

        <input
          type="range"
          min={25}
          max={777}
          value={leftValue}
          onChange={handleMinChange}
          className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-white [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-white"
        />
        <input
          type="range"
          min={25}
          max={777}
          value={rightValue}
          onChange={handleMaxChange}
          className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-white [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-white"
        />
      </div>
    </div>
  )
};

export default InputSlider;

