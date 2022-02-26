import React, { useContext } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import { GlobalContext } from "../Context";
const Notes = ({ showAlert }) => {
  const { Notes, deleteNote, updateNote, showModal, setshowModal } =
    useContext(GlobalContext);
  const handleClose = () => setshowModal(false);
  const [note, setNote] = React.useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const editNote = (currentNote) => {
    setshowModal(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    showAlert("Note updated successfully", "success");
  };

  const handleSubmit = (e) => {
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Note updated Successfully", "success");
    setshowModal(false);
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container ">
      <h2 className="fw-bold">Your Notes</h2>
      <div className="row d-sm-flex py-4">
        {Notes.map((noteItem) => {
          console.log(noteItem._id);
          return (
            <>
              <Card
                key={noteItem._id}
                style={{ width: "18rem" }}
                className="col-3 m-2"
              >
                <Card.Body>
                  <Card.Title>{noteItem.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {noteItem.tag}
                  </Card.Subtitle>
                  <Card.Text>{noteItem.description} </Card.Text>
                  <i
                    className="fas fa-trash-alt mx-2"
                    onClick={() => {
                      deleteNote(noteItem._id);
                      showAlert("Note Deleted Successfully", "success");
                    }}
                  ></i>
                  <i
                    className="far fa-edit mx-2"
                    onClick={() => {
                      editNote(noteItem);
                    }}
                  ></i>
                </Card.Body>
              </Card>

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className="my-3 w-75 ">
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="etitle"
                        value={note.etitle}
                        type="text"
                        id="etitle"
                        placeholder="Enter title"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        id="edescription"
                        name="edescription"
                        value={note.edescription}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Tag</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter tag"
                        name="etag"
                        id="etag"
                        value={note.etag}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleSubmit}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
