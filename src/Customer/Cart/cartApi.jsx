const accessToken = localStorage.getItem("accessToken");
const token = accessToken ? `Bearer ${accessToken}` : null;
const CartUrl = "http://localhost:8000/api/cart/" 

const cartApi = {
  async getCart() {
    const res = await fetch(CartUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res.json();
  },

async addProductToCart(productID, quantity) {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(CartUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({
      product: productID,
      quantity: quantity,
    }),
  });

  // Check if the response is OK before parsing JSON
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to add product to cart");
  }
  return res.json(); 
},

async removeProductFromCart(itemId){
    const res = await fetch(`http://localhost:8000/api/cart/${itemId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res.json();
}
};

export default cartApi;
