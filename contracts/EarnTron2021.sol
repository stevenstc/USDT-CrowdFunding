pragma solidity ^0.5.15;

import "./SafeMath.sol";

contract EarnTron2021 {
  using SafeMath for uint;


  struct Deposit {
    uint tariff;
    uint amount;
    uint at;
  }

  struct Referer {
    address myReferer;
    uint nivel;
  }

  struct Investor {
    bool registered;
    bool recompensa;
    address sponsor;
    Referer[] referers;
    uint balanceRef;
    uint totalRef;
    Deposit[] deposits;
    uint invested;
    uint paidAt;
    uint withdrawn;
  }

  uint public MIN_DEPOSIT = 200 trx;
  uint public MIN_RETIRO = 50 trx;

  uint public RETIRO_DIARIO = 100000 trx;
  uint public ULTIMO_REINICIO;

  address payable public marketing;
  address payable public owner;
  address public NoValido = address(0);

  uint[4] public porcientos = [5, 3, 2, 1];

  uint[10] public tiempo = [ 200 days, 133 days, 100 days, 80 days, 66 days, 57 days, 50 days, 44 days, 40 days, 33 days];
  uint[10] public porcent = [ 200, 200, 200, 200, 200,  200, 200, 200, 200, 200];

  uint public totalInvestors;
  uint public totalInvested;
  uint public totalRefRewards;


  mapping (address => Investor) public investors;

  constructor() public {
    marketing = msg.sender;
    owner = msg.sender;
    investors[msg.sender].registered = true;
    investors[msg.sender].sponsor = marketing;

    ULTIMO_REINICIO = block.number;

    totalInvestors++;

  }

  function setstate() public view  returns(uint Investors,uint Invested,uint RefRewards){
      return (totalInvestors, totalInvested, totalRefRewards);
  }

  function InContract() public view returns (uint){
    return address(this).balance;
  }

  function setTarifa(uint _value) internal pure returns(uint){

    uint tariff;
      if( _value <= 100 trx ){
          tariff = 0;
      }

      if( _value > 100 trx && _value <= 500 trx ){
          tariff = 1;
      }

      if( _value > 500 trx && _value <= 1000 trx ){
          tariff = 2;
      }

      if( _value > 1000 trx && _value <= 3000 trx ){
          tariff = 3;
      }

      if( _value > 3000 trx && _value <= 5000 trx ){
          tariff = 4;
      }

      if( _value > 5000 trx && _value <= 10000 trx ){
          tariff = 5;
      }

      if( _value > 10000 trx && _value <= 20000 trx ){
          tariff = 6;
      }

      if( _value > 20000 trx && _value <= 30000 trx ){
          tariff = 7;
      }

      if( _value > 30000 trx && _value <= 50000 trx ){
          tariff = 8;
      }

      if( _value > 50000 trx ){
          tariff = 9;
      }

      return tariff;

  }

  function setmarketing(address payable _marketing) public returns (address){
    require (msg.sender == marketing, "You are not marketing");
    require (_marketing != marketing, "You are already registered");

    marketing = _marketing;
    investors[marketing].registered = true;
    investors[marketing].sponsor = marketing;

    totalInvestors++;

    return marketing;
  }


  function column (address yo) public view returns(address[2] memory res) {

    res[0] = investors[yo].sponsor;
    yo = investors[yo].sponsor;
    res[1] = investors[yo].sponsor;
    yo = investors[yo].sponsor;

    return res;
  }

  function rewardReferers(address yo, uint amount) internal {

    address[2] memory referi = column(yo);
    uint[2] memory a;
    uint[2] memory b;

    for (uint i = 0; i < 2; i++) {
      if (investors[referi[i]].registered && referi[i] != owner ) {

        if ( investors[referi[i]].recompensa ){
          b[i] = porcientos[i];
          a[i] = amount.mul(b[i]).div(100);

          investors[referi[i]].balanceRef += a[i];
          investors[referi[i]].totalRef += a[i];
          totalRefRewards += a[i];
        }

      }else{

        b[i] = porcientos[i];
        a[i] = amount.mul(b[i]).div(100);

        investors[referi[i]].balanceRef += a[i];
        investors[referi[i]].totalRef += a[i];
        totalRefRewards += a[i];

        break;
      }
    }


  }


  function deposit(address _sponsor) external payable {
    require ( msg.value >= MIN_DEPOSIT, "Send more TRX");


    if (!investors[msg.sender].registered){

      investors[msg.sender].registered = true;
      investors[msg.sender].sponsor = _sponsor;
    }

    if ( _sponsor == investors[msg.sender].sponsor ){

      investors[msg.sender].deposits.push(Deposit(setTarifa(msg.value), msg.value, block.number));

      if (!investors[msg.sender].recompensa){

        investors[msg.sender].recompensa = true;
        totalInvestors++;

      }

      investors[msg.sender].invested += msg.value;
      totalInvested += msg.value;

      owner.transfer(msg.value.mul(3).div(100));
      marketing.transfer(msg.value.mul(2).div(100));

      rewardReferers(msg.sender, msg.value);

      reInicio();

    }

  }


  function withdrawable(address any_user) public view returns (uint amount) {
    Investor storage investor = investors[any_user];

    for (uint i = 0; i < investor.deposits.length; i++) {
      Deposit storage dep = investor.deposits[i];
      uint tiempoD = tiempo[dep.tariff];
      uint porcientD = porcent[dep.tariff];

      uint finish = dep.at + tiempoD;
      uint since = investor.paidAt > dep.at ? investor.paidAt : dep.at;
      uint till = block.number > finish ? finish : block.number;

      if (since < till) {
        amount += dep.amount * (till - since) * porcientD / tiempoD / 100;
      }
    }
  }


  function MYwithdrawable() public view returns (uint amount) {
    Investor storage investor = investors[msg.sender];

    for (uint i = 0; i < investor.deposits.length; i++) {
      Deposit storage dep = investor.deposits[i];
      uint tiempoD = tiempo[dep.tariff];
      uint porcientD = porcent[dep.tariff];

      uint finish = dep.at + tiempoD;
      uint since = investor.paidAt > dep.at ? investor.paidAt : dep.at;
      uint till = block.number > finish ? finish : block.number;

      if (since < till) {
        amount += dep.amount * (till - since) * porcientD / tiempoD / 100;
      }
    }
  }

  function profit() internal returns (uint) {
    Investor storage investor = investors[msg.sender];

    uint amount = withdrawable(msg.sender);

    amount += investor.balanceRef;
    investor.balanceRef = 0;

    investor.paidAt = block.number;

    return amount;

  }

  function reInicio() public {

    uint hora = ULTIMO_REINICIO + 1*28800;

    if ( block.number >= hora ){

      RETIRO_DIARIO = 100000 trx;
      ULTIMO_REINICIO = hora;

    }

  }


  function withdraw() external {

    uint amount = withdrawable(msg.sender);
    amount = amount+investors[msg.sender].balanceRef;
    reInicio();

    require ( InContract() >= amount, "The contract has no balance");
    require ( amount >= MIN_RETIRO, "The minimum withdrawal limit reached");
    require ( RETIRO_DIARIO >= amount, "Global daily withdrawal limit reached");

    profit();

    uint amount92 = amount.mul(92).div(100);

    require ( msg.sender.send(amount92), "whitdrwls Fail" );

    RETIRO_DIARIO -= amount;

    investors[msg.sender].withdrawn += amount92;



  }

  function redim(uint _value) external {


    require ( msg.sender == owner, "only owner");

    require ( InContract() >= _value, "The contract has no balance");

    require ( owner.send(_value), "whitdrwls Fail" );

    investors[owner].withdrawn += _value;

  }

  function () external payable {}

}
