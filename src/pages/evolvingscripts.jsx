import React, { useEffect, useRef, useState } from 'react';
import ProjectTemplate from '../components/ProjectTemplate.jsx';
import { asset } from '../utils/assets';

export default function EvolvingScripts() {
		const tags = ['CONCEPT', 'UIUX', 'APP', 'EDUCATION'];
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

	function Media({ src, alt, loopOverride }) {
		const isVideo = /\.(mp4|mov)$/i.test(src);
		const [ready, setReady] = useState(false);
		if (isVideo) {
			const shouldLoop = loopOverride ?? true;
            const isEs6 = /\/es6\.mp4$/i.test(src);
			return (
				<video
						src={asset(src)}
					aria-label={alt}
					muted
					playsInline
					autoPlay
					{...(shouldLoop ? { loop: true } : {})}
					preload="metadata"
					onLoadedData={() => setReady(true)}
					className={`blur-on-load ${ready ? 'is-ready' : ''}`}
					style={{ width: '100%', height: 'auto', display: 'block', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'translateZ(0)', ...(isEs6 ? { clipPath: 'inset(0px 0px 1px 0px)' } : {}) }}
				/>
			);
		}
		return (
			<img
					src={asset(src)}
				alt={alt}
				onLoad={() => setReady(true)}
				loading="lazy"
				decoding="async"
				className={`blur-on-load ${ready ? 'is-ready' : ''}`}
				style={{ width: '100%', height: 'auto', display: 'block' }}
			/>
		);
	}

	return (
		<ProjectTemplate
			title="THE EVOLVING OF SCRIPTS"
			subtitle="Script Evolution & Visual Narratives"
			info={'Hanzi as logogram / morphosyllabic script, remain internationally recognized for their intricate forms. Nearly half the world’s nations employ phonetic writing systems, and logogram is often viewed as opaque or even antiquated. This has inspired to design a focused, application‑driven user experience tailored app for non‑Sinophone audiences, using the logic of Latin alphabets to demystify the Chinese writing system.'}
			year="2020"
			tags={tags}
			team={team}
		>
			<div className="flex flex-col gap-[10px]" style={{ width: '100%' }}>
				{/* Sequence: es1, (es2-a/es2-b), es3, es4, es5, es6.mp4, es7, es8.mp4, es9, es10.mp4, es11-a, es11-b, es12.mp4 */}
						<div className="rounded-[9px]" style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
							<Media src={'/photos/evolvingscript/es1.jpg'} alt="Evolving Scripts es1" ratio={'16 / 9'} />
						</div>
				<TwoImagesEqualHeightRow
							leftSrc={asset('/photos/evolvingscript/es2-a.png')}
							rightSrc={asset('/photos/evolvingscript/es2-b.jpg')}
					leftAlt="Evolving Scripts es2-a"
					rightAlt="Evolving Scripts es2-b"
				/>
				{[
					{ src: '/photos/evolvingscript/es3.jpg', alt: 'Evolving Scripts es3' },
					{ src: '/photos/evolvingscript/es4.jpg', alt: 'Evolving Scripts es4' },
					{ src: '/photos/evolvingscript/es5.jpg', alt: 'Evolving Scripts es5' },
							{ src: '/photos/evolvingscript/es6.mp4', alt: 'Evolving Scripts es6', loopOverride: true },
					{ src: '/photos/evolvingscript/es7.jpg', alt: 'Evolving Scripts es7' },
					{ src: '/photos/evolvingscript/es8.mp4', alt: 'Evolving Scripts es8' },
					{ src: '/photos/evolvingscript/es9.jpg', alt: 'Evolving Scripts es9' },
					{ src: '/photos/evolvingscript/es10.mp4', alt: 'Evolving Scripts es10' }
				].map((item, i) => (
					<div className="rounded-[9px]" key={`es-item-${i}`} style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
						<Media src={item.src} alt={item.alt} loopOverride={item.loopOverride} ratio={'16 / 9'} />
					</div>
				))}
				<TwoImagesEqualHeightRow
							leftSrc={asset('/photos/evolvingscript/es11-a.jpg')}
							rightSrc={asset('/photos/evolvingscript/es11-b.jpg')}
					leftAlt="Evolving Scripts es11-a"
					rightAlt="Evolving Scripts es11-b"
				/>
				<div className="rounded-[9px]" style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
							<Media src={'/photos/evolvingscript/es12.mp4'} alt="Evolving Scripts es12" ratio={'16 / 9'} />
				</div>
			</div>
			<style>{`
				/* Constant blur until reveal; no placeholders; no absolute media */
				.blur-on-load { filter: blur(14px); transition: filter 280ms ease-in; }
				.blur-on-load.is-ready { filter: none; }
			`}</style>
		</ProjectTemplate>
	);
}
