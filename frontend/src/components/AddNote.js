import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    // 🔹 Use NoteContext to access addNote function
    const { addNote } = useContext(NoteContext);

    // 🔹 Local state for new note
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    // 🔹 Handle form submission
    const handleClick = (e) => {
        e.preventDefault(); // Prevent page reload
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" }); // Reset form
        props.showAlert("Added successfully", "success");
    };

    // 🔹 Update local state on input change
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                {/* Title Input */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>

                {/* Description Input */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>

                {/* Tag Input */}
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                        minLength={3}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                    disabled={note.title.length < 5 || note.description.length < 5}
                >
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;