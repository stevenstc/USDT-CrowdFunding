(this.webpackJsonpearntron=this.webpackJsonpearntron||[]).push([[0],{193:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(52),c=a.n(s),o=a(2),l=a.n(o),i=a(3),d=a(53),u=a.n(d),m={tronWeb:!1,contract:!1,setTronWeb(e){this.tronWeb=e},setContract(e,t){var a=this;return Object(i.a)(l.a.mark((function n(){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.contract().at(t);case 2:a.contract=n.sent;case 3:case"end":return n.stop()}}),n)})))()}},p="T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",h="TBJy8ZJoDJjV7MjukJXbNtvPFuRpqNB9DB";class w extends n.Component{constructor(e){super(e),this.state={min:200},this.deposit=this.deposit.bind(this),this.estado=this.estado.bind(this)}componentDidMount(){var e=this;return Object(i.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.setContract(window.tronWeb,h);case 2:e.estado(),setInterval(()=>e.estado(),3e3);case 4:case"end":return t.stop()}}),t)})))()}estado(){var e=this;return Object(i.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.contract.MIN_DEPOSIT().call();case 2:a=t.sent,a=parseInt(a._hex)/1e6,e.setState({min:a,tarifa:5});case 5:case"end":return t.stop()}}),t)})))()}deposit(){var e=this;return Object(i.a)(l.a.mark((function t(){var a,n,r,s,c,o,i,d,u,h,w,v,b,f,E,x;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.state.min,n=document.getElementById("amount").value,n=parseFloat(n),t.next=5,window.tronWeb.trx.getBalance();case 5:if(r=t.sent,s=window.tronWeb.fromSun(r),s=parseFloat(s),console.log(s),console.log(n),!(s-50>=n)){t.next=50;break}if(!((c=document.location.href).indexOf("?")>0)){t.next=29;break}for(o=c.split("?")[1],i=o.split("&"),d={},u=0,h=i.length;u<h;u++)w=i[u].split("="),d[w[0]]=unescape(decodeURI(w[1]));if(!d.ref){t.next=26;break}return w=d.ref.split("#"),t.next=21,m.contract.investors(w[0]).call();case 21:v=t.sent,console.log(v),v.registered?document.getElementById("sponsor").value=w[0]:document.getElementById("sponsor").value=p,t.next=27;break;case 26:document.getElementById("sponsor").value=p;case 27:t.next=30;break;case 29:document.getElementById("sponsor").value=p;case 30:return b=document.getElementById("sponsor").value,t.next=33,window.tronWeb.trx.getAccount();case 33:return f=t.sent,E=f.address,E=window.tronWeb.address.fromHex(E),t.next=38,m.contract.investors(E).call();case 38:if((x=t.sent).registered&&(b=x.sponsor),!(n>=a)){t.next=46;break}return document.getElementById("amount").value="",t.next=44,m.contract.deposit(b).send({shouldPollResponse:!0,callValue:1e6*n});case 44:t.next=48;break;case 46:window.alert("Please enter an amount greater than 200 TRX"),document.getElementById("amount").value=200;case 48:t.next=51;break;case 50:n>200&&s>250?n>s?s-50<=0?(document.getElementById("amount").value=0,window.alert("You do not have enough funds in your account you place at least 250 TRX")):(document.getElementById("amount").value=s-50,window.alert("You must leave 50 TRX free in your account to make the transaction")):(document.getElementById("amount").value=n-50,window.alert("You must leave 50 TRX free in your account to make the transaction")):window.alert("You do not have enough funds in your account you place at least 250 TRX");case 51:case"end":return t.stop()}}),t)})))()}render(){var e=this.state,t=e.min,a=e.tarifa;switch(t="Min. "+t+" TRX",a){case 0:a=2;break;case 1:a=3;break;case 2:a=4;break;case 3:a=5;break;case 4:a=6;break;default:a="N/A"}return r.a.createElement("div",null,r.a.createElement("h6",{className:"text-center"},"Return: ",r.a.createElement("strong",null,"200%"),r.a.createElement("br",null)),r.a.createElement("div",{className:"form-group text-center"},r.a.createElement("input",{type:"number",className:"form-control mb-20 text-center",id:"amount",placeholder:t}),r.a.createElement("p",{className:"card-text"},"You must have ~ 50 TRX to make the transaction"),r.a.createElement("a",{href:"#amount",className:"gradient-btn v2",onClick:()=>this.deposit()},"Deposit")))}}class v extends n.Component{constructor(e){super(e),this.state={totalInvestors:0,totalInvested:0,totalRefRewards:0},this.totalInvestors=this.totalInvestors.bind(this)}componentDidMount(){var e=this;return Object(i.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.setContract(window.tronWeb,h);case 2:setInterval(()=>e.totalInvestors(),1e3);case 3:case"end":return t.stop()}}),t)})))()}totalInvestors(){var e=this;return Object(i.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.contract.setstate().call();case 2:a=t.sent,e.setState({totalInvestors:parseInt(a.Investors._hex),totalInvested:parseInt(a.Invested._hex)/1e6,totalRefRewards:parseInt(a.RefRewards._hex)/1e6});case 4:case"end":return t.stop()}}),t)})))()}render(){var e=this.state,t=e.totalInvestors,a=e.totalInvested,n=e.totalRefRewards;return r.a.createElement("section",{id:"stats",className:"section-gap aboutus-area"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-4 single-services"},r.a.createElement("h1",{className:"pt-40 pb-30 text-white"},t),r.a.createElement("p",null,"Global Investors")),r.a.createElement("div",{className:"col-lg-4 single-services"},r.a.createElement("h1",{className:"pt-40 pb-30 text-white"},a," TRX"),r.a.createElement("p",null,"Global Inverted")),r.a.createElement("div",{className:"col-lg-4 single-services"},r.a.createElement("h1",{className:"pt-40 pb-30 text-white"},n," TRX"),r.a.createElement("p",null,"Global Referral Rewards")))))}}var b=a(54);class f extends n.Component{constructor(e){super(e),this.state={direccion:"",link:"Haz una inversi\xf3n para obtener el LINK de referido",registered:!1,balanceRef:0,totalRef:0,invested:0,paidAt:0,my:0,withdrawn:0},this.Investors=this.Investors.bind(this),this.Link=this.Link.bind(this),this.withdraw=this.withdraw.bind(this)}componentDidMount(){var e=this;return Object(i.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.setContract(window.tronWeb,h);case 2:setInterval(()=>e.Investors(),300),setInterval(()=>e.Link(),1e3);case 4:case"end":return t.stop()}}),t)})))()}Link(){var e=this;return Object(i.a)(l.a.mark((function t(){var a,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.state.registered){t.next=12;break}return(a=document.location.href).indexOf("?")>0&&(a=a.split("?")[0]),t.next=6,window.tronWeb.trx.getAccount();case 6:n=t.sent,n=window.tronWeb.address.fromHex(n.address),n=a+"?ref="+n,e.setState({link:n}),t.next=13;break;case 12:e.setState({link:"Haz una inversi\xf3n para obtener el LINK de referido"});case 13:case"end":return t.stop()}}),t)})))()}Investors(){var e=this;return Object(i.a)(l.a.mark((function t(){var a,n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getAccount();case 2:return a=t.sent,t.next=5,m.contract.investors(a.address).call();case 5:return n=t.sent,t.next=8,m.contract.MYwithdrawable().call();case 8:r=t.sent,e.setState({direccion:window.tronWeb.address.fromHex(a.address),registered:n.registered,balanceRef:parseInt(n.balanceRef._hex)/1e6,totalRef:parseInt(n.totalRef._hex)/1e6,invested:parseInt(n.invested._hex)/1e6,paidAt:parseInt(n.paidAt._hex)/1e6,my:parseInt(r.amount._hex)/1e6,withdrawn:parseInt(n.withdrawn._hex)/1e6});case 10:case"end":return t.stop()}}),t)})))()}withdraw(){return Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.contract.withdraw().send();case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})))()}render(){var e=this.state,t=e.balanceRef,a=e.totalRef,n=e.invested,s=e.withdrawn,c=e.my,o=e.direccion,l=e.link,i=t+c;return i=i.toFixed(6),i=parseFloat(i),t=t.toFixed(6),t=parseFloat(t),a=a.toFixed(6),a=parseFloat(a),n=n.toFixed(6),n=parseFloat(n),s=s.toFixed(6),s=parseFloat(s),c=c.toFixed(6),c=parseFloat(c),r.a.createElement("section",{id:"office",className:"simple-services-area section-gap"},r.a.createElement("div",{className:"container text-center"},r.a.createElement("header",{className:"section-header"},r.a.createElement("h3",{className:"white"},r.a.createElement("span",{style:{fontweight:"bold"}},"My office:")),r.a.createElement("p",null,o),r.a.createElement("br",null),r.a.createElement("h3",{className:"white"},"Referral link:"),r.a.createElement("h6",{className:"aboutus-area",style:{padding:"1.5em",fontSize:"11px"}},r.a.createElement("a",{href:l},l),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(b.CopyToClipboard,{text:l},r.a.createElement("button",{type:"button",style:{cursor:"pointer"},className:"btn btn-primary"},"Copy to clipboard"))),r.a.createElement("hr",null)),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4 single-services"},r.a.createElement("h4",{className:"pt-30 pb-20"},n," TRX"),r.a.createElement("p",null,"Total invested")),r.a.createElement("div",{className:"col-sm-4 single-services"},r.a.createElement("h4",{className:"pt-30 pb-20"},a," TRX"),r.a.createElement("p",null,"Total earnings from referrals")),r.a.createElement("div",{className:"col-sm-4 single-services"},r.a.createElement("h4",{className:"pt-30 pb-20"},c," TRX"),r.a.createElement("p",null,"My Profits")),r.a.createElement("div",{className:"col-sm-4 single-services"},r.a.createElement("h4",{className:"pt-30 pb-20"},i," TRX"),r.a.createElement("p",null,"Available"),r.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:()=>this.withdraw()},"Withdrawal")),r.a.createElement("div",{className:"col-sm-4 single-services"},r.a.createElement("h4",{className:"pt-30 pb-20"},s," TRX"),r.a.createElement("p",null,"withdrawn")))))}}class E extends n.Component{constructor(e){super(e),this.state={accountAddress:"Billetera NO conectada",accountBalance:"Billetera NO conectada",accountBandwidth:"Billetera NO conectada"}}componentDidMount(){setInterval(()=>this.fetchAccountAddress(),1e3),setInterval(()=>this.fetchAccountBalance(),1e3),setInterval(()=>this.fetchAccountBandwidth(),1e3)}fetchAccountAddress(){var e=this;return Object(i.a)(l.a.mark((function t(){var a,n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getAccount();case 2:a=t.sent,n=a.address,r=window.tronWeb.address.fromHex(n),e.setState({accountAddress:r});case 6:case"end":return t.stop()}}),t)})))()}fetchAccountBalance(){var e=this;return Object(i.a)(l.a.mark((function t(){var a,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getBalance();case 2:a=t.sent,n=window.tronWeb.fromSun(a),e.setState({accountBalance:n});case 5:case"end":return t.stop()}}),t)})))()}fetchAccountBandwidth(){var e=this;return Object(i.a)(l.a.mark((function t(){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.tronWeb.trx.getBandwidth();case 2:a=t.sent,e.setState({accountBandwidth:a});case 4:case"end":return t.stop()}}),t)})))()}render(){var e=this.state,t=e.accountAddress,a=e.accountBalance,n=e.accountBandwidth;return r.a.createElement("div",null,r.a.createElement("h5",{className:"text-center"},"Connected Wallet"),r.a.createElement("h6",{className:"text-center"},"Address:",r.a.createElement("br",null),r.a.createElement("strong",null,r.a.createElement("span",{style:{fontSize:"11px"}},t)),r.a.createElement("br",null),r.a.createElement("br",null),"Balance:",r.a.createElement("br",null),r.a.createElement("strong",null,r.a.createElement("span",null,a," TRX")),r.a.createElement("br",null),r.a.createElement("br",null),"Bandwidth:",r.a.createElement("br",null),r.a.createElement("strong",null,r.a.createElement("span",null,n)),r.a.createElement("br",null)))}}var x=a(55),g=a.n(x),k="https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/",N=r.a.createElement("div",{className:"col-sm-4 text-center"},r.a.createElement("img",{src:g.a,className:"img-fluid",alt:"TronLink logo"})),I=()=>{window.open(k,"_blank")},W=e=>{var t=e.installed;return void 0!==t&&t?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"tronLink row",onClick:I,style:{padding:"3em"}},r.a.createElement("div",{className:"info col-sm-8"},r.a.createElement("h1",null,"Log in Required"),r.a.createElement("p",null,"TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your first wallet or decrypt a previously created wallet.")),N)):r.a.createElement("div",{className:"row",onClick:I},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h1",null,"TronLink Required"),r.a.createElement("p",null,"To create a post or tip others you must install TronLink. TronLink is a TRON wallet for the browser that can be ",r.a.createElement("a",{href:k,target:"_blank",rel:"noopener noreferrer"},"installed from the Chrome Webstore"),". Once installed, return back and refresh the page.")),N)};class y extends n.Component{constructor(e){super(e),this.state={tronWeb:{installed:!1,loggedIn:!1}}}componentDidMount(){var e=this;return Object(i.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise(t=>{var a={installed:!!window.tronWeb,loggedIn:window.tronWeb&&window.tronWeb.ready};if(a.installed)return e.setState({tronWeb:a}),t();var n=0,r=setInterval(()=>{if(n>=10){return window.tronWeb=new u.a("https://api.trongrid.io","https://api.trongrid.io","https://api.trongrid.io"),e.setState({tronWeb:{installed:!1,loggedIn:!1}}),clearInterval(r),t()}if(a.installed=!!window.tronWeb,a.loggedIn=window.tronWeb&&window.tronWeb.ready,!a.installed)return n++;e.setState({tronWeb:a}),t()},100)});case 2:e.state.tronWeb.loggedIn||(window.tronWeb.defaultAddress={hex:window.tronWeb.address.toHex("TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg"),base58:"TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg"},window.tronWeb.on("addressChange",()=>{e.state.tronWeb.loggedIn||e.setState({tronWeb:{installed:!0,loggedIn:!0}})})),m.setTronWeb(window.tronWeb);case 4:case"end":return t.stop()}}),t)})))()}render(){return this.state.tronWeb.installed?this.state.tronWeb.loggedIn?r.a.createElement(r.a.Fragment,null,r.a.createElement("section",{className:"convert-area",id:"convert"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"convert-wrap"},r.a.createElement("div",{className:"row justify-content-center align-items-center flex-column pb-30"},r.a.createElement("h1",{className:"text-white"},"Make your investment")),r.a.createElement("div",{className:"row justify-content-center align-items-start"},r.a.createElement("div",{className:"col-lg-6 cols"},r.a.createElement(w,null)),r.a.createElement("div",{className:"col-lg-6 cols"},r.a.createElement(E,null)))))),r.a.createElement(f,null),r.a.createElement(v,null)):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement(W,{installed:!0}))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement(W,null)))}}var R=y,B=document.getElementById("root");c.a.render(r.a.createElement(R,null),B)},55:function(e,t,a){e.exports=a.p+"static/media/TronLinkLogo.d3a8f115.png"},56:function(e,t,a){e.exports=a(193)},85:function(e,t){},86:function(e,t){}},[[56,1,2]]]);
//# sourceMappingURL=main.4a7086ce.chunk.js.map