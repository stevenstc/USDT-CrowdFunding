import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalInvestors: 0,
      totalInvested: 0,
      totalRefRewards: 0
    };

    this.totalInvestors = this.totalInvestors.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.totalInvestors(),1000);
  };

  async totalInvestors() {

    let esto = await Utils.contract.setstate().call();
    //console.log(esto);
    this.setState({
      totalInvestors: parseInt(esto.Investors._hex),
      totalInvested: parseInt(esto.Invested._hex)/1000000,
      totalRefRewards: parseInt(esto.RefRewards._hex)/1000000

    });

  };

  render() {
    const { totalInvestors, totalInvested, totalRefRewards } = this.state;

    var url = 'https://tronscan.io/#/contract/'+contractAddress+'/code';

    return (
      <div className="single-about-area wow fadeInUp">
          <div className="container">
              <div className="row">
                  <div className="col-lg-4">
                      <a href={url} className="single-about">
                          <div className="single-about-img">
                              <img src="assets/img/about-icon-1.png" alt="" />
                          </div>
                          <div className="single-about-text">
                              <h1>{totalInvestors}</h1>
                              <p>Global Investors</p>
                          </div>
                      </a>
                  </div>
                  <div className="col-lg-4">
                      <a href={url} className="single-about">
                          <div className="single-about-img">
                              <img src="assets/img/about-icon-2.png" alt="" />
                          </div>
                          <div className="single-about-text">
                              <h1>{totalInvested} USDT</h1>
                              <p>Global Inverted</p>
                          </div>
                      </a>
                  </div>
                  <div className="col-lg-4">
                      <a href={url} className="single-about">
                          <div className="single-about-img">
                              <img src="assets/img/about-icon-3.png" alt="" />
                          </div>
                          <div className="single-about-text">
                              <h1>{totalRefRewards} USDT</h1>
                              <p>Global Referral Rewards</p>
                          </div>
                      </a>
                  </div>
              </div>
          </div>
          <div class="space-90"></div>
      </div>
    );
  }
}
