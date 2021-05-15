import React, { Component } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direccion: "",
      link: "Haz una inversión para obtener el LINK de referido",
      registered: false,
      balanceRef: 0,
      totalRef: 0,
      invested: 0,
      paidAt: 0,
      my: 0,
      withdrawn: 0

    };

    this.Investors = this.Investors.bind(this);
    this.Link = this.Link.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.Investors(),300);
    setInterval(() => this.Link(),1000);
  };

  async Link() {
    const {registered} = this.state;
    if(registered){

      let loc = document.location.href;
      if(loc.indexOf('?')>0){
        loc = loc.split('?')[0]
      }
      let mydireccion = await window.tronWeb.trx.getAccount();
      mydireccion = window.tronWeb.address.fromHex(mydireccion.address)
      mydireccion = loc+'?ref='+mydireccion;
      this.setState({
        link: mydireccion,
      });
    }else{
      this.setState({
        link: "Haz una inversión para obtener el LINK de referido",
      });
    }
  }


  async Investors() {

    let direccion = await window.tronWeb.trx.getAccount();
    let esto = await Utils.contract.investors(direccion.address).call();
    let My = await Utils.contract.MYwithdrawable().call();
    //console.log(esto);
    //console.log(My);
    this.setState({
      direccion: window.tronWeb.address.fromHex(direccion.address),
      registered: esto.registered,
      balanceRef: parseInt(esto.balanceRef._hex)/1000000,
      totalRef: parseInt(esto.totalRef._hex)/1000000,
      invested: parseInt(esto.invested._hex)/1000000,
      paidAt: parseInt(esto.paidAt._hex)/1000000,
      my: parseInt(My.amount._hex)/1000000,
      withdrawn: parseInt(esto.withdrawn._hex)/1000000
    });

  };

  async withdraw(){
    var cosa = await Utils.contract.withdraw().send();
    console.log(cosa);
  };


  render() {
    var { balanceRef, totalRef, invested,  withdrawn , my, direccion, link} = this.state;

    var available = (balanceRef+my);
    available = available.toFixed(6);
    available = parseFloat(available);

    balanceRef = balanceRef.toFixed(2);
    balanceRef = parseFloat(balanceRef);

    totalRef = totalRef.toFixed(2);
    totalRef = parseFloat(totalRef);

    invested = invested.toFixed(2);
    invested = parseFloat(invested);

    withdrawn = withdrawn.toFixed(2);
    withdrawn = parseFloat(withdrawn);

    my = my.toFixed(6);
    my = parseFloat(my);

    return (

      <section  id="office" className="simple-services-area section-gap">
        <div className="container text-center">
          <header className="section-header">
            <h3 className="white"><span style={{'fontweight': 'bold'}}>
              Mi Oficina:</span>
            </h3>
            <p>{direccion}</p><br />
            <h3 className="white" >Link de referido:</h3>
            <h6 className="aboutus-area" style={{'padding': '1.5em', 'fontSize': '11px'}}><a href={link}>{link}</a><br /><br />
            <CopyToClipboard text={link}>
              <button type="button" style={{'cursor': 'pointer'}} className="btn btn-primary">Copiar al portapapeles</button>
            </CopyToClipboard>
            </h6>
            <hr></hr>

          </header>

          <div className="row">
            <div className="col-sm-4 single-services">
              <h4 className="pt-30 pb-20">{invested} USDT</h4>
              <p>
                Total invertido
              </p>
            </div>

            <div className="col-sm-4 single-services">
              <h4 className="pt-30 pb-20">{totalRef} USDT</h4>
              <p>
                Ganado por referidos

              </p>
            </div>

            <div className="col-sm-4 single-services">
              <h4 className="pt-30 pb-20">{my} USDT</h4>
              <p>
                Ganancias
              </p>
            </div>

            <div className="col-sm-4 single-services">
              <h4 className="pt-30 pb-20">{available} USDT</h4>
              <p>
                Disponible
              </p>

            </div>

            <div className="col-sm-4 single-services">
              <h4 className="pt-30 pb-20">{available} USDT</h4>
              <p>
                <button type="button" className="btn btn-primary" onClick={() => this.withdraw()}>Retirar</button>

              </p>
            </div>

            <div className="col-sm-4 single-services">
              <h4 className="pt-30 pb-20">{withdrawn} USDT</h4>
              <p>
                Retirado

              </p>
            </div>

          </div>
        </div>
      </section>

    );
  }
}
