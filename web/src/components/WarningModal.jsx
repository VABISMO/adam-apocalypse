// WarningModal.jsx — content-notice modal shown before entering the app.
// The landing entry CTA opens this. It carries a brief, clinically-worded notice
// for visitors diagnosed with (or experiencing) psychosis / schizophrenia / mania,
// plus a short self-check. Tone is caring and non-stigmatizing; the visitor may
// always proceed. Reuses the generic .eph-modal / .eph-panel modal styles.
import React, { useState } from 'react';

// A short, plain-language self-check. "Yes" to any one is flagged as a caution,
// not a diagnosis. The point is to invite care, not to gatekeep.
const QUESTIONS = [
  'Do you currently feel your thoughts or actions are being controlled by an outside force?',
  'Are you hearing voices or seeing things that the people around you do not?',
  'Have you felt racing thoughts, euphoria, or no need for sleep for several days running?',
  'Do you feel unable to slow down or stop your thinking right now?'
];

function WarningModal({ open, onClose, onProceed }){
  const [answers, setAnswers] = useState(QUESTIONS.map(()=>null));
  if(!open) return null;
  const set = (i, v) => setAnswers(a => a.map((x,j)=> j===i ? v : x));
  const yesCount = answers.filter(a=>a===true).length;
  const done = answers.every(a=>a!==null);
  const risk = yesCount >= 1;

  return (
    <div className="eph-modal" role="dialog" aria-modal="true" aria-labelledby="wm-title" onClick={onClose}>
      <div className="eph-panel panel" style={{maxWidth:560}} onClick={e=>e.stopPropagation()}>
        <h2 id="wm-title" style={{marginTop:0}}>Before you enter</h2>
        <div className="muted" style={{marginBottom:12,fontSize:'.9rem'}}>
          This project explores <b style={{color:'var(--gold)'}}>revelation, cosmology and altered-state symbolism</b> — the meaning of <i>apocalypse</i> as the unveiling of knowledge, read through the stars. Some of it can feel intense or destabilizing.
        </div>

        <div className="iv" style={{borderColor:'var(--warn)',marginBottom:14}}>
          <div style={{fontSize:'.9rem',lineHeight:1.55}}>
            <b style={{color:'var(--warn)'}}>Please do not use this tool if you suffer from psychosis, mania, or schizophrenia</b> — or, if you choose to, do so only together with someone you trust. The symbolism here can feel overwhelming; your wellbeing comes first, always.
          </div>
        </div>

        <h3 style={{marginTop:6}}>A short self-check</h3>
        <div className="muted" style={{marginBottom:10,fontSize:'.82rem'}}>
          This is not a diagnosis — just a moment to pause. Answer honestly; nothing is stored or sent anywhere.
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {QUESTIONS.map((q,i)=>(
            <div key={i} className="iv" style={{padding:'10px 12px'}}>
              <div style={{fontSize:'.9rem',marginBottom:7}}>{q}</div>
              <div style={{display:'flex',gap:8}}>
                <button className={answers[i]===true?'on':''} onClick={()=>set(i,true)} aria-pressed={answers[i]===true}>Yes</button>
                <button className={answers[i]===false?'on':''} onClick={()=>set(i,false)} aria-pressed={answers[i]===false}>No</button>
              </div>
            </div>
          ))}
        </div>

        {done && (
          <div className="iv" style={{marginTop:12,borderColor: risk?'var(--warn)':'var(--green)'}}>
            {risk
              ? <div style={{fontSize:'.9rem'}}><b style={{color:'var(--warn)'}}>Please be gentle with yourself.</b> Consider talking to someone you trust or a mental-health professional before going deeper. You can always come back later.</div>
              : <div style={{fontSize:'.9rem',color:'var(--green)'}}><b>Thank you for checking.</b> Take what is useful, leave the rest.</div>}
          </div>
        )}

        <div className="controls" style={{marginTop:16,justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
          <button onClick={onClose} title="Close this notice and stay here">◀ Go back</button>
          <button className="btn-cta" onClick={onProceed} disabled={!done} title={done?'Enter the sky-reader app':'Answer the self-check to continue'}>
            {done ? 'Proceed to the app →' : 'Answer to continue'}
          </button>
        </div>
        <div className="note" style={{marginTop:10}}>
          If you are in crisis, please reach out — in the US, <a href="https://988lifeline.org" target="_blank" rel="noreferrer">988 Suicide &amp; Crisis Lifeline</a>; elsewhere, contact your local emergency services. You matter.
        </div>
      </div>
    </div>
  );
}

export { WarningModal };