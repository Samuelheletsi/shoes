import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const Home = () => {
  const [quantity, setQuantity] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const thumbnails = [
    '/image-product-1.jpg',
    '/image-product-2.jpg',
    '/image-product-3.jpg',
    '/image-product-4.jpg',
  ];
  const mainImage = thumbnails[currentImageIndex];

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 0 ? q - 1 : 0));
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleCart = () => setCartOpen(prev => !prev);
  
  const handleAddToCart = () => {
    if (quantity > 0) {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    }
  };

  const handleDeleteFromCart = () => {
    setQuantity(0); // remove item from cart
  };

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev + 1) % thumbnails.length);
  }, []);
  
  const goToPreviousImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev - 1 + thumbnails.length) % thumbnails.length);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') goToNextImage();
      if (e.key === 'ArrowLeft') goToPreviousImage();
    },
    [goToNextImage, goToPreviousImage]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={`work-body ${isMenuOpen ? 'dim-background' : ''}`}>
      <nav className="nav">
        <div className="nav-left">
          <img src="/icon-menu.svg" className="menu-icon" alt="Menu" onClick={toggleMenu} />
          <p className="brand-name">sneakers</p>
          <div className="select">
            <div><a href="#">Collections</a></div>
            <div><a href="#">Men</a></div>
            <div><a href="#">Women</a></div>
            <div><a href="#">Contact</a></div>
          </div>
        </div>
        <div className="nav-right">
          <div className="cart-icon-container" onClick={toggleCart}>
            <img src="/icon-cart.svg" className="nav-icon" alt="Cart" />
            {quantity > 0 && <span className="cart-badge">{quantity}</span>}
          </div>
          <img src="/image-avatar.png" className="nav-icon" alt="User  Avatar" />
        </div>
      </nav>

      <main className="sneaker-page">
        <section className="sneaker-gallery">
          <img
            src={mainImage}
            key={mainImage}
            className="product-image image-slider"
            alt="Main Product"
            onClick={() => setShowLightbox(true)}
          />
          <div className="gallery-nav">
            <button onClick={goToPreviousImage}><img src="/icon-previous.svg" alt="Previous" /></button>
            <button onClick={goToNextImage}><img src="/icon-next.svg" alt="Next" /></button>
          </div>
          <div className="gallery-pic">
            {thumbnails.map((src, i) => (
              <img key={i} src={src.replace('.jpg', '-thumbnail.jpg')} alt={`Thumbnail ${i + 1}`} onClick={() => setCurrentImageIndex(i)} />
            ))}
          </div>
        </section>

        <section className="sneaker-details fade-in">
          <pre className="company-name">S N E A K E R  C O M P A N Y</pre>
          <h1 className="product-title">Fall Limited Edition Sneakers</h1>
          <p className="product-description">
            These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.
          </p>
          <div className="price-section">
            <div className="price-info">
              <h2 className="price">$125.00</h2>
              <span className="discount">50%</span>
            </div>
            <p className="original-price">$250.00</p>
          </div>
          <div className="buts">
            <div className="quantity-section">
              <button onClick={decreaseQuantity}><img src="/icon-minus.svg" alt="Decrease Quantity" /></button>
              <span className="quantity">{quantity}</span>
              <button onClick={increaseQuantity}><img src="/icon-plus.svg" alt="Increase Quantity" /></button>
            </div>
            <button className="add-cart" onClick={handleAddToCart}>
              <img src="/icon-cart.svg" alt="Add to Cart" />
              Add to Cart
            </button>
          </div>
        </section>
      </main>

      {isCartOpen && (
        <div className="cart fade-in">
          <p>Cart</p>
          <hr />
          {quantity > 0 ? (
            <>
              <div className="des">
                <img src="/image-product-1-thumbnail.jpg" alt="thumbnail" />
                <div>
                  <p>Fall Limited Edition Sneakers</p>
                  <span>$125.00 x {quantity} = ${125 * quantity}</span>
                </div>
                <img
                  src="/icon-delete.svg"
                  alt="Delete item"
                  id="delete-icon"
                  onClick={handleDeleteFromCart}
                />
              </div>
              <button>Checkout</button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      {showLightbox && (
        <div className="lightbox fade-in">
          <div className="lightbox-content">
            <button onClick={() => setShowLightbox(false)} className="close-lightbox">✕</button>
            <img
              src={mainImage}
              key={mainImage}
              className="image-slider"
              alt="Lightbox Product"
            />
            <div className="gallery-nav">
              <button onClick={goToPreviousImage}><img src="/icon-previous.svg" alt="Previous" /></button>
              <button onClick={goToNextImage}><img src="/icon-next.svg" alt="Next" /></button>
            </div>
            <div className="gallery-pic">
              {thumbnails.map((src, i) => (
                <img key={i} src={src.replace('.jpg', '-thumbnail.jpg')} alt={`Thumbnail ${i + 1}`} onClick={() => setCurrentImageIndex(i)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {toastVisible && <div className="toast">Item added to cart</div>}
    </div>
  );
};

export default Home;
