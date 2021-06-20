import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import Ad from "../ethereum/ad";

class AdIndex extends Component {
  static async getInitialProps() {
    let ads;
    try {
      ads = await factory.methods.getDeployedAds().call();
      console.log("no error::::::"+ads);
    } catch (e) {
      console.log("error:::::::");
      ads = [];
      console.log(e);
    }
    return { ads };
  }

  renderAds() {
    console.log(this.props.ads.length);
    let items;
    if(this.props.ads.length==0){
      return <h3>No ads</h3>;
    }
    else{
      let list = [];
      for(var i=0;i<this.props.ads.length;i++){
        if(Ad(this.props.ads[i]).methods.isComplete().call()==true)
        continue;

        list.push(this.props.ads[i])
      }
      if(list.length==0)
      {
        return <h3>No ads</h3>;
      }
      items = list.map(ad => {
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

// let items = this.props.ads.length == 0 ?
//       <h3>No ads</h3>
//       :
      // this.props.ads.map(ad => {
      //   return {
      //     header: ad,
      //     description: (
      //       <Link href="/ads/[ad]" as={`/ads/${ad}`}>
      //       <a>View ad</a>
      //       </Link>
      //     ),
      //     fluid: true,
      //     style: {
      //       marginLeft: "0"
      //     }
      //   };
      // });