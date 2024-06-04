
class Product {
  constructor(init) {
    this.id = init.id;
    this.nome = init.nome;
    this.descricao = init.descricao;
    this.origem = init.origem;
    this.grao = init.grao;
    this.preco = init.preco;
    this.imagem = init.imagem;
  }

  static copyOf(source, mutator) {
    const draft = new Product(source);
    if (mutator) {
      mutator(draft);
    }
    return draft;
  }
}

export default Product;