const express = require('express')
const mongoose = require('mongoose')

const Product = require('../models/product')


exports.GetAll = (req, res, next) => {
    Product
        .find() //.limit(100)
        .exec()
        .then(docs => {
            //=> arrow function kullanımı" function(s){ return s.length }  ---->  s => s.length
            const mapDocs = docs.map(function (doc) {
                return {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    image: doc.productImage,
                    request: {
                        type: req.method,
                        url: req.protocol + '://' + req.headers.host + req.url + 'products/' + doc._id
                    }
                };
            })

            const response = {
                count: docs.length,
                products: mapDocs
            }
            res.status(200).json(response)
			/*
			if (docs.length >= 0) {
				res.status(200).json(docs);
			} else {
				res.status(404).json({
					message: 'Hiç Kayıt yok'
				});
			}
			*/
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
	/*
	res.status(200).json({
		message: '/products GET isteği geldi',
	})
	*/
}

exports.GetById = (req, res, next) => {
    const id = req.params.productId;
    Product
        .findById(id)
        .select('-__v')//_id name price 
        .exec()
        .then(doc => {
            console.log('Veritabanı\'ndan', doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: req.method,
                        url: req.protocol + '://' + req.headers.host + '/products' + req.url
                    }
                });
            } else {
                res.status(404).json({
                    message: 'Bulunamadı ' + id
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

	/*
	if (id === 'special') {
		res.status(200).json({
			message: '/products/:id GET isteği geldi, Özel',
			id: id
		})
	} else {
		res.status(200).json({
			message: '/products/:id GET isteği geldi, Standart',
			id: id
		})
	}
	*/
}

exports.Add = (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path.replace('\\', '/')
    })
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: '/products POST isteği geldi',
                createdProduct: {
                    id: result._id,
                    name: result.name,
                    price: result.price,
                    image: result.productImage,
                    request: {
                        type: req.method,
                        url: req.protocol + '://' + req.headers.host + req.url + 'products/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
	/*
	const product = {
		name: req.body.name,
		price: req.body.price
	}
	
	res.status(201).json({
		message: '/products POST isteği geldi',
		createdProduct: product,
	})
	*/
}

exports.Update = (req, res, next) => {
    const id = req.params.productId;
    //{name: req.body.name, price: req.body.price}//{name:'Kaldırımlar',price: 10.00}
    const updateOps = {};
    for (const ops of req.body) { //sending body must be => [{"propName":"name", "value":"Yukarı Köy"}]
        updateOps[ops.propName] = ops.value;
    }
    Product
        .update({ _id: id }, { $set: updateOps }) //findByIdAndUpdate(id, { $set: { name: 'test', price: 12.99 } })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Ürün Bilgileri Güncellendi',
                request: {
                    type: req.method,
                    url: req.protocol + '://' + req.headers.host + '/products' + req.url
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.Delete = (req, res, next) => {
    const id = req.params.productId;
    Product
        .remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Ürün Silindi',
                request: {
                    description: 'Yeni ürün ekleme isteği',
                    type: 'POST',
                    url: req.protocol + '://' + req.headers.host + '/products',
                    body: {
                        name: 'String, reguired',
                        price: 'Number, required'
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}