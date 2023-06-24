
import { useState } from 'react';
import './App.css';
import { StepperContext } from './components/contexts/SteperContext';
import emailjs from '@emailjs/browser'
import Stepper from './components/Stepper';

import StepperControl from './components/StepperControl';
import Complete from './components/steps/Complete';
import Contact from './components/steps/Contact';
import Details from './components/steps/Details';
import Location from './components/steps/Location';
import Schedule from './components/steps/Schedule';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [finalData, setFinalData] = useState([]);
  const [userData, setUserData] = useState({
    firstname: '',
    email: ''
  });

  const steps = [
    'Contact Info',
    'Locations',
    'Move Details',
    'Schedule',
    'Complete'
  ];
  const displayStep = (step) => {
    // eslint-disable-next-line default-case
    switch(step) {
        case 1:
        return (<Contact />)
        case 2:
        return (<Location />)
        case 3:
        return <Details />
        case 4:
        return <Schedule />
        case 5:
        return <Complete />
    }
  }
  const sendEmail = () => {
    const emailData = {
      to_name: 'Recipient Name', // Replace with the recipient's name
      from_name: 'Your Name', // Replace with your name
      message: `Step 1: ${userData.step1}\nStep 2: ${userData.step2}\nStep 3: ${userData.step3}` // Customize the email content as needed
    };

    emailjs.send('service_798gcgh', 'service_798gcgh', emailData, 'paZVfGZ40gJeIKN4x')
      .then((response) => {
        console.log('Email sent!', response.status, response.text);
        // Perform any further actions after the email is sent
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        // Handle any errors that occur during email sending
      });
  }

  const handleClick = (direction) => {
    let newStep;
    if (direction === 'next') {
      newStep = currentStep + 1;
    } else {
      newStep = currentStep - 1;
    }
  
    if (newStep === steps.length + 1) {
      // User reached the final step, send the email
      sendEmail();
    } else {
      if (newStep > 0 && newStep <= steps.length) {
        setCurrentStep(newStep);
      }
    }
  };
  // const handleClick = (direction) => {
  //   let newStep = currentStep;
  //   direction === 'next' ? newStep++ : newStep --;
  //   newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  // }
  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className='container horizontal mt-5'>
        <Stepper 
          steps={steps}
          currentStep={currentStep}
        />
      <div className='my-10 p-10'>
        <StepperContext.Provider value={{
          userData,
          setUserData,
          finalData,
          setFinalData,
        }}>
          {displayStep(currentStep)}
        </StepperContext.Provider>
        <StepperControl
      handleClick={handleClick}
      currentStep={currentStep}
      steps={steps}
      />
      </div>
      </div>
    </div>
  );
}

export default App;
