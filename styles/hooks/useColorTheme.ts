import { useColorScheme } from "react-native";
import { darkColors } from "../colors";

const useColorTheme = () => {
  const theme = useColorScheme();
  const colors = darkColors;
  return colors;
};

export default useColorTheme;
