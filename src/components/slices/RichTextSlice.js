import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import RichTextContainer from "../widgets/RichTextContainer";
import Section from "../widgets/Section";
import cn from "classnames";
import CTA from "../widgets/CTA";
import get from "lodash/get";
import FloatingImages from "../FloatingImages";

class RichTextSlice extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      groundwater: [],
      selectTable: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://api.airtable.com/v0/appSiM4BMjfa2tOwy/municipal?api_key=keySWJROaGROOvXyK"
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ municipal: data.records });
      })
      .catch((err) => {
        // Error :(
      });

    fetch(
      "https://api.airtable.com/v0/appSiM4BMjfa2tOwy/groundwater?api_key=keySWJROaGROOvXyK"
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ groundwater: data.records });
      })
      .catch((err) => {
        // Error :(
      });

    fetch(
      "https://api.airtable.com/v0/appSiM4BMjfa2tOwy/glyphosate-removal?api_key=keySWJROaGROOvXyK"
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ glyphosate_removal: data.records });
      })
      .catch((err) => {
        // Error :(
      });

    fetch(
      "https://api.airtable.com/v0/appSiM4BMjfa2tOwy/table-industrial?api_key=keySWJROaGROOvXyK"
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ table_industrial: data.records });
      })
      .catch((err) => {
        // Error :(
      });

    fetch(
      "https://api.airtable.com/v0/appSiM4BMjfa2tOwy/multiplex-construction?api_key=keySWJROaGROOvXyK"
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ multiplex_construction: data.records });
      })
      .catch((err) => {
        // Error :(
      });
    fetch(
      "https://api.airtable.com/v0/appSiM4BMjfa2tOwy/peoples-liberation?api_key=keySWJROaGROOvXyK"
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ peoples_liberation: data.records });
      })
      .catch((err) => {
        // Error :(
      });
  }

  render() {
    const { classes, className, slice, menu } = this.props;
console.log('---menu:', menu)
    const fullWidth = slice.columns === "Full Width";
    const splitIntoColumn = slice.columns === "2";

    const hasImages = !!get(slice, ["items", 0, "image", "images"]);

    const table = (
      <table style={{ width: "100%" }}>
        <tr>
          <th>Indicators</th>
          <th>Unit</th>
          <th>Raw</th>
          <th>Treated</th>
        </tr>

        {this.state.municipal &&
          this.state.municipal.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Unit}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Raw}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Treated}</td>
              </tr>
            );
          })}
      </table>
    );

    const table_groundwater = (
      <table style={{ width: "100%" }}>
        <tr>
          <th>Indicators</th>
          <th>Raw</th>
          <th>Treated</th>
          <th>ASWG</th>
        </tr>

        {this.state.groundwater &&
          this.state.groundwater.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Raw}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Treated}</td>
                <td style={{ textAlign: "center" }}>{key.fields.ADWG}</td>
              </tr>
            );
          })}
      </table>
    );

    const glyphosate_removal = (
      <table style={{ width: "100%" }}>
        <tr>
          <th>Indicators</th>
          <th>Raw</th>
          <th>Unit</th>
          <th>ASWG</th>
        </tr>

        {this.state.glyphosate_removal &&
          this.state.glyphosate_removal.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Raw}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Unit}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Treated}</td>
              </tr>
            );
          })}
      </table>
    );

    const table_industrial = (
      <table style={{ width: "100%" }}>
        <tr>
          <th>Indicators</th>
          <th>Raw</th>
          <th>Unit</th>
          <th>ASWG</th>
        </tr>

        {this.state.table_industrial &&
          this.state.table_industrial.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Raw}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Unit}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Treated}</td>
              </tr>
            );
          })}
      </table>
    );
    const multiplex_construction = (
      <table style={{ width: "100%" }}>
        <tr>
          <th>Indicators</th>
          <th>Raw</th>
          <th>Unit</th>
          <th>ASWG</th>
        </tr>

        {this.state.multiplex_construction &&
          this.state.multiplex_construction.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Raw}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Unit}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Treated}</td>
              </tr>
            );
          })}
      </table>
    );
    const peoples_liberation = (
      <table style={{ width: "100%" }}>
        <tr>
          <th>Indicators</th>
          <th>Raw</th>
          <th>Unit</th>
          <th>ASWG</th>
        </tr>

        {this.state.peoples_liberation &&
          this.state.peoples_liberation.map((key, article) => {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>{key.fields.Indicators}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Raw}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Unit}</td>
                <td style={{ textAlign: "center" }}>{key.fields.Treated}</td>
              </tr>
            );
          })}
      </table>
    );

    const url = typeof window !== 'undefined' && window.location.href.split("/")[4];

    return (
      <Section>
        <div
          className={cn(
            splitIntoColumn
              ? classes.columns
              : fullWidth
              ? classes.fullWidth
              : classes.container,
            className
          )}
        >
          <div className={cn(hasImages && classes.floatLeft)}>
            {slice.text && (
              <RichTextContainer
                className={cn(
                  classes.text,
                  splitIntoColumn && classes.textColumns
                )}
                content={slice.text.html}
              />
            )}
            {slice.link_url && slice.link_text && (
              <CTA
                className={cn(classes.link, {
                  withMargin: slice.text && slice.text.text,
                })}
                text={slice.link_text}
                to={slice.link_url.url}
                target={slice.link_url.target}
              />
            )}
          </div>
          {hasImages && (
            <div className={classes.floatRight}>
              <FloatingImages images={slice.items.map((x) => x.image)} />
              {url === "qingyuan-industrial-park1111"
                ? table
                : url === "qingyuan-industrial-park111"
                ? table_groundwater
                : url === "glyphosate_removal"
                ? glyphosate_removal
                : url === "qingyuan-industrial-park11"
                ? table_industrial
                : url === "multiplex-construction"
                ? multiplex_construction
                : url === "peoples-liberation-army-of-china"
                ? peoples_liberation
                : null}
            </div>
          )}
        </div>
      </Section>
    );
  }
}

export default injectSheet((theme) => ({
  floatLeft: {
    float: "left",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
      maxWidth: theme.text.maxWidth,
    },
  },
  floatRight: {
    float: "right",
    width: "50%",
    paddingLeft: theme.spacing.lg,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  container: {
    "&::after": {
      content: '""',
      clear: "both",
      display: "table",
    },
  },
  fullWidth: {
    width: "100%",
    maxWidth: 860,
    marginLeft: "auto",
    marginRight: "auto",
  },
  columns: {
    columns: "400px 2",
    margin: [0, `-${theme.spacing.md}`],
    "& > *": {
      [theme.breakpoints.up("md")]: {
        maxWidth: theme.text.maxWidth,
      },
    },
  },
  text: {
    "& > *:last-child": {
      marginBottom: 0,
    },
  },
  textColumns: {
    "& > *": {
      marginLeft: theme.spacing.md,
      marginRight: theme.spacing.md,
    },
  },
  link: {
    display: "block",
    color: theme.colors.water,
    "&.withMargin": {
      marginTop: theme.spacing.md,
    },
  },
}))(RichTextSlice);
