const slider = document.getElementById('slider');
const slideImage = document.getElementById('slideImage');
const images = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg'];
let currentIndex = 0;

function showSlide(index) {
if (index < 0) index = images.length - 1;
if (index >= images.length) index = 0;

currentIndex = index;
slideImage.src = images[currentIndex];
}



function nextSlide() {
showSlide(currentIndex + 1);
}

function prevSlide() {
showSlide(currentIndex - 1);
}

// Automatically switch to the next slide every 3 seconds
setInterval(nextSlide, 4000);

// Initially show the first slide
showSlide(currentIndex);



var firebaseConfig = {
  apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
  authDomain: "https://raona0-default-rtdb.firebaseio.com",
  projectId: "raona0",
  storageBucket: "raona0.appspot.com",
  messagingSenderId: "797719983777",
  appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();
const displayProducts = async () => {
  const productListElement = document.getElementById('productList');
  document.getElementById('dh').innerHTML = '<div class="loading"></div>'

  const productsSnapshot = await db.collection('products').get();
  productListElement.innerHTML = ''
  document.getElementById('dh').innerHTML = ''
  
  productsSnapshot.forEach(async (doc) => {
    const product = doc.data();
    
    // Check if a rating exists in the product document
    let rating = product.rating;

    if (rating === undefined) {
      // If no rating exists, generate a new one
      rating = generateRandomRatingWithStars();
      
      // Update the product document with the new rating
      await db.collection('products').doc(doc.id).update({
        rating: rating,
      });
    }

    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
    
      <img class="product-image" src="${product.mainImage}" onclick="window.location.href = 'item.html?request-id=${doc.id}'">
      <div class='det'>
      <h2 class="product-title" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.name}</h2>
      <h2 class="product-titlee" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.description}</h2>
      <div class="product-price" onclick="window.location.href = 'item.html?request-id=${doc.id}'"><div class='discd'>${(100*product.price/product.originalPrice-100).toFixed()*-1}%</div> <div class='op'>${product.originalPrice}</div> ₹${product.price}</div>
      <div class="product-rate" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${rating} <div class='imggo'><img src='/images/tic.gif'></div></div>
      <div class="del" onclick="window.location.href = 'item.html?request-id=${doc.id}'">Free Delivery</div>
      

    
      </div>
      `;
    
    productListElement.appendChild(productCard);
  });
}

// Your generateRandomRatingWithStars function remains the same as before
function generateRandomRatingWithStars() {
  const minRating = 4;
  const maxRating = 5;
  const integerPart = Math.floor(Math.random() * (maxRating - minRating)) + minRating;
  const decimalPart = Math.floor(Math.random() * 10); // Generates a number between 0 and 9 for tenths of a star
  const stars = "★".repeat(integerPart); // Repeat the star character based on the integer part
  const rating = `${stars} ${integerPart}.${decimalPart}`;
  return rating;
}


 
  // Display products when the page loads
  displayProducts();
// Updated logout function with confirmation
function logout() {
Swal.fire({
  title: 'Logout',
  text: 'Are you sure you want to log out?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6',
  confirmButtonText: 'Yes, Log out',
  cancelButtonText: 'Cancel'
}).then((result) => {
  if (result.isConfirmed) {
    firebase.auth().signOut()
      .then(() => {
        console.log("User logged out");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User logged out successfully!"
        });
        window.location.href = "login.html"; // Redirect the user to the login page after logout
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Swal.fire({
          icon: "error",
          title: "Logout Error",
          text: "An error occurred while logging out."
        });
      });
  }
});
}



