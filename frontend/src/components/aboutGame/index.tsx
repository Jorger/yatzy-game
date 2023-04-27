import "./styles.css";
import { ButtonGroup, PageWrapper } from "../wrappers";
import Icon, { TypeIcon } from "../icon";
import Logo from "../logo";
import React from "react";

export interface ISocialNetworks {
  title: string;
  icon: TypeIcon;
  link: string;
}

const SOCIAL_NETWORKS: ISocialNetworks[] = [
  {
    title: "Twitter",
    icon: "twitter",
    link: "https://twitter.com/ostjh",
  },
  {
    title: "Github",
    icon: "github",
    link: "https://github.com/Jorger",
  },
  {
    title: "Linkedin",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/jorge-rubiano-a8616319",
  },
  {
    title: "Dev.to",
    icon: "devto",
    link: "https://dev.to/jorger",
  },
  {
    title: "bio.link",
    icon: "games",
    link: "https://bio.link/jorgerub",
  },
];

const AboutGame = () => {
  return (
    <PageWrapper>
      <div className="about-game">
        <Logo />
        <ButtonGroup label="About">
          <p>
            <a
              title="Yatzy"
              href="https://en.wikipedia.org/wiki/Yatzy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yatzy
            </a>{" "}
            is a dice game similar to Yacht and Yahtzee. It is related to the
            Latin American game Generala and the English game of poker dice.
            Yatzy is most popular in the Nordic countries.
          </p>
          <p>
            This version was developed by{" "}
            <a
              title="Jorge Rubiano"
              href="https://twitter.com/ostjh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jorge Rubiano
            </a>{" "}
            in{" "}
            <a
              title="ReactJS"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ReactJS
            </a>{" "}
            and{" "}
            <a
              title="TypeScript"
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TypeScript
            </a>
          </p>
          <p>
            Music by{" "}
            <a
              title="freesound"
              href="https://freesound.org/people/Setuniman/sounds/171394/"
              target="_blank"
              rel="noopener noreferrer"
            >
              freesound.org
            </a>
          </p>
        </ButtonGroup>
        <div className="about-game-social">
          {SOCIAL_NETWORKS.map(({ title, icon, link }, key) => (
            <a
              className="about-game-social-link"
              key={key}
              title={`Jorge Rubiano on ${title}`}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type={icon} fill="white" />
            </a>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default React.memo(AboutGame);
