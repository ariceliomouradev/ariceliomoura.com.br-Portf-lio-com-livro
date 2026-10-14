// Destaca o código Java, revela blocos ao rolar, controla o menu hambúrguer,
// mostra o botão flutuante e monta as formas de compra (js/lojas.js).
document.addEventListener("DOMContentLoaded", () => {
  const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const telaPequena = window.matchMedia("(max-width: 880px)");

  // Ano do copyright sempre atual (o 2026 do HTML fica como reserva sem JavaScript)
  document.querySelectorAll("[data-ano]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // 0. Aberto direto da pasta (file://): links de pasta apontam para o index.html
  if (location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach((a) => {
      const h = a.getAttribute("href");
      if (/^(https?:|mailto:|tel:|#)/.test(h)) return;
      const m = h.match(/^([^#?]*\/)([?#].*)?$/);
      if (m) a.setAttribute("href", m[1] + "index.html" + (m[2] || ""));
    });
  }

  // 1. Código Java colorido
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach((bloco) => window.hljs.highlightElement(bloco));
  }

  // 2. Links de compra a partir de js/lojas.js
  if (window.COMPRA && /^https:\/\//.test(window.COMPRA.hotmart || "")) {
    document.querySelectorAll("[data-comprar]").forEach((a) => a.setAttribute("href", window.COMPRA.hotmart));
  }

  const caixaLojas = document.getElementById("lojas");
  if (caixaLojas && Array.isArray(window.LOJAS)) {
    caixaLojas.innerHTML = window.LOJAS.map((loja) => {
      const botao = /^https:\/\//.test(loja.url || "")
        ? `<a class="botao primario" href="${escapar(loja.url)}" rel="noopener" target="_blank">${escapar(loja.rotulo)}</a>`
        : `<span class="em-breve">Em breve</span>`;
      return `<article class="loja reveal"><h3>${escapar(loja.nome)}</h3><p>${escapar(loja.descricao)}</p>${botao}</article>`;
    }).join("");
  }

  // 3. Menu hambúrguer
  const pilula = document.querySelector(".pilula");
  const hamburguer = document.querySelector(".hamburguer");

  function definirMenu(aberto) {
    pilula.classList.toggle("aberta", aberto);
    hamburguer.setAttribute("aria-expanded", String(aberto));
    hamburguer.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  hamburguer.addEventListener("click", () => {
    definirMenu(!pilula.classList.contains("aberta"));
  });

  // Fecha ao tocar em um link, ao apertar Esc ou ao clicar fora do menu
  document.querySelectorAll(".menu-mobile a").forEach((a) => a.addEventListener("click", () => definirMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") definirMenu(false);
  });
  document.addEventListener("click", (e) => {
    if (!pilula.contains(e.target)) definirMenu(false);
  });
  // Ao passar para tela grande, o menu normal volta a valer
  telaPequena.addEventListener("change", () => definirMenu(false));

  // 4. Revelar blocos ao rolar
  const elementos = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || semAnimacao) {
    elementos.forEach((el) => el.classList.add("visivel"));
  } else {
    const revelar = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            revelar.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revelar.observe(el));
  }

  // 6. Marcar no menu a seção que está na tela
  const links = document.querySelectorAll(".links a[href^='#']");
  const secoes = [...links].map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && secoes.length) {
    const espiar = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("ativo", a.getAttribute("href") === `#${entrada.target.id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secoes.forEach((s) => espiar.observe(s));
  }
});

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
