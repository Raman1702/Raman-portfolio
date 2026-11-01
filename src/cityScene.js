import * as THREE from "three";
import { calendarLayout, buildingForDay, activityColors as colors } from "./activityData";

export function makeScene(host, rows, monthElements = [], onFirstPaint) {
  const container = host.closest(".container");
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setClearColor(0xf1f1f1, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-30, 30, 15, -15, 0.1, 200);
  camera.position.set(29, 32, 52);
  camera.lookAt(0, 1, 0);
  const city = new THREE.Group();
  scene.add(city);
  const ambient = new THREE.AmbientLight(0xffffff, 2.4);
  scene.add(ambient);
  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(-10, 40, 30);
  scene.add(light);
  // A rounded footprint keeps each day recognizable as a calendar cell overhead.
  const footprint = new THREE.Shape();
  const r = 0.1, a = -0.5, b = 0.5;
  footprint.moveTo(a + r, a);
  footprint.lineTo(b - r, a);
  footprint.quadraticCurveTo(b, a, b, a + r);
  footprint.lineTo(b, b - r);
  footprint.quadraticCurveTo(b, b, b - r, b);
  footprint.lineTo(a + r, b);
  footprint.quadraticCurveTo(a, b, a, b - r);
  footprint.lineTo(a, a + r);
  footprint.quadraticCurveTo(a, a, a + r, a);
  const box = new THREE.ExtrudeGeometry(footprint, { depth: 1, bevelEnabled: false, curveSegments: 3 });
  box.rotateX(-Math.PI / 2);
  box.translate(0, -0.5, 0);
  const lots = [], bodies = [];
  const calendar = calendarLayout(rows);
  const weeks = calendar.columns;
  const positions = new Map();
  rows.forEach((day, n) => {
    const x = (calendar.cells[n].column - (weeks - 1) / 2) * 1.04;
    const z = (calendar.cells[n].row - 3) * 1.04;
    positions.set(day.index, { x, z });
    lots.push({
      x,
      y: 0,
      z,
      sx: 0.78,
      sy: 0.065,
      sz: 0.78,
      color: "#dfe3de",
      day: day.index,
    });
    const building = buildingForDay(day);
    if (building) {
      const { height, source, level } = building;
      bodies.push({
        x,
        y: height / 2 + 0.08,
        z,
        sx: 0.78,
        sy: height,
        sz: 0.78,
        color: colors[source][level],
        day: day.index,
        data: day,
      });
    }
  });
  const dummy = new THREE.Object3D();
  const meshes = [];
  function instances(items, unlit = false) {
    const material = unlit
      ? new THREE.MeshBasicMaterial({ color: "#fff" })
      : new THREE.MeshLambertMaterial({ color: "#fff" });
    const mesh = new THREE.InstancedMesh(box, material, items.length);
    mesh.userData.items = items;
    items.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.sx, p.sy, p.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, new THREE.Color(p.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    city.add(mesh);
    meshes.push(mesh);
    return mesh;
  }
  const ground = instances(lots);
  const towers = instances(bodies);
  let progress = 0, activeSource = "all", viewportWidth = 0, viewportHeight = 0, bleed = 0, frameWidth = 0;
  const marker = new THREE.Mesh(
    new THREE.BoxGeometry(1.015, 0.025, 1.015),
    new THREE.MeshBasicMaterial({ color: "#838e7e" }),
  );
  city.add(marker);
  marker.visible = false;
  let frame = 0,
    disposed = false,
    painted = false;
  const render = () => {
    if (disposed || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!disposed) {
        renderer.render(scene, camera);
        if (!painted) {
          painted = true;
          onFirstPaint?.();
        }
      }
    });
  };
  function frameCamera() {
    const width = viewportWidth, height = viewportHeight;
    if (!width || !height) return;
    const tilt = THREE.MathUtils.lerp(0.5, Math.PI / 2, progress);
    // Z-up reference: orbit its vertical axis. This scene uses Three.js's Y-up convention.
    const azimuth = Math.PI / 6 * (1 - progress);
    const radius = 75;
    camera.position.set(
      Math.cos(tilt) * Math.sin(azimuth) * radius,
      Math.sin(tilt) * radius,
      Math.cos(tilt) * Math.cos(azimuth) * radius,
    );
    camera.up.set(0, progress < 0.9999 ? 1 : 0, progress < 0.9999 ? 0 : -1);
    camera.lookAt(0, 1 - progress, 0);
    camera.updateMatrixWorld();
    const bounding = new THREE.Box3(
      new THREE.Vector3(-weeks * 0.53, 0, -4.4),
      new THREE.Vector3(weeks * 0.53, 7.5 * city.scale.y, 4.4),
    );
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    for (const x of [bounding.min.x, bounding.max.x])
      for (const y of [bounding.min.y, bounding.max.y])
        for (const z of [bounding.min.z, bounding.max.z]) {
          const p = new THREE.Vector3(x, y, z).applyMatrix4(
            camera.matrixWorldInverse,
          );
          minX = Math.min(minX, p.x);
          maxX = Math.max(maxX, p.x);
          minY = Math.min(minY, p.y);
          maxY = Math.max(maxY, p.y);
        }
    const aspect = width / height;
    const zoom = THREE.MathUtils.lerp(2.75, 1, progress);
    const fittedHalfW =
      Math.max((maxX - minX) / 2, ((maxY - minY) / 2) * aspect) * 1.1 / zoom;
    // A phone opens inside the city: a fixed world span keeps buildings close
    // for both 13 weeks and Year, instead of shrinking them to fit the range.
    const openingHalfW = width < 600 ? 2.5 : fittedHalfW;
    // Match the outside edges of the calendar cells to the actual page grid lines.
    const calendarHalfW = ((weeks - 1) * 1.04 + 0.78) * width / (2 * frameWidth);
    const halfW = THREE.MathUtils.lerp(openingHalfW, calendarHalfW, THREE.MathUtils.smoothstep(progress, 0, 1));
    const landingOffset = Math.min(width < 810 ? 56 : 110, height * (width < 810 ? 0.1 : 0.14));
    const cx = (maxX + minX) / 2,
      cy = (maxY + minY) / 2 + landingOffset * (2 * halfW / width) * progress;
    camera.left = cx - halfW;
    camera.right = cx + halfW;
    // Extend the drawing surface beyond its layout slot without changing the zoom.
    // CSS overflow alone cannot reveal geometry clipped by a WebGL canvas.
    const extraWorld = (2 * halfW / width) * bleed;
    camera.top = cy + halfW / aspect + extraWorld;
    camera.bottom = cy - halfW / aspect - extraWorld;
    camera.updateProjectionMatrix();
    if (progress === 1) {
      // DOM headings, controls and hit targets share the calendar's actual projection.
      const halfCalendar = ((weeks - 1) * 1.04 + 0.78) / 2;
      const projected = [];
      for (const x of [-halfCalendar, halfCalendar]) {
        for (const z of [-3.51, 3.51]) {
          const p = new THREE.Vector3(x, 0, z).project(camera);
          projected.push({
            x: (p.x + 1) * width / 2 - (width - frameWidth) / 2,
            y: (1 - p.y) * (height + 2 * bleed) / 2 - bleed,
          });
        }
      }
      const left = Math.min(...projected.map(p => p.x));
      const right = Math.max(...projected.map(p => p.x));
      const top = Math.min(...projected.map(p => p.y));
      const bottom = Math.max(...projected.map(p => p.y));
      for (const [key, value] of Object.entries({ top, bottom, left, width: right - left, height: bottom - top })) {
        container.style.setProperty(`--calendar-${key}`, `${value}px`);
      }
    }
    // Labels are anchored to the actual projected week columns, not guessed CSS widths.
    let previousLabelX = -Infinity;
    for (const element of monthElements) {
      const column = Number(element.dataset.column);
      const point = new THREE.Vector3((column - (weeks - 1) / 2) * 1.04 - 0.39, 0, -3.51).project(camera);
      const x = (point.x + 1) * width / 2;
      const y = (1 - point.y) * (height + 2 * bleed) / 2 - bleed - 28;
      const show = x - previousLabelX >= 32;
      element.style.visibility = show ? "visible" : "hidden";
      element.style.transform = `translate(${Math.min((width + frameWidth) / 2 - 28, Math.max((width - frameWidth) / 2, x))}px, ${y}px)`;
      if (show) previousLabelX = x;
    }
    render();
  }
  function updateTowers() {
    for (const [i, p] of bodies.entries()) {
      const building = buildingForDay(p.data, activeSource);
      const height = building?.height ?? 0;
      dummy.position.set(p.x, height / 2 + 0.08, p.z);
      dummy.scale.set(building ? 0.78 : 0, height, building ? 0.78 : 0);
      dummy.updateMatrix();
      towers.setMatrixAt(i, dummy.matrix);
      if (building) towers.setColorAt(i, new THREE.Color(colors[building.source][building.level]));
    }
    towers.instanceMatrix.needsUpdate = true;
    towers.instanceColor.needsUpdate = true;
    towers.computeBoundingSphere();
  }
  function resize() {
    viewportWidth = host.clientWidth;
    viewportHeight = host.clientHeight;
    frameWidth = container.getBoundingClientRect().width;
    if (!viewportWidth || !viewportHeight) return;
    // Hidden hit targets must not retain a previous viewport's calendar bounds.
    // The endpoint projects fresh bounds; in the city view, use the CSS fallbacks.
    if (progress !== 1) {
      for (const key of ["top", "bottom", "left", "width", "height"]) {
        container.style.removeProperty(`--calendar-${key}`);
      }
    }
    bleed = Math.ceil(Math.max(320, viewportHeight * 0.75));
    renderer.setSize(viewportWidth, viewportHeight + 2 * bleed);
    renderer.domElement.style.top = `${-bleed}px`;
    frameCamera();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  const lost = (event) => {
    event.preventDefault();
    host.dataset.contextLost = "true";
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  return {
    city,
    render,
    setProgress(value) {
      progress = THREE.MathUtils.clamp(value, 0, 1);
      const flat = THREE.MathUtils.smoothstep(progress, 0.65, 1);
      city.scale.y = 1 - 0.998 * flat;
      // Lambert's diffuse factor is 1/PI: this yields the exact palette overhead.
      ambient.intensity = THREE.MathUtils.lerp(2.4, Math.PI, flat);
      light.intensity = 1.2 * (1 - flat);
      frameCamera();
    },
    select(index) {
      const p = positions.get(index);
      marker.visible = !!p;
      if (p) marker.position.set(p.x, 0.055, p.z);
      render();
    },
    filter(source) {
      activeSource = source;
      updateTowers();
      render();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      meshes.forEach((m) => m.material.dispose());
      box.dispose();
      marker.geometry.dispose();
      marker.material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}

