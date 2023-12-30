import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "../colors";
import { useEffect, useState } from "react";

const useColorTheme = () => {
  const theme = useColorScheme();
  if (theme === "dark") {
    return darkColors;
  } else {
    return lightColors;
  }
};

export default useColorTheme;
