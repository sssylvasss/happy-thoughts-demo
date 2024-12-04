import { useState, useEffect } from "react"

export const PostMessage = ({ newMessage, fetchPosts }) => {
  const [newPost, setNewPost] = useState("") // Initial state is an empty string
  const [errorMessage, setErrorMessage] = useState("") // Initial state is an empty string

  useEffect(() => {
    if (newPost.length >= 141) {
      setErrorMessage("Your message is too long")
    } else {
      setErrorMessage("")
    }
  }, [newPost])

  // This function handles the API with method POST
  // It is called when the user submits the form below, clicking the submit button
  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.log("newPost onformsubmit:", newPost)
    if (newPost.length <= 4) {
      setErrorMessage(
        "Your message is too short"
      )
    } else {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: `${newPost}`,
        }),
        headers: { "Content-Type": "application/json" },
      }

      // console.log('options:', options)
      fetch("https://technigo-project-happy-thoughts-api-lpjc.onrender.com/thoughts", options)
        .then((response) => response.json())
        .then((data) => {
          newMessage(data)
          setNewPost("")
          fetchPosts()
        })
        .catch((error) => console.log(error))
    }
  }
  return (
    <div className="post-wrapper">
      <p>What's making you happy right now?</p>
      <form onSubmit={handleFormSubmit}>
        <textarea
          rows="3"
          placeholder="Write your happy thought here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <div className="post-length">
          <p className="error">{errorMessage}</p>
          <p className={`length ${newPost.length >= 140 ? "red" : ""}`}>
            {newPost.length}/140
          </p>
        </div>
        <button
          type="submit"
          id="submitPostBtn"
          aria-label="button for submiting your post"
        >
          <span className="emoji" aria-label="like button">
            &#x2665;
          </span>
          Send Happy Thought 
          <span className="emoji" aria-label="like button">
            &#x2665;
          </span>
        </button>
      </form>
    </div>
  )
}
