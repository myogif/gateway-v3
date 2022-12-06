import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { getDevices } from "../../features/appContainer/appContainerSlice";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

// import Box from "@mui/material/Box";
const HeaderInfo = styled(Box)(() => ({
  backgroundColor: "#393E46",
  color: "#fff",
  padding: "6px 10px",
}));
const HeaderWrapper = styled(Box)(() => ({
  paddingBottom: "20px",
}));
const Row = styled(Box)(() => ({
  display: "flex",
}));

function StatusPage() {
  const dispatch = useDispatch();
  const { deviceData, isLoading } = useSelector(
    (state) => state.appContainer,
    shallowEqual
  );
  const labelDevice = [];
  const valueDevice = [];
  const labelNetwork = [];
  const valueNetwork = [];

  useEffect(() => {
    dispatch(getDevices());
  }, [dispatch]);

  const device = deviceData?.data?.device;
  const network = deviceData?.data?.network|| deviceData?.data?.network?.en0[1];

  for (const key in device) {
    labelDevice.push(key);
    valueDevice.push(device[key]);
  }
  for (const key in network) {
    labelNetwork.push(key);
    valueNetwork.push(network[key]);
  }

  return (
    <div>
      <HeaderWrapper>
        <HeaderInfo>Device Information</HeaderInfo>
      </HeaderWrapper>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ paddingX: "80px" }}>
          {valueDevice.map((item, idx) => {
            return (
              <Row>
                <Typography paragraph> {labelDevice[idx]} :</Typography>
                <Typography paragraph>
                  {` `} {item}
                </Typography>
              </Row>
            );
          })}
        </Box>
      )}

      <HeaderWrapper>
        <HeaderInfo>Network Information</HeaderInfo>
      </HeaderWrapper>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ paddingX: "80px" }}>
          {valueNetwork.map((item, idx) => {
            return (
              <Row>
                <Typography paragraph> {labelNetwork[idx]}:</Typography>
                <Typography paragraph>
                  {` `} {item}
                </Typography>
              </Row>
            );
          })}
        </Box>
      )}
    </div>
  );
}

export default StatusPage;
