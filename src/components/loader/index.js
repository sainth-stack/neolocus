import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 700],
            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({ loading, setImgsLoaded }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 10 : prevProgress + 10
        );
        if (progress >= 100) {
          setImgsLoaded(true);
        }
      }, 6000);
      return () => clearInterval(timer);
    } else {
      // Reset progress to 0 when not loading
      setProgress(0);
    }
  }, [loading]);

  return (
    <Box sx={{ width: "80%", position: "relative", margin: "auto" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: loading ? "100%" : "0%",
          transition: "width 0.3s ease-in-out",
        }}
      >
        <LinearProgressWithLabel value={progress} />
      </Box>
    </Box>
  );
}
