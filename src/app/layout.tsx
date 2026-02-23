import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { AudioProvider } from "@/context/AudioContext";

const jersey10 = localFont({
	src: "../../public/fonts/Jersey10-Regular.ttf",
	variable: "--font-jersey",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space",
});

export const metadata: Metadata = {
	title: "Bunnies Club | NewJeans Fan Experience",
	description: "A retro Y2K inspired community platform for Bunnies.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="es"
			className={`
        ${jersey10.variable} ${spaceGrotesk.variable} 
        h-full bg-[#BEE5FD]
      `}
		>
			<body
				className="
        antialiased 
        flex flex-col 
        min-h-full 
        w-full 
        bg-gradient-to-b from-[#BEE5FD] via-[#FEE2FE] to-[#BEE5FD] 
        bg-fixed 
        bg-no-repeat 
        bg-cover
      "
			>
				<AudioProvider>
					<Navbar />
					<main className="grow flex flex-col relative z-10">{children}</main>
					<Footer />
				</AudioProvider>
			</body>
		</html>
	);
}