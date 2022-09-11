import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "./components/Card/CardComponent";

function App() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(null);
  const [datas, setDatas] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3333/attractions")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setDatas(result);
          // console.log({ result });
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Hello React Dome
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {datas.map((data) => (
                <Grid item xs={12} sm={4} key={data.id}>
                  <CardComponent data={data} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
