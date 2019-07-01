import React from "react";

import CustomVariables from "../native-base-theme/variables";
import getTheme from "../native-base-theme/components";

import { StyleProvider } from "native-base";

export default Comp => () => (
  <StyleProvider style={getTheme(CustomVariables)}>
    <Comp />
  </StyleProvider>
);
