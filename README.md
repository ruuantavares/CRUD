# CRUD

npm init
npm i --save-dev jest cross-env
npm i express jest
=================================================================================================
no package.json
    "type": "module",

    "dev": "node --watch ./src/index.js",
    "test": "cross-env TEST=true node --experimental-vm-modules node_modules/jest/bin/jest.js"
=================================================================================================
estruturar pastas
    src
        controller
            users.js
        router
            users.js
        service
            users.js
        index.js
=================================================================================================
no index.js
    import express from "express"

    const app = express();
    app.use(express.json())

    //rotas 

    const port = 3000

    app.listen(port, () => {
    console.info("Servidor rodando na porta " + port)
    })

=================================================================================================
no router     //objetivo da rota é disponibilizar o endpoint
    import express from 'express'
    //importar controller

    const router = express.Router()

    //api/v1
    router.get('/users', (req, res) => {
    console.log('oi')     //apenas para testar se a rota esta funcionando
    res.send()
    }) //pegar todos
    // router.get('/user/:index') //pegar um
    // router.post('/user') //cadastrar um
    // router.put('/user/:index') //alterar um
    // router.delete('/user/:index') //deletar um

    export default router

===================================================================================================
no index
    import express from "express"
    import router from "./router/users.js";

    const app = express();
    app.use(express.json())

    app.use('/api/v1', router)

    const port = 3000

    app.listen(port, () => {
    console.info("Servidor rodando na porta " + port)
    })

após isso, npm run dev para verificar se esta funcionando no postman :  localhost:3000/api/v1/users

===================================================================================================
no controller    //tirar o req e res da rota

    class ControllerUser {
    
    FindAll(req, res) {
    console.log("oi");
    res.send();
     }
    }
    export default new ControllerUser();


===================================================================================================
no router

    import express from 'express'
    import ControllerUser from '../controller/users.js'

    const router = express.Router()

    //api/v1
    router.get('/users', ControllerUser.FindAll) //pegar todos
    // router.get('/user/:index') //pegar um
    // router.post('/user') //cadastrar um
    // router.put('/user/:index') //alterar um
    // router.delete('/user/:index') //deletar um

    export default router

    e testar dnovo no postam, fazendo a requisicao do get
===================================================================================================
no service

    class ServiceUser {
    FindAll() {
        return ['oi', 'xau'] //apenas para teste, retorna array
    }
    }
    export default new ServiceUser()
===================================================================================================
no controller

    import ServiceUser from "../service/users.js";

    class ControllerUser {
    FindAll(req, res) {
    try {    //fazer tratativa de erros
      const resultado = ServiceUser.FindAll();

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
    }
    }
    export default new ControllerUser();

===================================================================================================
no service    //para criar novas funções
    class ServiceUser {
    FindAll() {
    return ["oi", "xau"]; //apenas para teste, retorna array
  }

  FindOne() {
    return ["outra msg"]; //apenas para teste, retorna array
  }
  Create() {
    return ["Criado"]; //apenas para teste, retorna array
  }
  Update() {
    return ["Update"]; //apenas para teste, retorna array
  }
  Delete() {
    return ["Deletado"]; //apenas para teste, retorna array
  }
}
export default new ServiceUser();


===================================================================================================
no controller  //para criar novas funções ^
  import ServiceUser from "../service/users.js";

class ControllerUser {
  FindAll(req, res) {
    try {
      const resultado = ServiceUser.FindAll();

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  FindOne(req, res) {
    try {
      const resultado = ServiceUser.FindOne();

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Create(req, res) {
    try {
      const resultado = ServiceUser.Create();

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Update(req, res) {
    try {
      const resultado = ServiceUser.Update();

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Delete(req, res) {
    try {
      const resultado = ServiceUser.Delete();

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
export default new ControllerUser();



===================================================================================================
no router     //para criar uma nova rota (endpoint novo)

import express from 'express'
import ControllerUser from '../controller/users.js'

const router = express.Router()

//api/v1
router.get('/users', ControllerUser.FindAll) //pegar todos
router.get('/user/:index', ControllerUser.FindOne) //pegar um
router.post('/user', ControllerUser.Create) //cadastrar um
router.put('/user/:index', ControllerUser.Update) //alterar um
router.delete('/user/:index', ControllerUser.Delete) //deletar um

export default router

===================================================================================================
no postman
    My collection
        + blank collection
            REST API basic
                GET FindAll localhost:3000/api/v1/users
                GET FindOne localhost:3000/api/v1/user/1
                POST Create localhost:3000/api/v1/user
                PUT Update localhost:3000/api/v1/user/1
                DEL Delete localhost:3000/api/v1/user/1

após novas funções e rotas definidas, testar novamente, npm run dev e no postman localhost:3000/api/v1/user/qualquercoisa      //quando tiver ':', no endpoint usar '&'
===================================================================================================
fazer teste unitario ****
===================================================================================================
Adicionar a pasta model
                    users.js
===================================================================================================
no model

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

===================================================================================================
na controller

import ServiceUser from "../service/users.js";

class ControllerUser {
  FindAll(_, res) { //se nao for usar o primeiro parametro, use '_'
    try {
      const resultado = ServiceUser.FindAll();

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  FindOne(req, res) {
    try {
      const index = req.params.index

      const resultado = ServiceUser.FindOne(index);

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Create(req, res) {
    try {
      const nome = req.body.nome   //post e put usa body
      const resultado = ServiceUser.Create(nome);

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Update(req, res) {
    try {
      const index = req.params.index
      const nome = req.body.nome
      const resultado = ServiceUser.Update(index, nome);

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Delete(req, res) {
    try {
      const index = req.params.index
      const resultado = ServiceUser.Delete(index);

      res.send(resultado);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
export default new ControllerUser();

===================================================================================================
no service

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

===================================================================================================
no controller

import ServiceUser from "../service/users.js";

class ControllerUser {
  FindAll(_, res) { //se nao for usar o primeiro parametro, use '_'
    try {
      const nomes = ServiceUser.FindAll();

      res.send({nomes});
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  FindOne(req, res) {
    try {
      const index = req.params.index

      const nome = ServiceUser.FindOne(index);

      res.send({nome});
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Create(req, res) {
    try {
      const nome = req.body.nome   //post e put usa body
      ServiceUser.Create(nome);

      res.status(201).send();
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Update(req, res) {
    try {
      const index = req.params.index
      const nome = req.body.nome
      ServiceUser.Update(index, nome);

      res.status(200).send();
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  Delete(req, res) {
    try {
      const index = req.params.index
      ServiceUser.Delete(index);

      res.status(204).send();
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
export default new ControllerUser();

===================================================================================================

===================================================================================================

===================================================================================================