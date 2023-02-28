export const getEnvVariables = () => {
  const envVariable = import.meta.env;
 
  return { ...envVariable }
};