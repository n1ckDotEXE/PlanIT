import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import './GardenItem.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const GardenItem = props => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const [showMap, setShowMap] = useState(false);
    
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };
    const confirmDeleteHandler = (listid) => {
        console.log(listid)
        setShowConfirmModal(false);
        Axios.delete(`/gardens/list/${listid}`)
        window.location.reload();
    }; 
    const confirmUpdateHandler = (listid) => {
        history.push(`/garden/${listid}`)
    }

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="garden-item__modal-content"
                footerClass="garden__item-modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="garden-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={() => confirmDeleteHandler(props.id)}>DELETE</Button>
                    </React.Fragment>
                }>
                <p>
                    Do you want to proceed with deleting this Item? Please note, that this action can't be undone thereafter.
                </p>
            </Modal>
            <li className="garden-item" id={props.id}>
                <Card className="garden-item__content">
                    <div className="garden-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="garden-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="garden-item__actions">
                        {/* <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button> */}
                        {auth.isLoggedIn && (
                            <Button onClick={() => confirmUpdateHandler(props.id)}>EDIT</Button>
                        )}
                        {auth.isLoggedIn && (
                            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>

    );
};

export default GardenItem;