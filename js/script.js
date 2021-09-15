/* Recuperando o pop up do form */
let divInserirCard = document.getElementById('section__form__container');
window.addEventListener('load', () => {
    divInserirCard.style.display = "none";
})

/* Prevent default pra página não recarregar após o submit */
divInserirCard.addEventListener('submit', function(evento){
    evento.preventDefault();
})

/* Abri o form */
function abrirPopup() {
    divInserirCard.style.display = "flex";
    document.getElementById('cards__container').style.pointerEvents = "none";
    document.querySelector('.div__buttons').style.pointerEvents = "none";
}

/* Fechar form */
function fecharPopup() {
    document.getElementById('cards__container').style.pointerEvents = "auto";
    document.querySelector('.div__buttons').style.pointerEvents = "auto";
    divInserirCard.style.display = "none";
    resetBotaoInserirCard();
    limparCampos();
}

//FUNÇÃO PARA CRIAR TODOS OS ELEMENTOS DO CARD
function criarCard(srcImg, tituloFilme, descricaoFilme) {

  //selecionando elementos
  let card = document.createElement('section');
  let titulo = document.createElement('h2');
  let img = document.createElement('img');
  let descricao = document.createElement('p');

  card.classList.add('card'); //adicionando classe
  card.setAttribute('onclick', "addEditSelecao(this)");
  img.src = srcImg;
  img.alt = `poster do filme ${titulo}`; //descrição da imagem
  titulo.innerText = tituloFilme;
  descricao.innerText = descricaoFilme;
  card.addEventListener('dblclick', () => {
      this.classList.toggle('excluir__card');
  })

  card.style.animationName = "animacaoCriarCard";
  card.appendChild(img);
  card.appendChild(titulo);
  card.appendChild(descricao);

  return card;
}

//Inserir card
function inserirCard() {
  let img;
  let titulo;
  let descricao;
  let card;
  
  //verificar se campos estão vazios e emitir alerta pro usuário
  if(checarCamposVazios()) {
      img = document.getElementById('linkImage').value;
      titulo = document.getElementById('titulo').value;
      descricao = document.getElementById('descricao').value;
      card = criarCard(img, titulo, descricao);
      document.getElementById('cards__container').appendChild(card);
      limparCampos();
      fecharPopup(); 
  } else {
      alert("Preencha todos os campos corretamente!");
  }
}

//Função para excluir cards
function excluirCard(card) {
  card.style.animationDuration = ".3s";
  card.style.animationName = "animacaoExcluirCard";
  setTimeout(() => {
      document.getElementById('cards__container').removeChild(card);
  },290);

}


//Função que checa os campos vazios
function checarCamposVazios() {
  if((document.getElementById('linkImage').value.length > 0) && 
  (document.getElementById('titulo').value.length > 0) && 
  (document.getElementById('descricao').value.length > 0)) {
      return true;
  } else {
      return false;
  }
}


//Função que adiciona a classe responsavel pela seleção de cards
function addEditSelecao(card) {
  if(card.classList.contains('excluir__card')) {
      card.classList.remove('excluir__card');
  } else if (card.classList.contains('editar__card')) { 
      card.classList.remove('editar__card');
  }else {
      card.classList.toggle("editar__card");
  }
}


//Função que retorna um ARRAY com todos os cards adicionados na página
function getArrayCards() {
  let cards = document.querySelectorAll('.card');
  return cards;
}


////-ARRUMAR
/* //Excluir card selecionado
function cardSelecionadoExcluir() {
    let cards = document.querySelectorAll(".excluir__card");
    if(cards.length == 0) {
        alert("Não há cards para remover");
    } else {
        for(card of cards) {
            if(card.classList.contains("excluir__card")) {
                excluirCard(card);
            }
        }
    }
} */

/* função que retorna falso se houver mais de um card selecionado */
function checkQntdCardsEditar(arrayCards) {
  let cont = 0;
  for(card of arrayCards) {
      if(card.classList.contains("editar__card")) {
          cont++;
      } 
  }
  if(cont > 1) {
      return true;
  } else if(cont == 0) return false;
}

//Altera o botão de inserir para editar
function popUpEditar() {
  let card = document.querySelector(".editar__card");
  if(!card) {
      alert("Não há cards!")
  } else if(checkQntdCardsEditar(getArrayCards())) {
      alert('Edite apenas um card por vez');

  }else {
      let botao = document.getElementById('btnEnviar');
      botao.innerText = "Editar card";
      botao.setAttribute('onclick',`editar__card()`);
      abrirPopup();
  }
}


//Função para editar informações do card, selecionando pelo indice
function editarCard() {
  let card = document.querySelector(".editar__card");
  if(document.getElementById('linkImage').value.length > 0) {
      card.children[0].src = document.getElementById('urlImg').value;
  }
  if(document.getElementById('titulo').value.length > 0) {
      card.children[1].innerText = document.getElementById('titulo').value;
  }
  if(document.getElementById('descricao').value.length > 0) {
      card.children[2].innerText = document.getElementById('descricao').value;
  }
  card.classList.remove('editar__card');
  resetBotaoInserirCard();
  limparCampos();
  fecharPopup();
}


function resetBotaoInserirCard() {
  let botao = document.getElementById('btnEnviar');
  botao.innerText = "Inserir filme";
  botao.setAttribute('onclick',`inserirCard()`);
}

function limparCampos() {
    document.getElementById('urlImg').value = "";
    document.getElementById('titulo').value = "";
    document.getElementById('descricao').value = "";
}





