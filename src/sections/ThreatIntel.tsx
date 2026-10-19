import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { createThreatMapRenderer, ARC_LIFETIME, type Arc } from '../components/visuals/threatMap';
import { CLASSES, createEvent, formatClock, initialSimulation, type SimEvent, SEVERITIES } from '../content/threats';
import { useAnimationLoop, useReducedMotion } from '../lib/motion';
import styles from './ThreatIntel.module.css';

const MAX_FEED = 7;

const PILLARS = [
  {
    title: 'Observe',
    body: 'Signals from protected devices, networks and infrastructure are correlated into a single operational picture.',
  },
  {
    title: 'Classify',
    body: 'Activity is categorized by technique and severity so that attention goes where consequence is greatest.',
  },
  {
    title: 'Contain',
    body: 'Intelligence flows back into every VANTHRAX layer, tightening defenses as the landscape shifts.',
  },
];

interface ThreatIntelProps {
  index?: string;
  link?: { href: string; label: string };
}

export function ThreatIntel({ index = '03', link }: ThreatIntelProps) {
  const reduced = useReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? reduced;
  const [sim, setSim] = useState(initialSimulation);
  const consoleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createThreatMapRenderer> | null>(null);
  const arcsRef = useRef<Arc[]>([]);
  const loop = useRef({ next: 0.6, rand: Math.random, clock: sim.clock });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = createThreatMapRenderer(canvas);
    rendererRef.current = renderer;
    // Show the opening events as settled vectors on the map.
    arcsRef.current = sim.events.slice(0, 3).map((e, i) => ({ from: e.from, to: e.to, severity: e.severity, start: -1.4 - i * 0.6 }));
    const ro = new ResizeObserver(() => {
      renderer.resize();
      renderer.draw(0, arcsRef.current);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
    // Initial arcs only; later events arrive through the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimationLoop(
    consoleRef,
    (t, dt) => {
      const l = loop.current;
      if (dt > 0) {
        l.clock += dt;
        l.next -= dt;
        if (l.next <= 0) {
          l.next = 1.6 + Math.random() * 1.8;
          const event: SimEvent = createEvent(l.rand, l.clock);
          arcsRef.current = [
            ...arcsRef.current.filter((a) => t - a.start < ARC_LIFETIME),
            { from: event.from, to: event.to, severity: event.severity, start: t },
          ];
          setSim((s) => ({
            clock: l.clock,
            events: [event, ...s.events].slice(0, MAX_FEED),
            counts: { ...s.counts, [event.cls]: s.counts[event.cls] + 1 },
          }));
        }
      }
      rendererRef.current?.draw(t, arcsRef.current);
    },
    { paused },
  );

  const maxCount = Math.max(...Object.values(sim.counts));

  return (
    <section id="intelligence" className="section" aria-labelledby="intelligence-title">
      <div className="container">
        <SectionHeader
          index={index}
          eyebrow="Threat intelligence"
          titleId="intelligence-title"
          link={link}
          title={
            <>
              The threat landscape never stands still<span className="accent-stop">.</span>
            </>
          }
          intro={
            <p>
              Adversaries adapt continuously. VANTHRAX intelligence is built to adapt faster — observing hostile
              activity, classifying it with precision, and turning every observation into stronger defense.
            </p>
          }
        />

        <div ref={consoleRef} className={styles.console} data-reveal="fade">
          <div className={styles.bar}>
            <p className={`mono ${styles.barTitle}`}>
              <span className={styles.barDot} aria-hidden="true" />
              Intelligence console
              <span className={styles.barMode}>Demonstration</span>
            </p>
            <p className={`mono ${styles.badge}`}>Simulated data — not live telemetry</p>
            <div className={styles.barRight}>
              <span className={`mono ${styles.clock}`} aria-hidden="true">
                {formatClock(sim.clock)}
              </span>
              <button
                type="button"
                className={`mono ${styles.control}`}
                aria-pressed={paused}
                onClick={() => setUserPaused(!paused)}
              >
                {paused ? (
                  <Play size={12} strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Pause size={12} strokeWidth={1.75} aria-hidden="true" />
                )}
                {paused ? 'Run simulation' : 'Pause simulation'}
              </button>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.map}>
              <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
              <ul role="list" className={`mono ${styles.legend}`} aria-label="Severity legend">
                {SEVERITIES.map((s) => (
                  <li key={s} data-severity={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.feed}>
              <h3 className={`mono ${styles.panelTitle}`}>Simulated event stream</h3>
              <ol role="list" className={styles.events}>
                {sim.events.map((e) => (
                  <li key={e.id + e.t} className={styles.event} data-severity={e.severity}>
                    <div className={`mono ${styles.eventMeta}`}>
                      <span>{formatClock(e.t)}</span>
                      <span>{e.id}</span>
                      <span className={styles.sev}>{e.severity}</span>
                    </div>
                    <p className={styles.eventClass}>{e.cls}</p>
                    <p className={styles.eventRoute}>
                      {e.from.name} <span aria-hidden="true">→</span>
                      <span className="visually-hidden">to</span> {e.to.name}
                    </p>
                    <p className={`mono ${styles.eventStatus}`}>{e.status}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className={styles.classes}>
            <h3 className={`mono ${styles.panelTitle}`}>Classification — simulated session distribution</h3>
            <ul role="list" className={styles.classList}>
              {CLASSES.map((c) => (
                <li key={c}>
                  <span className={styles.className}>{c}</span>
                  <span className={styles.track} aria-hidden="true">
                    <span className={styles.fill} style={{ transform: `scaleX(${sim.counts[c] / maxCount})` }} />
                  </span>
                  <span className={`mono ${styles.count}`}>{sim.counts[c]}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className={styles.disclaimer}>
            <strong>Demonstration only.</strong> All events, regions, classifications and figures in this console are
            procedurally generated in your browser for illustrative purposes. They do not represent real security
            telemetry, real incidents or real organizations.
          </p>
        </div>

        <ul role="list" className={styles.pillars}>
          {PILLARS.map((p, i) => (
            <li key={p.title} data-reveal style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}>
              <p className={`mono ${styles.pillarIndex}`}>0{i + 1}</p>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarBody}>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
