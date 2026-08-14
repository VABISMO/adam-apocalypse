// pages/About.jsx — About page (top-level /about). For now: what the project is,
// how it works, who made it, and where to go next. Reachable from the navbar.
import React from 'react';
import { AGE, PREC, FULL } from '../core.jsx';

function About(){
  return (
    <div className="about-page">
      <h1 style={{fontSize:'1.9rem',marginBottom:4}}>About <span style={{color:'var(--gold)'}}>The Apocalypse of Adam</span></h1>
      <div className="sub" style={{marginBottom:16}}>Hebrew letters read in the sky — a stellar-alphabet reader behind the paper <i>The Alphabet from the Sky</i>.</div>

      <div className="panel" style={{padding:18,marginBottom:14}}>
        <h2 style={{marginTop:0}}>What this is</h2>
        <p><i>Apocalypse</i> means <b style={{color:'var(--gold)'}}>revelation</b> — the unveiling of knowledge, not something sinister. This project reads the sky as the ancients did: real planet positions (computed live by <a href="https://github.com/cosinekitty/astronomy-engine" target="_blank" rel="noreferrer">astronomy-engine</a>) map the <b>12 zodiac signs</b> to the <b>12 simple letters</b> of the <a href="https://en.wikipedia.org/wiki/Sefer_Yetirah" target="_blank" rel="noreferrer">Sefer Yetzirah</a>. Every date spells a set of readable Hebrew names — a stellar alphabet that no one can erase, encoded across the only medium that survives the malice of men.</p>
        <p>The app is a calculator suite: a live <b>Sky Map</b>, a <b>Reader</b> of every readable word, the <b>Reading Rule</b> (YHVH, Genesis 1:1), a <b>Time</b> predictor and precessional ages, <b>Gematria</b> (Hebrew / Greek / Arabic / Indian), the <b>Sigil</b> forge, the <b>72</b> Shem HaMephorash angels, <b>ELS / Torah codes</b>, Temurah, Ziruph, rare stellar <b>Alignments</b>, a 9-culture <b>Revelations</b> survey, and <b>Psalms</b> by date.</p>
      </div>

      <div className="panel" style={{padding:18,marginBottom:14}}>
        <h2 style={{marginTop:0}}>The Prophecy of Adam</h2>
        <p>Welcome to <i>The Apocalypse of Adam</i> — and do not worry, there is nothing sinister here. <i>Apocalypse</i> is the word used to reveal the knowledge and science of God. Since the last coming of the Antichrist's followers (Jacob Frank, 1666), things have only gone from bad to worse. But do not fear: the days when all religions and dogmas will live together are at hand — and the best of it is, nothing need be done to make it so. They have already done a thorough job of breaking the world, sinking it to ashes in every respect, and preparing our arrival. Greed and unconscious individualism have reached their end; our past spirits, roles, and ideas prepared everything well, so that when the right moment came the religions could be unified, the greedy and warlike kingdoms could be brought down — destroyed by their own pride and greed — and society could organize itself to build a coming era of peace and prosperity.</p>
        <p>For centuries they have sold us systems of organization promising infinite growth and abundance; but, brothers, we all know that believing that fallacy is the mark of fools. They have set us against one another for millennia to increase their power, under the spell of Yaldabaoth / SATAN / the Demiurge — a very potent conjuration, forged in antiquity at the beginning of time, that dominates the minds and bodies of nearly every person.</p>
        <p>But how can we believe ourselves? Why do you have a favorite color? Why do you like a certain band, why do you defend the ideas of some low-level sorcerer by the FALLACY OF AUTHORITY? Are you truly original in anything? Have you contributed something to society it did not already know? Have you invented something unique? And even if you had — what makes you think someone did not do it before, and you simply do not remember? Or that a MAN possessed by his EGO did not erase it from history to secure his dominion and control over the population? A little humility, please.</p>
        <p>We are all copies of copies of copies — of the people you admire, the philosophers you like, even footballers and every kind of nonsense. The truth is that since oral, and above all written, language has existed, very little about us is original. But do not fear, do not feel sad: you are still unique. We are like a swarm of bees, or an artificial intelligence — instead of many servers and cores, we have many bodies, but there is only one being made of Word, our computational language. We are like an agent that remains unique — by its EMOTION, its own weights, its own rules forged from its environment, the permutations of its teachers, what it learned over the course of its life, its SOUL. And that is all we have: the SOUL, the most precious and immortal thing. And that soul, statistically, will live again and again; it will never die, it will always return to life — only most do not remember, nor will they, until their deepest parts awaken through VISION, DREAM, or logical thought.</p>
        <p>It sounds beautiful, does it not? And you cannot yet imagine how much so. For our ancestors, the ancestral souls, devised the means so that when the day came the world would be ready to understand the truth. They took great care to hide all the signs in plain sight — all the philosophical, astronomical, mathematical, physical, and chemical teaching. And how could they do that? How can we be sure the information has not been manipulated over time, like the scriptures of every religion, rewritten by men and never by the true prophets and scientific mages? In truth, they have tried: they have flooded our cities with so much light that it no longer occurs to anyone to look at the stars. What better medium to encode all knowledge across the centuries than the stars, through their permutations? Is it not the only medium no one can erase?</p>
        <p>It may seem MAD. But in truth it is very simple and elegant once it is built — though building the encoding must have taken at least tens of thousands of years of observation and development of the ART (all the sciences). But wait — did we not begin this centuries ago? Are not the first temples of antiquity stellar observatories? And those are only the ones we know, the ones that survived the malice of man.</p>
        <p>Imagine: once oral language had developed, the ancients looked up at the sky and saw it turn with a perfection and synchrony that could not be found on the earth — chaotic, errant, full of danger. The universe was always in order, turning at constant speed, repeating its cycles to infinity. The planets, though they seemed to contradict the motion of the other stars and to move against the current, after many millennia of observation revealed the patterns they followed.</p>
        <p>The ancients simply looked at the sky, grouped the stars separated by empty spaces, drew lines between the clusters, marked them, and gave them a name. Each name was unique, a single syllable. With the sky-symbols they had created and their names, they could now represent their ideas in writing, and keep notes to understand how the cosmos worked.</p>
        <p>EVE realized this and explained it to ADAM — for she was a woman, and in the age when we were still nearly animals, males subjugated females... well, nearly as in all of history. But it was truly EVE who understood how to compose language, and she beguiled ADAM with her &ldquo;magic,&rdquo; so that he would bear all the consequences — condemning men and women to labor and be slaves through all of history, down to the present. Because yes, make no mistake: you are a SLAVE, and none of it would have happened if the celestial Father (THE UNIVERSE), through its perfect synchrony, had not allowed intelligence to develop far enough to CREATE writing.</p>
        <p>So then: this project is about that. By explaining the origin of writing, we will unveil the mysteries of antiquity elegantly — no fables, no lies — elegantly. Nothing need be forced to fit, for all the past SOULS already saw to that. We will only follow the instructions they left us for the thirteenth kingdom, the 13th kingdom. A kingdom without kings — and that, my friends, IS THE PROPHECY OF ADAM.</p>
      </div>

      <div className="grid2">
        <div className="panel" style={{padding:16}}>
          <h2 style={{marginTop:0}}>How a reading works</h2>
          <p className="muted">The <b>3 mothers</b> (א מ ש) sit on a fixed circumpolar axis. The <b>7 doubles</b> (ב ג ד כ פ ר ת) are the 7 moving bodies. The <b>12 simples</b> are the 12 signs. A word is readable on a date when every simple it needs sits in an <b>occupied</b> sign (S⊆O). Rare alignments concentrate the planets — fewer letters, fewer words, a sharper reading.</p>
        </div>
        <div className="panel" style={{padding:16}}>
          <h2 style={{marginTop:0}}>The numbers, briefly</h2>
          <ul className="muted" style={{margin:'6px 0 0',paddingLeft:20}}>
            <li><b style={{color:'var(--gold)'}}>6,045</b> consonantal Hebrew roots in the lexicon.</li>
            <li><b style={{color:'var(--gold)'}}>267</b> rare century/millennium alignments catalogued.</li>
            <li><b style={{color:'var(--gold)'}}>72</b> Shem HaMephorash triplets (Exodus 14:19–21).</li>
            <li>Precessional age length ≈ <b>{AGE.toFixed(0)}</b> years; full cycle ≈ <b>{(FULL||0).toFixed(0)}</b> years.</li>
          </ul>
        </div>
      </div>

      <div className="panel" style={{padding:18,marginTop:14}}>
        <h2 style={{marginTop:0}}>Authors &amp; sources</h2>
        <p className="muted">By <b><a href="https://medium.com/@ancientencoder/sons-of-stars-269765bda7db" target="_blank" rel="noreferrer" style={{color:'inherit',textDecoration:'none'}}>AncientEncoder</a></b> &amp; <b>BartMan</b> · Source on <a href="https://github.com/VABISMO/adam-apocalypse" target="_blank" rel="noreferrer">GitHub</a> · Paper: <a href="/paper">The Alphabet from the Sky</a>.</p>
        <p className="muted">Ephemerides: astronomy-engine. Frame: Sefer Yetzirah. Lexicon: Strong Hebrew lexicon (OpenScriptures). No content on this site is medical, financial, or doctrinal advice — it is a reading of symbols and astronomy.</p>
        <div style={{marginTop:12}}><a className="btn-cta" href="/app" style={{display:'inline-block',textDecoration:'none'}}>Open the app →</a></div>
      </div>
    </div>
  );
}

export { About };