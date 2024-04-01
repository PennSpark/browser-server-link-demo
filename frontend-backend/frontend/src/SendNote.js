
import React, { useState } from "react";

function SendNote() {
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending note: " + note)
    try {
        console.log("I am running in the browser");
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/notes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ note })
        });
      
      // Handle the response here
    } catch (error) {
      // Handle the error here
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your note"
      ></textarea>
      <button type="submit">Send Note</button>
    </form>
  );
}

export default SendNote;
