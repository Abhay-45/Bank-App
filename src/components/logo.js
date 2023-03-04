import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img src={"https://upload.wikimedia.org/wikipedia/commons/d/d7/Sainsbury%27s_Logo.svg"} />
  );
};
