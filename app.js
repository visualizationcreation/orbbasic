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

