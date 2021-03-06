import { RootState } from "../models/rootstate";
import { Category } from "../models/category";

const initialState: RootState = {
  id: 0,
  name: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  birthdate: "",
  gender: "",
  address: "",
  isAuthenticated: false,
  telephone: "",
  userDescription: "",
  title: "",
  description: "",
  // images: [] as string[],
  images: "",
  location: "",
  price: 0,
  quantity: 0,
  height: 0,
  width: 0,
  depth: 0,
  material: "",
  category_id: "",
  categories: [],
  categoryName: "",
  categoryProducts: [],
  categoryProductsCount: 0,
  productsInBasket: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_REGISTER_DETAILS":
      if (action.payload.option) {
        return {
          ...state,
          [action.payload.name]: action.payload.option,
        };
      } else {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }
    case "AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_NEW_PRODUCT":
      if (action.payload.option) {
        return {
          ...state,
          [action.payload.name]: action.payload.option,
        };
      } else {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }
    case "SET_PRODUCT_IMAGES":
      return {
        ...state,
        images: action.payload,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        lastname: action.payload.lastname,
        username: action.payload.username,
        email: action.payload.email,
        birthdate: action.payload.birthdate,
        gender: action.payload.gender,
        address: action.payload.address,
        userDescription: action.payload.userDescription,
        isAuthenticated: action.payload.isAuthenticated,
      };

    case "SET_CATEGORIES":
      const newCategories = action.payload.map((category: Category) => {
        return { name: category.name, id: category.id };
      });
      return {
        ...state,
        categories: newCategories,
      };
    case "SET_CATEGORY_NAME":
      return {
        ...state,
        categoryName: action.payload,
      };

    case "SET_CATEGORY_PRODUCTS":
      return {
        ...state,
        categoryProducts: action.payload,
      };
    case "SET_CATEGORY_PRODUCTS_COUNT":
      return {
        ...state,
        categoryProductsCount: action.payload,
      };

    case "SET_BASKET_PRODUCTS":
      return {
        ...state,
        productsInBasket: [...state.productsInBasket, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
