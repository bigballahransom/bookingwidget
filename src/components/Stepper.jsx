import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react'

const Stepper = ({steps, currentStep}) => {
    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps]
        let count = 0;

        while(count < newSteps.length) {
            if(count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count++;
            }
            else if(count < stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;
            }
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }
        return newSteps;
    }

    useEffect(() => {
        const stepsState = steps.map((step,index) =>
        Object.assign({}, {
            description: step,
            completed: false,
            highlighted: index === 0 ? true : false,
            selected: index === 0 ? true : false,
        }));
        stepRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepRef.current)
        setNewStep(current);
    }, [steps, currentStep]);

    const displaySteps = newStep.map((step, index) => {
        return (
            <div key={index} className={
                index !== newStep.length -1 ? 'w-full flex items-center' : 'flex items-center'
            }>
            <div className='relative flex flex-col items-center text-almostblack'>
              <div className={`rounded-full shadow transition duration-500 ease-in-out border-2 h-12 w-12 flex items-center justify-center py-3 ${step.selected ? 'bg-primary text-white font-bold border border-primary' : ''}`}>
                {step.completed ? (
                    <span className='text-white font-bold text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>

                    </span>
                ) : (index + 1)}
              </div>
              <div className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${step.highlighted ? 'text-gray-900' : 'text-gray-400' }`}>
                  {step.description}
              </div>
    
          </div>
    
          <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? 'border-primary' : 'border-gray-300'}`}></div>
        </div>
        )
    })
  return (
    <div className='mx-4 p-4 justify-between flex items-center'>
      {displaySteps}
    </div>
  )
}

export default Stepper
