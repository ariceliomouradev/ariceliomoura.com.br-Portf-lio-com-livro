// Configuração de compra do livro. É o único arquivo que você precisa editar para mudar os links.
//
// hotmart   : link do checkout (já preenchido). Atualiza todos os botões "Garantir exemplar".
// whatsapp  : seu número com país e DDD, só dígitos. Exemplo: 5511999999999
// instagram : seu usuário, sem o @. Exemplo: ariceliomoura
//
// Enquanto whatsapp ou instagram estiverem vazios, o cartão correspondente mostra "Em breve".
window.COMPRA = {
  hotmart: "https://pay.hotmart.com/W108020193L?src=livro",
  whatsapp: "5585986920243",
  instagram: "ariceliomouradev",
  mensagem: "Olá! Quero comprar o livro Programar, Testar, Automatizar."
};

(function () {
  var c = window.COMPRA;
  var zap = function (texto) {
    return c.whatsapp ? "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(texto) : "";
  };

  window.LOJAS = [
    {
      nome: "Compre direto comigo no WhatsApp",
      descricao: "Você me chama, eu combino a forma de pagamento e envio o livro.",
      url: zap(c.mensagem),
      rotulo: "Chamar no WhatsApp"
    },
    {
      nome: "Compre direto comigo no Instagram",
      descricao: "Me chame no direct do Instagram, que eu combino tudo com você.",
      url: c.instagram ? "https://ig.me/m/" + c.instagram : "",
      rotulo: "Chamar no Instagram"
    },
    {
      nome: "Exemplar físico",
      descricao: "Em breve, o livro também em versão impressa.",
      url: "",
      rotulo: "Comprar exemplar físico"
    }
  ];
})();
