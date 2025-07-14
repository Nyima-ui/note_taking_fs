import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import Authwrapper from "./Authwrapper";
import { Toaster } from "react-hot-toast";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Take Notes",
  description: "A simple and secure personal note-taking app to capture your thoughts, ideas, and tasks anytime.",
  icons : {
    icon: '/favicon.svg'
  },
  openGraph : {
     title : "Take notes", 
     description : "A simple and secure personal note-taking app", 
     url : "", 
     siteName : "Take Notes", 
     images : [
      {
        url : '/graph2.png', 
        width : 1200, 
        height : 630, 
        alt : "Take notes App", 
      }
     ], 
     type : "website", 
  }, 
  twitter : {
    card : "summary_large_image",
    title : "Take Notes", 
    description : "A simple and secure personal note-taking app.", 
    images : ["/graph2.png"]
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
        <Toaster position="top-center"/>
        <Provider>
          <Authwrapper>{children}</Authwrapper>
        </Provider>
      </body>
    </html>
  );
}
