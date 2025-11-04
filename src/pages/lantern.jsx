import React, { useEffect, useRef, useState } from 'react';
import ProjectTemplate from '../components/ProjectTemplate.jsx';
import { asset } from '../utils/assets';

export default function Lantern() {
		const tags = ['CONCEPT', 'TYPEFACE'];
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
		const imgStyleSized = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
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
			title="LANTERN FONT"
			subtitle="Typeface & Motion System"
			info={(
				<>
					<p className="m-0">
						Serif & Sans‑serif, beyond the presence or absence of decorative terminals, differ most notably in stroke contrast. Latin letterforms traditionally adhere to strict thick‑and‑thin conventions derived from broad‑nib pen calligraphy, but introducing experimental variations can open up new possibilities in typographic presentation.
					</p>
					<div style={{ height: 10 }} />
					<p className="m-0">
						The original intention was to imbue the typeface with additional weight — <strong>much like a lamp whose base bears the greatest mass</strong>. The most challenging letters are those whose heaviest strokes occur at the top or middle, such as the numeral <strong><em>9</em></strong> and the letter <strong><em>S</em></strong>. Characters with more complex construction, like <strong><em>N</em></strong>, <strong><em>R</em></strong>, and <strong><em>W</em></strong>, also present difficulties when trying to express a strong sense of weight.
					</p>
				</>
			)}
			year="2022"
			tags={tags}
			team={team}
		>
			<div className="flex flex-col gap-[10px]" style={{ width: '100%' }}>
				{/* Sequence: l1, (l2-a/l2-b), l3, l4, l5, l6, l7, (l8-a/l8-b), l9, l10, l11, l12, (l13-a/l13-b) */}
				<div className="rounded-[9px]" style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
					<img src={asset('/photos/lantern/l1.jpg')} alt="Lantern l1" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
				</div>
				<TwoImagesEqualHeightRow
					leftSrc={asset('/photos/lantern/l2-a.jpg')}
					rightSrc={asset('/photos/lantern/l2-b.jpg')}
					leftAlt="Lantern l2-a"
					rightAlt="Lantern l2-b"
				/>
				{[
					'/photos/lantern/l3.jpg',
					'/photos/lantern/l4.jpg',
					'/photos/lantern/l5.jpg',
					'/photos/lantern/l6.jpg',
					'/photos/lantern/l7.jpg',
				].map((src, i) => (
					<div className="rounded-[9px]" key={`l-wide-${i}`} style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
						<img src={asset(src)} alt={`Lantern l${i + 3}`} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
				))}
				<TwoImagesEqualHeightRow
					leftSrc={asset('/photos/lantern/l8-a.jpg')}
					rightSrc={asset('/photos/lantern/l8-b.jpg')}
					leftAlt="Lantern l8-a"
					rightAlt="Lantern l8-b"
				/>
				{[
					'/photos/lantern/l9.jpg',
					'/photos/lantern/l10.jpg',
					'/photos/lantern/l11.jpg',
					'/photos/lantern/l12.jpg',
				].map((src, i) => (
					<div className="rounded-[9px]" key={`l-wide-2-${i}`} style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
						<img src={asset(src)} alt={`Lantern l${i + 9}`} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
				))}
				<TwoImagesEqualHeightRow
					leftSrc={asset('/photos/lantern/l13-a.jpg')}
					rightSrc={asset('/photos/lantern/l13-b.jpg')}
					leftAlt="Lantern l13-a"
					rightAlt="Lantern l13-b"
				/>
			</div>
		</ProjectTemplate>
	);
}
