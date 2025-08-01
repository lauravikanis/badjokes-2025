import { Container, Link, Typography } from "@mui/material";
import { useState } from "react";
import classes from "./App.module.scss";
import { JokeAPIService } from "./api/jokes";
import { JokeBox } from "./components/JokeBox";
import { JokeContent } from "./components/JokeContent";

function App() {
  const [currentJoke, setCurrentJoke] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate a random joke from JokeAPI
  const generateRandomJoke = async () => {
    setIsLoading(true);
    try {
      const joke = await JokeAPIService.getRandomJoke();
      setCurrentJoke(joke);
    } catch (error) {
      console.error("Error generating random joke:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.app}>
      <header>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Experiments with APIs and MaterialUI
        </Typography>
        <Typography variant="h2" component="p" sx={{ mb: 4 }}>
          (and at some point AI){" "}
        </Typography>
      </header>
      <main className={classes.main}>
        <Container
          maxWidth="md"
          component="main"
          sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
        >
          <JokeBox title="Random Joke Generator">
            <JokeContent
              isLoading={isLoading}
              action={generateRandomJoke}
              actionResult={currentJoke}
            />
          </JokeBox>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="body2" align="center">
          {"Powered by "}
          <Link color="inherit" href="https://v2.jokeapi.dev/">
            JokeAPI
          </Link>
          {" - 08/2025"}
        </Typography>
      </footer>
    </div>
  );
}

export default App;
