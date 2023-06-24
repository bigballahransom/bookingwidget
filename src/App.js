
import { useState } from 'react';
import './App.css';
import Stepper from './components/Stepper';
import StepperControl from './components/StepperControl';
import Complete from './components/steps/Complete';
import Contact from './components/steps/Contact';
import Details from './components/steps/Details';
import Location from './components/steps/Location';
import Schedule from './components/steps/Schedule';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    'Contact Info',
    'Locations',
    'Move Details',
    'Schedule',
    'Complete'
  ];
  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <Contact />
      case 2:
        return <Location />
        case 3:
        return <Details />
        case 4:
        return <Schedule />
        case 5:
        return <Complete />
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === 'next' ? newStep++ : newStep --;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }
  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className='container horizontal mt-5'>
        <Stepper 
          steps={steps}
          currentStep={currentStep}
        />
      </div>
      <StepperControl 
      handleClick={handleClick}
      currentStep={currentStep}
      steps={steps}
      />
    </div>
  );
}

export default App;
