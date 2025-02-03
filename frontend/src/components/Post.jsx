import React from "react";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItem";
import { RiBookmarkLine, RiChat3Line, RiHeartLine, RiMoreLine, RiSendPlane2Line } from "@remixicon/react";
import { DialogActions, ListItemText } from "@mui/material";

export const Post = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
    if (selectedValue === "cancel") {
      setOpen(false);
    }
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
    <div className="PostCard max-w-md w-full mx-auto my-1 bg-amber-400">
      <div className="postHeader flex justify-between p-3">
        <div className="postHeaderLeft flex gap-2">
          <Avatar
            alt="User Avatar"
            src="/src/assets/Images/CarouselsImages/snap.jpg"
            sx={{ width: 40, height: 40 }}
          />
          <span>
            <p className="text-xs font-semibold">meetchauhan_1721</p>
          </span>
        </div>
        <div className="postHeaderRight">
          <RiMoreLine
            onClick={handleClickOpen}
            className="cursor-pointer"
            color="black"
            size={28}
          />

          <Dialog open={open} onClose={handleChange} sx={{ fullWidth: true, maxWidth: 'lg', borderRadius: "15px"}}>
            <DialogActions >
              <List>
                {moreOptions.map((option) => (
                  <ListItem disablePadding
                    
                    key={option.value}
                  >
                    <ListItemButton
                      sx={{ width: "350px", textAlign: "center", '&:hover': { backgroundColor: '#e6e6e6'}, borderRadius: "5px" }}
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
        <img className="rounded-md border border-red-100"
          src="src/assets/Images/CarouselsImages/KunalMeet.jpg"
          alt="Post Image"
        />
      </div>
      <div className="postFooter p-3">
        <div className="postInteractions flex justify-between">
          <div className="postInteractionLeft flex gap-3">
            <RiHeartLine
              className="cursor-pointer"
              color="black"
              size={28}
            />
            <RiChat3Line
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
          liked by <span className="font-semibold">vishwa8976</span> and <span className="font-semibold">others</span>
        </p>
        <p className="text-sm">
          <span className="font-semibold">meetchauhan_1721</span> <span >Bataku</span>
        </p>
        <span className="text-sm text-gray-400">View all comments</span>
      </div>
      
    </div>
  );
};
