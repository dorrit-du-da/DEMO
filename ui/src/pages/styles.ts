import { makeStyles, createStyles } from "@material-ui/styles";

export default makeStyles((theme : any) => createStyles({
  tableCell: {
    verticalAlign: "center",
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: "0.75rem"
  },
  tableCellSmall: {
    verticalAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: "0.7rem"
  },
  tableCellMini: {
    verticalAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 6,
    fontSize: "0.6rem"
  },
  tableCellButton: {
    verticalAlign: "center",
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: "0.75rem"
  },
  tableRow: {
    height: "auto"
  },
  heading: {
    padding: "10px",
    textAlign: "center",
    color: "#275ba1"
    // fontSize: theme.typography.pxToRem(15),
    // fontWeight: theme.typography.fontWeightRegular,
  },
  buttonLifecycle: {
    width: "90%",
    paddingTop: 2,
    paddingBottom: 2,
  },
  choiceButton: {
    paddingTop: 0,
    paddingBottom: 0,
    marginRight: 5,
    color: "white"
  },
  smallButton: {
    paddingTop: 0,
    paddingBottom: 0,
    marginRight: 5,
    color: "white",
    fontSize: 10
  },
  newButton: {
    marginTop: 50,
  },
  inputField: {
    marginTop: 10
  },
  width90: {
    width: "80%"
  },
  width50: {
    width: "50%"
  },
  marginLeft10: {
    marginLeft: 10
  },
  default: {
    fill: "#fff",
  },
  green: {
    fill: "#009900",
  },
  yellow: {
    fill: "#999900"
  },
  red: {
    fill: "#990000"
  },
  chipYellow: {
    color: "white",
    backgroundColor: "#999900",
    verticalAlign: "top",
  },
  chipGreen: {
    color: "white",
    backgroundColor: "#009900",
    verticalAlign: "top",
  },
  paper: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: theme.palette.secondary.main
  },
  paperHeading: {
    paddingTop: 20,
    paddingBottom: 20,
    color: "#275ba1"
  },
  actionButton: {
    margin: 20,
    color: "#275ba1"
  },
  dot: {
    padding: 0,
    borderColor: "#009900",
    backgroundColor: "white",
  },
  mobileScreen: {
    height: `calc(100vh - 144px)`
  },
  fullWidth: {
    width: "100%"
  },
  buttonMargin: {
    marginTop: "20px",
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black"
    }
  },
  buttonGreen: {
    root: {
      '&$selected': {
        backgroundColor: "#275ba1",
        '& + &': {
          backgroundColor: "#275ba1",
          borderLeft: 0,
          marginLeft: 0,
        },
      }
    }
  },
  progressWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    marginTop: 50,
    marginLeft: 50,
  },
  progressFab: {
    color: "#666666cc",
    position: 'absolute',
    top: -22,
    left: -22,
    zIndex: 1,
  },
  progressButton: {
    color: "#275ba1",
  }
}));
