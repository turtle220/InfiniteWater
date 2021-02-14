import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import cn from "classnames";
import ResponsiveImage from "../widgets/ResponsiveImage";
import RichTextContainer from "../widgets/RichTextContainer";
import CTA from "../widgets/CTA";
import Link from "../widgets/Link";
import Section from "../widgets/Section";

class Articles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectURL: "",
    };
  }

  render() {
    const { classes, page, slice } = this.props;
    console.log(this.props, "Articles------");
    if (!page) return;

    const ch =
      typeof window !== "undefined" && window.location.href.split("/")[2];
console.log('----ch:', ch);
    if (ch === "zh") {
      this.setState({ selectURL: page.url.split("/")[3] });
    } else {
      this.setState({ selectURL: page.url.split("/")[2] });
    }

    return (
      <Section contentClassName={classes.section}>
      {page.articles.map((article, i) => (
          <div
            key={article.uid}
            className={cn(classes.articleContainer, { reverse: i % 2 })}
            style={{ paddingTop: "10% !important" }}
          >
            {article.hero_image && (
              <Link className={classes.imageContainer} to={article.url}>
                <ResponsiveImage
                  className={cn(classes.image, { reverse: i % 2 })}
                  images={article.hero_image.images}
                  blur={article.hero_image.blur}
                  aspect={1}
                />
              </Link>
            )}
            <div className={cn(classes.content, { reverse: i % 2 })}>
              <h2 className={classes.title}>{article.title.text}</h2>
              {/* <p>{article.date.text}</p> */}
              <RichTextContainer content={article.summary.html} />
              {this.state.selectURL ? (<CTA
                className={classes.bloglink}
                to={article.url}
                text={slice.cta_text || "Read Full Article"}
              />) : (<CTA
                className={classes.link}
                to={article.url}
                text={slice.cta_text || "Read Full Article"}
              />) }
            </div>
          </div>
        ))}
      </Section>
    );
  }
}

export default injectSheet((theme) => ({
  section: {},
  articleContainer: {
    display: "block",
    paddingTop: "5%",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    [theme.breakpoints.up("md")]: {
      marginBottom: 0,
      marginTop: "-5%",
      display: "flex",
      "&.reverse": {
        flexDirection: "row-reverse",
      },
    },
  },
  imageContainer: {
    flex: "1 1 0%",
    display: "block",
    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
  },
  image: {
    maxWidth: 520,
    [theme.breakpoints.up("md")]: {
      marginLeft: 0,
      marginRight: "auto",
      "&.reverse": {
        marginLeft: "auto",
        marginRight: 0,
      },
    },
  },
  content: {
    flex: "1 1 0%",
    maxWidth: 520,
    margin: "auto",
    padding: [theme.spacing.md, 0, theme.spacing.lg],
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing.lg,
      paddingRight: 0,
      maxWidth: "100%",
      "&.reverse": {
        paddingRight: theme.spacing.lg,
        paddingLeft: 0,
      },
    },
  },
  title: {
    lineHeight: "3rem",
  },
  link: {
    color: theme.colors.water,
  },
  bloglink: {
    color: "#4d4e56",
    "&:hover": {
      color: "#4d4e56",
    },
  },
}))(Articles);
