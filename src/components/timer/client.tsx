'use client';

import { useEffect, useState } from 'react';

// constants
const KEYS = {
	startstop: ' ',
	set: 's',
	reset: 'r',
	arrowRight: 'arrowright',
	arrowLeft: 'arrowleft',
	arrowUp: 'arrowup',
	arrowDown: 'arrowdown',
};

export function Timer() {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);
	const [position, setPosition] = useState(0);
	const [edit, setEdit] = useState(false);
	const [start, setStart] = useState(false);
	const [blinking, setBlinking] = useState(false);

	const formatSecond = () => (seconds < 10 ? `0${seconds}` : `${seconds}`);
	const formatMinute = () => (minutes < 10 ? `0${minutes}` : `${minutes}`);
	const formatHour = () => (hours < 10 ? `0${hours}` : `${hours}`);

	// useEffect for keyboard eventListener
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			e.preventDefault();
			const key = e.key.toLowerCase();

			if (key === KEYS.arrowRight) {
				setPosition((curr) => curr + 1);
				return;
			}

			if (key === KEYS.arrowLeft) {
				setPosition((curr) => Math.max(0, curr - 1));
				return;
			}

			if (key === KEYS.arrowUp) {
				if (!edit) return;

				if (position % 3 === 2) {
					if (seconds >= 59) {
						setSeconds(0);
						return;
					}
					setSeconds((curr) => curr + 1);
					return;
				}

				if (position % 3 === 1) {
					if (minutes >= 59) {
						setMinutes(0);
						return;
					}
					setMinutes((curr) => curr + 1);
					return;
				}

				if (position % 3 === 0) {
					if (hours >= 23) {
						setHours(0);
						return;
					}
					setHours((curr) => curr + 1);
					return;
				}
				return;
			}

			if (key === KEYS.arrowDown) {
				if (!edit) return;

				if (position % 3 === 2) {
					if (seconds === 0) return;
					setSeconds((curr) => curr - 1);
					return;
				}

				if (position % 3 === 1) {
					if (minutes === 0) return;
					setMinutes((curr) => curr - 1);
					return;
				}

				if (position % 3 === 0) {
					if (hours === 0) return;
					setHours((curr) => curr - 1);
					return;
				}
				return;
			}

			if (key === KEYS.startstop) {
				setEdit(false);
				setStart((curr) => !curr);
				return;
			}

			if (key === KEYS.set) {
				setEdit(true);
				setStart(false);
				setBlinking(false);
				return;
			}

			if (key === KEYS.reset) {
				setSeconds(0);
				setMinutes(0);
				setHours(0);
				setStart(false);
				return;
			}
		};
		document.addEventListener('keydown', handler);

		return () => {
			document.removeEventListener('keydown', handler);
		};
	}, [position, seconds, minutes, hours, edit]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		function timer() {
			if (start) {
				setSeconds((currSecond) => {
					if (currSecond === 0) {
						setMinutes((currMinute) => {
							if (currMinute === 0) {
								setSeconds(0);
								setHours((currHour) => {
									if (currHour === 0) {
										setMinutes(0);
										setBlinking(true);
										clearTimeout(timeout);
										return 0;
									}
									return currHour - 1;
								});

								return 59;
							}
							return currMinute - 1;
						});
						return 59;
					}
					return currSecond - 1;
				});
				timeout = setTimeout(timer, 1000);
			}
		}
		timer();

		return () => {
			clearTimeout(timeout);
		};
	}, [start]);

	return (
		<p
			className={`text-[19vw] w-max mx-auto text-center bg-gradient-to-r from-violet from-0% via-yellow via-60% to-lightblue to-100% bg-clip-text text-transparent ${
				blinking && 'animate-bounce'
			}`}
		>
			<span className={`${edit && position % 3 === 0 ? 'bg-neutral-800 text-white rounded-xl' : ''}`}>{formatHour()}</span>:
			<span className={`${edit && position % 3 === 1 ? 'bg-neutral-800 text-white rounded-xl' : ''}`}>{formatMinute()}</span>:
			<span className={`${edit && position % 3 === 2 ? 'bg-neutral-800 text-white rounded-xl' : ''}`}>{formatSecond()}</span>
		</p>
	);
}
