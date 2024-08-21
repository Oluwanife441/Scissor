# SCISSOR - URL Shortener 🚀

scissor is a modern URL shortening service built with React and TypeScript. It allows users to create shortened links with custom aliases and QR codes for easy sharing.

## Features

- Create shortened URLs with custom aliases
- Generate QR codes for each shortened URL
- User authentication
- Responsive design

## Technologies Used

- React
- TypeScript
- Yup (for form validation)
- react-qrcode-logo (for QR code generation)
- react-router-dom (for routing)
- @radix-ui/react-dialog (for modal dialogs)
- react-spinners (for loading animations)
- supabase (for user authentication, url & qr code storage, clicks, user location stats, user device stats)

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
https://github.com/Oluwanife441/scissor

2. Install dependencies:
npm install
or
yarn install

3. Set up environment variables:
Create a `.env` file in the root directory and add necessary environment variables (e.g., API endpoints, authentication keys).

4. Start the development server: 
npm run dev or yarn dev
5. Open your browser and navigate to `http://localhost:3000` (or the port specified in your console).

## Usage

1. Sign up or log in to your account.
2. Click on "Create New Link" to shorten a URL.
3. Enter the long URL, an optional custom alias, and a title for your link.
4. Click "Create" to generate your shortened URL and QR code.
5. Share your shortened URL or QR code as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Yup](https://github.com/jquense/yup)
- [react-qrcode-logo](https://www.npmjs.com/package/react-qrcode-logo)
- [react-router-dom](https://reactrouter.com/)
- [Radix UI](https://www.radix-ui.com/)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
- [supabase](https://supabase.com/)

## Contact

Contact Info - [@https://x.com/Oluwanifemi107](https://x.com/Oluwanifemi107) - orimoloyeoluwanifemi@gmail.com

Project Link: [https://github.com/Oluwanife441/scissor](https://github.com/Oluwanife441/scissor)

Live URL: [https://scissor-orpin.vercel.app/](https://scissor-orpin.vercel.app/)

## Cons

1. Can't open application in two tabs (max of 1).
2. Creating URL(custom/shortened) can take up to 2 - 3 minutes.
3. Whenever the shortened link is copied and sent to a new user, the new user must create an account (that means both parties will have to create accounts with scissor).

## How to tackle cons ( Creating URL(custom/shortened) can take up to 2 - 3 minutes )

1. Use a web fast browser (recommended: Google Chrome).
2. Have a stable and fast internet connection everytime the web app is in use to enjoy the most of it.
3. Disable all extensions that might slow down loading process of the web application.
4. If you can't turn off or disable extensions you can always open an incognito tab to test or run this application.
   - Click on the three dots by the far right of your browser (Google chrome).
   - Select "open new incognito tab".
   - Open this and run the application (https://scissor-orpin.vercel.app).
If issue persists, reload your browser and try again (and wait).

## Pros

1. Seamless user authentication enabling loging in and out effortless.
2. Allows users to create, shorten and customize any valid URL based on their preference cost free.
3. Unlimited generation of QR codes.
4. Uses vast backend technology for easy accessibility .
5. Custom or shortened URL can be copied, shared or deleted .
6. Downloadable QR code images to user's local storage.
7. Dashboard page to project users generated links and QR code
8. Best location and device stats design to enable users to track their URLS. e.t.c...

## Screenshots


<h1> 1.Landing page</h1>

<a href="https://ibb.co/JxjCYHB"><img src="https://i.ibb.co/LQdvT1k/Screenshot-2024-08-21-210305.png" alt="Screenshot-2024-08-21-210305" border="0"></a>

<h1> 2.Landing page 2</h1>

<a href="https://ibb.co/mNNxsdC"><img src="https://i.ibb.co/rddWPqG/Screenshot-2024-08-21-210334.png" alt="Screenshot-2024-08-21-210334" border="0"></a>

<h1> 3.Dashboard</h1>

<a href="https://ibb.co/0qFBfCZ"><img src="https://i.ibb.co/H7xNrtY/Screenshot-2024-08-21-211516.png" alt="Screenshot-2024-08-21-211516" border="0"></a>

<h1> 4.Dashboard 2</h1>

<a href="https://ibb.co/ggLzCjd"><img src="https://i.ibb.co/WK4g1x0/Screenshot-2024-08-21-211610.png" alt="Screenshot-2024-08-21-211610" border="0"></a>

<h1> 5.Analytics (Device stats)</h1>

<a href="https://ibb.co/sCgYrKR"><img src="https://i.ibb.co/jz8XFyf/Screenshot-2024-08-21-221139.png" alt="Screenshot-2024-08-21-221139" border="0"></a>

<h1> 6.Analytics 2 (Location stats)</h1>

<a href="https://ibb.co/fDMXXJY"><img src="https://i.ibb.co/cYJyyqc/Screenshot-2024-08-21-221117.png" alt="Screenshot-2024-08-21-221117" border="0"></a>

