import React from 'react'
import { Alert,AlertDescription,AlertTitle } from "../../components/ui/alert";
import { Check } from 'lucide-react';

const SuccessAlert = ({message}) => {
  return (
    <div className="absolute top-2 right-4 z-50">
        <Alert variant='default' className='text-green-500 border-green-500 w-96'>
      {/* <Check className="h-4 w-4  " /> */}
      <AlertTitle>Great!</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
    </div>
    
  )
}

export default SuccessAlert