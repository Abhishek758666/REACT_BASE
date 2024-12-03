import Button from "./ui/UiButton";
import UIInput from "./ui/UiInput";

const App = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Button label="hello" type="primary" />
      <UIInput label="hello" placeholder="name" id="name" type="date" />
    </div>
  );
};

export default App;
