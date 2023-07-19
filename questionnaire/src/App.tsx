import { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

import { generateSchemas } from "./schemas";
import {
  Container,
  Box,
  Button,
  Link,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import { calculateScore } from "./scoring";
import { ValidationMode } from "@jsonforms/core";
import { Score } from "./scoring";

const ScoreTable = ({ scores }: { scores: Score }) => {
  if (!scores) return null;
  const entries = Object.entries(scores).map(([key, value]) => (
    <TableRow key={key}>
      <TableCell component="th" scope="row">
        {key}
      </TableCell>
      <TableCell align="right">{value.toFixed(1)}</TableCell>
    </TableRow>
  ));
  return (
    <Table sx={{ maxWidth: 400 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>
            <strong>Category</strong>
          </TableCell>
          <TableCell align="right">
            <strong>Score</strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{entries}</TableBody>
    </Table>
  );
};

function App() {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<any>([]);
  const [form, setForm] = useState<any>(null);
  const [validationMode, setValidationMode] =
    useState<ValidationMode>("NoValidation");
  const [scores, setScores] = useState<any>(undefined);

  useEffect(() => {
    const schemas = generateSchemas();
    setForm(schemas);
  }, []);

  const onReset = () => {
    setData({});
    setErrors([]);
    setValidationMode("NoValidation");
    setScores(undefined);
  };

  const onCalculateScoreClick = () => {
    setValidationMode("ValidateAndShow"); // Show validation errors
    if (errors.length > 0 || !data) {
      return;
    }
    const score = calculateScore(data);
    setScores(score);
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
      <Box padding={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Multidimensional Assessment of Interoceptive Awareness (Version 2)
        </Typography>

        {!scores ? (
          <>
            <Typography variant="body1" gutterBottom>
              Below you will find a list of statements. Please indicate how
              often each statement applies to you generally in daily life with{" "}
              <strong>0=Never</strong> and <strong>5=Always</strong>.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your scores will be rendered immediately after you click
              "Calcuate" and no data is stored or tracked in any way.
            </Typography>
            <Box marginTop={3}>
              <JsonForms
                schema={form.schema}
                uischema={form.uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                validationMode={validationMode}
                onChange={({ data, errors }) => {
                  setData(data);
                  setErrors(errors);
                }}
              />
            </Box>
          </>
        ) : (
          <ScoreTable scores={scores} />
        )}

        {!scores ? (
          <Box marginTop={3}>
            {errors && errors.length > 0 && (
              <Typography gutterBottom variant="body1" color="error">
                All questions are required, but have not been answered yet.
              </Typography>
            )}
            <Button
              onClick={onCalculateScoreClick}
              variant="contained"
              color="primary"
            >
              Calculate
            </Button>
            <Button onClick={onReset} sx={{ marginLeft: 2 }}>
              Reset all answers
            </Button>
          </Box>
        ) : (
          <Box marginTop={3}>
            <Button onClick={() => setScores(undefined)} sx={{ marginLeft: 2 }}>
              Back to Answers
            </Button>
          </Box>
        )}
      </Box>

      <Typography variant="body2" marginTop={3} marginBottom={2}>
        Mehling WE, Acree M, Stewart A, Silas J, Jones A (2018) The
        Multidimensional Assessment of Interoceptive Awareness, Version 2
        (MAIA-2).
        <Link
          href={
            "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0208034"
          }
        >
          PLoS ONE 13(12): e0208034.
        </Link>
      </Typography>
      <ul>
        <li>
          <Link href="https://osher.ucsf.edu/research/maia">
            Official MAIA Website
          </Link>
        </li>
        <li>
          <Link href="https://github.com/just-digital/maia-2/">
            Link to source code on GitHub
          </Link>
        </li>
      </ul>
    </Container>
  );
}

export default App;
