import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";

class AdIndex extends Component {
  static async getInitialProps() {
    let ads;
    try {
      ads = await factory.methods.getDeployedAds().call();
      console.log(ads);
    } catch (e) {
      ads = [];
      console.log(e);
    }
    return { ads };
  }

  renderAds() {
    let items = this.props.ads.length == 0 ?
      <h3>No ads</h3>
      :
      this.props.ads.map(ad => {
        return {
          header: ad,
          description: (
            <Link href="/ads/[ad]" as={`/ads/${ad}`}>
            <a>View ad</a>
            </Link>
          ),
          fluid: true,
          style: {
            marginLeft: "0"
          }
        };
      });
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