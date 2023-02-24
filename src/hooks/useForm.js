import { useState } from "react";

const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const inputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  const onReset = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    inputChange,
    onReset,
  };
};

export default useForm;