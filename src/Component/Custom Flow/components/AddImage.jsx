import React from "react";
import { toast } from "react-toastify";
import { Form, FormGroup, Input, Label } from 'reactstrap';

const AddImage = ({ id, handleMultipleOptionChoice, imageType, status }) => {
  const generateImageUrl = async (img) => {
    console.log(img.size);
    if (img.size > 200000) {
      toast({
        description: "Image is larger than 200kb",
        status: "error",
        duration: 4500,
        position: "top",
        isClosable: "true",
      });
      return;
    }
    if (!img) return;
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = function (e) {
      let event = {
        target: {
          name: imageType || "imageUrl",
          value: reader.result || "",
          id: id,
        },
      };
      handleMultipleOptionChoice(event);
    };
  };

  return (
    <>
      <div className="d-flex flex-column gap-5">
      <Input
          isDisabled={status === "edit"}
         style={{cursor: 'pointer'}}
          type="file"
          accept="image/*"
          onChange={(e) => generateImageUrl(e.target.files[0])}
        />
      </div>
    </>
  );
};

export default AddImage;
