'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/* Gebäude- und Route-Daten der ENTER Technikwelt (isometrisches Modell) */
const D: any = {
	L: 15.0,
	W: 13.0,
	H: 3.95,
	BH: 1.05,
	block: [2.0, 0.7, 13.0, 2.9, 1.05],
	drum: { c: [7.5, 10.2], r: 1.1, z0: 3.95, z1: 4.85 },
	groups: {
		main: [
			[[0, 13.0, 0], [0, 13.0, 3.95]],
			[[15.0, 13.0, 0], [15.0, 13.0, 3.95]],
			[[0, 0, 0], [0, 0, 3.95]],
			[[15.0, 0, 0], [15.0, 0, 3.95]],
			[[0, 13.0, 0], [15.0, 13.0, 0]],
			[[0, 13.0, 3.95], [15.0, 13.0, 3.95]],
			[[0, 0, 0], [15.0, 0, 0]],
			[[0, 0, 3.95], [15.0, 0, 3.95]],
		],
		grid: [
			[[0, 13.0, 0], [0, 0, 0]],
			[[15.0, 13.0, 0], [15.0, 0, 0]],
			[[0, 13.0, 3.95], [0, 0, 3.95]],
			[[15.0, 13.0, 3.95], [15.0, 0, 3.95]],
			[[0, 0, 0], [0, 13.0, 0]],
			[[15.0, 0, 0], [15.0, 13.0, 0]],
			[[0, 0, 3.95], [0, 13.0, 3.95]],
			[[15.0, 0, 3.95], [15.0, 13.0, 3.95]],
			[[0, 13.0, 0], [15.0, 0, 0]],
			[[15.0, 13.0, 0], [0, 0, 0]],
			[[0, 13.0, 3.95], [15.0, 0, 3.95]],
			[[15.0, 13.0, 3.95], [0, 0, 3.95]],
		],
		faint: [
			[[2.0, 13.0, 3.95], [2.0, 0, 3.95]],
			[[4.0, 13.0, 3.95], [4.0, 0, 3.95]],
			[[6.0, 13.0, 3.95], [6.0, 0, 3.95]],
			[[8.0, 13.0, 3.95], [8.0, 0, 3.95]],
			[[10.0, 13.0, 3.95], [10.0, 0, 3.95]],
			[[12.0, 13.0, 3.95], [12.0, 0, 3.95]],
			[[14.0, 13.0, 3.95], [14.0, 0, 3.95]],
			[[0, 13.0, 0.5], [15.0, 0, 0.5]],
			[[0, 13.0, 1.0], [15.0, 0, 1.0]],
			[[0, 13.0, 1.5], [15.0, 0, 1.5]],
			[[0, 13.0, 2.0], [15.0, 0, 2.0]],
			[[0, 13.0, 2.5], [15.0, 0, 2.5]],
			[[0, 13.0, 3.0], [15.0, 0, 3.0]],
			[[0, 13.0, 3.5], [15.0, 0, 3.5]],
		],
		deck: [
			[[0, 13.0, 3.95], [0, 0, 3.95]],
			[[15.0, 13.0, 3.95], [15.0, 0, 3.95]],
			[[0, 13.0, 3.95], [15.0, 13.0, 3.95]],
			[[0, 0, 3.95], [15.0, 0, 3.95]],
		],
		ramp: [
			[[7.5, 13.0, 3.95], [7.5, 0, 3.95]],
			[[8.0, 13.0, 3.95], [8.0, 0, 3.95]],
			[[7.0, 13.0, 3.95], [7.0, 0, 3.95]],
			[[6.5, 13.0, 3.95], [6.5, 0, 3.95]],
			[[8.5, 13.0, 3.95], [8.5, 0, 3.95]],
		],
	},
	band: [[7.5, 13.0, 3.95], [7.5, 0, 3.95]],
	route: [
		[7.5, 13.0, 0], [7.5, 13.0, 0.5], [7.5, 13.0, 1.0], [7.5, 13.0, 1.5],
		[7.5, 13.0, 2.0], [7.5, 13.0, 2.5], [7.5, 13.0, 3.0], [7.5, 13.0, 3.5],
		[7.5, 13.0, 3.95], [8.0, 12.5, 3.95], [8.5, 12.0, 3.95], [9.0, 11.5, 3.95],
		[9.5, 11.0, 3.95], [10.0, 10.5, 3.95], [10.5, 10.0, 3.95], [11.0, 9.5, 3.95],
		[11.5, 9.0, 3.95], [12.0, 8.5, 3.95], [12.5, 8.0, 3.95], [13.0, 7.5, 3.95],
		[13.5, 7.0, 3.95], [14.0, 6.5, 3.95], [14.5, 6.0, 3.95], [15.0, 5.5, 3.95],
		[15.0, 5.0, 3.95], [14.5, 4.5, 3.95], [14.0, 4.0, 3.95], [13.5, 3.5, 3.95],
		[13.0, 3.0, 3.95], [12.5, 2.5, 3.95], [12.0, 2.0, 3.95], [11.5, 1.5, 3.95],
		[11.0, 1.0, 3.95], [10.5, 0.5, 3.95], [10.0, 0, 3.95], [7.5, 0, 3.95],
	],
	labels: [
		{ t: 'START', p: [7.5, 13.0, 0], at: 0.0 },
		{ t: 'OBEN', p: [15.0, 5.0, 3.95], at: 0.5 },
		{ t: 'RUNTER', p: [7.5, 0, 3.95], at: 0.9 },
	],
}

export default function EnterBuildingPlan() {
	const figRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
		const fig = figRef.current
		if (!fig) return

		const wrap = document.createElement('div')
		wrap.className = 'plan__gl'
		fig.appendChild(wrap)

		let renderer: THREE.WebGLRenderer
		try {
			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		} catch (e) {
			wrap.remove()
			return
		}
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		wrap.appendChild(renderer.domElement)

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 400)
		const V = (p: number[]) => new THREE.Vector3(D.L / 2 - p[0], p[2], D.W / 2 - p[1])

		const black = new THREE.MeshBasicMaterial({
			color: 0x0d0c0b,
			polygonOffset: true,
			polygonOffsetFactor: 2,
			polygonOffsetUnits: 2,
		})
		const body = new THREE.Mesh(new THREE.BoxGeometry(D.L, D.H, D.W), black)
		body.position.set(0, D.H / 2, 0)
		scene.add(body)

		const [bx0, by0, bx1, by1, bh] = D.block
		const block = new THREE.Mesh(new THREE.BoxGeometry(bx1 - bx0, bh, by1 - by0), black)
		block.position.copy(V([(bx0 + bx1) / 2, (by0 + by1) / 2, D.H + bh / 2]))
		scene.add(block)

		const drum = new THREE.Mesh(
			new THREE.CylinderGeometry(D.drum.r, D.drum.r, D.drum.z1 - D.drum.z0, 28),
			black,
		)
		drum.position.copy(V([D.drum.c[0], D.drum.c[1], (D.drum.z0 + D.drum.z1) / 2]))
		scene.add(drum)

		if (D.band) {
			const BAND_H = 0.3
			const top = D.band.map(V)
			const bot = D.band.map((p: number[]) => V([p[0], p[1], p[2] - BAND_H]))
			const verts: THREE.Vector3[] = []
			for (let i = 0; i < top.length - 1; i++) {
				verts.push(top[i], bot[i], top[i + 1], bot[i], bot[i + 1], top[i + 1])
			}
			const ribbon = new THREE.Mesh(
				new THREE.BufferGeometry().setFromPoints(verts),
				new THREE.MeshBasicMaterial({
					color: 0x221d18,
					side: THREE.DoubleSide,
					polygonOffset: true,
					polygonOffsetFactor: 1,
					polygonOffsetUnits: 1,
				}),
			)
			scene.add(ribbon)
			const edgeMat = new THREE.LineBasicMaterial({
				color: 0xf4f1eb,
				transparent: true,
				opacity: 0.85,
			})
			scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(top), edgeMat))
			scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(bot), edgeMat))
		}

		const lineMat = (opacity: number, xray?: boolean) =>
			new THREE.LineBasicMaterial({
				color: 0xf4f1eb,
				transparent: true,
				opacity,
				depthTest: !xray,
			})
		const styles: Record<string, THREE.LineBasicMaterial> = {
			main: lineMat(0.95),
			grid: lineMat(0.38),
			faint: lineMat(0.14),
			deck: lineMat(0.5),
			ramp: lineMat(0.55),
			hidden: lineMat(0.07, true),
		}
		for (const [name, polys] of Object.entries(D.groups) as [string, number[][][]][]) {
			const pts: THREE.Vector3[] = []
			for (const poly of polys)
				for (let i = 0; i < poly.length - 1; i++) pts.push(V(poly[i]), V(poly[i + 1]))
			scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), styles[name]))
		}

		const curve = new THREE.CatmullRomCurve3(D.route.map(V), false, 'catmullrom', 0.02)
		const tube = new THREE.Mesh(
			new THREE.TubeGeometry(curve, 900, 0.09, 6, false),
			new THREE.MeshBasicMaterial({ color: 0xee3829 }),
		)
		tube.renderOrder = 2
		scene.add(tube)

		const ghost = new THREE.Line(
			new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(700)),
			new THREE.LineDashedMaterial({
				color: 0xee3829,
				dashSize: 0.16,
				gapSize: 0.2,
				transparent: true,
				opacity: 0.35,
				depthTest: false,
			}),
		)
		ghost.computeLineDistances()
		ghost.renderOrder = 1
		scene.add(ghost)

		const markMat = new THREE.MeshBasicMaterial({ color: 0xee3829 })
		const startMark = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), markMat)
		startMark.position.copy(V(D.route[0]))
		scene.add(startMark)
		const headMark = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), markMat)
		scene.add(headMark)

		const labels = (D.labels as { t: string; p: number[]; at: number }[]).map((l) => {
			const el = document.createElement('div')
			el.className = 'plan__gl-label'
			el.textContent = l.t
			wrap.appendChild(el)
			return { el, v: V(l.p), at: l.at }
		})

		const controls = new OrbitControls(camera, renderer.domElement)
		controls.enableDamping = true
		controls.dampingFactor = 0.05
		controls.autoRotate = true
		controls.autoRotateSpeed = 2

		function onResize() {
			const w = wrap.clientWidth
			const h = wrap.clientHeight
			renderer.setSize(w, h)
			camera.aspect = w / h
			camera.updateProjectionMatrix()
		}
		onResize()
		window.addEventListener('resize', onResize)

		let raf = 0
		function animate() {
			raf = requestAnimationFrame(animate)
			controls.update()
			labels.forEach((l) => {
				const v = l.v.clone().project(camera)
				const x = (v.x * 0.5 + 0.5) * wrap.clientWidth
				const y = (-v.y * 0.5 + 0.5) * wrap.clientHeight
				l.el.style.left = x + 'px'
				l.el.style.top = y + 'px'
				l.el.classList.toggle('on', v.z < 1)
			})
			renderer.render(scene, camera)
		}
		animate()

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', onResize)
			controls.dispose()
			renderer.dispose()
			wrap.remove()
		}
	}, [])

	return (
		<>
			<div className="plan__fig" ref={figRef} />
			<style>{`
				.plan__fig { width: 100%; height: 100%; min-width: 0; display: grid; place-items: center; }
				.plan__gl { position: relative; width: 100%; height: min(86vh, 620px); cursor: grab; }
				.plan__gl:active { cursor: grabbing; }
				.plan__gl canvas { position: absolute; inset: 0; width: 100% !important; height: 100% !important; }
				.plan__gl-label {
					position: absolute;
					transform: translate(-50%, -130%);
					font-family: var(--font-ibm-plex-mono);
					font-size: 11px;
					letter-spacing: .18em;
					color: #F4F1EB;
					white-space: nowrap;
					pointer-events: none;
					opacity: 0;
					transition: opacity .4s ease;
				}
				.plan__gl-label::after {
					content: '';
					display: block;
					width: 5px;
					height: 5px;
					border-radius: 50%;
					background: #F4F1EB;
					margin: 4px auto 0;
				}
				.plan__gl-label.on { opacity: 1; }
				@media (max-width: 860px) {
					.plan__gl { height: 52vh; }
				}
			`}</style>
		</>
	)
}
