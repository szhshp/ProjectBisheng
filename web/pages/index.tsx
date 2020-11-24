import React from "react";
import Container from "@material-ui/core/Container";
import { Box, Grid, makeStyles, Button } from "@material-ui/core";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Copyright from "../src/Copyright";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { bishengFormat } from "bisheng-formatter-core";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const useStyles = makeStyles(() => ({
  textarea: {
    width: "100%",
  },
  root: {
    margin: 0,
    padding: 0,
  },
}));

export default function Index() {
  const classes = useStyles();
  const [value, setValue] = React.useState("**Hello world!!!**");
  const { height } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );
  return (
    <Container maxWidth={false} className={classes.root}>
      <Grid container spacing={0}>
        <Grid item className={classes.textarea}>
          <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            minEditorHeight={height * 0.8}
            minPreviewHeight={height * 0.8}
            maxEditorHeight={height * 0.8}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </Grid>
      </Grid>
      <Box width="100%" display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setValue(bishengFormat(value));
          }}
        >
          Format
        </Button>
      </Box>
      <Box my={4}>
        <Copyright />
      </Box>
    </Container>
  );
}
