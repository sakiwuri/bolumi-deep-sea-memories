// V0.9.2 draft audio. No game puzzle state is stored here.
export const AUDIO_SETTINGS_KEY='bubble-isles-audio-v1';
export const SFX_IDS=['ui_click','ui_confirm','ui_cancel','bubble_pop','bubble_reveal','pearl_collect','treasure_open','puzzle_rotate','water_flow','coral_activate','shadow_gate','memory_reveal','achievement_unlock','chapter_complete','final_core_activate'];
// Actions are presentation events only; puzzle outcomes remain owned by game logic.
export function sfxForAction(action){
 if(action==='do-ink')return 'bubble_reveal';
 if(action==='close'||action==='back-win')return 'ui_cancel';
 if(action==='confirm-restart'||action==='next-hint')return 'ui_confirm';
 if(!action.startsWith('do-'))return 'ui_click';
 const a=action.slice(3);
 if(/^(rotate-|node-|mirror-|dial-|pointer-|blade-|valve-|lever-|ring-)/.test(a))return 'puzzle_rotate';
 if(/^(play|read-rule)/.test(a))return 'memory_reveal';
 if(/^(send|launch|flow-check|water-check)/.test(a))return 'water_flow';
 if(/^(pearl-|pearl$|orb$|fragment-)/.test(a))return 'pearl_collect';
 if(/^(shadow-check|gate$)/.test(a))return 'shadow_gate';
 if(/^(activate|light-check)/.test(a))return 'coral_activate';
 return 'ui_click';
}
export class AudioManager{
 constructor(initialSound=true){this.settings={music:initialSound,musicVolume:.22,sfxVolume:.5,external:false};try{const s=JSON.parse(localStorage.getItem(AUDIO_SETTINGS_KEY)||'null');if(s&&typeof s==='object'){if(typeof s.music==='boolean')this.settings.music=s.music;if(typeof s.external==='boolean')this.settings.external=s.external;for(const k of ['musicVolume','sfxVolume'])if(Number.isFinite(s[k]))this.settings[k]=Math.max(0,Math.min(1,s[k]))}}catch{}this.enabled=initialSound;this.context=null;this.current=null;this.retiring=null;this.track=null;this.currentTrack=null;this.unlocked=false;this.hidden=false;this.timer=null}
 save(){try{localStorage.setItem(AUDIO_SETTINGS_KEY,JSON.stringify(this.settings))}catch{}}
 unlock(){this.unlocked=true;if(this.track)this.play(this.track)}
 toggle(){this.settings.music=!this.settings.music;this.save();if(!this.settings.music){clearInterval(this.timer);this.current?.pause();if(this.retiring){this.retiring.pause();this.retiring.removeAttribute('src');this.retiring.load();this.retiring=null}}else if(this.track)this.play(this.track,true)}
 play(number,force=false){if(!Number.isInteger(number)||number<1||number>8)return;const same=this.currentTrack===number;this.track=number;if(!this.unlocked||!this.settings.music||this.hidden)return;if(same&&this.current&&!this.current.paused&&!force)return;clearInterval(this.timer);if(this.retiring){this.retiring.pause();this.retiring.removeAttribute('src');this.retiring.load();this.retiring=null}if(same&&this.current){this.current.volume=this.settings.musicVolume;this.current.play().catch(()=>{});return}const old=this.current;this.retiring=old;const a=new Audio(`./assets/audio/bgm/${String(number).padStart(2,'0')}.ogg`);a.loop=true;a.preload='none';a.volume=0;this.current=a;this.currentTrack=number;a.play().catch(()=>{});let tick=0;this.timer=setInterval(()=>{tick++;const p=Math.min(1,tick/10);a.volume=this.settings.musicVolume*p;if(old)old.volume=this.settings.musicVolume*(1-p);if(p===1){clearInterval(this.timer);if(old){old.pause();old.removeAttribute('src');old.load();this.retiring=null}}},60)}
 visibility(hidden){this.hidden=hidden;if(hidden){clearInterval(this.timer);this.current?.pause();if(this.retiring){this.retiring.pause();this.retiring.removeAttribute('src');this.retiring.load();this.retiring=null}}else if(this.unlocked&&this.settings.music&&this.track)this.play(this.track,true)}
 synthesize(id){if(!this.enabled||this.settings.sfxVolume<=0)return;try{const A=globalThis.AudioContext||globalThis.webkitAudioContext;if(!A)return;const c=this.context||(this.context=new A());if(c.state==='suspended')c.resume().catch(()=>{});const notes=({chapter_complete:[523,659,784,1047],final_core_activate:[392,523,659,784],memory_reveal:[440,554,659],water_flow:[523,784],puzzle_rotate:[392,494]})[id]||[660,880];notes.forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+i*.12;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(Math.max(.00001,.06*this.settings.sfxVolume),t);g.gain.exponentialRampToValueAtTime(.00001,t+.22);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.22);o.onended=()=>{o.disconnect();g.disconnect()}})}catch{}}
 sfx(id){if(!SFX_IDS.includes(id)||!this.enabled||this.settings.sfxVolume<=0)return;if(!this.settings.external){this.synthesize(id);return}const a=new Audio(`./assets/audio/sfx/external/${id}.ogg`);a.volume=this.settings.sfxVolume;let failed=false;const fail=()=>{if(!failed){failed=true;this.synthesize(id)}};a.addEventListener('error',fail,{once:true});a.play().catch(fail)}
}
