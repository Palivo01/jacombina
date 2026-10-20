"""Após editar HTML/CSS/JS, execute python3 preparar-publicacao.py antes de publicar."""
from pathlib import Path
import hashlib
import re
root = Path(__file__).resolve().parent
html = (root / 'index.html').read_text(encoding='utf-8')
for folder, stem, extension in [('css', 'style', 'css'), ('js', 'config', 'js'), ('js', 'script', 'js')]:
    source = root / 'assets' / folder / f'{stem}.{extension}'
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    target = source.with_name(f'{stem}.{digest}.{extension}')
    # Remove somente cópias versionadas geradas por este script.
    for previous in source.parent.glob(f'{stem}.*.{extension}'):
        if previous != target and re.fullmatch(rf'{stem}\.[0-9a-f]{{12}}\.{extension}', previous.name):
            previous.unlink()
    target.write_bytes(source.read_bytes())
    pattern = rf'assets/{folder}/{stem}(?:\.[0-9a-f]{{12}})?\.{extension}(?:\?v=[^"\s]+)?'
    html, count = re.subn(pattern, f'assets/{folder}/{target.name}', html)
    if count != 1:
        raise RuntimeError(f'Esperada uma referência a {source.name}, encontradas {count}')
(root / 'index.html').write_text(html, encoding='utf-8')
print('Arquivos de publicação gerados com nomes exclusivos por conteúdo.')
