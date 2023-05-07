import "./App.css";
import TableExample from "./examples/table/TableExample";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div style={{ width: 200 }}></div>
        <div style={{ flex: 1 }}>
          <TableExample></TableExample>
        </div>
      </div>
    </div>
  );
}

export default App;
