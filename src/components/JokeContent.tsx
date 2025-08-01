import { Box, Button, Container, Typography } from "@mui/material";

interface JokeContentProps {
  action?: () => void;
  actionResult: string | null;
  isLoading: boolean;
}

export const JokeContent = ({
  action,
  actionResult,
  isLoading,
}: JokeContentProps) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {action && (
        <Button
          variant="text"
          color="primary"
          onClick={action}
          sx={{ width: "200px", height: "50px" }}
          size="small"
        >
          Generate Joke
        </Button>
      )}
      <Box
        sx={{
          border: "1px solid black",
          padding: 2,
          borderRadius: 2,
          flex: 1,
          minWidth: 300,
        }}
      >
        {isLoading || !actionResult ? (
          "loading..."
        ) : (
          <Typography variant="body1" component="p" sx={{ mb: 2 }}>
            {actionResult}
          </Typography>
        )}
      </Box>
    </Container>
  );
};
