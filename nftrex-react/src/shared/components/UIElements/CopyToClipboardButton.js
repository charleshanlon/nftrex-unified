import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import './CopyToClipboardButton.css'
const CopyToClipboardButton = ({textToCopy = ''}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div className="btncopy">
      <IconButton disableTouchRipple="true" onClick={handleClick} size="small">
        <ContentCopyIcon fontSize="small"/>
      </IconButton>
      <Snackbar
        message="Copied pairing string!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </div>
  );
};

export default CopyToClipboardButton;