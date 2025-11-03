import React, { useEffect, useRef, useState } from 'react';
import ProjectTemplate from '../components/ProjectTemplate.jsx';

export default function Hantype() {
		const tags = ['EDITORIAL', 'RESEARCH', 'BOOK'];
	const team = [
		{ id: 1, name: 'HoYu.W', subtitle: 'Designer' },
	];

	function TwoImagesEqualHeightRow({ leftSrc, rightSrc, leftAlt, rightAlt }) {
		const containerRef = useRef(null);
		const [cw, setCw] = useState(0);
		const [r1, setR1] = useState(null); // width/height
		const [r2, setR2] = useState(null);

		useEffect(() => {
			const el = containerRef.current;
			if (!el) return;
			let ro;
			const update = () => setCw(el.clientWidth || 0);
			if (typeof ResizeObserver !== 'undefined') {
				ro = new ResizeObserver(update);
				ro.observe(el);
			} else {
				window.addEventListener('resize', update);
			}
			update();
			return () => {
				if (ro) ro.disconnect();
				else window.removeEventListener('resize', update);
			};
		}, []);

		const gap = 10; // matches gap-[10px]
		let h = null, w1 = null, w2 = null;
		if (cw && r1 && r2) {
			h = (cw - gap) / (r1 + r2);
			w1 = r1 * h;
			w2 = r2 * h;
		}

		const rowStyle = { width: '100%', display: 'flex', gap: `${gap}px`, alignItems: 'flex-start' };
		const tileCommon = { background: 'transparent', overflow: 'hidden', borderRadius: '9px' };
		const fallbackTileStyle = { flex: 1, ...tileCommon };
		// No cropping: preserve full image; tile matches image ratio, use objectFit: contain
		const imgStyleSized = { width: '100%', height: '100%', objectFit: 'contain', display: 'block' };
		const imgStyleAuto = { width: '100%', height: 'auto', display: 'block' };

		return (
			<div ref={containerRef} style={rowStyle}>
				<div className="rounded-[9px]" style={h ? { ...tileCommon, width: `${w1}px`, height: `${h}px` } : fallbackTileStyle}>
					<img
						src={leftSrc}
						alt={leftAlt}
						onLoad={(e) => {
							const img = e.currentTarget;
							if (img.naturalWidth && img.naturalHeight) setR1(img.naturalWidth / img.naturalHeight);
						}}
						style={h ? imgStyleSized : imgStyleAuto}
						loading="lazy"
						decoding="async"
					/>
				</div>
				<div className="rounded-[9px]" style={h ? { ...tileCommon, width: `${w2}px`, height: `${h}px` } : fallbackTileStyle}>
					<img
						src={rightSrc}
						alt={rightAlt}
						onLoad={(e) => {
							const img = e.currentTarget;
							if (img.naturalWidth && img.naturalHeight) setR2(img.naturalWidth / img.naturalHeight);
						}}
						style={h ? imgStyleSized : imgStyleAuto}
						loading="lazy"
						decoding="async"
					/>
				</div>
			</div>
		);
	}

	return (
		<ProjectTemplate
			title="HANTYPE"
			subtitle="Typography & Identity"
			info={(
				<>
					<p className="m-0">
						The emergence of Pinyin input methods resolved many social challenges, but its reliance on the QWERTY layout has effectively stalled the evolution of dedicated Chinese keyboards. Over the years, several Chinese typewriters have appeared — not only as milestones in technological progress but also as testaments to the inherent value of Hanzi. This 145 pages book offers a historical survey of Chinese character input tools, complete with visual demonstrations of different input methods, and further explores the modes by which Chinese characters may persist in the future.
					</p>
					<div style={{ height: 10 }} />
					<p className="m-0">
						Chinese typography and technologies have become widely mature in modern society, the existence of Hanzi remains contested. The Latin alphabet’s simple, codable structure lends itself readily to mathematics, science, and programming; Japanese and Korean have gradually shifted toward simplified writing systems. Chinese typeface design requires relatively high entry barriers, yet its potential expressive breadth exceeds that of other scripts. This research was initiated to explore new modes of Chinese character dissemination and thereby better demonstrate their applicability on a global scale.
					</p>
				</>
			)}
			year="2023"
			tags={tags}
			team={team}
		>
			<div className="flex flex-col gap-[10px]" style={{ width: '100%' }}>
				{/* Sequence: ht1, ht2, ht3, (ht4-a/ht4-b), ht5..ht12; all natural height (no cropping) */}
				{['/photos/typemethod/ht1.jpg','/photos/typemethod/ht2.jpg','/photos/typemethod/ht3.jpg'].map((src, i) => (
					<div className="rounded-[9px]" key={`ht-pre-${i}`} style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
						<img src={src} alt={`HANTYPE ht${i + 1}`} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
				))}
				<TwoImagesEqualHeightRow
					leftSrc="/photos/typemethod/ht4-a.jpg"
					rightSrc="/photos/typemethod/ht4-b.jpg"
					leftAlt="HANTYPE ht4-a"
					rightAlt="HANTYPE ht4-b"
				/>
				{['/photos/typemethod/ht5.jpg','/photos/typemethod/ht6.jpg','/photos/typemethod/ht7.jpg','/photos/typemethod/ht8.jpg','/photos/typemethod/ht9.jpg','/photos/typemethod/ht10.jpg','/photos/typemethod/ht11.jpg','/photos/typemethod/ht12.jpg'].map((src, i) => (
					<div className="rounded-[9px]" key={`ht-post-${i}`} style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
						<img src={src} alt={`HANTYPE ht${i + 5}`} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
				))}
			</div>
		</ProjectTemplate>
	);
}
