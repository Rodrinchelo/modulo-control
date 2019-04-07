import React, { Component } from 'react';
import { ModalManager } from 'react-dynamic-modal';
import MyModal from './MyModal';
import Combo from './ComboNewC';
import Combodos from './CombodosNewC';
import URL from './API/API';
import Check from './CheckNewC';
import './css/DatosCSS.css';
import './css/bootstrap.css';
import './css/ListarComprobanteNewC.css';
import MyModalUpg from './MyModalUpg';
import Modal2 from './MyModalNewC';
import ReactDOM from "react-dom";
import './css/bootstrap.min.css';
//import Datos from './Datos/Items';
//import Datos2 from './Datos/Tipo';

class ListarComponentes extends Component {
    constructor(...props) {
        super(...props);
        this.handleEnviarData = this.handleEnviarData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openModalUpg = this.openModalUpg.bind(this);
        this.handleChangeObs_comentarios = this.handleChangeObs_comentarios.bind(this);
        this.handleChangeObs_upg = this.handleChangeObs_upg.bind(this);
        this.handleChangeUbic = this.handleChangeUbic.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.Obj = this.Obj.bind(this);
        this.handleChangeEstado = this.handleChangeEstado.bind(this);
        this.crearJSON = this.crearJSON.bind(this);
        this.verificar = this.verificar.bind(this);
        this.state = {
            data: null,
            JSON: [],
            ubicDato: [],
            tipoDato: [],
            isLoading: false,
            isNew: false
        }
    }

    componentWillMount() {
        let arreglo = [];
        const lista = this.props.listado;
        if (lista !== null) {
            lista.map((item, key) => {
                arreglo = arreglo.concat(new this.Obj(item.id_rec, item.observacion, item.observacion_upg, item.id_ubicacion && item.id_ubicacion, item.id_tipo, item.validado, item.nombre,
                    item.concepto, item.codigo, item.recibo, 
                    item.moneda, item.mascara, item.importe, item.fecha, item.id_alum));
                return null;
            });
            console.log(arreglo);
            this.setState({
                data: arreglo
            }/*, function () {
                console.log("call"+this.state.data)
            }*/)

        }
        //console.log(arreglo);
        //const url= 'https://api-modulocontrol.herokuapp.com/ubicaciones';
        const url = URL.url.concat('ubicaciones');
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    let dataTipo = res["data"];
                    this.setState({
                        ubicDato: dataTipo
                    });

                    // console.log(dataTipo);
                } else {
                    alert("Fallo al cargar datos, Intentelo mas tarde")
                }
            });
        const url2 = URL.url.concat('tipos');
        //  const url2= 'https://api-modulocontrol.herokuapp.com/tipos';
        fetch(url2, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    let dataTipo = res["data"];
                    this.setState({
                        tipoDato: dataTipo
                    });
                    // console.log(res["data"]);

                    //  console.log(this.state.dataTipo);
                } else {
                    alert("Fallo al cargar datos, Intentelo mas tarde")
                }
            });

    }

    // crear un objeto para enviar al server
    crearJSON(codigo, concepto, ubic, id_rec, recibo, 
        moneda, mascara, importe, obs, obs_upg, flag, fecha, validado, tipo, id_alum) {
        if (obs == null) obs = "";
        if (obs_upg == null) obs_upg = "";
        if (ubic == null) ubic = 0;
        if (flag == null) flag = false;
        if (tipo == null) tipo = 0;
        this.id_rec = id_rec;
        this.concepto = concepto;
        this.ubic = ubic;
        this.codigo = codigo;
        this.recibo = recibo;
        this.moneda = moneda;
        this.mascara = mascara;
        this.importe = importe;
        this.obs = flag + "-" + obs;
        this.obs_upg = flag + "-" + obs_upg;
        this.fecha = fecha;
        this.tipo = tipo;
        this.validado = validado;
        this.id_alum = id_alum;
    }

    // funcion verifica los checks y las observaciones nuevas
    verificar() {
        const arreglo = this.state.data;
        let arreglo2 = [];
        arreglo.map(item => {
            arreglo2 = arreglo2.concat(new this.crearJSON(item.codigo, item.concepto, item.ubic, item.id_rec, item.recibo, 
                item.moneda, item.mascara, item.importe,
                item.obs, item.obs_upg, item.flag, item.fecha, item.validado, item.tipo, item.id_alum))
            return null;
        });
        //  console.log(arreglo2);
        this.setState({
            JSON: arreglo2
        });
        //console.log(arreglo2);
        return arreglo2;
    }

    //crea un objeto para pasar al hijo
    Obj(id_rec, obs, obs_upg, ubic, tipo, validado, nombre, concepto, codigo, recibo, 
        moneda, mascara, importe, fecha, id_alum) {
        this.id_rec = id_rec;
        this.obs = obs;
        this.obs_upg = obs_upg;
        this.ubic = ubic;
        this.tipo = tipo;
        this.validado = validado;
        this.nombre = nombre;
        this.concepto = concepto;
        this.codigo = codigo;
        this.recibo = recibo;
        this.moneda = moneda;
        this.mascara = mascara;
        this.importe = importe;
        this.fecha = fecha && fecha.substr(8, 2) + "-" + fecha.substr(5, 2) + "-" + fecha.substr(0, 4);
        this.id_alum = id_alum;
    }
    //recibe las ubicaciones de los archivos
    handleChangeUbic(ubic, id_rec) {
        this.state.data.map(items => {
            if (items.id_rec === id_rec) {
                items.ubic = ubic;
            }
            return null;
        });
    }

    //recibe el tipo de los archivos
    handleChangeType(tipo, id_rec) {
        this.state.data.map(items => {
            if (items.id_rec === id_rec) {
                items.tipo = tipo;
            }
            return null;
        });
    }

    //recibe el estado de los checks cada vez que se pulsa sobre ellos
    handleChangeEstado(estado, id) {
        const validado = estado.target.checked;
        this.state.data.map(items => {
            if (items.id_rec === id) {
                items.validado = validado;
            }
            return null;
        });
        //  console.log(this.state.data);
    }

    // recibe la observacion y el id de recaudaciones modificados
    // los almacena o actualiza en el array
    handleChangeObs_comentarios(text, id_rec) {
        this.setState(prevState => (
            prevState.data.map(items => {
                if (items.id_rec === id_rec) {
                    items.observacion = text;
                }
                return null;
            },
                {
                    data: prevState.data
                })
        ));
        // console.log(this.state.data);
    }

    handleChangeObs_upg(text, id_rec) {
        this.setState(prevState => (
            prevState.data.map(items => {
                if (items.id_rec === id_rec) {
                    items.observacion_upg = text;
                }
                return null;
            },
                {
                    data: prevState.data
                })
        ));
    }
    groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }
    // abre el componente MyModal para ingresar observaciones
    openModal(e, o) {
        //https://github.com/xue2han/react-dynamic-modal        
        let id = e;
        let obs = o;
        // console.log(text);
        //let id_re = e.target.name;
        let component = <MyModal id_rec={id} obs={obs} change={this.handleChangeObs_comentarios} estado={true} />;
        let node = document.createElement('div');
        ReactDOM.render(component, node);

    }
    openModalUpg(e) {
        let id = e;
        const url = 'https://modulocontrol.herokuapp.com/recaudaciones/observaciones/' + id;
        //console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(res => {
                if (res.status) {
                    this.setState({
                        obsUpg: res.data
                    })
                    let component = <MyModalUpg id_rec={id} obs_upg={res.data} onChange={this.handleChangeObs_upg} estado={true} />;
                    let node = document.createElement('div');
                    ReactDOM.render(component, node);
                    //console.log(res);
                }else{
                    alert("FALLÓ OPERACIÓN, ESPERE UN MOMENTO Y VUELVA A INTENTARLO ")
                }
            });
    }
    // envia un JSON al server
    handleEnviarData() {
        //console.log(this.state.JSON);
        const arreglo = this.verificar();
        //console.log(this.state.JSON);
        //console.log(JSON.stringify(arreglo));
        // console.log(JSON.stringify(arreglo));
        const url = URL.url.concat('recaudaciones/new');
        // const url= 'https://api-modulocontrol.herokuapp.com/recaudaciones/new';
        this.setState({
            isLoading: true
        });
        fetch(url, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arreglo)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    this.setState({
                        isLoading: false
                    });
                    alert('Datos cargados exitosamente');
                }
            })
        // console.log(arreglo);
        //https://github.com/calambrenet/react-table/blob/master/src/react-table.jsx
    }


    eventoNombre(e, f, c) {
        let id_alum = e;
        let nom = f;
        let cod = c;
        ModalManager.open(<Modal2 id={id_alum} nombre={nom} codigo={cod} />);
    }


    render() {
        const listado = this.state.data;
        //console.log(this.props);
        if (listado == null) {
            return (
                <div></div>
            );
        } else if (listado === "") {
            return (
                <div className="alert alert-info">Casilleros vacíos</div>
            );
        } else if (listado.length === 0) {

            return (
                <div className="alert alert-info">Datos no encontrados</div>
            );
        } else {
            return (
                <div className="table-scroll">
                    <div className="botones">
                        {/* <div className="container">
                            <button id="btnNuevaR"  onClick={this.handleNuevo} className="btn btn-outline-success">Nueva</button>
                        </div> */}
                        <div className={(this.state.isNew) ? ("block") : ("none")}>
                            <button id="Registrar" onClick={this.handleEnviarData} className="btn btn-outline-success">Registrar</button>
                        </div>
                        <p> </p>
                    </div>
                    <table className="tabla table-striped table-bordered table-hover" id="table">
                        <thead>
                            <tr className="tabla-cabecera">
                                <th>Nro</th>
                                <th>Nombre Apellido</th>
                                <th>Concepto</th>
                                <th>Codigo</th>
                                <th>Recibo</th>
                                <th>Moneda</th>
                                <th>Importe</th>
                                <th>Fecha</th>
                                <th>Ubicación</th>
                                <th>Tipo</th>
                                <th>Verificar</th>
                                <th>Observaciones</th>
                            </tr>
                        </thead>
                        <tbody id="table">{listado.map((dynamicData, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td onClick={(e) => this.eventoNombre(dynamicData.id_alum, dynamicData.nombre, dynamicData.codigo)} title="click para añadir un nuevo registro" className="detalles" nam={dynamicData.nombre}>{dynamicData.nombre}</td>
                                <td>{dynamicData.concepto}</td>
                                <td>{dynamicData.codigo}</td>
                                <td>{dynamicData.recibo}</td>
                                <td>{dynamicData.moneda}</td>
                                <td>{dynamicData.mascara} {dynamicData.importe}</td>
                                <td>{dynamicData.fecha}</td>
                                <td><Combo items={this.state.ubicDato} val={this.handleChangeUbic} ubic={dynamicData.ubic}
                                    id_rec={dynamicData.id_rec} /></td>

                                <td><Combodos items={this.state.tipoDato} val={this.handleChangeType} tipo={dynamicData.tipo}
                                    id_rec={dynamicData.id_rec} /></td>
                                <td>
                                    <Check validado={dynamicData.validado} id={dynamicData.id_rec}
                                        change={this.handleChangeEstado} disabled={true} />
                                </td>
                                <td className="two-fields">
                                    <button id={dynamicData.observacion} name={dynamicData.id_rec}
                                        onClick={(e) => this.openModal(dynamicData.id_rec, dynamicData.obs)} className="btn btn-primary">
                                        <span className="mybtn-red glyphicon glyphicon-eye-open"></span>
                                    </button>
                                    <button id={dynamicData.observacion_upg} name={dynamicData.id_rec}
                                        onClick={(e) => this.openModalUpg(dynamicData.id_rec, dynamicData.obs_upg)} className="btn btn-primary">
                                        <span className="mybtn-blue glyphicon glyphicon-eye-open"></span>
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default ListarComponentes;
