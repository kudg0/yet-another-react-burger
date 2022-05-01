const handleApiErrors = (error : Error, callbackFn? : () => void ) => {
  console.error(error);

  callbackFn ? callbackFn() : false;
}

export default handleApiErrors;