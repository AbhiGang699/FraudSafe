import React from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link href="/">
        <a className="item">FraudSafe</a>
      </Link>

      <Menu.Menu position="right">
        <Link href="/">
          <a className="item">Ads</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
