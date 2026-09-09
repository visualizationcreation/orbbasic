"""Embed the canonical portable prompt so preview and copy also work without a fetch."""
from pathlib import Path
from html import escape

root=Path(__file__).resolve().parent
prompt=(root/'orb-prompt.txt').read_text(encoding='utf-8').strip()+'\n'
template=(root/'page-template.html').read_text(encoding='utf-8')
assert template.count('{{PROMPT}}')==1
(root/'index.html').write_text(template.replace('{{PROMPT}}',escape(prompt)),encoding='utf-8',newline='\n')
print(f'Built index.html with {len(prompt.split())} prompt words / {len(prompt)} characters')
