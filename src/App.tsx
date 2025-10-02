import { useEffect, useMemo, useState } from "react";
import { Search, Phone, Mail, MapPin, ShoppingCart, CheckCircle2, Factory, Building2, MessageCircle } from "lucide-react";
// Swiper carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const BRAND = {
  name: "FOXX Comunicação Visual",
  tagline: "Gráfica & Comunicação Visual em Parauapebas - PA",
  primary: "#ff6a00",
  whatsapp: "+55 94 9264-9072",
  email: "adm@graficafoxx.com.br",
  address: "Parauapebas - PA",
  cnpj: "00.000.000/0000-00",
  instagram: "https://www.instagram.com/grafica_foxx/?__pwa=1#",
  googleMaps: "https://maps.google.com/",
};

const CATEGORIES = [
  { id: "adesivos", name: "Adesivos" },
  { id: "fachadas", name: "Fachadas" },
  { id: "banners", name: "Banners" },
  { id: "cartoes", name: "Cartões" },
  { id: "acm", name: "ACM & Letreiro Caixa" },
  { id: "backlight", name: "Backlight" },
  { id: "plotter", name: "Plotter & Recorte" },
  { id: "cavalete", name: "Cavalete" },
  { id: "outros", name: "Outros" },
] as const;

const PRODUCTS = [
  { id: "adesivo-brilho", title: "Adesivo Vinil (brilho/fosco)", category: "adesivos", basePrice: undefined as number | undefined, unit: "m²", desc: "Impressão solvente/eco-solvente, alta durabilidade. Opções de laminação." },
  { id: "fachada-standard", title: "Fachada Standard", category: "fachadas", basePrice: undefined as number | undefined, unit: "m²", desc: "Projeto, impressão e instalação. Opção em ACM e iluminação." },
  { id: "banner-440g", title: "Banner Lona 440g", category: "banners", basePrice: undefined as number | undefined, unit: "m²", desc: "Acabamento com ilhós. Ideal para promoções e eventos." },
  { id: "cartao-4x4", title: "Cartão de Visita 4x4", category: "cartoes", basePrice: undefined as number | undefined, unit: "milheiro", desc: "Couchê 250g, verniz total frente. Outras opções sob medida." },
  { id: "acm-letr", title: "Letreiro Caixa em ACM", category: "acm", basePrice: undefined as number | undefined, unit: "m²", desc: "ACM premium com letra caixa PVC/Acrílico. Instalação técnica." },
  { id: "backlight-led", title: "Backlight LED", category: "backlight", basePrice: undefined as number | undefined, unit: "m²", desc: "Iluminação homogênea, ideal para vitrines e totens." },
  { id: "plotter-recorte", title: "Plotter Recorte", category: "plotter", basePrice: undefined as number | undefined, unit: "m²", desc: "Vinil de recorte para sinalização e frota. Cores sólidas." },
  { id: "arte-criativa", title: "Criação de Arte", category: "outros", basePrice: undefined as number | undefined, unit: "hora", desc: "Direção de arte e diagramação profissional." },
  { id: "cavalete-simples", title: "Cavalete Simples", category: "cavalete", basePrice: undefined as number | undefined, unit: "unidade", desc: "Cavalete personalizado para sinalização e divulgação. Estrutura resistente, impressão de alta qualidade." },
] as const;

const CLIENTES = [
  {
    name: "TOP SERVICE",
    logo: "logos/topservice.svg",
    fotos: [
      "clientes/top-service/foto1.jpg",
      "clientes/top-service/foto2.jpg",
      "clientes/top-service/foto3.jpg",
      "clientes/top-service/foto4.jpg",
    ],
  },
  {
    name: "IN HAUS",
    logo: "logos/inhaus.svg",
    fotos: [
      "clientes/in-haus/foto1.jpg",
      "clientes/in-haus/foto2.jpg",
      "clientes/in-haus/foto3.jpg",
      "clientes/in-haus/foto4.jpg",
    ],
  },
  {
    name: "OMEGA SERVICE",
    logo: "logos/omega.svg",
    fotos: [
      "clientes/omega-service/foto1.jpg",
      "clientes/omega-service/foto2.jpg",
      "clientes/omega-service/foto3.jpg",
      "clientes/omega-service/foto4.jpg",
    ],
  },
  {
    name: "NDT ENGENHARIA",
    logo: "logos/ndt.svg",
    fotos: [
      "clientes/ndt/foto1.jpg",
      "clientes/ndt/foto2.jpg",
      "clientes/ndt/foto3.jpg",
      "clientes/ndt/foto4.jpg",
    ],
  },
  {
    name: "CLAM",
    logo: "logos/clam.svg",
    fotos: [
      "clientes/clam/foto1.jpg",
      "clientes/clam/foto2.jpg",
      "clientes/clam/foto3.jpg",
      "clientes/clam/foto4.jpg",
    ],
  },
  {
    name: "HC AMBIENTAL",
    logo: "logos/hcambiental.svg",
    fotos: [
      "clientes/hc-ambiental/foto1.jpg",
      "clientes/hc-ambiental/foto2.jpg",
      "clientes/hc-ambiental/foto3.jpg",
      "clientes/hc-ambiental/foto4.jpg",
    ],
  },
  {
    name: "FRED LOCAÇÕES",
    logo: "logos/fred.svg",
    fotos: [
      "clientes/fred-locacoes/foto1.jpg",
      "clientes/fred-locacoes/foto2.jpg",
      "clientes/fred-locacoes/foto3.jpg",
      "clientes/fred-locacoes/foto4.jpg",
    ],
  },
  {
    name: "CASE CONSTRUÇÕES",
    logo: "logos/case.svg",
    fotos: [
      "clientes/case-construcoes/foto1.jpg",
      "clientes/case-construcoes/foto2.jpg",
      "clientes/case-construcoes/foto3.jpg",
      "clientes/case-construcoes/foto4.jpg",
    ],
  },
  {
    name: "KAEFER",
    logo: "logos/kaefer.svg",
    fotos: [
      "clientes/kaefer/foto1.jpg",
      "clientes/kaefer/foto2.jpg",
      "clientes/kaefer/foto3.jpg",
      "clientes/kaefer/foto4.jpg",
    ],
  },
] as const;

function waLink(text: string) {
  const phone = BRAND.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function Section({ id, title, children, subtitle }: { id?: string; title: string; children: React.ReactNode; subtitle?: string }) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
      <h2 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND.primary }}>{title}</h2>
      {subtitle && <p className="text-sm md:text-base text-gray-500 mt-2">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm"
      style={{ borderColor: BRAND.primary, color: BRAND.primary }}>
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-2xl shadow-md p-5 md:p-6 bg-white/80 backdrop-blur border border-gray-100">
      {children}
    </div>
  );
}

// Retorna a lista de URLs possíveis para a imagem do produto (ordem de preferência)
function getProductImage(p: typeof PRODUCTS[number]) {
  const base = import.meta.env.BASE_URL || '/';
  const root = `${base}img/catalogo/${p.category}/${p.id}`;
  return [`${root}.webp`, `${root}.jpg`, `${root}.png`];
}

function DevTests() {
  type Test = { name: string; pass: boolean; details?: string };
  const tests: Test[] = [];
  const wa = waLink("PING");
  tests.push({ name: "waLink formata número e texto", pass: wa.includes("/559492649072?") && wa.includes("text=PING"), details: wa });
  const t2 = PRODUCTS.filter(p => p.title.toLowerCase().includes("acm") || p.desc.toLowerCase().includes("acm"));
  tests.push({ name: "Filtro exemplo (acm)", pass: t2.length >= 1, details: `${t2.length} itens` });
  tests.push({ name: "Ofertas (>=1)", pass: PRODUCTS.length >= 1, details: `${PRODUCTS.length} produtos` });
  return (
    <details className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      <summary className="cursor-pointer text-sm text-gray-500">Testes rápidos (remova em produção)</summary>
      <ul className="mt-3 space-y-2 text-sm">
        {tests.map((t, i) => (
          <li key={i} className={`p-2 rounded border ${t.pass ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
            <strong>{t.pass ? "✓" : "×"} {t.name}</strong>
            {t.details && <span className="ml-2 text-gray-600">— {t.details}</span>}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function SiteGraficaParauapebas() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => (!cat || p.category === cat) && (
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.desc.toLowerCase().includes(q.toLowerCase())
    ));
  }, [q, cat]);

  useEffect(() => {
    document.title = `${BRAND.name} — Parauapebas/PA`;
    function onKey(e: KeyboardEvent) {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex(i => Math.min(i + 1, lightboxImages.length - 1));
      if (e.key === 'ArrowLeft') setLightboxIndex(i => Math.max(i - 1, 0));
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BRAND.name,
      address: { "@type": "PostalAddress", addressLocality: "Parauapebas", addressRegion: "PA", addressCountry: "BR" },
      areaServed: "Parauapebas e região",
      email: BRAND.email,
      telephone: BRAND.whatsapp,
      url: "https://seusite.com.br",
      makesOffer: PRODUCTS.map(p => ({ "@type": "Offer", name: p.title, price: p.basePrice, priceCurrency: "BRL" })),
    });
    document.head.appendChild(script);
    window.addEventListener('keydown', onKey);
    return () => { document.head.removeChild(script); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-white to-orange-50 text-gray-900">
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="FOXX" className="h-9 w-auto" />
            <div>
              <p className="font-extrabold leading-tight">FOXX Comunicação Visual</p>
              <p className="text-[11px] text-gray-500">Parauapebas • PA</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {[
              ["Catálogo","#catalogo"],
              ["Serviços","#servicos"],
              ["Clientes","#clientes"],
              ["Contato","#contato"],
            ].map(([label,href]) => (
              <a key={href} href={href} className="relative group">
                <span className="group-hover:text-gray-900">{label}</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--brand)] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a href={waLink("Olá! Quero um orçamento.")} className="btn btn-primary rounded-2xl">
              <MessageCircle size={18}/> WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm" style={{ borderColor: BRAND.primary, color: BRAND.primary }}>Atendimento em Parauapebas - PA</span>
            <h1 className="title-hero mt-4">
              Comunicação Visual que <span style={{ color: BRAND.primary }}>vende</span> e fortalece sua marca
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg">
              Projetos, impressão, recorte, instalação e acabamento com padrão técnico para empresas exigentes de Parauapebas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#catalogo" className="btn btn-ghost">Ver Catálogo</a>
              <a href={waLink("Olá! Quero um orçamento para minha empresa em Parauapebas.")} className="btn btn-primary">Pedir Orçamento</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} style={{ color: BRAND.primary }} /> Qualificados para atender empresas locais</span>
              <span className="inline-flex items-center gap-2"><Factory size={16} style={{ color: BRAND.primary }} /> Instalação técnica e segura</span>
            </div>
          </div>
          <div>
            <div>
              <div className="aspect-video ring-gradient overflow-hidden relative">
                <div className="w-full h-full animate-[slide_20s_linear_infinite] flex">
                  {/* Slide 1 */}
                  <div className="relative w-full flex-shrink-0">
                    <img src={`${import.meta.env.BASE_URL}banner1.png`} alt="banner1" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-4 text-lg font-semibold">
                      Qualificados para atender empresas locais
                    </div>
                  </div>
                  {/* Slide 2 */}
                  <div className="relative w-full flex-shrink-0">
                    <img src={`${import.meta.env.BASE_URL}banner2.png`} alt="banner2" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-4 text-lg font-semibold">
                      Impressão digital de alta qualidade
                    </div>
                  </div>
                  {/* Slide 3 */}
                  <div className="relative w-full flex-shrink-0">
                    <img src={`${import.meta.env.BASE_URL}banner3.png`} alt="banner3" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white p-4 text-lg font-semibold">
                      Comunicação visual que fortalece sua marca
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Dica: use imagens 1600×900 em <code>public/banner*.png</code>.</p>
            </div>
          </div>
        </div>
      </section>

      <Section id="catalogo" title="Catálogo" subtitle="Navegue pelos itens e envie seu pedido de orçamento pelo WhatsApp.">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full hidebar" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* esconder scrollbar no WebKit */}
            <style>{`.hidebar::-webkit-scrollbar{display:none}`}</style>
            <button onClick={() => setCat(null)} className={`chip ${cat===null ? "chip-active" : ""}`}>Todos</button>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`chip ${cat===c.id ? "chip-active" : ""}`}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <Card key={p.id}>
              <div className="min-w-0">
                <div className="w-full aspect-video rounded-2xl overflow-hidden border bg-white">
                  <div className="relative overflow-hidden w-full h-full">
                    <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="w-full h-full">
                  {getProductImage(p).map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={src}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          onClick={() => { setLightboxImages(getProductImage(p)); setLightboxIndex(idx); setLightboxOpen(true); }}
                        alt={`${p.title} ${idx + 1}`}
                        className="w-full h-full object-cover block"
                        loading="lazy"
                        decoding="async"
                      />
                    </SwiperSlide>
                  ))}
                    </Swiper>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-lg leading-snug">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
                <span className="text-[12px] bg-orange-100 text-orange-700 px-2 py-1 rounded-xl h-fit">
                  {p.unit}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-extrabold">
                  {typeof p.basePrice === 'number' ? `R$ ${p.basePrice.toLocaleString("pt-BR")}` : 'Valor a combinar'}
                </span>
                <a
                  href={waLink(`Olá! Quero orçamento de ${p.title}. Quantidade/medidas: ____. Prazo: ____.`)}
                  className="btn btn-primary"
                >
                  <ShoppingCart size={18}/> Orçar
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="servicos" title="Serviços" subtitle="Do briefing ao pós-instalação, com controle de qualidade e prazos.">
        <div className="grid md:grid-cols-3 gap-5">
          {["Atendimento & Briefing","Criação & Prova","Produção & Acabamento","Instalação Técnica","Entrega & Pós-venda","Suporte a Contratos"].map((s, i) => (
            <Card key={i}><h3 className="font-semibold">{s}</h3><p className="text-sm text-gray-600 mt-2">Processos claros e checklist por etapa. Registro fotográfico e garantia técnica.</p></Card>
          ))}
        </div>
      </Section>

      <Section id="clientes" title="Empresas que atendemos" subtitle="Qualificação para atender empresas de Parauapebas e região.">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CLIENTES.map((c, i) => {
            const fotos = c.fotos.map(f => `${import.meta.env.BASE_URL}${f}`);
            return (
        <div key={i} className="w-full min-w-0 rounded-2xl border p-4 bg-white shadow hover:shadow-lg transition">
          {/* Logo */}
          <img src={`${import.meta.env.BASE_URL}${c.logo}`} alt={c.name} className="h-16 mx-auto object-contain block" />
          <p className="mt-3 font-medium text-center text-sm text-gray-700 truncate">{c.name}</p>

          {/* Carrossel de fotos */}
          <div className="mt-3 rounded-xl overflow-hidden h-36 md:h-40 min-w-0">
                  <div className="relative overflow-hidden w-full h-full">
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 2600 + i * 600, disableOnInteraction: false, pauseOnMouseEnter: true }}
                      loop={true}
                      className="w-full h-full"
                    >
                    {fotos.map((src, j) => (
                      <SwiperSlide key={j}>
                        <img
                          src={src}
                          alt={`${c.name} serviço ${j + 1}`}
                          className="object-cover w-full h-full block"
                          onClick={() => { setLightboxImages(fotos); setLightboxIndex(j); setLightboxOpen(true); }}
                          loading="lazy"
                        />
                      </SwiperSlide>
                    ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="sobre" title="Sobre nós" subtitle="Comunicação visual orientada a resultado.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold">Parauapebas - PA</h3>
            <p className="text-sm text-gray-600 mt-2">Atendimento local, visitas técnicas e instalação com equipe própria. Emitimos NF-e. Contratos para empresas e prazos combinados.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>Visita técnica</Pill>
              <Pill>NF-e</Pill>
              <Pill>Prazo acordado</Pill>
              <Pill>Garantia técnica</Pill>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold">Diferenciais</h3>
            <ul className="list-disc pl-6 mt-2 text-sm text-gray-600">
              <li>Orçamento rápido via WhatsApp com modelo padrão.</li>
              <li>Projeto e arte inclusos conforme escopo.</li>
              <li>Materiais premium e acabamento preciso.</li>
              <li>Instalação segura com EPIs e checklist.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="contato" title="Contato">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-3">
              <Phone size={18} style={{ color: BRAND.primary }} />
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <a className="font-semibold" href={waLink("Olá! Quero informações, por favor.")}>{BRAND.whatsapp}</a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Mail size={18} style={{ color: BRAND.primary }} />
              <div>
                <p className="text-sm text-gray-500">E-mail</p>
                <a className="font-semibold" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <MapPin size={18} style={{ color: BRAND.primary }} />
              <div>
                <p className="text-sm text-gray-500">Endereço</p>
                {BRAND.googleMaps ? (
                  <a className="font-semibold" href={BRAND.googleMaps} target="_blank" rel="noreferrer">{BRAND.address}</a>
                ) : (
                  <p className="font-semibold">{BRAND.address}</p>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold">Peça um orçamento</h3>
            <p className="text-sm text-gray-600 mt-2">Envie as medidas, material e prazo desejado. Responderemos rapidamente.</p>
            <a
              href={waLink("Olá! Quero um orçamento. Produto: ____. Medidas: ____. Instalação: sim/não. Prazo: ____.")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-3 rounded-xl text-white"
              style={{ background: BRAND.primary }}
            >
              <MessageCircle size={18} /> WhatsApp agora
            </a>
          </Card>

          <Card>
            <h3 className="font-semibold">Arquivos & Especificações</h3>
            <p className="text-sm text-gray-600 mt-2">Aceitamos PDF/X, CDR, AI, SVG, PNG em alta. Sangria 3–5 mm, fontes convertidas e perfil CMYK.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>PDF/X</Pill>
              <Pill>CMYK</Pill>
              <Pill>Fonte convertida</Pill>
            </div>
          </Card>
        </div>
      </Section>



      <footer className="bg-gradient-to-b from-gray-100 to-orange-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10">
          {/* Coluna 1: dados da empresa */}
          <div className="flex flex-col gap-3 justify-center">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#ff6a00"/><text x="50%" y="60%" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" dy=".3em">F</text></svg>
              FOXX Comunicação Visual
            </h3>
            <p className="text-base text-gray-700">Gráfica & Comunicação Visual em Parauapebas - PA</p>
            <div className="flex flex-col gap-1 mt-2 text-sm">
              <span className="flex items-center gap-2">
                <span className="inline-flex w-5 h-5 items-center justify-center text-orange-600">📍</span>
                Estr. VS 10, 27 – Caetanópolis, Parauapebas - PA, 68515-000
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-flex w-5 h-5 items-center justify-center text-orange-600">📞</span>
                <a href="tel:+5594992649072" className="text-orange-600 hover:underline font-medium">(94) 99264-9072</a>
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-flex w-5 h-5 items-center justify-center text-orange-600">📧</span>
                <a href="mailto:adm@graficafoxx.com.br" className="text-orange-600 hover:underline font-medium">adm@graficafoxx.com.br</a>
              </span>
            </div>
          </div>

          {/* Coluna 2: mapa embed */}
          <div className="ring-gradient overflow-hidden bg-white">
            <h4 className="text-sm font-semibold mb-2 px-4 pt-4">Onde estamos</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.933236113674!2d-49.8968659!3d-6.0953925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92dd5bf7998b1e11%3A0x4486cb9531161561!2sGR%C3%81FICA%20FOXX!5e0!3m2!1spt-BR!2sbr!4v1696000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-b-2xl"
            ></iframe>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 py-4 border-t bg-white/60">
          © {new Date().getFullYear()} <span className="font-semibold text-gray-700">FOXX Comunicação Visual</span> — Todos os direitos reservados.
        </div>
      </footer>

      <a
        href={waLink("Olá! Vim pelo site e quero falar com o atendimento.")}
        className="fixed bottom-5 right-5 shadow-lg rounded-full p-3 md:p-4 text-white"
        style={{ background: BRAND.primary }}
        aria-label="WhatsApp"
      >
        <MessageCircle />
      </a>

      {/* Lightbox modal (top-level) */}
      {lightboxOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={() => setLightboxOpen(false)}>
          <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }} aria-label="Fechar">✕</button>
          <div className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.max(i - 1, 0)); }} aria-hidden>‹</div>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImages[lightboxIndex]} className="lightbox-image" alt={`Imagem ${lightboxIndex + 1}`} />
          </div>
          <div className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.min(i + 1, lightboxImages.length - 1)); }} aria-hidden>›</div>
        </div>
      )}

    </div>
  );
}
