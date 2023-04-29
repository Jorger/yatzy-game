import "./styles.css";
import { ButtonGroup } from "../../wrappers";
import { Link } from "react-router-dom";
import React from "react";
import type { IAuthOptions } from "../../../interfaces";

interface AuthLinksProps {
  authOptions: IAuthOptions[];
}

const AuthLinks = ({ authOptions }: AuthLinksProps) => (
  <div className="social-auth-links">
    <ButtonGroup label="Log In With">
      <div className="social-auth-links-items">
        {authOptions.length !== 0 &&
          authOptions.map(({ routerURL, socialName }) => (
            <a className="button orange" key={socialName} href={routerURL}>
              {socialName}
            </a>
          ))}
        {authOptions.length !== 0 && <h3>OR</h3>}
        <Link to="/guest" className="button">
          Play as guest
        </Link>
      </div>
    </ButtonGroup>
  </div>
);

export default React.memo(AuthLinks);
