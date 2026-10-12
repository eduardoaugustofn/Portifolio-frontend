:root{
  --bg:#050b0f;
  --panel:#07131a;
  --text:#dff7ef;
  --muted:#86d1ae;
  --accent:#7af0c6;   /* default accent (verde) */
  --accent-2:#a0f6cb;
  --line:rgba(122,240,198,0.14);
  --danger:#ff6a6a;
}

/* Reset & base */
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:"Courier New", Courier, monospace;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-decoration:none}
a:focus,a:hover{text-decoration:underline}
img{max-width:100%;display:block;border-radius:6px;border:1px solid var(--line)}
.container{width:min(1100px,calc(100% - 24px));margin:0 auto;padding-left:0;padding-right:0}

/* Header (mini command menu) */
.term-header{position:sticky;top:0;z-index:20;background:rgba(5,11,15,0.92);border-bottom:1px solid var(--line);backdrop-filter:blur(6px)}
.term-header-inner{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:56px;padding:8px 0}
.brand{color:var(--accent);font-weight:700;letter-spacing:.04em}
.mini-nav{display:flex;gap:8px;flex-wrap:wrap}
.nav-btn{background:transparent;border:1px solid var(--line);color:var(--text);font:inherit;padding:6px 10px;border-radius:999px;cursor:pointer}
.nav-btn:focus,.nav-btn:hover{background:rgba(122,240,198,0.06);border-color:rgba(122,240,198,0.36);outline:none}

/* Terminal area */
.terminal{padding:20px 0 48px;min-height:calc(100vh - 56px);overflow:auto;-webkit-overflow-scrolling:touch}
.line{margin:4px 0;white-space:pre-wrap;word-break:break-word;font-size:15px}
.dim{color:var(--muted)}
.muted{color:var(--muted)}
.highlight{color:var(--accent);font-weight:700}
.error{color:var(--danger)}
.block{margin:14px 0 18px;padding-left:8px;border-left:2px solid var(--line)}
.card{margin-top:8px;padding:10px 0}
.project-list,.experience-list,.contact-list,.cert-list{list-style:none;padding:0;margin:0}
.project-item,.experience-item{margin:10px 0 14px;padding:10px 0;border-top:1px solid var(--line)}
.project-item:first-child,.experience-item:first-child{border-top:none;padding-top:0}
.project-meta,.period{color:var(--muted);margin-bottom:6px;font-size:0.95em}

/* Command line input */
.cmdline{display:flex;align-items:center;gap:8px;margin-top:10px;padding-top:4px}
.prompt{white-space:nowrap;color:var(--accent);font-weight:700}
.input-wrap{display:flex;align-items:center;flex:1;min-width:0}
#input{flex:1;min-width:0;background:transparent;border:none;color:var(--text);font:inherit;font-size:15px;padding:6px 0;outline:none}
.cursor{display:inline-block;width:10px;height:1.05em;background:var(--accent);animation:blink 1s steps(1) infinite;margin-left:3px;vertical-align:text-bottom}
@keyframes blink{50%{opacity:0}}

/* Appearance panel */
.appear-panel{display:grid;gap:10px;align-items:center;grid-template-columns:1fr;max-width:720px}
.color-row{display:flex;gap:8px;flex-wrap:wrap}
.color-swatch{width:44px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);cursor:pointer;box-shadow:0 6px 14px rgba(0,0,0,0.35)}
.color-swatch:focus{outline:3px solid rgba(255,255,255,0.06)}
.controls{display:flex;gap:8px;flex-wrap:wrap}
.btn{background:transparent;border:1px solid var(--line);color:var(--text);padding:6px 10px;border-radius:8px;cursor:pointer}
.btn.primary{background:var(--accent);color:#041014;font-weight:700;border-color:transparent}
.small{font-size:0.9rem;padding:6px 8px}

/* Footer */
.site-footer{padding:18px 0 36px;border-top:1px solid var(--line);color:var(--muted);text-align:center;font-size:0.95rem;margin-top:18px}

/* Responsive */
@media (max-width:640px){
  .term-header-inner{flex-direction:column;align-items:flex-start;padding:10px 0}
  .nav-btn{flex:1 1 48%;text-align:center}
  .cmdline{align-items:flex-start}
  .prompt{padding-top:4px}
}
