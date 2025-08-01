import { Box, Typography } from "@mui/material";

interface JokeBoxProps {
  title: string;
  children?: React.ReactNode;
}

export const JokeBox = ({ title, children }: JokeBoxProps) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: 2,
        borderRadius: 2,
        flex: 1,
        minWidth: 300,
      }}
    >
      <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
