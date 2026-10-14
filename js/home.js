// Página inicial: links do WhatsApp com mensagem pronta, menu hambúrguer,
// marcação da seção atual no menu e animação de entrada.
(function () {
  "use strict";

  // Único lugar para trocar o número do WhatsApp (país + DDD + número, só dígitos).
  var WHATSAPP = "5585986920243";

  document.addEventListener("DOMContentLoaded", function () {
    var semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var telaPequena = window.matchMedia("(max-width: 940px)");

    // Ano do copyright sempre atual (o 2026 do HTML fica como reserva sem JavaScript)
    document.querySelectorAll("[data-ano]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    // 0. Aberto direto da pasta (file://): links de pasta apontam para o index.html
    if (location.protocol === "file:") {
      document.querySelectorAll("a[href]").forEach(function (a) {
        var h = a.getAttribute("href");
        if (/^(https?:|mailto:|tel:|#)/.test(h)) return;
        var m = h.match(/^([^#?]*\/)([?#].*)?$/);
        if (m) a.setAttribute("href", m[1] + "index.html" + (m[2] || ""));
      });
    }

    // 1. Links do WhatsApp: monta o endereço com a mensagem de cada botão
    document.querySelectorAll("[data-zap]").forEach(function (a) {
      var texto = "Olá, Aricelio! " + a.getAttribute("data-zap");
      a.setAttribute("href", "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });

    // 2. Menu hambúrguer
    var pilula = document.querySelector(".pilula");
    var hamburguer = document.querySelector(".hamburguer");

    function definirMenu(aberto) {
      pilula.classList.toggle("aberta", aberto);
      hamburguer.setAttribute("aria-expanded", String(aberto));
      hamburguer.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }

    hamburguer.addEventListener("click", function () {
      definirMenu(!pilula.classList.contains("aberta"));
    });
    document.querySelectorAll(".menu-mobile a").forEach(function (a) {
      a.addEventListener("click", function () { definirMenu(false); });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") definirMenu(false); });
    document.addEventListener("click", function (e) { if (!pilula.contains(e.target)) definirMenu(false); });
    telaPequena.addEventListener("change", function () { definirMenu(false); });

    // 3. Animação de entrada
    var elementos = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || semAnimacao) {
      elementos.forEach(function (el) { el.classList.add("visivel"); });
    } else {
      var revelar = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            revelar.unobserve(entrada.target);
          }
        });
      }, { threshold: 0.1 });
      elementos.forEach(function (el) { revelar.observe(el); });
    }

    // 4. Menu: marca a seção que está na tela
    var links = document.querySelectorAll(".links a[href^='#']");
    var secoes = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
    if ("IntersectionObserver" in window && secoes.length) {
      var espiar = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle("ativo", a.getAttribute("href") === "#" + entrada.target.id); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      secoes.forEach(function (s) { espiar.observe(s); });
    }
  });
})();
