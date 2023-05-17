"use client"
import React from 'react'
import SimpleInput from '../components/atoms/SimpleInput'
import FormInput from '../components/atoms/FormInput'
import Title from '../components/atoms/Title'

export default function page() {
  return (
    <div>
     <Title text='Register'/>   
    <div className='w-2/5'>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-5">
            <div className='col-span-2'>
                <FormInput text='Username'inputType="text"/>
                <FormInput text='Password' inputType='password'/>
            </div>
            <FormInput text='Nome' inputType='text'/>
            <FormInput text='Email' inputType='email'/>
            <div className='col-span-2'>
            <FormInput text='Confirm Email' inputType='email'/>
            </div>
            <div className='col-span-2'>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In
            </button>
            </div>
        </form>
    </div>
    </div>
  )
}
