import {useState} from 'react'

const Form = ({onSave}) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text){
            alert("add a progression");
            return;
        }

        onSave({text});

        setText("");

    }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
        <div className='form-control'>
        <label> Enter progression in key you would like:
            <input
                type = "text"
                value={text}
                onChange= {(e) => setText(e.target.value)}
            />
        </label>
        </div>
        <input type='submit' value='Save' className='btn btn-block' />
    </form>
  )
}

export default Form