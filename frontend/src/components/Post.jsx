import React from "react";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItem";
import {
  RiBookmarkLine,
  RiChat3Line,
  RiHeartLine,
  RiMoreLine,
  RiSendPlane2Line,
} from "@remixicon/react";
import { DialogActions, ListItemText } from "@mui/material";
import { CommentDialog } from "./CommentDialog";

export const Post = () => {
  const [open, setOpen] = React.useState(false);
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [commentText, setCommentText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
    if (selectedValue === "cancel") {
      setOpen(false);
    }
  };

  const changeEventHandler = (event) => {
    const inputText = setCommentText(event.target.value);

    if (inputText.trim()) {
      setCommentText(inputText);
    } else {
      setCommentText("");
    }
  };

  const sendMessageHandler = async () => {
    alert(commentText);
  };

  const moreOptions = [
    { label: "Report", value: "report" },
    { label: "Unfollow", value: "unfollow" },
    { label: "Add to favourites", value: "favourites" },
    { label: "Go to post", value: "gotopost" },
    { label: "Share to...", value: "share" },
    { label: "Copy link", value: "copylink" },
    { label: "Embed", value: "embed" },
    { label: "About this account", value: "about" },
    { label: "Cancel", value: "cancel" },
  ];

  return (
    <div className="PostCard max-w-md w-full mx-auto my-4 ">
      <div className="postHeader flex justify-between p-3">
        <div className="postHeaderLeft flex gap-2">
          <Avatar
            alt="User Avatar"
            src="/src/assets/Images/CarouselsImages/snap.jpg"
            sx={{ width: 40, height: 40 }}
          />
          <span>
            <p className="text-sm font-semibold">meetchauhan_1721</p>
          </span>
        </div>
        <div className="postHeaderRight">
          <RiMoreLine
            onClick={handleClickOpen}
            className="cursor-pointer"
            color="black"
            size={28}
          />

          <Dialog
            open={open}
            onClose={handleChange}
            sx={{ fullWidth: true, maxWidth: "lg", borderRadius: "15px" }}
          >
            <DialogActions>
              <List>
                {moreOptions.map((option) => (
                  <ListItem disablePadding key={option.value}>
                    <ListItemButton
                      sx={{
                        width: "350px",
                        textAlign: "center",
                        "&:hover": { backgroundColor: "#e6e6e6" },
                        borderRadius: "5px",
                      }}
                      onClick={() => handleChange(option.value)}
                    >
                      <ListItemText primary={option.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <div className="postBody">
        <img
          className="rounded-md border border-red-100"
          src="src/assets/Images/CarouselsImages/KunalMeet.jpg"
          alt="Post Image"
        />
      </div>
      <div className="postFooter p-3">
        <div className="postInteractions flex justify-between">
          <div className="postInteractionLeft flex gap-3">
            <RiHeartLine className="cursor-pointer" color="black" size={28} />
            <RiChat3Line
              onClick={() => {
                setOpenCommentDialog(true);
              }}
              className="cursor-pointer"
              color="black"
              size={28}
            />
            <RiSendPlane2Line
              className="cursor-pointer"
              color="black"
              size={28}
            />
          </div>
          <div className="postInteractionRight">
            <RiBookmarkLine
              className="cursor-pointer"
              color="black"
              size={28}
            />
          </div>
        </div>
        <p className="text-sm">
          liked by <span className="font-semibold">vishwa8976</span> and{" "}
          <span className="font-semibold">others</span>
        </p>
        <p className="text-sm">
          <span className="font-semibold">meetchauhan_1721</span>{" "}
          <span>Bataku</span>
        </p>
        <span
          onClick={() => {
            setOpenCommentDialog(true);
          }}
          className="text-sm text-gray-400 cursor-pointer"
        >
          View all comments
        </span>
        <div className="postCommentInput  border-gray-500 flex">
          <input
            type="text"
            value={commentText}
            onChange={changeEventHandler}
            placeholder="add a comment..."
            className="w-full  outline-none"
          />
          <button
            disabled={!commentText.trim()}
            onClick={sendMessageHandler}
            className={`cursor-pointer font-semibold p-2 ${
              !commentText.trim() ? "text-gray-500" : "text-blue-500"
            }`}
          >
            Send
          </button>
        </div>
      </div>
      <CommentDialog
        openCommentDialog={openCommentDialog}
        setOpenCommentDialog={setOpenCommentDialog}
      />
    </div>
  );
};
