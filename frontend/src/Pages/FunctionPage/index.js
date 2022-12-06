import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import {
  getDevices,
  postDevices,
  setPopupSuccess,
} from "../../features/appContainer/appContainerSlice";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

// import Box from "@mui/material/Box";
const HeaderInfo = styled(Box)(() => ({
  backgroundColor: "#393E46",
  color: "#fff",
  padding: "6px 10px",
}));
const HeaderWrapper = styled(Box)(() => ({
  paddingBottom: "40px",
}));
const Row = styled(Box)(() => ({
  display: "flex",
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function FunctionPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isSuccess, successMessage } = useSelector(
    (state) => state.appContainer,
    shallowEqual
  );
  const mode = ["UDP", "Alarm", "API"];
  const [modeValue, setModeValue] = React.useState(0);

  const [url, setUrl] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [deviceId, setDeviceId] = React.useState("");
  const [ipServer, setIpServer] = React.useState("");
  const [port, setPort] = React.useState("");

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onChangeApiKey = (e) => {
    setApiKey(e.target.value);
  };

  const onChangeDevice = (e) => {
    setDeviceId(e.target.value);
  };

  const onChangeIp = (e) => {
    setIpServer(e.target.value);
  };

  const onChangePort = (e) => {
    setPort(e.target.value);
  };

  const handleChange = (event) => {
    setModeValue(event.target.value);
    setUrl("");
    setApiKey("");
    setDeviceId("");
    setIpServer("");
    setPort("");
  };

  const handleSubmit = () => {
    dispatch(
      postDevices({
        device_id: deviceId || null,
        ip_server: ipServer || null,
        udp_port: port || null,
        api_key: apiKey || null,
        mode: mode[modeValue],
        uri_service: url || null,
      })
    );
    setUrl("");
    setApiKey("");
    setDeviceId("");
    setIpServer("");
    setPort("");
  };

  const handleClose = () => dispatch(setPopupSuccess(false));

  return (
    <div>
      <HeaderWrapper>
        <HeaderInfo>Function</HeaderInfo>
      </HeaderWrapper>

      <Box sx={{ paddingX: "80px", width: "70%" }}>
        <Box
          display="flex"
          sx={{
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: "16px",
          }}
        >
          <Typography gutterBottom={false}>
            Internet Connection Mode :
          </Typography>
          <FormControl sx={{ width: 300, marginLeft: "24px" }} size="small">
            <InputLabel id="mode">Mode</InputLabel>
            <Select
              labelId="mode"
              value={[modeValue]}
              onChange={handleChange}
              input={<OutlinedInput label="mode" />}
              MenuProps={MenuProps}
            >
              {mode.map((name, idx) => (
                <MenuItem key={name} value={idx}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {modeValue === 0 && (
          <>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <Typography gutterBottom={false}>Device Id :</Typography>
              <FormControl sx={{ width: 300, marginLeft: "24px" }} size="small">
                <TextField
                  id="outlined-basic"
                  label="device"
                  variant="outlined"
                  size="small"
                  value={deviceId}
                  onChange={onChangeDevice}
                />
              </FormControl>
            </Box>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <Typography gutterBottom={false}>Wan IP :</Typography>
              <FormControl sx={{ width: 300, marginLeft: "24px" }} size="small">
                <TextField
                  id="outlined-basic"
                  label="ip"
                  variant="outlined"
                  size="small"
                  value={ipServer}
                  onChange={onChangeIp}
                />
              </FormControl>
            </Box>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <Typography gutterBottom={false}>Port :</Typography>
              <FormControl sx={{ width: 300, marginLeft: "24px" }} size="small">
                <TextField
                  id="outlined-basic"
                  label="port"
                  variant="outlined"
                  size="small"
                  value={port}
                  onChange={onChangePort}
                />
              </FormControl>
            </Box>
          </>
        )}

        {modeValue === 1 || modeValue === 2 ? (
          <>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <Typography gutterBottom={false}>URL :</Typography>
              <FormControl sx={{ width: 300, marginLeft: "24px" }} size="small">
                <TextField
                  id="outlined-basic"
                  label="URL"
                  variant="outlined"
                  size="small"
                  onChange={onChangeUrl}
                  value={url}
                />
              </FormControl>
            </Box>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <Typography gutterBottom={false}>Api Key :</Typography>
              <FormControl sx={{ width: 300, marginLeft: "24px" }} size="small">
                <TextField
                  id="outlined-basic"
                  label="Api Key"
                  variant="outlined"
                  size="small"
                  onChange={onChangeApiKey}
                  value={apiKey}
                />
              </FormControl>
            </Box>
          </>
        ) : null}

        <Box
          display="flex"
          sx={{
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "56px",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "54%", marginLeft: "24px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isSuccess}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isSuccess}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h4"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Success
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textAlign: "center" }}
              variant="h5"
              component="h5"
            >
              {successMessage}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default FunctionPage;
