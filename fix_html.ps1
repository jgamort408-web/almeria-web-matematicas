# fix_html.ps1
# Uses only ASCII in this file; non-ASCII built via [char] codes
# Fixes: (1) garbled UTF-8 in PDF section, (2) duplicate footer fragment

$base    = Split-Path -Parent $MyInvocation.MyCommand.Path
$enc     = New-Object System.Text.UTF8Encoding($false)   # UTF-8 no BOM

# Char helpers -- PS5 safe (no non-ASCII literals in script)
$oacute  = [char]0x00F3   # o with accent (sesion, presentacion)
$iacute  = [char]0x00ED   # i with accent (guia, almeria)
$eacute  = [char]0x00E9   # e with accent
$aacute  = [char]0x00E1   # a with accent
$mdot    = [char]0x00B7   # middle dot
$mdash   = [char]0x2014   # em dash
$arrdown = [char]0x2B07   # downwards arrow
$chart   = [char]::ConvertFromUtf32(0x1F4CA)  # bar chart emoji

$sessionMap = @(
  @{n=1;b="bloque1"},@{n=2;b="bloque1"},@{n=3;b="bloque1"},@{n=4;b="bloque1"},
  @{n=5;b="bloque2"},@{n=6;b="bloque2"},@{n=7;b="bloque2"},@{n=8;b="bloque2"},
  @{n=9;b="bloque2"},@{n=10;b="bloque2"},
  @{n=11;b="bloque3"},@{n=12;b="bloque3"},@{n=13;b="bloque3"},@{n=14;b="bloque3"},
  @{n=15;b="bloque3"},@{n=16;b="bloque3"},
  @{n=17;b="bloque4"},@{n=18;b="bloque4"},@{n=19;b="bloque4"},@{n=20;b="bloque4"}
)

foreach ($item in $sessionMap) {
    $n  = $item.n
    $b  = $item.b
    $nn = $n.ToString("D2")
    $path = Join-Path $base "$b\sesion$nn.html"

    $bytes   = [System.IO.File]::ReadAllBytes($path)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)

    # ── 1. REMOVE DUPLICATE FOOTER ───────────────────────────────────────
    $btnTopMarker = '<button class="btn-top"'
    $scriptMarker = '    <script src='

    $firstBtnTop = $content.IndexOf($btnTopMarker)
    $scriptIdx   = $content.LastIndexOf($scriptMarker)

    if ($firstBtnTop -ge 0 -and $scriptIdx -ge 0) {
        $closeTag    = '</button>'
        $firstBtnEnd = $content.IndexOf($closeTag, $firstBtnTop)
        if ($firstBtnEnd -ge 0) {
            $firstBtnEnd += $closeTag.Length
            $between = $content.Substring($firstBtnEnd, $scriptIdx - $firstBtnEnd)
            if ($between.Contains('<button class="btn-idioma"')) {
                $content = $content.Substring(0, $firstBtnEnd) + "`n" + $content.Substring($scriptIdx)
                Write-Host "sesion${nn}: footer duplicado eliminado"
            }
        }
    }

    # ── 2. FIX GARBLED CSS COMMENT ───────────────────────────────────────
    $cssCommentStart = '/* SECCI'
    $cssCommentEnd   = '*/'
    $cssIdx = $content.IndexOf($cssCommentStart)
    if ($cssIdx -ge 0) {
        $cssEndIdx = $content.IndexOf($cssCommentEnd, $cssIdx + $cssCommentStart.Length)
        if ($cssEndIdx -ge 0) {
            $cssEndIdx += $cssCommentEnd.Length
            $content = $content.Substring(0, $cssIdx) + '/* SECCION 0 - PRESENTACION BEAMER (PDF) */' + $content.Substring($cssEndIdx)
            Write-Host "sesion${nn}: comentario CSS recodificado"
        }
    }

    # ── 3. REPLACE PDF SECTION WITH CLEAN UTF-8 ──────────────────────────
    # Build text strings from char codes so file stays ASCII
    $presTitle  = "Presentaci${oacute}n de la sesi${oacute}n ${n}"
    $presDesc   = "Gu${iacute}a te${oacute}rica ${mdot} ejemplos resueltos ${mdot} ejercicios multinivel (Bloom)"
    $presTitle2 = "Presentaci${oacute}n sesi${oacute}n ${n} ${mdash} Almer${iacute}a en Cifras y Formas"
    $ariaLabel  = "Presentaci${oacute}n PDF sesi${oacute}n ${n}"
    $dlLabel    = "Descargar presentaci${oacute}n de la sesi${oacute}n ${n} en PDF"
    $sectionStart = "<!-- SECCI"   # partial, works even on garbled files

    $secStart = $content.IndexOf($sectionStart)
    if ($secStart -ge 0) {
        $secEnd = $content.IndexOf('</section>', $secStart)
        if ($secEnd -ge 0) {
            $secEnd += '</section>'.Length
            $newSection = @"

        <!-- SECCION 0 - PRESENTACION DE LA SESION (Beamer PDF) -->
        <section class="seccion-presentacion" aria-labelledby="pres-h2-$nn">
            <div class="pres-cabecera">
                <span class="pres-icono" aria-hidden="true">$chart</span>
                <div class="pres-info">
                    <h2 id="pres-h2-$nn">$presTitle</h2>
                    <p>$presDesc</p>
                </div>
                <a href="../presentaciones-pdf/sesion$nn.pdf"
                   download="sesion$nn-almeria-cifras-formas.pdf"
                   class="btn-descarga-pdf"
                   aria-label="$dlLabel">
                    $arrdown Descargar PDF
                </a>
            </div>
            <div class="pres-visor">
                <iframe
                    src="../presentaciones-pdf/sesion$nn.pdf"
                    title="$presTitle2"
                    class="pres-iframe"
                    loading="lazy"
                    aria-label="$ariaLabel">
                </iframe>
            </div>
        </section>
"@
            $content = $content.Substring(0, $secStart) + $newSection + $content.Substring($secEnd)
            Write-Host "sesion${nn}: seccion PDF recodificada"
        }
    }

    # ── 4. WRITE UTF-8 NO BOM ────────────────────────────────────────────
    [System.IO.File]::WriteAllText($path, $content, $enc)
    Write-Host "sesion${nn}: guardado"
}

Write-Host ""
Write-Host "Terminado."
