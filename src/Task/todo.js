import React, { useState , useEffect } from 'react';
import "./style.css";

const getLocalStorage = () => {
  const lists = localStorage.getItem("myBucketList");

  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items , setItems] = useState(getLocalStorage());
  const [isEditItem , setIsEditItem] = useState("");
  const [toggleButton , setToggleButton] = useState(false);
 
 
  const addItem = () => {
    if(!inputdata){
      alert("Please fill the data");
    }
    else if(inputdata && toggleButton){
      setItems(
        items.map((currElem)=>{
          if(currElem.id === isEditItem){
            return{...currElem , name: inputdata};
          }
          return currElem;
        })
      );
      setInputData([])
      setIsEditItem(null);
      setToggleButton(false);
    }
    else{
      const myNewIpData = {
        id : new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items, myNewIpData]);
      setInputData("");
    }
  };

  const editItems = (index) => {
    const item_buc_edit = items.find((currElem) => {
      return currElem.id === index;
    });
    setInputData(item_buc_edit.name)
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updateItem = items.filter((currElem) => {
        return currElem.id !== index;
    });
    setItems(updateItem);
  };

  const removeAll = () =>{
    setItems([]);
  }

  useEffect(() => {
    localStorage.setItem("myBucketList" , JSON.stringify(items))
  }, [items]);

  return (
    <>
    <div className='main-div'>
        
        <div className='child-div'>
        <h1>Bucket</h1>
            <figure>
                <img src="./images/buket.png" alt="bucketlist" />
                <figcaption>Add Your List Here❗</figcaption>
            </figure>
            <div className='addItems'>
                <input type="text" placeholder='Add Items' className='form-control' 
                value={inputdata} onChange = {(even) => setInputData(even.target.value)}/>
                {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>
                ) : (
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
                )}
            </div>

            <div className='showItems'>
              {
                items.map((currElem) => {
                  return(
                        <div className='eachItem' key = {currElem.id}>
                          <h3>{currElem.name}</h3>
                          <div className='todo-btn'>
                            <i className="far fa-edit add-btn" onClick={() => editItems(currElem.id)}></i>
                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                          </div>
                        </div>
                  );
                })
              }
              
            </div>

            <div className='showItems'><button className='btn effect04' data-sm-link-text="Remove All"
            onClick={removeAll}>
             <span>Check List</span> 
            </button>
            </div>
        </div>
    </div>
    </>
  );
};
export default Todo;
