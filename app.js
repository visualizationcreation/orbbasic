'use strict';
const promptText=document.querySelector('#promptText');
const copyButtons=[document.querySelector('#copyButton'),document.querySelector('#copyBottom')];
const statusEl=document.querySelector('#status');
const manualHint=document.querySelector('#manualHint');
let resetTimer;
function selectedPrompt(){promptText.focus();promptText.select();promptText.setSelectionRange(0,promptText.value.length);}
async function copyPrompt(){
  clearTimeout(resetTimer);
  let copied=false;
  try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(promptText.value);copied=true;}}catch{}
  if(!copied){
    const scrollYBefore=window.scrollY,focusBefore=document.activeElement;
    selectedPrompt();
    try{copied=document.execCommand('copy')===true;}catch{}
    if(copied){focusBefore?.focus({preventScroll:true});window.scrollTo({top:scrollYBefore,behavior:'instant'});}
  }
  if(copied){
    manualHint.hidden=true;
    statusEl.textContent='Copied. Paste it into your chat, then choose a topic.';
    copyButtons.forEach(b=>b.textContent='Copied ✓');
    resetTimer=setTimeout(()=>{copyButtons[0].textContent='Copy the ORB prompt ↗';copyButtons[1].textContent='Copy prompt';},2600);
  }else{
    manualHint.hidden=false;
    statusEl.textContent='Automatic copying was blocked. Use the selected prompt or Download .txt.';
    promptText.scrollIntoView({behavior:'instant',block:'center'});selectedPrompt();
    copyButtons[0].textContent='Copy the ORB prompt ↗';copyButtons[1].textContent='Copy prompt';
  }
}
copyButtons.forEach(b=>{b.hidden=false;b.addEventListener('click',copyPrompt);});

// An illustrative orbit, not an AI-connected map or audio player.
const canvas=document.querySelector('#orb'),ctx=canvas.getContext('2d');
const motionButton=document.querySelector('#motion');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let moving=!reducedMotion.matches,frameId=null,lastTime=null,phase=0;
function drawOrb(){
  if(!ctx)return;
  const W=700,cx=350,cy=350,R=267;
  ctx.clearRect(0,0,W,W);
  const halo=ctx.createRadialGradient(cx,cy,R*.35,cx,cy,R*1.22);halo.addColorStop(0,'#142a21');halo.addColorStop(.7,'#12231c');halo.addColorStop(1,'#0b151500');ctx.fillStyle=halo;ctx.fillRect(0,0,W,W);
  ctx.strokeStyle='#365443';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.stroke();
  for(let ring=-2;ring<=2;ring++){const y=ring*R*.29,rx=Math.sqrt(R*R-y*y);ctx.strokeStyle='#36544360';ctx.beginPath();ctx.ellipse(cx,cy+y,rx,rx*.16,0,0,Math.PI*2);ctx.stroke();}
  const points=[];
  for(let i=0;i<=350;i++){const u=i/350,y=-R+2*R*u,rr=Math.sqrt(Math.max(0,R*R-y*y)),a=u*Math.PI*8+phase;points.push({x:cx+Math.sin(a)*rr,y:cy+y,z:Math.cos(a),i});}
  for(let i=1;i<points.length;i++){let a=points[i-1],b=points[i];ctx.strokeStyle=b.z>0?'#cef59d9a':'#7892733b';ctx.lineWidth=b.z>0?1.7:1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  for(let i=0;i<points.length;i+=7){let p=points[i];ctx.fillStyle=p.z>0?'#cef59d':'#597455';ctx.beginPath();ctx.arc(p.x,p.y,p.z>0?3.1:1.9,0,Math.PI*2);ctx.fill();}
  const p=points[70];ctx.shadowBlur=18;ctx.shadowColor='#cef59d';ctx.fillStyle='#edffcc';ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
}
function tick(t){if(lastTime!==null)phase+=(t-lastTime)*.000065;lastTime=t;drawOrb();if(moving&&!document.hidden)frameId=requestAnimationFrame(tick);else frameId=null;}
function updateMotion(){motionButton.textContent=moving?'Pause motion':'Enable motion';motionButton.setAttribute('aria-pressed',String(moving));if(frameId!==null)cancelAnimationFrame(frameId);frameId=null;lastTime=null;drawOrb();if(moving&&!document.hidden)frameId=requestAnimationFrame(tick);}
if(ctx){motionButton.hidden=false;motionButton.addEventListener('click',()=>{moving=!moving;updateMotion();});reducedMotion.addEventListener('change',()=>{moving=!reducedMotion.matches;updateMotion();});document.addEventListener('visibilitychange',updateMotion);updateMotion();}
