import React, { Component } from 'react';
import { Modal, ModalFooter, ModalHeader, ModalBody, Button, Label, Input } from 'reactstrap';
//import { ModalManager } from 'react-dynamic-modal';
import './css/bootstrap.css';

class MyModal extends Component {

    //constructor(){}
    constructor() {
        super();
        this.handlerGuardar = this.handlerGuardar.bind(this);
        this.close = this.close.bind(this);
        this.texto = React.createRef();
        this.state = {
            data: null,
            modal: false
        }
    }
    componentWillMount() {
        this.setState({
            modal: this.props.estado
        })
    }
    handlerGuardar() {
        var data = {};
        data.idrecaudacion = this.props.id_rec;
        data.mensaje = document.getElementById("mensaje").value;
        const url = 'https://modulocontrol.herokuapp.com/recaudaciones/observaciones';
        //console.log(JSON.stringify(data));
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            //.then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    alert('Observación actualizada');
                } else {
                    alert("FALLÓ OPERACIÓN, ESPERE UN MOMENTO Y VUELVA A INTENTARLO ")
                }
            });
    }
    close() {
        this.setState({
            modal: false
        })
    }
    render() {
        let obs_upg = this.props.obs_upg;
        //const {text} = this.props;
        //console.log(obs_upg);
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.close}>&times;</button>;
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
                    <ModalHeader>
                        <Label>ObservacionesUPG</Label>
                    </ModalHeader>
                    <ModalBody>
                        <Input type="textarea" className="form-control" name="mensaje" id="mensaje" defaultValue={obs_upg}></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(this.handlerGuardar)}>Guardar</Button>{' '}
                        <Button color="secondary" onClick={this.close}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default MyModal;
