import React, { Component } from "react";
import Router from "next/router";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class AdNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createAd(this.state.name,this.state.price,this.state.desc,this.state.loc,this.state.con) 
        .send({
          from: accounts[0]
        });

      Router.push("/");
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create an Ad</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
            <label>Name of the product</label>

            <Input
              label="Name"
              labelPosition="right"
              value={this.state.name}
              onChange={event =>
                this.setState({ name: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Price Quote</label>

            <Input
              label="wei"
              labelPosition="right"
              value={this.state.price}
              onChange={event =>
                this.setState({ price: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>

            <Input
              label="Condition"
              labelPosition="right"
              value={this.state.desc}
              onChange={event =>
                this.setState({ desc: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>

            <Input
              label="Address"
              labelPosition="right"
              value={this.state.loc}
              onChange={event =>
                this.setState({ loc: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Contact Number</label>

            <Input
              label="Phn"
              labelPosition="right"
              value={this.state.con}
              onChange={event =>
                this.setState({ con: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default AdNew;
