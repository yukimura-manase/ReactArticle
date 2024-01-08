import React from "react";
// import "./App.css";
// import SelectRangeCalender from "./components/ui-elements/date/SelectRangeCalender";
import NetworkGraph from "./components/ui-parts/network-graph/NetworkGraph";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">React TypeScript Test App</header> */}
      <main>
        <div>{/* <SelectRangeCalender /> */}</div>
        <div>
          <NetworkGraph />
        </div>
      </main>
    </div>
  );
}

export default App;
