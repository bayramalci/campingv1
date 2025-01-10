<template>
    <div class="register-page">
      <h2>Create Account</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="name">Name:</label>
          <input id="name" v-model="name" type="text" required placeholder="Enter your name" />
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
        </div>
        <div class="input-group">
          <label for="phone">Phone Number:</label>
          <input id="phone" v-model="phone" type="tel" required placeholder="Enter your phone number" />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input
            id="password"
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'" 
            required
            placeholder="Enter your password"
          />
          <button type="button" @click="togglePasswordVisibility">Show</button>
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            :type="passwordVisible ? 'text' : 'password'" 
            required
            placeholder="Confirm your password"
          />
          <button type="button" @click="togglePasswordVisibility">Show</button>
        </div>
        <button type="submit" :disabled="password !== confirmPassword">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        passwordVisible: false, 
      };
    },
    methods: {
      handleRegister() {
        if (this.password === this.confirmPassword) {
          console.log('Registering with:', this.name, this.email, this.phone, this.password);
        } else {
          console.log('Passwords do not match.');
        }
      },
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible; 
      },
    },
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;  
    margin: 0;
    padding: 0;
    background-color: black; 
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
  
  .register-page {
    max-width: 450px;
    margin: 50px auto; 
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #4e3629;  
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }
  
  h2 {
    text-align: center;
    color: #fff;  
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
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
.input-group {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

input[type="password"] + button,
input[type="text"] + button {
  background-color: #e2c8a0;
  width: 80px;  
  padding: 4px 0; 
  font-size: 0.8rem;  
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  text-align: center; 
}

input[type="password"] + button:hover,
input[type="text"] + button:hover {
  background-color: #c3a074;
}


  </style>
  