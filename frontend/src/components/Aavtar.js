import { React, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import noteContext from "../context/notes/noteContext.js";

const StyledAvatar = styled(Avatar)({
  transition: "transform 0.15s ease-in-out",
  border: "2px solid white", // Add a border to the avatar
  "&:hover": {
    transform: "scale(1.2)", // Increase the size of the avatar more on hover
  },
});

export default function SizeAvatars() {
  const context = useContext(noteContext);
  const { userdetails, getUser } = context;
  useEffect(() => {
    getUser();
  }, []);
  const { image, name } = userdetails;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title={"Hi " + name} arrow>
        <StyledAvatar
          alt="Profile Image"
          src={image}
          style={{ objectFit: "cover" }}
        />
      </Tooltip>
    </Stack>
  );
}
