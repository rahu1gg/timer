import { Timer } from '@/components/timer/client';
import { KEYS_INFO } from '@/constants/keys';

export default function Home() {
	return (
		<main className='min-h-screen relative bg-black text-white flex items-center justify-center'>
			<div className='w-full'>
				<Timer />
			</div>
			<div className='absolute bottom-4 flex items-center justify-center gap-6'>
				{KEYS_INFO.map(({ id, label, key }) => (
					<div className='opacity-40 bg-white/20 p-2 rounded-xl pointer-events-none text-xs lg:text-sm lg:block flex flex-col items-center justify-center gap-2'>
						<button key={id} type='button' className='border border-violet px-4 py-2 rounded-md lg:mr-4 inline-block'>
							{key}
						</button>
						<span className='lg:pr-1'>{label}</span>
					</div>
				))}
			</div>
		</main>
	);
}
