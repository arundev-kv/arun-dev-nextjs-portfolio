'use client';

import { useEffect, useRef, useState } from 'react';
import type { Experience } from '@/types/portfolio';

interface CareerTrackProps {
  items: Experience[];
}

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="m4 4 12 12M16 4 4 16" />
    </svg>
  );
}

export default function CareerTrack({ items }: CareerTrackProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = selectedIndex === null ? null : items[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || selectedIndex === null) return;

    if (!dialog.open) dialog.showModal();
  }, [selectedIndex]);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const moveSelection = (direction: -1 | 1) => {
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return (current + direction + items.length) % items.length;
    });
  };

  return (
    <section className="career-section section-shell" id="work" aria-labelledby="career-title">
      <div className="section-rail">
        <span>01</span>
        <span>Career track</span>
      </div>

      <header className="section-heading career-heading">
        <p className="eyebrow">Professional history / verified dates</p>
        <h2 id="career-title">
          Nine years,
          <br />
          <em>one widening system.</em>
        </h2>
        <p>
          From application code to the systems that authenticate, build, release, and explain it. Select a stop to
          inspect the working context.
        </p>
      </header>

      <div className="track-ruler" aria-hidden="true">
        <span>2017</span>
        <span>2019</span>
        <span>2021</span>
        <span>2023</span>
        <span>2025</span>
        <span>NOW</span>
      </div>

      <div className="career-track">
        <div className="track-line" aria-hidden="true" />
        {items.map((item, index) => (
          <article className="milestone" key={item.id}>
            <span className="milestone-year">{item.startYear}</span>
            <span className="milestone-node" aria-hidden="true" />
            <button type="button" className="milestone-card" onClick={() => setSelectedIndex(index)}>
              <span className="milestone-period">{item.period}</span>
              <span className="milestone-role">{item.title}</span>
              <span className="milestone-company">{item.organization}</span>
              <span className="milestone-summary">{item.summary}</span>
              <span className="milestone-action">
                Open dossier
                <ArrowUpRight />
              </span>
            </button>
          </article>
        ))}
      </div>

      <div className="track-legend">
        <span className="legend-line" />
        <span>Select any chapter for engineering context</span>
      </div>

      <dialog
        className="dossier-dialog"
        ref={dialogRef}
        onClose={() => setSelectedIndex(null)}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        aria-labelledby={selected ? `dossier-${selected.id}` : undefined}
      >
        {selected && (
          <div className="dossier">
            <header className="dossier-header">
              <div>
                <span className="dossier-index">DOSSIER / {String(selectedIndex! + 1).padStart(2, '0')}</span>
                <span className="dossier-period">{selected.period}</span>
              </div>
              <button className="dossier-close" type="button" onClick={closeDialog} aria-label="Close career dossier">
                <CloseIcon />
              </button>
            </header>

            <div className="dossier-title">
              <p>{selected.location}</p>
              <h3 id={`dossier-${selected.id}`}>{selected.title}</h3>
              <strong>{selected.organization}</strong>
            </div>

            <p className="dossier-summary">{selected.summary}</p>

            <div className="dossier-grid">
              {selected.detail.map((detail) => (
                <section key={detail.label}>
                  <span>{detail.label}</span>
                  <p>{detail.text}</p>
                </section>
              ))}
            </div>

            <div className="dossier-focus">
              <span>Working surface</span>
              <ul>
                {selected.focus.map((focus) => (
                  <li key={focus}>{focus}</li>
                ))}
              </ul>
            </div>

            <footer className="dossier-footer">
              <p>{selected.sourceNote}</p>
              <div className="dossier-controls" aria-label="Browse career chapters">
                <button type="button" onClick={() => moveSelection(-1)}>
                  Previous
                </button>
                <span>
                  {selectedIndex! + 1} / {items.length}
                </span>
                <button type="button" onClick={() => moveSelection(1)}>
                  Next
                </button>
              </div>
            </footer>
          </div>
        )}
      </dialog>
    </section>
  );
}
