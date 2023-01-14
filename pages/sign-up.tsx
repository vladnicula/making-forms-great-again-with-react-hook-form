import { SignUpForm } from "../src/SignUpForm/SignUpForm";

export default () => {
  const handleValidSubmit = async (data: unknown) => {
    console.log(`handleValidSubmit`, data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const checkUserNameAvailability = async(username: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return username.toLowerCase() !== "bob";
  }

  return (
  <SignUpForm
    isValidUserName={checkUserNameAvailability}
     onSubmit={handleValidSubmit} 
    />
    );
};
