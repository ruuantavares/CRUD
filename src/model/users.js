const nomes = new Array("Jão", "Marya", "Xuxa");

class ModelUser {

  FindAll() {
    return nomes
  }

  FindOne(index) { // se nao tem variavel dentro da função,entao é parametro, coloca dentro
    return nomes[index]
  }
  Create(nome) {
    nomes.push(nome)
  }
  Update(index, nome) {
    nomes[index] = nome
  }
  Delete(index) {
    nomes.splice(index, 1)
  }
}

export default new ModelUser()