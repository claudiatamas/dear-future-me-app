import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

export default function LetterForm({ onSend, onCancel }){
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date,setDate] = useState('');

    const handleSubmit = e =>{
        e.preventDefault();

        if(!title.trim() || !description.trim() || !date){
            alert("Please fill all fields!")
            return;
        }
        const letter = {
            title,
            description,
            date
        }
        onSend(letter);
        
        setTitle('');
        setDescription('');
        setDate('');
    }

    return(
      
        <form onSubmit={handleSubmit} className="LetterForm">
        <label htmlFor="title">Title</label>
        <input type="text" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description">Content</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <label htmlFor="date">Delivery Date</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <div className="button-row">
            <button type="submit">Send To Future</button>
            <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
        </form>

    
    )

}