import React, { Component } from "react";
import Router from "next/router";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Ad from "../ethereum/ad";
import web3 from "../ethereum/web3";

class Payment extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    const ad = Ad(this.props.address);

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const price = await ad.methods.priceQuoted().call();

      var bal = await web3.eth.getBalance(this.props.address);
      const status = await ad.methods.isComplete().call();
      if(status==true){
        throw "Ad is closed";
      }
      await ad.methods.buyProduct().send({ from: accounts[0], value: price.toString() });
      bal = await web3.eth.getBalance(this.props.address);

      Router.replace(
        "/ads/[ad]",
        `/ads/${this.props.address}`
      );
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err });
    }

    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Proceed to Pay.
        </Button>
      </Form>
    );
  }
}

export default Payment;
