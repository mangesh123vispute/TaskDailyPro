import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";

const StyledAvatar = styled(Avatar)({
  transition: "transform 0.15s ease-in-out",
  border: "2px solid white", // Add a border to the avatar
  "&:hover": {
    transform: "scale(1.2)", // Increase the size of the avatar more on hover
  },
});

export default function SizeAvatars() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title="Hi Bro" arrow>
        <StyledAvatar
          alt="Natacha"
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
        />
      </Tooltip>
    </Stack>
  );
}
