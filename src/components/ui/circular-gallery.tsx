import { useRef, useEffect, useCallback } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface Item {
  image: string;
  text: string;
}

interface CircularGalleryProps {
  items?: Item[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
}

function CircularGallery({
  items = [],
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.02,
  font = "bold 22px DM Sans, sans-serif",
}: CircularGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    current: 0,
    target: 0,
    last: 0,
    position: 0,
    velocity: 0,
    isDown: false,
    startX: 0,
    scrollPos: 0,
    lastMoveX: 0,
    lastMoveTime: 0,
    raf: 0,
  });

  const getItems = useCallback(() => {
    if (!items || items.length === 0) {
      return [
        { image: "/images/cg-1.jpg", text: "Bridge" },
        { image: "/images/cg-2.jpg", text: "Desk Setup" },
        { image: "/images/cg-3.jpg", text: "Waterfall" },
        { image: "/images/cg-4.jpg", text: "Strawberries" },
        { image: "/images/cg-5.jpg", text: "Deep Diving" },
        { image: "/images/cg-6.jpg", text: "Train Track" },
      ];
    }
    return items;
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const allItems = getItems();
    const doubled = [...allItems, ...allItems];
    const cardWidth = 280;
    const gap = 24;
    const step = cardWidth + gap;
    const totalWidth = doubled.length * step;

    track.innerHTML = "";
    track.style.display = "flex";
    track.style.gap = `${gap}px`;
    track.style.padding = "20px 0";
    track.style.willChange = "transform";

    doubled.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "cg-card";
      card.style.cssText = `
        flex: 0 0 ${cardWidth}px;
        height: 360px;
        border-radius: ${16 * borderRadius * 100}px;
        overflow: hidden;
        position: relative;
        background: #0a1f1a;
        border: 1px solid rgba(255,255,255,.1);
        box-shadow: 0 12px 40px rgba(0,0,0,.4);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: grab;
        user-select: none;
      `;

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.text;
      img.draggable = false;
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        pointer-events: none;
      `;
      img.onerror = () => {
        img.style.display = "none";
      };
      card.appendChild(img);

      const label = document.createElement("div");
      label.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 40px 16px 14px;
        background: linear-gradient(transparent, rgba(0,0,0,.7));
        color: ${textColor};
        font: ${font};
        text-align: center;
      `;
      label.textContent = item.text;
      card.appendChild(label);

      track.appendChild(card);
    });

    const container = track.parentElement!;
    const st = stateRef.current;

    function update() {
      if (!st.isDown) {
        st.current = lerp(st.current, st.target, 0.08);
        if (Math.abs(st.current - st.target) < 0.5) {
          st.current = st.target;
        }
      }

      const maxScroll = 0;
      const minScroll = -(totalWidth - container.clientWidth);

      let pos = st.current;
      if (pos > maxScroll + step) pos -= totalWidth;
      if (pos < minScroll - totalWidth + step) pos += totalWidth;
      st.current = pos;

      const cards = track.children;
      const center = container.clientWidth / 2;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const cx = i * step + st.current + step / 2;
        const dist = Math.abs(cx - center);
        const maxDist = container.clientWidth * 0.8;
        const norm = Math.min(dist / maxDist, 1);
        const scale = 1 - norm * 0.25;
        const zRot = (cx - center) / center * 2 * bend;

        card.style.transform = `
          perspective(800px)
          rotateY(${zRot}deg)
          scale(${scale})
        `;
        card.style.zIndex = `${Math.round((1 - norm) * 100)}`;
        card.style.opacity = `${1 - norm * 0.3}`;
        card.style.pointerEvents = norm > 0.85 ? "none" : "auto";
      }

      track.style.transform = `translateX(${st.current}px)`;
      st.last = st.current;
      st.raf = requestAnimationFrame(update);
    }

    function onPointerDown(e: PointerEvent) {
      st.isDown = true;
      st.velocity = 0;
      st.startX = e.clientX;
      st.scrollPos = st.current;
      st.lastMoveX = e.clientX;
      st.lastMoveTime = performance.now();
      track.style.cursor = "grabbing";
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
      if (!st.isDown) return;
      const dx = e.clientX - st.startX;
      st.current = st.scrollPos + dx;
      st.target = st.current;

      const now = performance.now();
      if (now - st.lastMoveTime > 20) {
        st.velocity = (st.lastMoveX - e.clientX) / (now - st.lastMoveTime);
        st.lastMoveX = e.clientX;
        st.lastMoveTime = now;
      }
    }

    function onPointerUp() {
      if (!st.isDown) return;
      st.isDown = false;
      track.style.cursor = "grab";

      const vel = st.velocity * 120;
      if (Math.abs(vel) > 1) {
        st.target = st.current + vel;
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      st.current += e.deltaY;
      st.target = st.current;
    }

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    st.raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(st.raf);
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
    };
  }, [getItems, bend, textColor, borderRadius, font]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "24px",
          padding: "20px 0",
          cursor: "grab",
          userSelect: "none",
        }}
      />
    </div>
  );
}

export { CircularGallery };