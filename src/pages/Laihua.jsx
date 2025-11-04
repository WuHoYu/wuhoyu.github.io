import React from 'react';
import ProjectTemplate from '../components/ProjectTemplate.jsx';
import { asset } from '../utils/assets';

export default function Laihua() {
	const tags = ['LANDING', 'EDITORIAL', 'BOOK'];
	const team = [
		{ id: 1, name: 'HoYu.W', subtitle: 'Designer' },
	];

	return (
		<ProjectTemplate
			title="LAIHUA"
			subtitle="Brand System & Visual Language"
			info={
				'Laihua is one of China’s earliest AI‑powered animation creation platforms, is committed to providing enterprises and individual users with an effortless, low‑barrier video‑making experience. Beyond its commercial applications, Laihua also focuses on educational — such as in primary‑school teaching. Laihua\'s mascot, Laihua‑jun, appears across a variety of scenarios..'
			}
			year="2020"
			tags={tags}
			team={team}
		>
			<div className="flex flex-col gap-[10px]" style={{ width: '100%' }}>
				{/* Sequence: laihua.jpeg, lh1, lh2, lh3, lh4, lh5 — all natural height (no cropping) */}
				{[
					{ src: '/photos/laihua/laihua.jpeg', alt: 'LAiHUA cover' },
					{ src: '/photos/laihua/lh1.jpg', alt: 'LAiHUA lh1' },
					{ src: '/photos/laihua/lh2.jpg', alt: 'LAiHUA lh2' },
					{ src: '/photos/laihua/lh3.png', alt: 'LAiHUA lh3' },
					{ src: '/photos/laihua/lh4.jpg', alt: 'LAiHUA lh4' },
					{ src: '/photos/laihua/lh5.jpg', alt: 'LAiHUA lh5' }
				].map((item, i) => (
					<div className="rounded-[9px]" key={`laihua-${i}`} style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
						<img
							src={asset(item.src)}
							alt={item.alt}
							loading="lazy"
							decoding="async"
							style={{ width: '100%', height: 'auto', display: 'block' }}
						/>
					</div>
				))}
			</div>
		</ProjectTemplate>
	);
}
