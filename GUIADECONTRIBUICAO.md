## Guia de Contribuição

### Um modelo de ciclo completo de desenvolvimento de software: Git-Flow

Uma vez conhecendo os procedimentos acima, iremos escolher um modelo de fluxo de trabalho para desenvolvermos um software com uma ou mais equipes distintas contribuindo com mesmo software (ou base de código para ficar mais abrangente).

O mais difundido (não necessariamente o melhor porque quem vai definir o melhor é sua equipe de desenvolvimento) é o git-flow. todo seu manifesto é feito nesse artigo(http://nvie.com/posts/a-successful-git-branching-model/).

O workflow utiliza duas branches fixas: develop e master.
Dica: estamos utilizando develop como branch principal para evitar problemas menores de push's indevidos
Os papéis dos branches são os seguintes:

* **develop:** versão que contém todas as novas features desenvolvidas (onde todo o ciclo de teste e validação foram feitos), não deve conter desenvolvimentos não aprovados e desenvolvimentos incompletos, ou seja, tudo que está preparado e aprovado para ir pra próxima release em produção. caso tenha algum hotfix, o conteúdo do hotfix também fica disponível em develop

* **master:** última versão estável, contém todos os recursos entregues em produção, caso tenha algum hotfix, o conteúdo do hotfix também fica disponível em **master**

* **feature/xxxx:** uma branch temporária que contém a implementação candidata na próxima release, onde seu ciclo de vida fica limitado à sua aprovação e validação, na sua finalização deve ir para o branch **develop**

```sh
# iniciando e desenvolvendo a feature
# nessa parte podemos começar a desenvolver e posteriormente criar a feature
git checkout -b feature/a
git commit -a -m 'adicionando feature'
# finalizando a feature 
git checkout develop 
git merge --no-ff feature/a
# terminando a branch temporária
git branch -D feature/a
# enviando atualização
git push origin develop

```

* **bugfix/xxxx:** uma branch temporária que contém uma correção que não é emergencial e pode ser levada para a próxima release. seu ciclo de vida é semelhante ao **feature**, somente muda o nome por respeito à nomenclatura da classificação da implementação

* **hotfix/xxxx:** uma branch temporária que contém uma correção que é emergencial, devido à sua operação, deve ser definido por toda a equipe se a correção é uma **hotfix**. Seu ciclo de vida termina na validação da correção do erro e seu conteúdo deve ir para **master** e **develop**.

```sh
# iniciando e desenvolvendo o hotfix
git checkout -b hotfix/some-fix
git commit -a -m 'corrigindo erro quente'

# finalizando o fix e mandando para o estável
git checkout master
git merge --no-ff hotfix/some-fix

# tageando a versão hotfix para envio 
git tag -a -m 'correcao de emergencia'  v1.0.1

# atualizando desenvolvimento
git checkout develop
git merge --no-ff hotfix/some-fix
# terminando a branch temporária
git branch -D hotfix/some-fix
# enviando hotfix junto com o que foi atualizado nos branches fixos
git push --follow-tags origin develop master
```

## Git Flow como usar?

Irei deixar aqui um link onde está o passo a passo de como se utiliza ele

```
https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html
```

### Instalação

* Você precisa do git instalado como pré-requisito.

* O git flow funciona no OSX, Linux e no Windows

**Mac OSX**

**Homebrew**
```sh
$ brew install git-flow-avh
```

**Macports**
```sh
$ port install git-flow-avh 
```

**Linux**

```sh
$ apt-get install git-flow 
```

**Windows (Cygwin)**

```sh
$ wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash 
```

Depois de ter instalado ele é hora de começar a usa-lo.

**Inicialização**

Comece o uso do git-flow fazendo sua inicialização dentro de um repositório git existente:

```sh
git flow init
```

Você precisa responder algumas questões relativas às convenções de nomenclatura dos seus branches. É recomendado que sejam usados os valores padrões. 

<img src="https://github.com/samverneck/testinho/blob/master/Captura%20de%20tela%20de%202017-12-01%2021-45-02%20-%202.png">

Artigos que podem nos ajudar a seguir esse padrão:

https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html

https://medium.com/trainingcenter/git-da-necessidade-a-automa%C3%A7%C3%A3o-de-sua-release-parte-1-a9d697e8f9ee

https://medium.com/trainingcenter/git-da-necessidade-a-automa%C3%A7%C3%A3o-de-sua-release-parte-2-410b95c6d7cf

Inclusive usei de base para montar esse guia esses artigos.
