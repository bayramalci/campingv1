<template>
  <div class="home-page">
    <!-- Blue Header -->
    <div class="header">
      <h1>Camping Spot Booking</h1>
      <div class="links">
        <router-link to="/login" class="link">Login</router-link> |
        <router-link to="/register" class="link">Create Account</router-link>
      </div>
    </div>

    <!-- Image Section -->
    <div class="image-container">
      <img src="@/assets/image.jpg" alt="Camping Spot" class="background-image" />
    </div>

    <!-- About Us Section (White Background) -->
    <div class="content">
      <div class="about-us-box">
        <h2>About Us</h2>
        <p>
          At Camping Spot Booking, we are bringing the camping experience to a whole new level. 
          Think of us as the "Airbnb" for camping spots — whether you're looking for a peaceful 
          spot in the woods, a lakeside getaway, or a cozy mountain retreat, we've got you covered. 
          Our platform allows you to easily find, book, and enjoy unique camping experiences in beautiful 
          locations. Let us help you reconnect with nature and explore the great outdoors like never before.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Blue Header */
.header {
  background-color: #4e3629; /* Dark brown header */
  color: #fff; /* White text */
  text-align: center;
  padding: 20px;
  font-size: 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Links styling */
.links {
  margin-top: 10px;
  font-size: 1.2rem;
}

.link {
  color: #d38f5d; /* Light brown color for links */
  text-decoration: none;
  margin: 0 10px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.link:hover {
  background-color: #d38f5d; /* Light brown hover */
  color: #fff; /* White text when hovered */
}

.link:active {
  transform: scale(0.98); /* Slightly shrink when clicked */
}

/* Image Section */
.image-container {
  margin-top: 80px; /* Space for the fixed header */
  width: 100%;
  height: 40%; /* 2/5th of the screen height */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(78, 54, 41, 0.7); /* Semi-transparent brown background */
}

.background-image {
  width: 100%;
  height: auto;
  border-radius: 15px; /* Rounded corners for the image */
  object-fit: cover; /* Ensures image covers the container without stretching */
}

/* Content Section (White Background) */
.content {
  background-color: #CD853F; /* White background for the content area */
  color: #333; /* Dark text for visibility */
  padding: 20px;
  flex: 1; /* This ensures content takes the remaining space */
}

/* About Us Box Styling */
.about-us-box {
  margin-top: 30px; /* Space above the box */
  padding: 20px;
  background-color: #d38f5d; /* Light brown background for the box */
  color: #fff; /* Dark brown text for contrast */
  border: 2px solid #d38f5d; /* Light brown border around the box */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Light shadow for a 3D effect */
  max-width: 600px; /* Maximum width for the box */
  margin-left: auto;
  margin-right: auto; /* Center the box horizontally */
}

.about-us-box h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.about-us-box p {
  font-size: 1.2rem;
  line-height: 1.6;
}

/* Mobile Adjustments */
@media (max-width: 600px) {
  .header {
    font-size: 1.5rem; /* Smaller header on mobile */
  }

  h1 {
    font-size: 2rem; /* Smaller title */
  }

  .link {
    font-size: 1rem; /* Smaller text on mobile */
  }

  .about-us-box h2 {
    font-size: 2rem;
  }

  .about-us-box p {
    font-size: 1rem;
  }
}
</style>
