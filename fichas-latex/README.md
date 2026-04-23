# Fichas de sesion

Esta carpeta contiene las fichas A4 en LaTeX para cada sesion del proyecto.

Estructura:

- `almeria-fichas.sty`: estilo comun print-friendly y de lectura facilitada.
- `sesionXX/sesionXX-ficha.tex`: ficha individual de cada sesion.
- `generar_fichas.py`: regenerador de las fichas si se actualiza el contenido.

Sugerencia de compilacion:

1. Entra en la carpeta de la sesion que quieras.
2. Compila `sesionXX-ficha.tex` con `pdflatex`.
3. Guarda el PDF final en la carpeta gemela de `../fichas-pdf/sesionXX/`.
