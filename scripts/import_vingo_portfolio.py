#!/usr/bin/env python3
"""One-time VINGO portfolio importer. Publishes only when all source assets are verified."""
from __future__ import annotations
import html, pathlib, re, sys, urllib.parse, urllib.request, time
from concurrent.futures import ThreadPoolExecutor, as_completed
ROOT=pathlib.Path(__file__).resolve().parents[1]
SLUGS="""bastos-global
blog-do-jaime
brasil-encanadores
casa-prates
ceo-clinica
clinica-gastrica
clinica-von-hertwig
cmp-prev
ecoplus
escola-de-seo
idugel
imobiliaria-mapa
interparce
jfc-imobiliaria
mister-pragas
mk-higienizacao
moderna-odontologia
molas-obenaus
mordent
myrtha-machain
nostra-casa
dentista-porto-alegre
odontologia-premier
ozcon
plastibrasil
qualityfisio
santa-rita
squadra
tectalmaq
telub
thermotemp
tv-galega
viplan
virtus-ultra
walter-fundicao
wise""".splitlines()
NAMES={"cmp-prev":"CMP Prev","ceo-clinica":"CEO Clínica","escola-de-seo":"Escola de SEO","jfc-imobiliaria":"JFC Imobiliária","mk-higienizacao":"MK Higienização","tv-galega":"TV Galega","qualityfisio":"QualityFisio","idugel":"Idugel","ozcon":"Ozcon","plastibrasil":"Plastibrasil","myrtha-machain":"Myrtha Machain","clinica-gastrica":"Clínica Gástrica","imobiliaria-mapa":"Imobiliária Mapa","clinica-von-hertwig":"Clínica Von Hertwig","odontologia-premier":"Odontologia Premier","molas-obenaus":"Molas Obenaus","santa-rita":"Santa Rita","brasil-encanadores":"Brasil Encanadores","mister-pragas":"Mister Pragas","moderna-odontologia":"Moderna Odontologia","walter-fundicao":"Walter Fundição","dentista-porto-alegre":"Odontologia em Porto Alegre","viplan":"Viplan"}
SOURCES=[
"https://valedaweb.inf.br/valedaweb/2026/3/portfolio.html",
"https://www.valedaweb.com.br/portfolio-sites-profissionais/",
"https://www.valedaweb.com.br/criacao-de-site-profissional/",
"https://www.valedaweb.com.br/equipe/",
"https://www.valedaweb.com.br/"
]
def get(url):
 req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/123 Safari/537.36","Accept":"text/html,image/avif,image/webp,image/*,*/*","Referer":"https://www.valedaweb.com.br/"})
 with urllib.request.urlopen(req,timeout=7) as response:return response.read()
found=[]
for page in SOURCES:
 try:
  source=get(page).decode("utf-8","replace")
  source=html.unescape(source).replace("\\/","/")
  found.append((page,source))
  print("SOURCE OK",page,"bytes",len(source),flush=True)
 except Exception as e: print("SOURCE FAILED",page,str(e)[:130],flush=True)
if not found:sys.exit("No website source reachable; did not modify site.")
# Extract image candidates from real HTML attributes, srcset, background CSS and paths.
candidates={}
for page,markup in found:
 raw=re.findall(r'''(?:https?:)?//[^\s"'<>\\)]+|(?:\.\./|/)?[\w./%+=?&\-]+?\.(?:webp|png|jpe?g)(?:\?[^\s"'<>\\)]*)?''',markup,re.I)
 for link in raw:
  if not re.search(r'\.(?:webp|png|jpe?g)(?:\?|$)',link,re.I):continue
  link=link.strip().rstrip(",;")
  if link.startswith("//"):link="https:"+link
  full=urllib.parse.urljoin(page,link)
  filename=urllib.parse.unquote(urllib.parse.urlsplit(full).path.rsplit("/",1)[-1]).lower()
  for slug in SLUGS:
   key=slug.replace("-","")
   if slug in filename or key in filename.replace("-",""):
    candidates.setdefault(slug,[]).append(full)
print("MATCHED PAGE URLS",sum(bool(candidates.get(s)) for s in SLUGS),"of",len(SLUGS),flush=True)
# Preserve original format: exact image from the website, no upscaling/recompression.
def download(slug):
 urls=list(dict.fromkeys(candidates.get(slug,[])))
 # Only try actual URLs found in the source pages; never brute-force paths.
 if not urls:return slug,None,None,None
 for url in dict.fromkeys(urls):
  try:
   data=get(url)
   if data[:4]==b"RIFF" and data[8:12]==b"WEBP":return slug,url,data,"webp"
   if data[:8]==b"\x89PNG\r\n\x1a\n":return slug,url,data,"png"
   if data[:3]==b"\xff\xd8\xff":return slug,url,data,"jpg"
  except Exception:pass
 return slug,None,None,None
results={}
with ThreadPoolExecutor(max_workers=10) as pool:
 for fut in as_completed([pool.submit(download,slug) for slug in SLUGS]):
  slug,url,data,ext=fut.result()
  if data:results[slug]=(url,data,ext);print("FOUND",slug,len(data),url,flush=True)
  else:print("MISSING",slug,flush=True)
if len(results)!=len(SLUGS):
 missing=[s for s in SLUGS if s not in results]
 sys.exit("Incomplete: "+str(len(results))+"/36. No changes made. Missing "+", ".join(missing))
assets=ROOT/"assets/img/portfolio"
assets.mkdir(parents=True,exist_ok=True)
for slug,(url,data,ext) in results.items():(assets/f"{slug}.{ext}").write_bytes(data)
for language in ("pt","en"):
 path=ROOT/("pt/portfolio/index.html" if language=="pt" else "en/portfolio/index.html")
 old=path.read_text(encoding="utf-8")
 cards=[]
 for slug in sorted(SLUGS,key=lambda x:NAMES.get(x,x).casefold()):
  title=NAMES.get(slug,slug.replace("-"," ").title())
  desc=("Layout digital para "+title+", com uma apresentação visual clara e personalizada." if language=="pt" else "Digital layout for "+title+", designed for clear and distinctive brand presentation.")
  ext=results[slug][2];url="../../assets/img/portfolio/"+slug+"."+ext
  cards.append('<article class="vp-real-card"><a class="vp-real-picture" href="'+url+'" target="_blank" rel="noopener noreferrer" aria-label="'+title+'"><img src="'+url+'" alt="Layout '+title+'" loading="lazy" decoding="async" width="370" height="278"></a><div class="vp-real-copy"><h3>'+html.escape(title)+'</h3><p>'+html.escape(desc)+'</p></div></article>')
 replacement='<section class="vp-gallery-section"><div class="shell"><div class="vp-real-grid">'+ "".join(cards) +'</div></div></section>'
 updated,n=re.subn(r'<section class="vp-gallery-section">[\s\S]*?</section>',lambda _:replacement,old,count=1)
 if n!=1:sys.exit("Cannot locate portfolio section in "+str(path))
 path.write_text(updated,encoding="utf-8")
cssfile=ROOT/"assets/css/site.css"
css=cssfile.read_text(encoding="utf-8")
marker="/* VINGO verified real portfolio 36 */"
if marker not in css:
 css+="\n"+marker+"""
.vp-real-grid{display:grid;grid-template-columns:repeat(3,minmax(0,370px));gap:23px 18px;align-items:start;justify-content:center}
.vp-real-card{min-width:0;background:#fff;border:1px solid #dbe5f0;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(12,34,58,.055)}
.vp-real-picture{display:block;max-width:370px;width:100%;margin:0 auto;background:#eef3f9;overflow:hidden}
.vp-real-picture img{display:block;width:100%;max-width:370px;height:auto;object-fit:contain}
.vp-real-copy{padding:19px 19px 24px}
.vp-real-copy h3{font:800 20px/1.3 Manrope,Arial,sans-serif;letter-spacing:-.035em;color:#102d4d;margin:0 0 9px}
.vp-real-copy p{font:400 15px/1.7 'DM Sans',Arial,sans-serif;color:#5f748a;margin:0}
@media(max-width:850px){.vp-real-grid{grid-template-columns:repeat(2,minmax(0,370px))}}
@media(max-width:560px){.vp-real-grid{grid-template-columns:minmax(0,370px)}}
"""
 cssfile.write_text(css,encoding="utf-8")
print("READY TO COMMIT: 36 images and both localized pages",flush=True)
