import React from "react"
import ProductCard from "./ProductCard"

export default function ProductsListing(props) {
  const renderProductCard = () => {
    let cardToBeRendered =
      props.currentProducts.length === 0
        ? props.allProducts
        : props.currentProducts

    return cardToBeRendered?.map((product, k) => {
      return <ProductCard product={product} key={k} />
    })
  }
  return <div className="listing-container">{renderProductCard()}</div>
}
