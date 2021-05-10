import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

export default createMuiTheme({
  typography: {
    useNextVaraiant: true,
  },
  palette: {
    primary: blue,
    secondary: green,
    teritiary: red,
  },
  status: {
    danger: "orange",
  },
});
