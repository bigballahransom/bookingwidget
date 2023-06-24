import React, {useContext} from 'react'
import { StepperContext } from '../contexts/SteperContext'

const Contact = () => {
    const {userData, setUserData} = useContext(StepperContext);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]:value, step1:value})
    }
  return (
    <div className='flex flex-col'>
        <div classname='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
            First Name
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded-xl'>
            <input 
            onChange={handleChange}
            value={userData['firstname'] || ''}
            name='firstname'
            placeholder='First Name'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
            />
        </div>
        </div>
        <div classname='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
            Email
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded-xl'>
            <input 
            onChange={handleChange}
            value={userData['email'] || ''}
            name='email'
            placeholder='Email'
            type='email'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
            />
        </div>
        </div>
    </div>
    
  )
}

export default Contact