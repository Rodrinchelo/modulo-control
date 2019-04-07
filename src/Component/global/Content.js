import React, {Component} from 'react';
import Listardatos from './ListarComprobantes';
import URL from './API/API';
import { Link } from "react-router-dom";
import './css/Content.css';
import './css/bootstrap.css';

class Content extends Component{
    constructor(){
        super();

        this.state = {
            lista:null,
            nombre_apellido:"",
            concepto:"",
            dni:"",
            codigo:"",
            voucher:"",
            dates:"",
            dates2:"",
            mensaje:"",
            estado: false,
            operacion:'',
            isLoading:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSearchClick=this.handleSearchClick.bind(this);
        this.handleInputName=this.handleInputName.bind(this);
        this.handleInputConcepto=this.handleInputConcepto.bind(this);
        this.handleInputRecibo=this.handleInputRecibo.bind(this);
        this.handleInputDni=this.handleInputDni.bind(this);
        this.handleInputCodigo=this.handleInputCodigo.bind(this);
        this.handleSearchKey=this.handleSearchKey.bind((this));
        this.mostrarData=this.mostrarData.bind(this);
        this.limpiar=this.limpiar.bind(this)
        this.vaciado=this.vaciado.bind(this);

    }
    // leer del input Concepto
    handleInputConcepto(data){
            this.setState({
                concepto:data.target.value,
                mensaje:""
        });
    }
    mostrarData(){
        let contenedor="";
        if(this.state.estado){
           // console.log(this.state.lista);
            switch (this.state.operacion){
                case "V": contenedor=(<div className="alert alert-info">{this.state.mensaje}</div>);break;
                case true: contenedor=(<div><Listardatos listado={this.state.lista}/></div>);break;
                case false: contenedor=(<div className="alert alert-info">{this.state.mensaje}</div>);break;
                default: contenedor=(<div></div>);
            }
        }
        return contenedor;
    }

    //leer del input recibo
    handleInputRecibo(data){
        this.setState({
            voucher: data.target.value,
            mensaje:"",
            operacion:"c"
        });
    }
    //leer del input DNI
    handleInputDni(data){
        this.setState({
            dni: data.target.value,
            mensaje:"",
            operacion:"c"
        });
    }
    //leer del input Codigo
    handleInputCodigo(data){
        this.setState({
            codigo: data.target.value,
            mensaje:"",
            operacion:"c"
        });
    }
    // funcion del calendario en date se almacena la fecha seleccionada
    handleChange(date) {
        this.setState({
            dates: date.target.value,
            mensaje:"",
            operacion:"c"
        });
        console.log(date.target.value);
        console.log(this.state.dates);
    }
    handleChange2(date) {
        this.setState({
            dates2: date.target.value,
            mensaje:"",
            operacion:"c"
        });
      //  console.log(this.state.dates2);
    }

    // ingresar texto
    handleInputName(e){
        if(e.target.id==="busca"){
            this.setState({
                nombre_apellido: e.target.value,
                mensaje:"",
                operacion:"c"
            });
        }
    }
    handleSearchKey(e){
        //if(e.key==="enter"){
          //  this.handleSearchClick();
        //}
        document.Form.DefaulButton = 'enter'
    }
    vaciado(){
        this.setState({

            nombre:"",
            id_concepto:"",
            dni:"",
            codigo:"",
            voucher:"",
            periodoI:"",
            periodoF:""

        })
      }
    limpiar=(even)=>{
    //  even.preventDefault();

     this.refs.formulario.reset()
      //this.vaciado()
        console.log("DSAEW");
        console.log(this.state);
      //  even.preventDefault();
    }
    //buscar
   handleSearchClick(e) {
      //  let url = 'https://api-modulocontrol.herokuapp.com/recaudaciones/';
        //          url = url.concat('detallada/');
       let url = URL.url.concat('recaudaciones/detallada/');
      // console.log(url);
       if(this.state.nombre_apellido === "" && this.state.concepto === ""&& this.state.recibo === "" &&
           this.state.dates2 === "" && this.state.dates === "" && this.state.dni === "" && this.state.codigo === ""){
           this.setState({
               mensaje:"Casilleros vacios",
               estado:true,
               operacion:'V',
               lista:[],
               isLoading:false
           });
       }else{
           let arra = {
               "nombre": this.state.nombre_apellido,
               "periodoI": this.state.dates,
               "id_concepto": this.state.concepto,
               "periodoF": this.state.dates2,
               "voucher":this.state.voucher,
               "dni":this.state.dni,
               "codigo":this.state.codigo
           };
           let arra2=[arra]


           console.log(arra2);
           this.setState({
               isLoading:true,
               mensaje:"",
               operacion:"c"
           });
           //console.log(arra);
           fetch(url, {

               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(arra, null, 2)

           })
               .then((response) => {
                   return response.json()
               })
               .then(responseJson => {
                   this.setState({
                       lista: responseJson.data,
                       estado:true,
                       operacion: (responseJson.data!==null && responseJson.data.length!==0),
                       mensaje:(responseJson.data!==null && responseJson.data.length!==0)?(""):("Datos no encontrados"),
                       isLoading:false
                   });
                   //console.log( responseJson.data.length);
               });

       }
    e.preventDefault();
    }
  /*  handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.handleSearchClick();
        }
    };*/
    render(){
      console.log(this.state.nombre_apellido);
        return(
          <div className="content">

              <div className="buscar">
              <form ref="formulario" onSubmit={this.Limpiar} >
                  <div className="input-group mb-3 col-xs-12">
                        <div className="input-group mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-6">

                      <div className="input-group-prepend input_nombre ">
                          <span className="input-group-text " id="basic-addon1">Nombre o Apellido</span>
                      </div>


                      <input id="busca" type="text" className="form-control"name="nombre"  value={this.state.nombre_apellido} onChange={this.handleInputName} placeholder="nombre o apellido" aria-label="Username" aria-describedby="basic-addon1"
                             onKeyPress={this.handleKeyPress}/>
                          </div>

                       <div className="input-group mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-6">
                      <div className="input-group-prepend input_pago">
                          <span className="input-group-text" id="basic-addon1">Concepto de Pago</span>
                      </div>
                      <input id="concepto" type="text" className="form-control" name="id_concepto"  value={this.state.concepto} onChange={this.handleInputConcepto} placeholder="ejem:123,123,123" aria-label="Username" aria-describedby="basic-addon1"
                             onKeyPress={this.handleKeyPress}/>
                  </div>
                  </div>

                  <div className="input-group mb-3 col-xs-12 ">
                      <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6 ">
                      <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">DNI</span>
                      </div>
                      <input id="dni" type="text" className="form-control" name="dni" value={this.state.dni} onChange={this.handleInputDni} placeholder="DNI" aria-label="Username" aria-describedby="basic-addon1"
                             onKeyPress={this.handleKeyPress}/>
                                 </div>
                <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                      <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">Codigo</span>
                      </div>
                      <input id="codigo" type="text" className="form-control" name="codigo"  value={this.state.codigo} onChange={this.handleInputCodigo}placeholder="codigo" aria-label="Username" aria-describedby="basic-addon1"
                             onKeyPress={this.handleKeyPress}/>
                  </div>
                  </div>

                  <div className="input-group mb-3 col-xs-12">
                      <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                      <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">Desde:</span>
                      </div>
                      <input type="date" className="form-control"  name="periodoI" onChange={this.handleChange} aria-label="Username" aria-describedby="basic-addon1"
                             onKeyPress={this.handleKeyPress}/>
                                 </div>
                       <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                      <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">Hasta</span>
                  </div>
                      <input type="date" className="form-control" name="periodoF" onChange={this.handleChange2} aria-label="Username" aria-describedby="basic-addon1"
                             onKeyPress={this.handleKeyPress}/>
                      </div>
                  </div>
                      <div className="input-group mb-3 col-xs-12 ">
                  <div className="input-group mb-3 col-xs-12 col-md-12 col-lg-6">
                      <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">Nro de Recibo</span>
                      </div>
                      <input id="recibo" type="text" className="form-control" name="voucher"  onChange={this.handleInputRecibo} placeholder="ejem:cod1,cod2,..." aria-label="Username" aria-describedby="basic-addon1"
                             onKeyPress={this.handleKeyPress}/>
                  </div>

                  <div className="cont_boton input-group mb-3 col-xs-12  text-center">
                      <div className="Botones">
                      <div className="Buton-contenedor">
                          <button id="Buscar" onClick={this.handleSearchClick} className="btn btn-primary">Buscar </button>
                          <Link to="/nueva" className="btn btn-primary boton_medio">Agregar</Link>
                          <a className="btn btn-primary" href="https://siga-fisi.herokuapp.com/dashboard" >Regresar</a>
                          <button id="Limpiar" onClick={this.limpiar} className="btn btn-primary">Limpiar </button>
                      </div>
                      </div>

                  </div>
                  </div>
                  </form>

                  </div>
              <div className={(this.state.isLoading)?("isLoading"):("listar")}>
                  {this.mostrarData()}
              </div>

          </div>


        );

    }
}
export default Content;
