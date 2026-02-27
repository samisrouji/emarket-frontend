import React, { useEffect, useRef } from "react";
import './Cursor.css';
import { animate } from 'motion';

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

export const Cursor: React.FC = () => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let outerScale = 1;
    let innerScale = 1;

    // Handle pointer movement.
    // This updates the `target` position for the cursor, and also
    // detects "magnetic" targets (buttons/links or elements with
    // `data-magnetic`). When a magnetic target is found we:
    // - move the cursor toward the element's center (creating the magnetic pull)
    // - increase `--scale` for both inner and outer cursor to create the
    //   larger/magnetic appearance.
    // The relevant code that triggers the magnetic behavior is the
    // `magnetic` detection below (elementFromPoint + closest(...)) and the
    // blocks that set `outerScale`/`innerScale` and animate `--scale`.
    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      // magnetic elements: any element with `data-magnetic`, or default to buttons/links
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const magnetic = el
        ? (el.closest('[data-magnetic]') as HTMLElement | null) || el.closest('button, a, [role="button"]')
        : null;

      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * 0.35;
        const dy = (e.clientY - centerY) * 0.35;
        target.x = centerX + dx;
        target.y = centerY + dy;
        outerScale = 1.45;
        innerScale = 1.8;
        // animate subtle scale using CSS variable so we don't overwrite translate
        if (innerRef.current) {
          // animate the CSS variable --scale
          // motion supports animating CSS variables via property name
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          animate(innerRef.current, { ['--scale']: innerScale }, { duration: 0.18 });
        }
        if (outerRef.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          animate(outerRef.current, { ['--scale']: outerScale }, { duration: 0.2 });
        }
      } else {
        outerScale = 1;
        innerScale = 1;
        // When not hovering a magnetic target we reset `--scale` back to 1.
        // The `onPointerDown` / `onPointerUp` handlers below are responsible
        // for temporary scale changes when the user presses/releases the
        // mouse button (this produces the "cursor becomes smaller when
        // pressing left mouse button" behavior).
        if (innerRef.current) {
          // @ts-ignore
          animate(innerRef.current, { ['--scale']: innerScale }, { duration: 0.25 });
        }
        if (outerRef.current) {
          // @ts-ignore
          animate(outerRef.current, { ['--scale']: outerScale }, { duration: 0.28 });
        }
      }
    };

    const loop = () => {
      pos.x = lerp(pos.x, target.x, 0.18);
      pos.y = lerp(pos.y, target.y, 0.18);

      if (outerRef.current) {
        outerRef.current.style.setProperty('--x', `${pos.x}px`);
        outerRef.current.style.setProperty('--y', `${pos.y}px`);
      }
      if (innerRef.current) {
        innerRef.current.style.setProperty('--x', `${pos.x}px`);
        innerRef.current.style.setProperty('--y', `${pos.y}px`);
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    raf = requestAnimationFrame(loop);

    // Pointer down/up handlers: these implement the "cursor becomes
    // smaller when pressing left mouse button" behavior. On pointer down
    // we animate the inner cursor's `--scale` to 0.9 (making it smaller).
    // On pointer up we restore the scale back to the active `innerScale`.
    const onPointerDown = () => {
      if (innerRef.current) {
        // @ts-ignore
        animate(innerRef.current, { ['--scale']: 0.9 }, { duration: 0.12 });
      }
    };
    const onPointerUp = () => {
      if (innerRef.current) {
        // @ts-ignore
        animate(innerRef.current, { ['--scale']: innerScale }, { duration: 0.12 });
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div className="app-cursor" aria-hidden>
      <div className="cursor-outer" ref={outerRef} />
      <div className="cursor-inner" ref={innerRef} />
    </div>
  );
};

export default Cursor;
