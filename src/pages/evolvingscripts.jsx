import React, { useEffect, useRef, useState } from 'react';
import ProjectTemplate from '../components/ProjectTemplate.jsx';
import ProgressiveImage from '../components/media/ProgressiveImage.jsx';
import ProgressiveVideo from '../components/media/ProgressiveVideo.jsx';

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

			// derive tiny placeholders for es2-a/b when in evolvingscript folder
			const tinyFor = (p) => {
				const m = (p || '').match(/^\/photos\/evolvingscript\/(.+?)\.(png|jpe?g)$/i);
				if (!m) return undefined;
				return `/photos/evolvingscript/tiny/${m[1]}-tiny.jpg`;
			};

			return (
				<div ref={containerRef} style={rowStyle}>
					<div className="rounded-[9px]" style={h ? { ...tileCommon, width: `${w1}px`, height: `${h}px` } : fallbackTileStyle}>
						<ProgressiveImage
							src={leftSrc}
							placeholderSrc={tinyFor(leftSrc)}
							alt={leftAlt}
							aspectRatio={h ? `${w1} / ${h}` : undefined}
							onLoad={(e) => {
								const img = e.currentTarget;
								if (img.naturalWidth && img.naturalHeight) setR1(img.naturalWidth / img.naturalHeight);
							}}
						/>
					</div>
					<div className="rounded-[9px]" style={h ? { ...tileCommon, width: `${w2}px`, height: `${h}px` } : fallbackTileStyle}>
						<ProgressiveImage
							src={rightSrc}
							placeholderSrc={tinyFor(rightSrc)}
							alt={rightAlt}
							aspectRatio={h ? `${w2} / ${h}` : undefined}
							onLoad={(e) => {
								const img = e.currentTarget;
								if (img.naturalWidth && img.naturalHeight) setR2(img.naturalWidth / img.naturalHeight);
							}}
						/>
					</div>
				</div>
			);
	}

	function Media({ src, alt, loopOverride }) {
		const isVideo = /\.(mp4|mov)$/i.test(src);
		if (isVideo) {
			const shouldLoop = loopOverride ?? true;
            const isEs6 = /\/es6\.mp4$/i.test(src);
						return (
							<ProgressiveVideo
								src={src}
								posterSrc={undefined}
								aspectRatio={"16 / 9"}
								loop={!!shouldLoop}
								autoPlay
								muted
								playsInline
								preload="metadata"
								videoStyle={isEs6 ? { clipPath: 'inset(0px 0px 1px 0px)' } : undefined}
							/>
						);
		}
				return (
					<ProgressiveImage
						src={src}
						alt={alt}
						aspectRatio={"16 / 9"}
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
														<ProgressiveImage
											src={'/photos/evolvingscript/es1.jpg'}
											placeholderSrc={'/photos/evolvingscript/tiny/es1-tiny.jpg'}
											alt="Evolving Scripts es1"
															aspectRatio={'16 / 9'}
															priority
										/>
									</div>
				<TwoImagesEqualHeightRow
										leftSrc={'/photos/evolvingscript/es2-a.png'}
										rightSrc={'/photos/evolvingscript/es2-b.jpg'}
					leftAlt="Evolving Scripts es2-a"
					rightAlt="Evolving Scripts es2-b"
				/>
								{[ 
										{ src: '/photos/evolvingscript/es3.jpg', alt: 'Evolving Scripts es3', ph: '/photos/evolvingscript/tiny/es3-tiny.jpg' },
										{ src: '/photos/evolvingscript/es4.jpg', alt: 'Evolving Scripts es4', ph: '/photos/evolvingscript/tiny/es4-tiny.jpg' },
										{ src: '/photos/evolvingscript/es5.jpg', alt: 'Evolving Scripts es5', ph: '/photos/evolvingscript/tiny/es5-tiny.jpg' },
							{ src: '/photos/evolvingscript/es6.mp4', alt: 'Evolving Scripts es6', loopOverride: true },
										{ src: '/photos/evolvingscript/es7.jpg', alt: 'Evolving Scripts es7', ph: '/photos/evolvingscript/tiny/es7-tiny.jpg' },
					{ src: '/photos/evolvingscript/es8.mp4', alt: 'Evolving Scripts es8' },
										{ src: '/photos/evolvingscript/es9.jpg', alt: 'Evolving Scripts es9', ph: '/photos/evolvingscript/tiny/es9-tiny.jpg' },
					{ src: '/photos/evolvingscript/es10.mp4', alt: 'Evolving Scripts es10' }
				].map((item, i) => (
					<div className="rounded-[9px]" key={`es-item-${i}`} style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
												{/\.(mp4|mov)$/i.test(item.src) ? (
													<Media src={item.src} alt={item.alt} loopOverride={item.loopOverride} ratio={'16 / 9'} />
												) : (
													<ProgressiveImage src={item.src} placeholderSrc={item.ph} alt={item.alt} aspectRatio={'16 / 9'} />
												)}
					</div>
				))}
								<TwoImagesEqualHeightRow
									leftSrc={'/photos/evolvingscript/es11-a.jpg'}
									rightSrc={'/photos/evolvingscript/es11-b.jpg'}
									leftAlt="Evolving Scripts es11-a"
									rightAlt="Evolving Scripts es11-b"
								/>
								<div className="rounded-[9px]" style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
									<Media src={'/photos/evolvingscript/es12.mp4'} alt="Evolving Scripts es12" ratio={'16 / 9'} />
								</div>
			</div>
            
		</ProjectTemplate>
	);
}
