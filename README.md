
# AterNode
Uma biblioteca simples para iniciar um servidor no Aternos, confirmar automaticamente e acompanhar a posição do servidor na fila usando apenas algumas linhas.

Nota: Devido a mudanças recentes no site do aternos o modulo não funciona mais, pois as requisições estão sendo bloqueadas pelo cloudflare.

## Começando
### Instalação
```
npm i aternode
```

### Como usar
Alguns exemplos abaixo

#### Exemplo usando login:
```js
const Aternode = require('aternode');
const aternos = new Aternode();

(async () =>{
    // Faz o login no aternos.
    await aternos.login({user:'Username',password:'Password'});

    // Escolhe o servidor a ser iniciado usando um numero a partir de 1,
    //  se não tiver um parametro vai iniciar sempre o primeiro servidor.
    await aternos.getServers(1);

    // Inicia o servior escolhido.
    await aternos.start();

    // O evento queue é ativado toda vez que o metodo .autoConfirm() ou o metodo .getStatus() verificam o status atual da fila.
    // O callback retorna todas informações sobre o servidor sendo iniciado, incluindo tempo estimado e posição na fila.
    aternos.on('queue', (status) => {
        console.log(status);
    })

    // Caso tenha fila para iniciar o servidor no aternos, vai confirmar automaticamente quando for necessario.
    // O Callback é chamado quando o servidor estiver online e retorna informações do servidor como IP, IP Dinamico e etc...
    aternos.autoConfirm((info)=> {
        console.log(info);
    });
})();
```
#### Exemplo usando cookies:
```js
const Aternode = require('aternode');
const aternos = new Aternode();

const aternosSessionCookie = 'Cookie ATERNOS_SESSION aqui';

(async () =>{
    // Equivalente ao metodo .login(), porém é mais rapido e não precisa fazer requisições.
    // Usa o cookie ATERNOS_SESSION para autenticar no aternos, pode ser usado caso não queira usar login e senha.
    aternos.setSessionCookie(aternosSessionCookie);

    // Escolhe o servidor a ser iniciado usando um numero a partir de 1,
    //  se não tiver um parametro vai iniciar sempre o primeiro servidor.
    await aternos.getServers(1);

    // Inicia o servior escolhido.
    await aternos.start();

    // O evento queue é ativado toda vez que o metodo .autoConfirm() ou o metodo .getStatus() verificam o status atual da fila.
    // O callback retorna todas informações sobre o servidor sendo iniciado, incluindo tempo estimado e posição na fila.
    aternos.on('queue', (status) => {
        console.log(status);
    })

    // Caso tenha fila para iniciar o servidor no aternos, vai confirmar automaticamente quando for necessario.
    // O Callback é chamado quando o servidor estiver online e retorna informações do servidor como IP, IP Dinamico e etc...
    aternos.autoConfirm((info)=> {
        console.log(info);
    });
})();
```
