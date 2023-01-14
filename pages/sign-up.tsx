import { SignUpForm } from "../src/SignUpForm/SignUpForm";

export default () => {
  const handleValidSubmit = async (data: unknown) => {
    console.log(`handleValidSubmit`, data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  return <SignUpForm onSubmit={handleValidSubmit} />;
};
