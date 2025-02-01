import { useState } from "react"

interface FormValues {
    [key: string]: any; // Generic object to store form values dynamically
  }
const useForm = (initialValues:FormValues) =>{
    const [values,setValues] = useState<FormValues>(initialValues);

    // Handle input change
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () =>{
    setValues(initialValues);
  }

  return {
    values,
    handleChange,
    resetForm
  }
}

export default useForm