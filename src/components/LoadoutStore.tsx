import React from "react";
import productsData from "../products.json"; // O la ruta donde guardes tu JSON

// ---------- Config ----------
const INSTAGRAM_USERNAME = "tu_usuario_de_instagram"; // sin la @

interface Product {
  id: string;
  slot: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  imageUrl?: string;
  inStock: boolean;
}

const PRODUCTS: Product[] = productsData as Product[];

function formatCOP(value: number): string {
  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

// Instagram no soporta texto prellenado en la URL como WhatsApp.
// Copiamos el mensaje al portapapeles y abrimos el chat directo.
function igLink(): string {
  return `https://ig.me/m/gamerpicks0620`;
}

function copyOrderMessage(productName: string) {
  const text = `¡Hola! Quisiera pedir el producto: ${productName} (Pago Contraentrega)`;
  navigator.clipboard?.writeText(text).catch(() => {
    // Si el navegador bloquea el portapapeles, no pasa nada grave:
    // el usuario simplemente escribirá el mensaje manualmente.
  });
}

// ---------- Subcomponentes ----------

const Nav: React.FC = () => (
  <header className="sticky top-0 z-50 border-b border-purple-900/40 bg-[#0a0712]/80 backdrop-blur-xl">
    <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
      <div className="font-display text-2xl font-black tracking-wider text-white">
        {/* GamerPick */}<span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">GamerPick{/* .co */}</span>
      </div>
      <div className="hidden gap-8 font-body text-sm font-medium text-purple-200/70 sm:flex">
        <a className="transition-colors hover:text-cyan-400" href="#catalogo">
          Catálogo
        </a>
        <a className="transition-colors hover:text-cyan-400" href="#como-funciona">
          Cómo comprar
        </a>
        <a className="transition-colors hover:text-cyan-400" href="#contacto">
          Contacto
        </a>
      </div>
      <a
        href="#catalogo"
        className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/40"
      >
        Ver catálogo
      </a>
    </nav>
  </header>
);

const Hero: React.FC = () => (
  <section className="relative overflow-hidden border-b border-purple-900/30 px-6 py-20 sm:py-28">
    {/* Luces de fondo (Glow effects) */}
    <div className="absolute top-1/4 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/30 blur-[120px]" />
    <div className="absolute top-1/3 right-10 -z-10 h-60 w-60 rounded-full bg-cyan-500/20 blur-[100px]" />

    <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
      <div>
        <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-emerald-400 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Envíos contra entrega en Colombia
        </div>
        <h1 className="font-display text-4xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Equipa tu{" "}
          <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            setup
          </span>{" "}
          al siguiente nivel
        </h1>
        <p className="mt-5 max-w-[46ch] text-base text-purple-200/80 sm:text-lg">
          Accesorios tech & gaming seleccionados. Paga en efectivo al recibir en la puerta de tu casa.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#catalogo"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/40"
          >
            Explorar Productos →
          </a>
          <a
            href={igLink()}
            className="rounded-xl border border-purple-500/30 bg-purple-950/40 px-7 py-4 font-mono text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-purple-900/50"
          >
            Instagram Directo
          </a>
        </div>
      </div>

      {/* Tarjeta de Garantías con efecto Neón */}
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#130d24] to-[#0a0712] p-6 shadow-2xl backdrop-blur-md">
        <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-cyan-400">
          Beneficios de compra
        </h3>
        {[
          ["Pago", "Contra entrega 🚚"],
          ["Tiempos", "24 a 72 horas ⚡"],
          ["Garantía", "100% Asegurada 🛡️"],
          ["Soporte", "Atención personal 💬"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between border-b border-purple-900/40 py-3 font-mono text-sm last:border-b-0"
          >
            <span className="text-purple-300/70">{label}</span>
            <span className="font-semibold text-emerald-400">{value}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-purple-900/40 bg-[#120b24]/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/10">
    {/* Encabezado Card */}
    <div className="flex justify-between border-b border-purple-900/40 px-4 py-3 font-mono text-xs tracking-wider text-purple-300/60">
      <span>{product.slot}</span>
      <span className={product.inStock ? "text-emerald-400 font-semibold" : "text-rose-400"}>
        {product.inStock ? "● Disponible" : "○ Agotado"}
      </span>
    </div>

    {/* Imagen / Placeholder */}
    <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-[#0a0712] font-mono text-xs text-purple-400/50">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl">📦</span>
          <span>[ Foto del Producto ]</span>
        </div>
      )}
    </div>

    {/* Info Producto */}
    <div className="flex flex-1 flex-col justify-between p-5">
      <div>
        <h3 className="font-display text-lg font-bold uppercase text-white transition-colors group-hover:text-cyan-300">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-purple-200/70">{product.description}</p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Precio y Acción */}
      <div className="mt-6 flex items-center justify-between border-t border-purple-900/40 pt-4">
        <div>
          <span className="block font-mono text-[0.65rem] uppercase text-purple-400">
            Precio especial
          </span>
          <span className="font-mono text-xl font-extrabold text-emerald-400">
            {formatCOP(product.price)}
          </span>
        </div>
        <a
          href={igLink()}
          onClick={() => copyOrderMessage(product.name)}
          title="Copiamos tu pedido, pégalo en el chat de Instagram"
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md transition-all hover:scale-105 hover:shadow-emerald-500/30"
        >
          Pedir ahora
        </a>
      </div>
    </div>
  </div>
);

const Catalog: React.FC<{ products: Product[] }> = ({ products }) => (
  <section className="border-b border-purple-900/30 px-6 py-20" id="catalogo">
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Catálogo destacado
          </span>
          <h2 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            Selecciona tu Gear
          </h2>
        </div>
        <p className="max-w-[35ch] text-sm text-purple-200/60">
          Envíos rápidos directos desde bodega con pago contraentrega.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  </section>
);

const STEPS = [
  {
    slot: "PASO 01",
    title: "Elige tu producto",
    description: "Navega y escoge lo que necesitas para tu setup sin pagos por adelantado.",
  },
  {
    slot: "PASO 02",
    title: "Confirma por Instagram",
    description: "Haces clic en 'Pedir' y coordinamos tus datos de envío al instante.",
  },
  {
    slot: "PASO 03",
    title: "Recibe y paga",
    description: "El paquete llega a tu puerta y le pagas directamente a la transportadora.",
  },
];

const HowItWorks: React.FC = () => (
  <section className="border-b border-purple-900/30 px-6 py-20" id="como-funciona">
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-12 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
          Fácil y Seguro
        </span>
        <h2 className="mt-1 font-display text-3xl font-extrabold uppercase text-white sm:text-4xl">
          ¿Cómo realizar tu pedido?
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.slot}
            className="rounded-2xl border border-purple-900/40 bg-[#120b24]/40 p-6 backdrop-blur-md"
          >
            <div className="mb-3 font-mono text-xs font-bold text-cyan-400">
              {step.slot}
            </div>
            <h4 className="mb-2 font-display text-lg font-bold uppercase text-white">
              {step.title}
            </h4>
            <p className="text-sm text-purple-200/70">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TrustStrip: React.FC = () => (
  <section className="border-b border-purple-900/30 px-6 py-12">
    <div className="mx-auto flex max-w-[1100px] flex-wrap justify-around gap-6">
      {[
        "💵 Pago Contra Entrega",
        "📦 Envíos Asegurados",
        "💬 Soporte Personalizado",
        "🇨🇴 Cobertura Nacional",
      ].map((item) => (
        <div
          key={item}
          className="font-mono text-sm font-semibold text-purple-200/80"
        >
          {item}
        </div>
      ))}
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="px-6 py-10" id="contacto">
    <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4">
      <p className="font-mono text-xs text-purple-300/50">
        LOADOUT.CO — Tecnología y Setup con Pago Contraentrega
      </p>
      <a
        href={igLink()}
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 font-mono text-xs font-bold uppercase text-emerald-400 hover:bg-emerald-500/20"
      >
        Atención al cliente ↗
      </a>
    </div>
  </footer>
);

const InstagramFloat: React.FC = () => (
  <a
    href={igLink()}
    className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3.5 font-mono text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/40 transition-all duration-300 hover:scale-110"
  >
    <span>📸 Instagram</span>
  </a>
);

const LoadoutStore: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07040d] font-body text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Nav />
      <Hero />
      <Catalog products={PRODUCTS} />
      <HowItWorks />
      <TrustStrip />
      <Footer />
      <InstagramFloat />
    </div>
  );
};

export default LoadoutStore;
