# The wild oasis

Welcome to our **Hotel Management System** website! My easy-to-use platform helps hotel staff keep track of bookings, check guests in and out, and handle other important tasks smoothly. Managing your hotel will be a piece of cake with this straightforward solution!

> **Note:** I build the website in [The Ultimate React Course](https://www.udemy.com/course/the-ultimate-react-course/) in Udemy with the amazing instructor, Jonas. But keep reading to see what I have added!

## Features:

 1. **Cabins (rooms of the hotel):**
- Employees can add, delete, edit and update a cabin to database.
- A table view to show each cabin information which are are: image, name, maximum capacity, price and discount.
 2. **Bookings:**
 - A table view to show each booking information including guest name and email, selected cabin, dates, status of the booking, prices, actions that can be done and more...
 - When check-in a booking, employees need to accept payment (outside the app) then confirm this payment (inside the app)
 4. **Authentication:**
 - Employees can add a new user, with email confirmation.
 - An existing user can edit their information, name, avatar and uploading an image.
 - Users can log-in out of the website.
 - Non-logged-in users can not access the website.
 - Please refer to the website and read the note in login form to understand more about project authentication.
 5. **Guests:**
 - Employees can add a new guest to the database in order to add a new booking for them.
 - Guest information are: Name, address, nationality and national id. 
 6. **Settings:**
 - The hotel have settings like minimum and maximum nights per booking, breakfast price and maximum guests per booking. To make sure that no booking is created if it's not compatible with the hotel settings.
 7. **Dashboard:**
-  Finally, all of this information are displayed in the dashboard (main/home page of the website) in a very nice and attractive way with charts to keep track of all the hotel data.
- Filter dashboard information by last 7, 30 and 90 days.

## Advantages & more features: 
1. For more flexibility Cabins and Bookings pages has the ability to filter, sort and paginate the data.
2. Fully responsive website that appear well and easy to use in every device.
3. Switch between light and dark mode with a click of a button. even without clicking, first time you use the website, it will be in your preferred color schema that you applied in your browser or operating system settings.
4.  Accessibility: I tried as hard as I can to make the website accessible for everyone at anytime, So I applied many accessibility methods and best-practices to achieve that, keep reading and I will make this clear.

## What I have added?
Not all of the previous features and advantages were in the initial website demo, There is a lot of things that I have done differently and even implemented from the scratch. To name a few:

1. **Create a new guest:**
I thought that creating a new guest is a crucial part of the website, so I added a new **guests** page, there, you can fill up a validated form to add a new user.

2. **Adding a new booking:**
Again, adding a new booking is absolutely the most important feature that should be in any hotel management system website. While creating a new booking, everything is should be valid before submit it. For example: the start date should not be in the past, the guest should be in the hotel database first to book them in, same for cabin, number of nights and guests should respect selected cabin and the hotel settings, etc...
	
3. **Error boundaries:**
One of the methods to handle errors, is error boundaries. I implemented them and didn't make a global error boundary, instead, I made 3. One for the sidebar, one for the header and the last one for the **main** content which includes each page in the website. By this, if an error happened in **Bookings** page for example, users can still use the website in every other page like **Cabins** and **Guests**.
For more information on error boundaries, check this [Article](https://www.brandondail.com/posts/fault-tolerance-react)

4. **Accessibility:**
As I said, a11y (short for accessibility) is important. So what I have done to improve it?
- I implemented navigate to content link, for more information, check out [freeCodeCamp article](https://www.freecodecamp.org/news/how-to-add-skip-to-main-content-links-to-a-website/#:~:text=A%20%22skip%20to%20content%22%20link,when%20it%20is%20in%20focus.).
- I made sure that the colors of the website has an acceptable color contrast according to [WCAG](https://webaim.org/resources/contrastchecker/#:~:text=WCAG%202.0%20level%20AA%20requires,3%3A1%20for%20large%20text.).
- I used semantic HTML elements.
- I handled button that has no text and include only icons to be announced to [screen-readers](https://axesslab.com/what-is-a-screen-reader/) according to it's functionality.
- I made forms and it's errors accessible, using **aria** rules and other a11y attributes.
- I handled animations to be not displayed if the user preferred a reduce motion setting.
- Finally and most important, for modals, I used the **role** attribute and set it to **model**, but that's not all.
I also implemented a **focus trap** to it, so that when a modal is open, you can not focus outside it unless you close it first.

5. **TailwindCSS**
I used TailwindCSS instead of styled component to style the website.

6. **Pagination on Cabins:**
	if we can paginate the booking table, why not the cabins?

7. **(.env) file**:
For security purposes, I saved my **Supabase URL** and **API key** inside a **.env** file. so that not everyone can see it. 	
	
9. **Responsive**

## Tech:
In this project, I used the following technologies and libraries:
- [React](https://react.dev/), with [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/docs)
- [React-query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React-router](https://reactrouter.com/en/main)
- [React-hook-form](https://react-hook-form.com/)
- [Date-fns](https://date-fns.org/docs/Getting-Started)
- [React-error-boundary](https://www.npmjs.com/package/react-error-boundary)
- [React-hot-toast](https://react-hot-toast.com/)
- [React-icons](https://react-icons.github.io/react-icons/)
- [Recharts](https://recharts.org/en-US)

## Demo:
To use the website, go to [The Wild Oasis]()
