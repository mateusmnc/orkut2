# ORKUT2
|login|Timeline|New Post|My friends|Add friends|
|-----|-----|-----|-----|-----|
|![Login](sc_login.png?raw=true "Login")|![Timeline](sc_timeline.png?raw=true "Timeline")|![New Post](sc_newpost.png?raw=true "New Post")|![My friends](sc_myfriends.png?raw=true "My friends")|![Add friends](sc_addfriends.png?raw=true "Add friends")|

## Guia em portugues no fim da página

Inspered in twitter usability it covers the following functionalities:

* login and signup
* add friends one-by-one or by access-rights to device's contacts
* remove friends
* publish new posts with taken picture or loaded from galeray
* share existing posts
* take picture or load from galeray
* consume friends' posts from timeline

### Pre-requisites
#### install app dependencies

1) access in terminal orkut2 folder
2) enter: npm install

    yep, you need npm installed, google it!


#### install emulator and cordova dependencies
1) access in terminal orkut2 folder
2) enter: npm i -g cordova
3) enter: npm i -g cordova-res
4) enter: npm i -g native-run
5) enter: ionic cordova platform add android 
6) enter: yes | sudo ~/Library/Android/sdk/tools/bin/sdkmanager --licenses

>this command approaves SDK licenses 

### Running app
#### in browser
1) access in terminal orkut2 folder
2) enter: ionic lab
> console informs host and port

#### in Android emulator
1) access in terminal orkut2 folder
2) enter: ionic cordova run android

## Guia em português

Inspirado na usabilidade do twitter cobre as seguintes funcionalidades:

* login e cadastro de usuário
* adicionar amigos um a um ou através da permissão de visualização dos contatos
* remover amigos
* publicar novos posts com foto tirada ou carregada da galeria
* compartilhar posts existentes
* Tirar foto ou carregar da galeria
* Consumir posts de amigos a partir da timeline

### Pre-requisitos:
#### Instalar dependencias do app:
1) acesse via terminal o diretório orkut2
2) digite no terminal: npm install

#### Instalar o cordova, emulador e suas dependencias:
1) acesse via terminal o diretório orkut2
2) digite no terminal: npm i -g cordova
3) digite no terminal: npm i -g cordova-res
4) digite no terminal: npm i -g native-run
5) digite no terminal: ionic cordova platform add android 
6) digite no terminal: yes | sudo ~/Library/Android/sdk/tools/bin/sdkmanager --licenses
> comando para aprovar as licensas do SDK

### Rodar app
#### No browser

1) acesse via terminal o diretório orkut2
2) digite no terminal: ionic lab

> O console lhe informará host e porta para consumir a aplicação.

#### No emulador Android
1) acesse via terminal o diretório Orkut2
2) ionic cordova run android