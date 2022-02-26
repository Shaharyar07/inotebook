import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { GlobalContext } from "../Context";
import { useHistory } from "react-router-dom";
import Notes from "./Notes";
const Home = ({ showAlert }) => {
  const { fetchNotes } = React.useContext(GlobalContext);
  let history = useHistory();
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [note, setnote] = React.useState({
    title: "",
    description: "",
    tag: "",
  });
  const { addNote } = useContext(GlobalContext);

  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({
      title: "",
      description: "",
      tag: "",
    });
    showAlert("Note added Successfully", "success");
  };

  return (
    <>
      <div className="container my-4">
        <h2 className="fw-bold">Add Notes</h2>
        <Form className="my-3 w-75 " onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={handleChange}
              value={note.title}
              minLength={4}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              name="description"
              onChange={handleChange}
              value={note.description}
              minLength={4}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tag"
              name="tag"
              onChange={handleChange}
              value={note.tag}
            />
          </Form.Group>
          <Button
            disabled={
              (note.title.length < 4 || note.description.length < 4) && true
            }
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
      <Notes showAlert={showAlert} />
    </>
  );
};

export default Home;
