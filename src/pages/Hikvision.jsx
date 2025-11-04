import React from 'react';
import ProjectTemplate from '../components/ProjectTemplate.jsx';
import { asset } from '../utils/assets';

export default function Hikvision() {
	const tags = ['EDITORIAL', 'OFFICE'];
	const team = [
		{ id: 1, name: 'HoYu.W', subtitle: 'Designer' },
		{ id: 2, name: 'Dennis.L', subtitle: 'Designer' },
	];

	return (
		<ProjectTemplate
			title="HIKVISION"
			subtitle="Global Product & Creative Marketing"
			info={(
				<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
					<p className="m-0">
						Hikvision’s products span multiple lines and series, covering dozens of models. with a focus on the B2B market and professional security solutions, customers often identify products by specific codes.
					</p>
					<div style={{ height: 4 }} />
					<p className="m-0">
						During the time at Hikvision, my role focused on creative strategy & visual design across various product lines (ColorVu Pro & Lite & DF3T, MinMoe, Wifi Kit) and app platforms (Hik-ePartner & Hik-ProConnect). Work centered on 1.&nbsp;
						<strong style={{ fontWeight: 700 }}>Brand consistency</strong>
						, 2.&nbsp;
						<strong style={{ fontWeight: 700 }}>Cross-media communication</strong>
						, and 3.&nbsp;
						<strong style={{ fontWeight: 700 }}>Localized visual storytelling</strong>
						. Designs aim to enhance the brand’s local cultural presence to strengthen market relevance and audience connection, collaborating with marketing teams, and creating Google and Facebook ads and post content. Designs produced during this period were used by both the Hangzhou headquarters and the Southeast Asia division. The experience also involved contributing to the video and motion graphics team for promotional materials.
					</p>
				</div>
			)}
			year="2020"
			tags={tags}
			team={team}
		>
			<div className="flex flex-col gap-[10px]" style={{ width: '100%' }}>
				<div className="flex flex-col gap-[10px]" style={{ width: '100%' }}>
					{/* 1) Hero wide */}
					<div className="rounded-[9px]" style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
						<img src={asset('/photos/hikvision/hikvision.jpeg')} alt="HIKVISION hero" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
					{/* 2) hik1 wide */}
					<div className="rounded-[9px]" style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
						<img src={asset('/photos/hikvision/hik1.jpg')} alt="HIKVISION 1" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
					{/* 3) Two-up row: hik2-a + hik2-b */}
					<div className="flex gap-[10px]" style={{ width: '100%' }}>
						<div className="rounded-[9px]" style={{ flex: 1, background: 'transparent', overflow: 'hidden' }}>
							<img src={asset('/photos/hikvision/hik2-a.jpg')} alt="HIKVISION 2-a" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
						</div>
						<div className="rounded-[9px]" style={{ flex: 1, background: 'transparent', overflow: 'hidden' }}>
							<img src={asset('/photos/hikvision/hik2-b.jpg')} alt="HIKVISION 2-b" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
						</div>
					</div>
					{/* 4) Remaining wides in order */}
					{[
						'/photos/hikvision/hik3.jpg',
						'/photos/hikvision/hik4.jpg',
						'/photos/hikvision/hik5.jpg',
						'/photos/hikvision/hik6.jpg',
						'/photos/hikvision/hik7.jpg',
						'/photos/hikvision/hik8.jpeg',
						'/photos/hikvision/hik9.jpg',
						'/photos/hikvision/hik10.jpg',
						'/photos/hikvision/hik11.jpg',
					].map((src, idx) => (
						<div className="rounded-[9px]" key={`hik-wide-${idx}`} style={{ width: '100%', background: 'transparent', overflow: 'hidden' }}>
							<img src={asset(src)} alt={`HIKVISION ${idx + 3}`} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
						</div>
					))}
				</div>
			</div>
		</ProjectTemplate>
	);
}
