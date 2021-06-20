import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import Ad from "../ethereum/ad";

class AdIndex extends Component {

  static async getInitialProps() {
    let ads;
    let list = [];

    try {
      console.log("getting initial props");
      ads = await factory.methods.getDeployedAds().call();
      for (var i = 0; i < ads.length; i++){
        var isClosed = await Ad(ads[i]).methods.isComplete().call();
        console.log("haha" + isClosed);
        if(isClosed)
          continue;
        
        let header = await Ad(ads[i]).methods.name().call();
        let temp = [ads[i], header];
        list.push(temp);
      }
    } catch (e) {
      ads = [];
      console.log(e);
    }
    return { ads , list };
  }

  renderAds() {
    console.log(this.props.ads.length);
    let items;
    if (this.props.ads.length == 0) {
      console.log("empty list really");
      return <h3>No ads</h3>;
    }
    else{
    
      if(this.props.list.length==0)
      {
        return <h3>No ads</h3>;
      }
      items = this.props.list.map(ad => {
        console.log(ad);
        return {
          header: ad[1],
          description: (
            <Link href="/ads/[ad]" as={`/ads/${ad[0]}`}>
            <a>View ad</a>
            </Link>
          ),
          fluid: true,
          style: {
            marginLeft: "0"
          }
        };
      });
    }
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open ads</h3>
          <Link href="/ads/new">
            <a>
              <Button
                floated="right"
                content="Create Ad"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderAds()}
        </div>
      </Layout>
    );
  }
}

export default AdIndex;