### Um modelo de ciclo completo de desenvolvimento de software: Git-Flow

Uma vez conhecendo os procedimentos acima, iremos escolher um modelo de fluxo de trabalho para desenvolvermos um software com uma ou mais equipes distintas contribuindo com mesmo software (ou base de código para ficar mais abrangente).

O mais difundido (não necessariamente o melhor porque quem vai definir o melhor é sua equipe de desenvolvimento) é o git-flow. todo seu manifesto é feito nesse artigo(http://nvie.com/posts/a-successful-git-branching-model/).

O workflow utiliza duas branches fixas: develop e master.
Dica: estamos utilizando develop como branch principal para evitar problemas menores de push's indevidos
Os papéis dos branches são os seguintes:

* **develop:** versão que contém todas as novas features desenvolvidas (onde todo o ciclo de teste e validação foram feitos), não deve conter desenvolvimentos não aprovados e desenvolvimentos incompletos, ou seja, tudo que está preparado e aprovado para ir pra próxima release em produção. caso tenha algum hotfix, o conteúdo do hotfix também fica disponível em develop

* **master:** última versão estável, contém todos os recursos entregues em produção, caso tenha algum hotfix, o conteúdo do hotfix também fica disponível em **master**

* **feature/xxxx:** uma branch temporária que contém a implementação candidata na próxima release, onde seu ciclo de vida fica limitado à sua aprovação e validação, na sua finalização deve ir para o branch **develop**
