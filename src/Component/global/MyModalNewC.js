import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import './css/DatosCSS.css';
import URL from './API/API';
import './css/bootstrap.css';
import './css/NewC.css';
import './css/ListarComprobanteNewC.css';
class MyModal extends Component {
    constructor() {
        super();
        this.handlerGuardar = this.handlerGuardar.bind(this);
        // this.texto=React.createRef();
        this.state = {
            data: null,
            ubicDato: []
        }
    }
    componentWillMount() {
        let data;
        const url = URL.url.concat('conceptos');
        // const url= 'https://api-modulocontrol.herokuapp.com/conceptos';
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            //body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    //  console.log(res);
                    data = res;
                    //console.log(data);
                    // Llenar select de conceptos
                    var x = document.getElementById("concepto");
                    for (var i = 0; i < data["data"].length; i++) {
                        var miOption = document.createElement("option");
                        miOption.text = data["data"][i]["concepto"];
                        miOption.setAttribute("value", data["data"][i]["id_concepto"]);
                        x.add(miOption);
                    }
                } else {
                    alert("Fallo al cargar datos, Intentelo mas tarde")
                }
            });
    }
    handlerGuardar() {
        if (document.getElementById("verificar").value === "true") {
            var verif = true;
        } else {
            verif = false
        }
        var data = {};
        data.id_alum = this.props.id;
        data.id_concepto = document.getElementById("concepto").value;
        data.id_registro = 2103;  
        data.id_ubicacion = document.getElementById("ubicacion").value;
        data.cod_alum = document.getElementById("codigo").value;
        data.numero = document.getElementById("recibo").value;
        data.importe = document.getElementById("importe").value;
        data.observacion = document.getElementById("obs").value;
        data.observacion_upg = document.getElementById("obs_upg").value;
        data.fecha = document.getElementById("fecha").value;
        data.validado = verif;
        data.id_tipo = document.getElementById("tipo").value;
        data.moneda = document.getElementById("moneda").value;
        ModalManager.close();
        console.log(this.props);
        console.log(JSON.stringify(data));
        if (data.id_concepto !== "" || data.id_ubicacion !== "" || data.codigo !== "" || data.numero !== "" || data.fecha !== "" || data.tipo !== "" || data.tipo !== "undefined") {

            const url = URL.url.concat('recaudaciones/new');
            //const url= 'https://modulocontrol.herokuapp.com/recaudaciones/new';
            //const url = 'http://localhost:7896/recaudaciones/new'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status) { // exito   
                        console.log(res.status);                     
                        alert('Datos creados exitosamente');
                        ModalManager.close();
                    } else {   
                        console.log(res.status);                         
                        alert("FALLÓ OPERACIÓN, ESPERE UN MOMENTO Y VUELVA A INTENTARLO ")
                    }
                });
        } else {
            alert("Rellene todos los campos");
        }
    }

    _onBlurInput() {
        let rec_value = document.getElementById("recibo").value;

        if (rec_value !== "") {
            const url = URL.url.concat('recibo/' + rec_value);
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            })
                .then(res => res.json())
                .then(res => {
                    //console.log(res);
                    if (res) { // exito
                        if (res.response === 1) {
                            alert("Este recibo ya se encuentra registrado");
                            document.getElementById("importe").disabled = true;
                            document.getElementById("fecha").disabled = true;
                            document.getElementById("ubicacion").disabled = true;
                            document.getElementById("tipo").disabled = true;
                            document.getElementById("verificar").disabled = true;
                            document.getElementById("button-send-modal").disabled = true;
                        } else if (res.response === 0) {
                            //alert("Este recibo esta habilitado");
                            document.getElementById("importe").disabled = false;
                            document.getElementById("fecha").disabled = false;
                            document.getElementById("ubicacion").disabled = false;
                            document.getElementById("tipo").disabled = false;
                            document.getElementById("verificar").disabled = false;
                            document.getElementById("button-send-modal").disabled = false;
                        }
                    } else {
                        alert("FALLÓ OPERACIÓN, ESPERE UN MOMENTO Y VUELVA A INTENTARLO ")
                    }
                });
        }
    }
    ubicaciones() {
        let data;
        //const url = 'https://modulocontrol.herokuapp.com/ubicaciones';
        const url = URL.url.concat('ubicaciones');
        //console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(res => {
            //console.log(res);
            if (res.status) {
                data = res;
                var x = document.getElementById("ubicacion");
                for (var i = 0; i < data["data"].length; i++) {
                    var miop = document.createElement("option");
                    miop.text = data["data"][i]["descripcion"];
                    miop.setAttribute("value", data["data"][i]["id_ubicacion"]);
                    x.add(miop);
                }
            } else {
                alert("Fallo al cargar datos de ubicaciones!");
            }
        })
    }

    tipos() {
        let data;
        const url = URL.url.concat('tipos');
        //const url = 'https://modulocontrol.herokuapp.com/tipos';
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(res => {
            //console.log(res);
            if (res.status) {
                data = res;
                var x = document.getElementById("tipo");
                for (var i = 0; i < data["data"].length; i++) {
                    var miop = document.createElement("option");
                    miop.text = data["data"][i]["descripcion"];
                    miop.setAttribute("value", data["data"][i]["id_tipo"]);
                    x.add(miop);
                }
            } else {
                alert("Fallo al cargar datos de tipos!");
            }
        })
    }

    moneda() {
        let data;
         const url = URL.url.concat('moneda');
        //const url = 'https://modulocontrol.herokuapp.com/moneda';
        //const url = 'http://localhost:7896/moneda';
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(res => {
            //console.log(res);
            if (res.status) {
                data = res;
                var x = document.getElementById("moneda");
                for (var i = 0; i < data["data"].length; i++) {
                    var miopc = document.createElement("option");
                    miopc.text = data["data"][i]["moneda"];
                    miopc.setAttribute("value", data["data"][i]["id_moneda"]);
                    x.add(miopc);
                }
            } else {
                alert("Fallo al cargar datos de monedas!");
            }
        })
    }
    render() {
        let nombre = this.props.nombre;
        let codigo = this.props.codigo;
        //let obs_upg = this.props.obs_upg;
        return (
            <Modal className="modal" effect={Effect.SlideFromBottom} style={{
                content: {
                    margin: '20px auto'
                }
            }} >
                <div className="container" id="advanced-search-form">
                    <form>
                        <div className="form-group col-xs-12">
                            <label >Nombres y Apellidos</label>
                            <input type="text" className="form-control" placeholder="Nombres" id="nombre" value={nombre} disabled required />
                        </div>
                        <div className="form-group">
                            <label >Concepto de Pago</label>
                            <select required id="concepto" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Código</label>
                            <input type="number" className="form-control" placeholder="Código" id="codigo" value={codigo} disabled required />
                        </div>
                        <div className="form-group">
                            <label>Recibo</label>
                            <input type="number" min="0" className="form-control" placeholder="Recibo" id="recibo" onBlur={this._onBlurInput} required />
                        </div>
                        <div className="form-group">
                            <label>Importe</label>
                            <input type="number" min="0" className="form-control" placeholder="Importe" id="importe" required />
                        </div>
                        <div className="form-group">
                            <label >Fecha</label>
                            <input type="date" id="fecha" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label >Moneda</label>
                            <select required id="moneda" className="form-control" onClick={this.moneda()}>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Ubicación</label>
                            <select required id="ubicacion" className="form-control" onClick={this.ubicaciones()}>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Tipo</label>
                            <select required id="tipo" className="form-control" onClick={this.tipos()}>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Observaciones</label>
                            <textarea rows="2" cols="30" id="obs" className="from-control" readOnly>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label >Observaciones UPG</label>
                            <textarea rows="2" cols="30" id="obs_upg" className="from-control">
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label >Verificar</label>
                            <select required id="verificar" className="form-control" >
                                <option value="true" >Validado</option>
                                <option value="false" >No Validado</option>
                            </select>
                        </div>
                    </form>
                    <div>
                        <button id="button-send-modal" className="btn btn-success" onClick={this.handlerGuardar}>REGISTRAR</button>
                    </div>
                    <div>
                        <button data-dismiss="modal" className="btn btn-success" onClick={ModalManager.close}>CERRAR</button>
                    </div>
                </div>
                <script>
                    window.onload=llenarConceptos;
                </script>
            </Modal>
        );
    }

}
export default MyModal;
