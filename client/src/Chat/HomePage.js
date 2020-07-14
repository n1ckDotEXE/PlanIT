import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { Redirect } from "react-router";
import "./HomePage.css";
import { joinRoom } from "./requests";
import TopBar from "./TopBar";
import Modal from '../shared/components/UIElements/Modal';

const schema = yup.object({
  handle: yup.string().required("Handle is required"),
  chatRoomName: yup.string().required("Chat room is required"),
});

function HomePage() {
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async evt => {
    console.log("triggering")
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    localStorage.setItem("chatData", JSON.stringify(evt));
    await joinRoom(evt.chatRoomName);
    setRedirect(true);
  };

  useEffect(() => { });

  if (redirect) {
    return <Redirect to="/chat/chatroom" />;
  }

  return (
    <>
      <Modal>
        <TopBar />
        <div className="home-page">
          <h1>Join Chat</h1>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={JSON.parse(localStorage.getItem("chatData") || "{}")}
          >

            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isInvalid,
              errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="handle">
                      <Form.Label>Handle</Form.Label>
                      <Form.Control
                        type="text"
                        name="handle"
                        placeholder="Handle"
                        value={values.handle || ""}
                        onChange={handleChange}
                        isInvalid={touched.handle && errors.handle}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="chatRoomName">
                      <Form.Label>Chat Room Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="chatRoomName"
                        placeholder="Chat Room Name"
                        value={values.chatRoomName || ""}
                        onChange={handleChange}
                        isInvalid={touched.chatRoomName && errors.chatRoomName}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.chatRoomName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Button onSubmit={handleSubmit} type="submit" style={{ marginRight: "10px" }}>
                    Join
            </Button>
                </Form>
              )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}

export default HomePage;