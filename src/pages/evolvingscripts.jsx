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
		const [l1, setL1] = useState(false);
		const [l2, setL2] = useState(false);

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
		const tileCommon = { background: 'transparent', overflow: 'hidden', borderRadius: '9px', position: 'relative' };
		const fallbackTileStyle = { flex: 1, ...tileCommon };
		const imgStyleSized = { width: '100%', height: '100%', objectFit: 'contain', display: 'block' };
		const imgStyleAuto = { width: '100%', height: 'auto', display: 'block' };

			return (
			<div ref={containerRef} style={rowStyle}>
				<div className="rounded-[9px]" style={h ? { ...tileCommon, width: `${w1}px`, height: `${h}px` } : fallbackTileStyle}>
					{!l1 && <div className="prog-ph" />}
					<img
							src={leftSrc}
						alt={leftAlt}
						onLoad={(e) => {
							const img = e.currentTarget;
							if (img.naturalWidth && img.naturalHeight) setR1(img.naturalWidth / img.naturalHeight);
							setL1(true);
						}}
						className={`prog-media ${l1 ? 'is-ready' : ''}`}
						style={h ? imgStyleSized : imgStyleAuto}
						loading="lazy"
						decoding="async"
					/>
				</div>
				<div className="rounded-[9px]" style={h ? { ...tileCommon, width: `${w2}px`, height: `${h}px` } : fallbackTileStyle}>
					{!l2 && <div className="prog-ph" />}
					<img
								src={rightSrc}
						alt={rightAlt}
						onLoad={(e) => {
							const img = e.currentTarget;
							if (img.naturalWidth && img.naturalHeight) setR2(img.naturalWidth / img.naturalHeight);
							setL2(true);
						}}
						className={`prog-media ${l2 ? 'is-ready' : ''}`}
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
		const [loaded, setLoaded] = useState(false);
		if (isVideo) {
			const shouldLoop = loopOverride ?? true;
            const isEs6 = /\/es6\.mp4$/i.test(src);
			return (
				<div className="prog-wrap">
					<video
							src={asset(src)}
						aria-label={alt}
						muted
						playsInline
						autoPlay
						{...(shouldLoop ? { loop: true } : {})}
						preload="metadata"
						onLoadedData={() => setLoaded(true)}
						className={`prog-media ${loaded ? 'is-ready' : ''}`}
						style={{ width: '100%', height: 'auto', display: 'block', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'translateZ(0)', ...(isEs6 ? { clipPath: 'inset(0px 0px 1px 0px)' } : {}) }}
					/>
					{!loaded && <div className="prog-ph" />}
				</div>
			);
		}
		return (
			<div className="prog-wrap">
				<img
						src={asset(src)}
					alt={alt}
					onLoad={() => setLoaded(true)}
					loading="lazy"
					decoding="async"
					className={`prog-media ${loaded ? 'is-ready' : ''}`}
					style={{ width: '100%', height: 'auto', display: 'block' }}
				/>
				{!loaded && <div className="prog-ph" />}
			</div>
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
							<Media src={'/photos/evolvingscript/es1.jpg'} alt="Evolving Scripts es1" />
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
						<Media src={item.src} alt={item.alt} loopOverride={item.loopOverride} />
					</div>
				))}
				<TwoImagesEqualHeightRow
							leftSrc={asset('/photos/evolvingscript/es11-a.jpg')}
							rightSrc={asset('/photos/evolvingscript/es11-b.jpg')}
					leftAlt="Evolving Scripts es11-a"
					rightAlt="Evolving Scripts es11-b"
				/>
				<div className="rounded-[9px]" style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
							<Media src={'/photos/evolvingscript/es12.mp4'} alt="Evolving Scripts es12" />
				</div>
			</div>
			<style>{`
				/* Progressive blur-up only for Evolving Scripts page */
				.prog-wrap { position: relative; width: 100%; height: auto; }
				.prog-media { filter: blur(16px); transform: scale(1.02); opacity: 0.85; transition: filter 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 300ms ease; will-change: filter, transform, opacity; }
				.prog-media.is-ready { filter: none; transform: none; opacity: 1; }
				.prog-ph { position: absolute; inset: 0; background: rgba(200,200,200,0.16); }
				.theme-dark .prog-ph { background: rgba(255,255,255,0.06); }
			`}</style>
		</ProjectTemplate>
	);
}
