import React from 'react'

const ChordList = (props) => { //{ tasks, onDelete, onToggle }
    const list = props.list;
    const listItems = list.map((list)=>
    <li>{list}</li>  
  );  


  return (
    <div>
    <ul>{listItems}</ul> 
    </div>



    // <>
    //   {tasks.map((task, index) => (
    //     <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
    //   ))}
    // </>



  )
}

export default ChordList