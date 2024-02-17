const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');
const db = require('../config/database');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
// app.use(express.static("public"));

// app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({ storage });

const tambahPegawai = (req, res) => {
	upload.single('image')(req, res, (err) => {
		if (err) {
			return res.status(400).json({ error: 'Error uploading file' });
		}

		const { jabatan, nama, nip } = req.body;

		const sqlQuery = 'INSERT INTO pegawai (jabatan, nama, nip, image) VALUES (?,?,?,?)';
		const values = [ jabatan, nama, nip, req.file.filename ];

		db.query(sqlQuery, values, (err, result) => {
			if (err) {
				return res.json({ Error: 'Error in running query' });
			}
			return res.json({ Status: 'Successful' });
		});
	});
};

const getAllPegawai = (req, res) => {
	const sqlQuery = 'SELECT * FROM pegawai';
	db.query(sqlQuery, (err, result) => {
		if (err) {
			return res.json({ Error: 'Get Pegawai error in sql' });
		}
		return res.json({ Status: 'Success', Result: result });
	});
};
const deletePegawai = (req, res) => {
	const id = req.params.id;
	const sqlQuery = 'DELETE FROM pegawai WHERE id = ?';
	db.query(sqlQuery, [ id ], (err, result) => {
		if (err) {
			return res.status(500).json({ Status: 'Error', Error: 'Error deleting pegawai', err });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ Status: 'Error', Error: 'Pegawai not found' });
		}
		return res.json({ Status: 'Success' });
	});
};

const updatePegawai = (req, res) => {
	const id = req.params.id;
	const sqlQuery = 'update pegawai set jabatan = ?, nama = ?, nip = ? where id = ?';
	db.query(sqlQuery, [ req.body.jabatan, req.body.nama, req.body.nip, id ], (err, result) => {
		if (err) return res.json({ Error: 'update pegawai error in sql' });
		return res.json({ Status: 'Successful' });
	});
};

const getById = (req, res) => {
	const id = req.params.id;
	const sqlQuery = 'SELECT * FROM pegawai WHERE id = ?';
	db.query(sqlQuery, [ id ], (err, result) => {
		if (err) return res.json({ Error: 'Get Pegawai Error' });
		return res.json({ Status: 'Success', Result: result });
	});
};

const transformDataToHierarchy = (data) => {
	const hierarchy = [];

	// Transformasi data ke struktur hierarkis
	data.forEach((pegawai) => {
		const { id, jabatan, nama, nip, image } = pegawai;
		const pegawaiObj = {
			id,
			jabatan,
			nama,
			nip,
			image,
			children: [] // Kosong karena kita tidak memiliki informasi atasan
		};
		hierarchy.push(pegawaiObj);
	});

	return hierarchy;
};

module.exports = {
	tambahPegawai,
	getAllPegawai,
	deletePegawai,
	updatePegawai,
	getById,
	transformDataToHierarchy
};
