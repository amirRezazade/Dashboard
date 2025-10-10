import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");