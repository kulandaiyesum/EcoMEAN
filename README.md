# MEAN Stack Application

This is a MEAN (MongoDB, Express.js, Angular, Node.js) stack application. This README provides instructions for setting up and running the application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository
  ``` bash
  git clone https://github.com/kulandaiyesum/EcoMEAN.git
  cd EcomMEAN
  ```

## Backend Setup

1. Navigate to the backend directory:
  ```bash
  cd backend
  ```

2. Install the dependencies:
  ```bash
  npm install
  ```

3. Create a `.env` file in the root of the backend directory and add the following configuration, replacing the placeholder values with your own:

  ```plaintext
  NODE_ENV=development
  PORT=3000

  jwtSecretKey=your_jwt_secret_key

  DATABASE_URI=your_data_base_uri

  FRONT_END_PORT=your_front_end_point # http://localhost:4200
  BACK_END_PORT=your_back_end_point # http://localhost:4200

  # SMTP config
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USERNAME=your_user_name # example@gmail.com
  SMTP_PASSWORD=your_smtp_password
  SMTP_SECURE=true
  SMTP_TLS=true

  # Razorpay config
  RAZORPAY_KEY_ID=razor_pay_key_id
  RAZORPAY_KEY_SECRET=razor_pay_key_secret
  ```

4. Start the backend server:

  ```bash
  npm start
  ```

  The backend server should now be running on `http://localhost:3000`.
  
## Frontend Setup

1. Navigate to the frontend directory:

  ```bash
  cd frontend
  ```

2. Install the dependencies:

  ```bash
  npm install
  ```

3. Update the environment configuration file (e.g., `src/environments/environment.ts`) with your backend API URL and Razorpay key ID:

  ```typescript
  export const environment = {
    production: false,
    apiUrl: 'your_back_end_point',
    razorpayKeyId: 'razor_pay_key_id'
  };
  ```

4. Start the frontend application:

  ```bash
  ng serve
  ```

  The frontend application should now be running on `http://localhost:4200`.

## Running the Application

With both the backend and frontend servers running, you should be able to navigate to [http://localhost:4200](http://localhost:4200) in your browser to access the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Angular](https://angular.io/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Razorpay](https://razorpay.com/)
- [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)

Replace `yourusername` and `your-repo-name` with your GitHub username and repository name, respectively. Ensure all placeholders in the `.env` file and the Angular environment configuration are replaced with actual values relevant to your setup.

