import React from 'react';
import {
  Trophy, Award, Zap, Flame, ShieldCheck, CheckCircle2, Star, ArrowUpRight
} from 'lucide-react';

export default function GamificationView({ students, experts }) {
  const ranks = [
    { name: 'Rookie', minXp: '0 XP', desc: 'Commencing first academic inquiry and briefing submission.' },
    { name: 'Knowledge Explorer', minXp: '500 XP', desc: 'Actively mastering foundational problem sets across 2+ faculties.' },
    { name: 'Problem Solver', minXp: '1,000 XP', desc: 'Consistently reviewing complex derivations with assigned specialists.' },
    { name: 'Academic Hero', minXp: '2,500 XP', desc: 'Achieving milestone milestones in technical capstones and research.' },
    { name: 'Master Mentor', minXp: '5,000 XP', desc: 'Highest network honor for scholars sharing advanced academic mastery.' },
  ];

  const studentLeaderboard = [
    { rank: '01', name: 'Isha Raman', university: 'Indian Institute of Science', xp: '1,450 XP', level: 'Problem Solver', streak: '9 Days' },
    { rank: '02', name: 'Nisha Patel', university: 'Apex Medical College', xp: '1,100 XP', level: 'Problem Solver', streak: '6 Days' },
    { rank: '03', name: 'Aarav Menon', university: 'National Tech Institute', xp: '920 XP', level: 'Knowledge Explorer', streak: '5 Days' },
    { rank: '04', name: 'Dev Shah', university: 'School of Global Business', xp: '740 XP', level: 'Knowledge Explorer', streak: '3 Days' },
    { rank: '05', name: 'Karthik Verma', university: 'Metropolitan University', xp: '480 XP', level: 'Rookie', streak: '2 Days' },
  ];

  return (
    <section className="gamification-section" id="gamification-section">
      <div className="section-header-wrap text-center">
        <div className="section-eyebrow">
          <span className="gold-dot" />
          <span>GAMIFIED LEARNING MASTERY & ACHIEVEMENTS</span>
        </div>
        <h2 className="section-title">
          Celebrate Academic <span className="gold-text">Milestones</span>
        </h2>
        <p className="section-subtitle centered-max">
          Engage deeply with your curriculum, build consistent study streaks, and unlock academic ranks as you conquer challenging concepts.
        </p>
      </div>

      {/* Ranks Ladder */}
      <div className="ranks-ladder-grid">
        {ranks.map((r, i) => (
          <div key={r.name} className={`rank-card ${i === 3 ? 'highlight-rank' : ''}`}>
            <span className="rank-level-num">TIER 0{i + 1}</span>
            <div className="rank-badge-icon">
              <Award size={26} className="gold-icon" />
            </div>
            <h4 className="rank-name">{r.name}</h4>
            <span className="rank-xp-req">{r.minXp}</span>
            <p className="rank-desc">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="leaderboard-wrap">
        <div className="leaderboard-header">
          <div>
            <h3>Active Scholar Learning Board</h3>
            <p>Peer momentum celebrating consistent study habits and inquiry completion.</p>
          </div>
          <span className="gold-badge-pill">Weekly Season 4</span>
        </div>

        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Scholar</th>
                <th>Institution</th>
                <th>Academic Rank</th>
                <th>Study Streak</th>
                <th>Learning XP</th>
              </tr>
            </thead>
            <tbody>
              {studentLeaderboard.map((row) => (
                <tr key={row.rank} className={row.name === 'Aarav Menon' ? 'current-user-row' : ''}>
                  <td><span className="leaderboard-rank-pill">{row.rank}</span></td>
                  <td>
                    <b>{row.name}</b>
                    {row.name === 'Aarav Menon' && <span className="you-pill">You</span>}
                  </td>
                  <td>{row.university}</td>
                  <td><span className="level-badge">{row.level}</span></td>
                  <td><span className="streak-badge"><Flame size={13} /> {row.streak}</span></td>
                  <td><b className="gold-text"><Zap size={14} className="gold-icon" /> {row.xp}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
