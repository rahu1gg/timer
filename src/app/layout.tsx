import '@/styles/main.scss';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
	title: 'Timer',
	description: 'Timer app made using next.js',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={roboto.className}>{children}</body>
		</html>
	);
}
