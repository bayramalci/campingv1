<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" required placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        console.log('Logging in with:', this.email, this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Apply full height to html and body */
  html, 
  
  /* The form container (login-page) remains as in your original code */
  .login-page {
    max-width: 450px;
    margin: 50px auto;  /* Center the form with auto margin */
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #4e3629;  /* Light background for the form */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Add some shadow to the form */
  }
  
  h2 {
    text-align: center;
    color: #fff;  /* Dark brown color for the heading */
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .input-group label {
    font-size: 1.1rem;
    color: #fff;
    margin-bottom: 5px;
    display: block;
  }
  
  .input-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    color: #333;
    background-color: #fff;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: #d38f5d;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #b07847;
  }
  </style>
  