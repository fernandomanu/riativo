// compra.js

const produtos = {
    camisola: {
      nome: "Camisola Benfica w/ RIAtivo",
      preco: "100€",
      imagem: "images/camisola.png"
    },
    garrafa: {
      nome: "Garrafa RIAtivo",
      preco: "8€",
      imagem: "images/garrafa.png"
    },
    capa: {
      nome: "Capa IPhone RIAtivo",
      preco: "12€",
      imagem: "images/capa.png"
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const produtoKey = params.get("produto");
    const info = produtos[produtoKey] || produtos.camisola;
  
    document.querySelector('.product_info img').src = info.imagem;
    document.querySelector('.product_info img').alt = produtoKey;
    document.querySelector('.product_info h3').innerHTML = info.nome;
    document.querySelector('.product_info p').textContent = info.preco;
  });
  