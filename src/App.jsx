import appStore from "../store/appStore.js"
import Body from "./Body.jsx";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
