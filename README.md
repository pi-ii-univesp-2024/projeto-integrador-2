# Projeto Integrador II

Projeto Integrador II - Grupo 010 - UNIVESP

Tema: Desenvolver um software com framework web que utilize banco de dados, inclua script web (Javascript), nuvem, uso de API, acessibilidade, controle de versão e testes. Opcionalmente, incluir análise de dados.

## Índice

<!--ts-->
  * [Requisitos iniciais](#Requisitos-iniciais)
  * [Ambiente de desenvolvimento](#Ambiente-de-desenvolvimento)
  * [O Projeto](#O Projeto)
<!--te-->

### Requisitos iniciais

- Baixe o VS Code: https://code.visualstudio.com/download
- Baixe o git: https://git-scm.com/downloads
- Baixe o Python: https://www.python.org/downloads/


### Ambiente de desenvolvimento

Faça o clone deste repositório via https ou ssh. Abra o terminal em qualquer pasta que queira manter o projeto e digite: 
- ```git clone https://github.com/pi-ii-univesp-2024/projeto-integrador-2.git``` para clone via https
- ```git clone git@github.com:pi-ii-univesp-2024/projeto-integrador-2.git``` para clone via ssh

Com o projeto em sua máquina, crie um ambiente virtual na raiz da pasta /backend
```
cd .\backend\
python -m venv venv
. venv/Scrpits/activate
```

Caso o ambiente virtual não seja iniciado no Windows, abra o PowerShell como administrador e execute o comando
```
Set-ExecutionPolicy AllSigned -Force
```

Instale todas as dependências do arquivo ```requirements.txt```
```
pip install -r requirements.txt
```

Faça as migrações necessárias para a base de dados do Django
```
python manage.py makemigrations
python manage.py migrate
```

Crie o superuser do Django
```
python manage.py createsuperuser
```

Rode o servidor do Django
```
python manage.py runserver 
```

Acesse a URL ```http://localhost:8000/admin/``` e faça o login com seu superuser


Abra um novo terminal e vá até a pasta /frontend

```
cd .\frontend\
```

Instale todas as dependências do React e Next

```
npm i
```

Rode o servidor Next

```
npm run dev
```

Acesse a URL ```http://localhost:3000```

### O Projeto

O projeto é um sistema de gestão de estoque e produtos de uma lanchonete.

#### Backend

Dividimos o projeto do backend em dois apps: `common` e `lanchonete`. O app common terá classes e funções genéricas, comuns a qualquer outro app. Já o app lanchonete será responsável por gerir todas as entidades e regras de negócio do projeto.

Para cada nova entidade (tabela) referente ao app, crie uma pasta em `/backend/apps/<nome_app>/<nome_entidade>` e crie todos os arquivos necessários
```
__init__.py
admin.py
filters.py
models.py
selector.py
serializers.py
services.py
tests.py
urls.py
views.py
``` 
