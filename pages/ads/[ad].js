import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Ad from "../../ethereum/Ad";
import web3 from "../../ethereum/web3";
import Payment from "../../components/Payment";


class AdShow extends Component {
  static async getInitialProps(context) {
    console.log("getting init props");

    const ad = Ad(context.query.ad);
    console.log(ad);
    let summary;
    try
    { 
      let desc = await ad.methods.description().call();
      let contact = await ad.methods.contact().call();
      let priceQuoted = await ad.methods.priceQuoted().call();
      let name = await ad.methods.name().call();
      let location = await ad.methods.location().call();
      //manager ni aa rha
      let manager;
      try{
        manager = await ad.methods.getSeller().call();
      }
      catch(e){
        console.log("adssad:  "+e);
        manager="0xkajsd";
      }

      summary= [name,priceQuoted,desc,location,contact,manager]
    }
    catch(e){
      console.log(e);
      summary=["name",'123',"desc","location",'981723',"0x123123"];
    }
    console.log("summary");
    console.log(summary);
    return {
      address: context.query.ad,
      name: summary[0],
      priceQuoted: summary[1],
      description: summary[2],
      location: summary[3],
      contact: summary[4],
      manager: summary[5]
    };
  }

  renderCards() {
    const {
        name,
        priceQuoted,
        description,
        location,
        contact,
        manager
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this Ad",
        style: { overflowWrap: "break-word" }
      },
      {
        header: name,
        meta: "Name",
        description:
          "Name of the product"
      },
      {
        header: web3.utils.fromWei(priceQuoted, "ether"),
        meta: "Price",
        description:
          "Price quoted by seller"
      },
      {
        header: description,
        meta: "Product description",
        description:
          "Condition of the product"
      },
      {
        header: location,
        meta: "Address",
        description:
          "Address of the Seller"
      },
      {
        header: contact,
        meta: "Phone Number",
        description:
          "Contact of the Seller"
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Ad Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <Payment address={this.props.address} price={this.props.priceQuoted}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default AdShow;
