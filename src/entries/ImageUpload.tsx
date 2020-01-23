import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { CardMedia } from "@material-ui/core";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: "80%",
      backgroundColor: "#D3D3D3",
      "&:hover": {
        cursor: "pointer"
      }
    },
    imageText: {
      margin: "0.5em"
    },
    media: {
      width: "40vh",
      height: "40vh"
    },
    mediaContent: {
        maxWidth: "100%",
        maxHeight: "100%"
    }
  })
);

export interface ImageUploadProps {
    fileBinary,
    setFileBinary: (binaryStr) => void
}

export const ImageUpload = (props: ImageUploadProps) => {
  const classes = useStyles({});
  const [filename, setFilename] = useState<string>("");
  const {fileBinary, setFileBinary} = props;
  
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        setFileBinary(binaryStr);
        setFilename(file.name);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const blob = new Blob([fileBinary], { type: "image/jpeg" });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {fileBinary ? (
          <div className={classes.media}>
            <img src={imageUrl} className={classes.mediaContent} />
          </div>
        ) : isDragActive ? (
            <Button variant="outlined" color="primary">
              Drop the image here ...
              </Button>
        ) : (
            <Button variant="outlined" color="primary">
              Drag 'n' drop the culture image here, or click to select file
            </Button>
        )}
      </div>
    </div>
  );
};
