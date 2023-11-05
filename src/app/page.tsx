import { Timer } from '@/components/timer/client';

export default function Home() {
	return (
		<main className='min-h-screen bg-black text-white flex items-center justify-center'>
			<div className='w-full'>
				<Timer />
			</div>
		</main>
	);
}
