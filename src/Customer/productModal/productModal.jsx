import React from "react";

const ProductModal = ({product, handleCloseModal, handleAddToCart, isProductInCart}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button">X</button>
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
                <p>{product.price}</p>
                <p>{product.description}</p>
                {!isProductInCart && (
                    <button onClick={handleAddToCart(product)}>Add To Cart</button>
                )}
            </div>
        </div>
    )
}
export default ProductModal