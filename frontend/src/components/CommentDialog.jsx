import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import React from "react";

export const CommentDialog = ({ openCommentDialog, setOpenCommentDialog }) => {
  const [open, setOpen] = React.useState(false);
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
    <Dialog
      open={openCommentDialog}
      onClose={() => setOpenCommentDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogContent className="flex flex-col md:flex-row p-0 m-auto gap-3 h-full">
        <div className="postContainer flex-1 h-auto">
          <img
            className="w-auto h-full object-contain"
            src="/src/assets/Images/CarouselsImages/KunalMeet.jpg"
            alt="Comments"
          />
        </div>
        <div className="CommentContainer flex-1 h-full flex flex-col">
          <div className="userProfileOption w-full p-3 flex justify-between border border-gray-500">
            <div className="flex items-center gap-3">
              <Link>
                <Avatar
                  alt="Remy Sharp"
                  src="/src/assets/Images/CarouselsImages/VishwaMeet.jpg"
                  sx={{ width: 40, height: 40 }}
                />
              </Link>
              <Link>
                <p className="text-sm font-semibold">meetchauhan_1721</p>
              </Link>
            </div>
            <div className="moreOption p-2">
              <RiMoreLine
                className="cursor-pointer"
                onClick={() => handleClickOpen()}
              />

              <Dialog
                open={open}
                onClose={handleChange}
                sx={{ fullWidth: true, maxWidth: "2xl", borderRadius: "15px", cursor: "pointer" }}
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
          <div className="postComments h-89 border-x border-gray-500 overflow-y-auto px-3 py-2">
            Comments
          </div>
          <div className="postCommentInput border-x border-t border-gray-500 flex">
            <input
              type="text"
              value={commentText}
              onChange={changeEventHandler}
              placeholder="add a comment..."
              className="w-full p-3 outline-none"
            />
            <button
              disabled={!commentText.trim()}
              onClick={sendMessageHandler}
              className={`cursor-pointer font-semibold p-3 ${
                !commentText.trim() ? "text-gray-500" : "text-blue-500"
              }`}
            >
              Send
            </button>
          </div>
          <div className="postFooter border border-gray-500 p-3">
            <div className="postInteractions flex justify-between">
              <div className="postInteractionLeft flex gap-3">
                <RiHeartLine
                  className="cursor-pointer"
                  color="black"
                  size={28}
                />
                <RiChat3Line
                  onClick={() => {
                    setOpenCommentDialog(true);
                  }}
                  className="cursor-pointer"
                  color="black"
                  size={27}
                />
                <RiSendPlane2Line
                  className="cursor-pointer"
                  color="black"
                  size={26}
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

CommentDialog.propTypes = {
  openCommentDialog: PropTypes.bool.isRequired,
  setOpenCommentDialog: PropTypes.func.isRequired,
};
