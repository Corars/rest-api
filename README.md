Uyarı: Bu döküman henüz hazır değildir !

# corars-rest-api
[![Build Status](https://travis-ci.org/med177/corars-rest-api.svg?branch=master)](https://travis-ci.org/med177/corars-rest-api)
[![Dependency Status](https://david-dm.org/med177/corars-rest-api.svg/status.svg)](https://david-dm.org/med177/corars-rest-api)

Bu proje Rest Api yapısında bir test projesidir, bu proje sayesinde javascript teknolojilerinin bir kısmının denenmesi amaçlanmıştır.

## Links

- 📘 Documentation: [http://corars.com](http://corars.com)

# API'nin kurulumu

## 1. Node Modüllerini yükleyin
Terminal kullanarak npm den modülleri yükleyin.
```bash
$ npm install
```
## 2. Sunucu uygulamasını başlatın
Terminal kullanarak nodemon ile uygulamayı başlatın. Bu kısımda nodemon scripti npm üzerinde tanımlanmıştır.
```bash
$ npm start
```


### Sequence diagram

```
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```
![Sequence diagram](./img/sequence.png)


Proje'nin travis üzerindeki ayarları henüz tam olarak yapılamamıştır.
>Copyright 2018 Corars
---
<img src="http://corars.com/corars-micro.png"/>
