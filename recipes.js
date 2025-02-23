import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";

const recipes = [
  {
    id: 1,
    name: "Chicken Tandoor",
    image: img1,
    ingredients: ["Chicken", "Yogurt", "Spices", "Lemon"],
    method: "Marinate chicken with yogurt, spices, and lemon juice. Let it rest for 4-6 hours. Grill or bake at 200°C for 30 minutes, turning occasionally until cooked evenly."
  },
  {
    id: 2,
    name: "Momos",
    image: img2,
    ingredients: ["Flour", "Chicken/Veg Filling", "Soy Sauce", "Garlic"],
    method: "Prepare the dough using flour and water. Make a filling with chicken/veg, soy sauce, and garlic. Fill and fold dumplings, then steam for 15-20 minutes until fully cooked."
  },
  {
    id: 3,
    name: "Badam Shekh",
    image: img3,
    ingredients: ["Almonds", "Milk", "Sugar", "Cardamom"],
    method: "Soak almonds overnight, peel and grind into a paste. Boil milk and add almond paste, sugar, and cardamom. Cook until thickened, then serve warm."
  },
  {
    id: 4,
    name: "Chicken Soup",
    image: img4,
    ingredients: ["Chicken", "Carrots", "Onion", "Garlic"],
    method: "Boil chicken with chopped carrots, onions, and garlic for 30-40 minutes. Strain if needed. Serve hot with fresh herbs."
  },
  {
    id: 5,
    name: "Noodles",
    image: img5,
    ingredients: ["Noodles", "Soy Sauce", "Veggies", "Garlic"],
    method: "Boil noodles until soft. Stir-fry veggies and garlic, then add noodles and soy sauce. Toss well and serve hot."
  },
  {
    id: 6,
    name: "Veg Soup",
    image: img6,
    ingredients: ["Carrots", "Tomato", "Peas", "Ginger"],
    method: "Sauté ginger in a pot, then add chopped veggies. Pour in water or stock and cook for 20 minutes. Blend if desired and serve hot."
  },
];

export default recipes;
