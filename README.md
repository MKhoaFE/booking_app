Online train ticket booking system - Easy Travel
- The application is coded according to the Client-Side Rendering and Restful API model
+ Includes 2 client pages: User page and Admin page.
+ The User page application has all the basic features of an online ticket booking website from booking to payment (using Momo sandbox)...
+ The Admin page can manage cash flow as well as the number of users and routes... with charts to monitor the performance of the system.

*Home Page:
![Home Page](./booking_app/public/home_page.png)

*Booking Page:
![Booking feature](./booking_app/public/booking_page.png)

---------------
How to setup?
booking_app/
├── booking_app   
├── backend        
├── admin               

At booking_app/booking_app folder, you should run this command:
- npm install
- npm install react-scripts
- npm run dev
 

At booking_app/backend folder, run this command:
- node index.js
  And then, in this folder, find ".env" file and replace your "MONGO_URL"
  
At booking/admin folder, run this command: 
- npm install
- npm install react-scripts
- npm run dev

