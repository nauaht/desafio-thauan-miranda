class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const pedido = {};

    const itensPrincipais = [
      "cafe",
      "suco",
      "sanduiche",
      "salgado",
      "combo1",
      "combo2",
    ];
    const itensExtras = ["chantily", "queijo"];

    const todosOsItens = [...itensPrincipais, ...itensExtras];

    const tabelaDePrecos = {
      cafe: 3,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    // primeiro verificamos se a forma de pagamento é valida!
    if (
      metodoDePagamento != "debito" &&
      metodoDePagamento != "credito" &&
      metodoDePagamento != "dinheiro"
    ) {
      return "Forma de pagamento inválida!";
    }

    // caso forma de pagamento válida, verificamos se existem itens
    if (itens.length == 0) {
      return "Não há itens no carrinho de compra!";
    }

    // passar por cada item da lista (vetor)
    for (let i = 0; i < itens.length; i++) {
      const [nomeDoProduto, quantidade] = itens[i].split(",");
      if (todosOsItens.includes(nomeDoProduto) == false) {
        return "Item inválido!";
      }
      if (quantidade < 1) {
        return "Quantidade inválida!";
      }
      pedido[nomeDoProduto] = quantidade;
    }

    function calcularValorFinal(metodoDePagamento) {
      let valorTotal = 0;
      for (const produto in pedido) {
        const quantidade = pedido[produto];
        const preco = tabelaDePrecos[produto];
        if (preco) {
          valorTotal += preco * quantidade;
          pedido[produto] = quantidade; // add a new property to the object
        }
      }

      if (metodoDePagamento == "dinheiro") {
        valorTotal = valorTotal * 0.95;
      }
      if (metodoDePagamento == "credito") {
        valorTotal = valorTotal * 1.03;
      }
      const valorTotalFormatado = valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return valorTotalFormatado;
    }

    // verificar se estamos pedindo item extra sem o item principal
    for (const item in pedido) {
      if (item == "chantily" || item == "queijo") {
        if (item == "chantily") {
          if (pedido["cafe"] == undefined) {
            return "Item extra sem item principal!";
          } else {
            return calcularValorFinal(metodoDePagamento);
          }
        }
        if (item == "queijo") {
          if (pedido["sanduiche"] == undefined) {
            return "Item extra sem item principal!";
          } else {
            return calcularValorFinal(metodoDePagamento);
          }
        }
      }
    }

    return calcularValorFinal(metodoDePagamento);
  }
}

const caixa = new CaixaDaLanchonete().calcularValorDaCompra("debito", [
  "combo1,2",
  "cafe,3",
]);

console.log(caixa);

export { CaixaDaLanchonete };
