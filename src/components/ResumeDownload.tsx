'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';

type ResumeFormat = 'pdf' | 'docx';
type Step = 'email' | 'choose';

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 4v11m0 0 5-5m-5 5-5-5M5 20h14" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 18 18 6M8 6h10v10" />
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

async function requestResume(email: string, format?: ResumeFormat) {
  const response = await fetch('/api/resume/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(format ? { email, format } : { email }),
  });
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const data = (await response.json()) as { choose?: boolean; error?: string };
    if (!response.ok || data.error) {
      throw new Error(data.error || 'The resume could not be downloaded.');
    }
    return data;
  }

  if (!response.ok) {
    throw new Error('The resume could not be downloaded.');
  }

  const blob = await response.blob();
  const disposition = response.headers.get('content-disposition') ?? '';
  const filename = /filename="([^"]+)"/.exec(disposition)?.[1] ?? 'Arun_Dev_KV_Senior_React_Native_Engineer_Resume.pdf';
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  return null;
}

export default function ResumeDownload({
  variant,
  index = 4,
}: {
  variant: 'hero' | 'contact';
  index?: number;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const resetDialog = () => {
    setStep('email');
    setEmail('');
    setError('');
    setPending(false);
  };

  const openDialog = () => {
    resetDialog();
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const submitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextEmail = email.trim();
    if (!nextEmail) {
      setError('Enter a valid email address.');
      return;
    }

    setPending(true);
    setError('');

    try {
      const result = await requestResume(nextEmail);
      if (result?.choose) {
        setEmail(nextEmail);
        setStep('choose');
        setPending(false);
        return;
      }
      closeDialog();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'The resume could not be downloaded.');
      setPending(false);
    }
  };

  const chooseFormat = async (format: ResumeFormat) => {
    setPending(true);
    setError('');

    try {
      await requestResume(email, format);
      closeDialog();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'The resume could not be downloaded.');
      setPending(false);
    }
  };

  const dialog = (
    <dialog
      className="dossier-dialog resume-dialog"
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={resetDialog}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <div className="dossier resume-dossier">
        <header className="dossier-header">
          <div>
            <span className="dossier-index">RESUME</span>
            <span>Download</span>
          </div>
          <button className="dossier-close" type="button" onClick={closeDialog} aria-label="Close resume download">
            <CloseIcon />
          </button>
        </header>

        <div className="dossier-title">
          <p>Portfolio copy</p>
          <h3 id={titleId}>Download Resume</h3>
        </div>

        {step === 'email' ? (
          <form className="resume-form" onSubmit={submitEmail}>
            <label htmlFor={inputId}>Enter your email id to download</label>
            <input
              ref={inputRef}
              id={inputId}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="resume-actions">
              <button className="button button-primary" type="submit" disabled={pending}>
                {pending ? 'Preparing' : 'Continue'}
                <DownloadIcon />
              </button>
            </div>
            {error ? (
              <p className="resume-error" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        ) : (
          <div className="resume-form">
            <p className="resume-note">Choose Word or PDF</p>
            <div className="resume-choices">
              <button className="button button-primary" type="button" disabled={pending} onClick={() => chooseFormat('pdf')}>
                {pending ? 'Preparing' : 'PDF'}
                <DownloadIcon />
              </button>
              <button className="button" type="button" disabled={pending} onClick={() => chooseFormat('docx')}>
                {pending ? 'Preparing' : 'Word'}
                <DownloadIcon />
              </button>
            </div>
            {error ? (
              <p className="resume-error" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </dialog>
  );

  return (
    <>
      {variant === 'hero' ? (
        <button className="button" type="button" onClick={openDialog}>
          Download Resume
          <DownloadIcon />
        </button>
      ) : (
        <button className="contact-channel" type="button" onClick={openDialog}>
          <span className="contact-channel-index">{String(index).padStart(2, '0')}</span>
          <span className="contact-channel-copy">
            <span>Resume</span>
            <strong>Download Resume</strong>
          </span>
          <ArrowUpRight />
        </button>
      )}
      {mounted ? createPortal(dialog, document.body) : null}
    </>
  );
}
