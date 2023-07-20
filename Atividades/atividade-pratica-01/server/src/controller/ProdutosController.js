const db = require('../../database/clients.js');

exports.criarProduto = (req, res) => {
    const product = {
        descricao: req.body.descricao,
        preco: req.body.preco,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
    };

    const query = 'INSERT INTO produtos (descricao, preco, dataCriacao, dataAtualizacao) VALUES (?, ?, ?, ?)';

    db.query(query, [product.descricao, product.preco, product.dataCriacao, product.dataAtualizacao], function(err, results) {
        if (err) throw err;
        product.id = results.insertId;
        res.json(product);
    });
};

exports.lerProduto = (req, res) => {
    const query = 'SELECT * FROM produtos WHERE id = ?';

    db.query(query, [req.params.id], function(err, results) {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.json(results[0]);
    });
};

exports.atualizarProduto = (req, res) => {
    const product = {
        descricao: req.body.descricao,
        preco: req.body.preco,
        dataAtualizacao: new Date()
    };

    const query = 'UPDATE produtos SET descricao = ?, preco = ?, dataAtualizacao = ? WHERE id = ?';

    db.query(query, [product.descricao, product.preco, product.dataAtualizacao, req.params.id], function(err, results) {
        if (err) throw err;
        if (results.affectedRows === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        product.id = req.params.id;
        res.json(product);
    });
};

exports.deletarProduto = (req, res) => {
    const query = 'DELETE FROM produtos WHERE id = ?';

    db.query(query, [req.params.id], function(err, results) {
        if (err) throw err;
        if (results.affectedRows === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.json({message: 'Produto deletado'});
    });
};
