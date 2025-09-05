import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Suggestions from "./components/Suggestions";
function App() {
  return (
    <div className="d-flex vh-100">
      <div className="w-20"><Sidebar/></div>
      <div className="w-50"><Feed/></div>
      <div className="w-30"><Suggestions/></div>
    </div>
  );
}
export default App;
