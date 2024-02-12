import { useEffect, useState } from "react";
import data from "./data";
import "./style.css";
export default function Accoridion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection,setEnableMultiSelection]= useState(false);
  const [selectedId,setSelectedId]= useState([]);

  function handleClick(id) {
    setSelected(id === selected ? null : id);
    if(enableMultiSelection){
      setSelectedId(prev => prev.some(item => item.id === id) ? prev.filter((prevId)=> prevId.id !== id) : [...prev, { id }]);
    }
  }
  useEffect(()=>{
    console.log(selectedId)
  },[selected])
  function enableMulti(){
    setEnableMultiSelection(!enableMultiSelection);
  }
  return (
    <div className="wrapper">
        <button onClick={enableMulti}>{!enableMultiSelection ? "Enable multi":"Disable multi"}</button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="item"
            >
              <div className="title">
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection ? selectedId.map(selItem => selItem.id === item.id && (
                <div key={item.id} className="content">{item.answer}</div>
              )):
              
        
              selected === item.id && (
                <div className="content">{item.answer}</div>
              )} 
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
