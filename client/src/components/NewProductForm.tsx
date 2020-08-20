import React, { useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  RangeInput,
  TextArea,
  Select,
} from "grommet";
import ApiService from "../ApiService/ApiService";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";

interface FormState {
  title: string;
  description: string;
  images: string[];
  location?: string;
  price: number;
  quantity: number;
  height: number;
  width: number;
  depth: number;
  materials: string;

  //size?: "small" | "medium" | "large" | "xlarge";
}

const initialState = {
  title: "",
  description: "",
  images: [] as string[],
  location: "",
  price: 0,
  quantity: 0,
  height: 0,
  width: 0,
  depth: 0,
  materials: "",
};

const materialOptions = [
  "wood",
  "leather",
  "metal",
  "velvet",
  "fabric",
  "concrete",
  "glass",
];

interface StateProps {
  isAuthenticated: boolean;
}

interface DispatchProps {
  setIsAuthenticated: (b: boolean) => void;
}

type Props = StateProps & DispatchProps;

const NewProductForm = ({ isAuthenticated, setIsAuthenticated }: Props) => {
  const [newProduct, setNewProduct] = useState(initialState);

  const onDrop = (files: File[], pictures: string[]) => {
    setNewProduct((prevState) => ({
      ...prevState,
      images: prevState.images.concat(pictures),
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const {
      title,
      description,
      images,
      location,
      price,
      quantity,
      height,
      width,
      depth,
      materials,
    } = newProduct;
    const product = {
      title,
      description,
      images,
      location,
      price,
      quantity,
      height,
      width,
      depth,
      materials,
    };
    const res = await ApiService.createNewProduct(product);

    if (res.error) {
      alert(`${res.message}`);
      setNewProduct(initialState);
    } else {
      const accessToken = res.token;
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
      window.location.replace("http://localhost:3000/home");
    }
  };

  return (
    <Box direction="row" flex align="center" justify="center">
      <Box width="medium" margin="50px">
        <Form
          onChange={(value: FormState) => console.log("onChange", value)}
          onSubmit={handleSubmit}
        >
          <FormField
            label="Product name"
            name="title"
            value={newProduct.title}
            required
            validate={{ regexp: /^[a-z]/i }}
            onChange={handleChange}
          />
          <FormField
            label="Description"
            name="description"
            value={newProduct.description}
            required
            component={TextArea}
            onChange={handleChange}
          />
          <FormField
            label="Location"
            name="location"
            value={newProduct.location}
            required
            onChange={handleChange}
          />
          <FormField
            label={`Quantity: ${newProduct.quantity}`}
            name="quantity"
            value={newProduct.quantity}
            component={RangeInput}
            pad
            min={1}
            max={100}
            onChange={handleChange}
          />
          <FormField
            label="Price"
            name="price"
            value={newProduct.price}
            required
            validate={{ regexp: /\d+\.?\d*$/, message: "decimals allowed" }}
            onChange={handleChange}
          />

          <FormField label="Height(cm)" name="height" onChange={handleChange} />
          <FormField label="Width(cm)" name="width" onChange={handleChange} />
          <FormField label="Depth(cm)" name="depth" onChange={handleChange} />

          <Select
            name="materials"
            placeholder="Select materials"
            // multiple
            closeOnChange={false}
            value={newProduct.materials}
            options={materialOptions}
            onChange={handleChange}
          />

          <Box direction="row" justify="between" margin={{ top: "medium" }}>
            <Button label="Cancel" />
            <Button type="submit" label="Update" primary />
          </Box>
        </Form>
      </Box>
      <Box width="medium">
        <ImageUploader
          withIcon={true}
          onChange={onDrop}
          buttonText={"Upload image"}
          withLabel={true}
          label={"Upload images of your product here, accepted: jpg, gif, png"}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          withPreview={true}
        />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: StateProps) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsAuthenticated: (boolean: boolean) =>
      dispatch({ type: "AUTHENTICATED", payload: boolean }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm);
