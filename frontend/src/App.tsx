// import "./App.css";
// import SelectRangeCalender from "./components/ui-elements/date/SelectRangeCalender";
import NetworkGraph from "./components/ui-parts/network-graph/NetworkGraph";
import DialogTest from "./views/test/DialogTest";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">React TypeScript Test App</header> */}
      <main>
        <div>{/* <SelectRangeCalender /> */}</div>
        <div>
          <NetworkGraph />
        </div>
        <div>
          <DialogTest />
        </div>
      </main>
    </div>
  );
}

export default App;
