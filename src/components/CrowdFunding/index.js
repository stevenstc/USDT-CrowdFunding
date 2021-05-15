import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

import cons from "../../cons.js";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {

      min: 10

    };

    this.deposit = this.deposit.bind(this);
    this.estado = this.estado.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    this.estado();
    setInterval(() => this.estado(),3*1000);
  };

  async estado(){

    var accountAddress =  await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);

    var inicio = accountAddress.substr(0,4);
    var fin = accountAddress.substr(-4);

    var texto = inicio+"..."+fin;

    document.getElementById("login").innerHTML = '<a href="https://tronscan.io/#/address/'+accountAddress+'" class="logibtn gradient-btn">'+texto+'</a>';


    var min = 10;

    var tronUSDT = await window.tronWeb;
    var contractUSDT = await tronUSDT.contract().at(cons.USDT);

    var aprovado = await contractUSDT.allowance(accountAddress,contractAddress).call();
    aprovado = parseInt(aprovado.remaining._hex);

    if (aprovado > 0) {
      aprovado = "Deposit"
    }else{
      aprovado = "Approve"
    }


    this.setState({
      min: min,
      tarifa: 5,
      deposito: aprovado
    });

  }


  async deposit() {


    const { min } = this.state;

    var amount = document.getElementById("amount").value;
    amount = parseFloat(amount);
    amount = parseInt(amount*1000000);

    var accountAddress =  await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);

    var tronUSDT = await window.tronWeb;
    var contractUSDT = await tronUSDT.contract().at(cons.USDT);

    var aprovado = await contractUSDT.allowance(accountAddress,contractAddress).call();
    aprovado = parseInt(aprovado.remaining._hex);

    if ( aprovado >= amount ){

        var loc = document.location.href;
        if(loc.indexOf('?')>0){
            var getString = loc.split('?')[1];
            var GET = getString.split('&');
            var get = {};
            for(var i = 0, l = GET.length; i < l; i++){
                var tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }

            if (get['ref']) {
              tmp = get['ref'].split('#');

              var inversors = await Utils.contract.investors(tmp[0]).call();

              console.log(inversors);

              if ( inversors.registered ) {
                document.getElementById('sponsor').value = tmp[0];
              }else{
                document.getElementById('sponsor').value = cons.WS;
              }
            }else{
               document.getElementById('sponsor').value = cons.WS;
            }

        }else{

            document.getElementById('sponsor').value = cons.WS;
        }

        var sponsor = document.getElementById("sponsor").value;

        var investors = await Utils.contract.investors(accountAddress).call();

        if (investors.registered) {

          sponsor = investors.sponsor;

        }


        if ( amount >= min){

          document.getElementById("amount").value = "";

          await Utils.contract.deposit(amount,sponsor).send();

        }else{
          window.alert("Please enter an amount greater than 10 USDT");
          document.getElementById("amount").value = 10;
        }



    }else{

      if (amount > 10 && aprovado > 10) {

        if (aprovado <= 0) {
          await contractUSDT.approve(contractAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send();
        }

        if ( amount > aprovado) {
          if (aprovado <= 0) {
            document.getElementById("amount").value = 10;
            window.alert("You do not have enough funds in your account you place at least 10 USDT");
          }else{
            document.getElementById("amount").value = 10;
            window.alert("You must leave 50 TRX free in your account to make the transaction");
          }



        }else{

          document.getElementById("amount").value = amount;
          window.alert("You must leave 50 TRX free in your account to make the transaction");

        }
      }else{
        window.alert("You do not have enough funds in your account you place at least 250 TRX");
      }
    }


  };


  render() {

    var { min, tarifa } = this.state;

    min = "Min. "+min+" USDT";

    switch (tarifa)
        {
            case 0:  tarifa = 2;
                     break;
            case 1:  tarifa = 3;
                     break;
            case 2:  tarifa = 4;
                     break;
            case 3:  tarifa = 5;
                     break;
            case 4:  tarifa = 6;
                     break;

            default: tarifa = "N/A";
                     break;
        }





    return (


        <div>
          <h6 className="text-center">
            Return: <strong>200%</strong><br />
          </h6>

          <div className="form-group text-center">
            <input type="number" className="form-control mb-20 text-center" id="amount" placeholder={min}></input>
            <p className="card-text">You must have ~ 50 TRX to make the transaction</p>

            <a href="#amount" className="gradient-btn v2" onClick={() => this.deposit()}>{this.state.deposito}</a>




          </div>

        </div>


    );
  }
}
