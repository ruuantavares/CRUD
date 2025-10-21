import ModelUser from '../model/users.js'

class ServiceUser {
  FindAll() {
    return ModelUser.FindAll()
  }

  FindOne(index) {
    //verificar se o index é valido
    return ModelUser.FindOne(index)
  }
  Create(nome) {
    return ModelUser.Create(nome)
  }
  Update(index, nome) {
    //verificar se o index e o nome são validos
    return ModelUser.Update(index, nome)
  }
  Delete(index) {
    return ModelUser.Delete(index)
  }
}
export default new ServiceUser();
