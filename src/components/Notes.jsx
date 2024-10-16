import { useState, useEffect } from "react";
import { Input } from "@mui/material";

function Notes() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("https://note-app-u86o.onrender.com/notes", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setNotes(data.notes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner">
                </div>
            </div>
        );
    }

    if (error) return <div>Error: {error}</div>;

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const getAuthHeader = () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        };
    };

    const handleSubmit = async () => {
        if (selectedNote) {
            // Update note
            try {
                const res = await fetch(`https://note-app-u86o.onrender.com/notes/${selectedNote._id}`, {
                    method: "PUT",
                    headers: getAuthHeader(),
                    body: JSON.stringify({ title, body }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.msg || "Failed to update Note");
                }

                alert("Note is updated");
                fetchNotesAfterChange();
            } catch (err) {
                alert(err.message);
            }
        } else {
            // Create new note
            try {
                const res = await fetch(`https://note-app-u86o.onrender.com/notes`, {
                    method: "POST",
                    headers: getAuthHeader(),
                    body: JSON.stringify({ title, body }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.msg || "Failed to create Note");
                }

                alert("Note is created");
                setTitle("");
                setBody("");
                // Refetch notes after creating
                fetchNotesAfterChange();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const fetchNotesAfterChange = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://note-app-u86o.onrender.com/notes", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error("Failed to fetch notes after change");
            }
            const data = await res.json();
            setNotes(data.notes);
            setSelectedNote(null);
            setTitle("");
            setBody("");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setBody(note.body);
    };

    const handleAddNoteClick = () => {
        setSelectedNote(null);
        setTitle("");
        setBody("");
    };

    const handleDelete = async (noteId) => {
        try {
            const res = await fetch(`https://note-app-u86o.onrender.com/notes/${noteId}`, {
                method: "DELETE",
                headers: getAuthHeader(),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.msg || "Failed to delete the note");
            }

            alert("Note is deleted");
            fetchNotesAfterChange();
        } catch (err) {
            alert(err.message);
        }
    };

    const reversedNotes = [...notes].reverse();

    return (
        <div className={`notes-container ${isDarkMode ? "dark" : "light"}`}>
            <div className="navbar">
                <h1>NOTES</h1>
                <button className="toggle-mode" onClick={toggleDarkMode}>
                    {isDarkMode ? "Light" : "Dark"}
                </button>
            </div>
            <div className="main">
                <div className="sidebar">
                    <div id="sidebar-title">
                        <h3>MY NOTES</h3>
                        <button className="add-note-button" onClick={handleAddNoteClick}>
                            +
                        </button>
                    </div>
                    {reversedNotes.map((note) => (
                        <div className="note-box" key={note._id}>
                            <p
                                className={`note-title ${selectedNote?._id === note._id ? "active" : ""}`}
                                onClick={() => handleNoteClick(note)}
                            >
                                {note.title}
                                <button
                                    className="delete-note-button"
                                    onClick={() => handleDelete(note._id)}
                                >
                                    <img src="delete.png" alt="delete" style={{ width: "20px", height: "20px" }} />
                                </button>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="content">
                    <input
                        className="title-input"
                        placeholder="*Title*"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        className="body-input"
                        placeholder="Start typing your note here..."
                        multiline
                        rows={20}
                        disableUnderline={true}
                        fullWidth
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <button id="savebtn" onClick={handleSubmit}>
                        {selectedNote ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notes;
