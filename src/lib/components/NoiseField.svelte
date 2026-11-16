<script lang="ts">
  import { untrack } from "svelte";
  import { hacker } from "$lib/hacker.svelte";

  // A domain-warped noise field, quantized with ordered (Bayer) dithering and rendered at 1/3 resolution
  // so each dither cell reads as a crisp pixel. The cursor pushes the field apart and leaves a faint glow.
  // Paused whenever the hero is offscreen or the tab is hidden; reduced motion gets one still frame.

  let canvas: HTMLCanvasElement;
  let failed = $state(false);

  const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

  const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_hover;
uniform vec3 u_a;
uniform vec3 u_b;
uniform vec3 u_bg;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0)), f - vec2(1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5 * u_res) / u_res.y;
  float d = length(p - m);
  float t = u_time * 0.045;

  p += (p - m) * 0.35 * exp(-d * d * 5.0) * u_hover;

  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.3 + 2.2 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.3 + 2.2 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.3 + 2.6 * r);

  float v = clamp(f * 1.25 + 0.48, 0.0, 1.0);
  // Brightest toward the upper right, fading out behind the name at the lower left.
  v *= smoothstep(1.45, 0.15, length((uv - vec2(0.85, 0.8)) * vec2(1.1, 1.4)));
  v += 0.28 * exp(-d * d * 9.0) * u_hover;

  float levels = 6.0;
  float stepped = floor(v * levels + bayer8(gl_FragCoord.xy)) / levels;

  vec3 col = u_bg;
  col = mix(col, u_a * 0.55, smoothstep(0.15, 0.55, stepped));
  col = mix(col, u_a, smoothstep(0.5, 0.85, stepped));
  col = mix(col, u_b, smoothstep(0.8, 1.0, stepped) * clamp(r.x * 2.0 + 0.6, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}`;

  function readColor(name: string): [number, number, number] {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
    return raw.length === 3 && raw.every((n) => !Number.isNaN(n)) ? [raw[0] / 255, raw[1] / 255, raw[2] / 255] : [0, 0, 0];
  }

  let palette: { a: number[]; b: number[]; bg: number[] } | null = null;
  let redraw: (() => void) | null = null;

  // Re-read the palette when hacker mode swaps the CSS tokens, then repaint (matters for the still frame).
  $effect(() => {
    void hacker.on;
    palette = { a: readColor("--rgb-volt"), b: readColor("--rgb-ember"), bg: readColor("--rgb-ink") };
    untrack(() => redraw?.());
  });

  $effect(() => {
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      failed = true;
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      failed = true;
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("u_res"),
      uTime = u("u_time"),
      uMouse = u("u_mouse"),
      uHover = u("u_hover"),
      uA = u("u_a"),
      uB = u("u_b"),
      uBg = u("u_bg");

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const PIXEL = 3; // CSS pixels per dither cell
    let width = 1,
      height = 1;
    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6, hover: 0, thover: 0 };
    let visible = true;
    let frame = 0;
    const start = performance.now() - 40_000 * Math.random();

    const resize = () => {
      width = Math.max(1, Math.round(canvas.clientWidth / PIXEL));
      height = Math.max(1, Math.round(canvas.clientHeight / PIXEL));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      if (reduced || !frame) draw(performance.now());
    };

    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.hover += (mouse.thover - mouse.hover) * 0.04;
      const p = palette ?? { a: [0.43, 0.42, 1], b: [1, 0.7, 0.54], bg: [0.03, 0.03, 0.04] };
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x * width, (1 - mouse.y) * height);
      gl.uniform1f(uHover, mouse.hover);
      gl.uniform3fv(uA, p.a);
      gl.uniform3fv(uB, p.b);
      gl.uniform3fv(uBg, p.bg);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const play = () => {
      if (!reduced && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
      mouse.thover = mouse.ty >= 0 && mouse.ty <= 1 ? 1 : 0;
    };
    const onLeave = () => (mouse.thover = 0);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", play);
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    redraw = () => draw(performance.now());
    resize();
    play();

    return () => {
      cancelAnimationFrame(frame);
      redraw = null;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  });
</script>

<canvas bind:this={canvas} class="field" class:hidden={failed} aria-hidden="true"></canvas>
<div class="fallback" aria-hidden="true"></div>

<style>
  .field,
  .fallback {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .field {
    z-index: 1;
    image-rendering: pixelated;
  }
  .fallback {
    background:
      radial-gradient(60% 70% at 85% 20%, rgb(var(--rgb-volt) / 0.35), transparent 70%),
      radial-gradient(30% 40% at 70% 35%, rgb(var(--rgb-ember) / 0.15), transparent 70%),
      var(--color-ink);
  }
</style>
