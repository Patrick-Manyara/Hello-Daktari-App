<View style={styles.productContainer}>
{products.map((product, index) => (
  <ProductCard
    key={index}
    image={product.image}
    title={product.title}
    price={product.price}
    newPrice={product.newPrice}
    onPress={navigateToSingleProduct}
    style={styles.column}
    onAddToCart={addToCartHandler}
  />
))}
</View>