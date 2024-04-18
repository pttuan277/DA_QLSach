// routes/authorRoutes.js
const express = require('express');
const router = express.Router();
const Author = require('../models/author');



//          HIỂN THỊ DANH SÁCH TÁC GIẢ
// Đổi tên route từ '/' thành '/list' để tránh xung đột với route '/add'
router.get('/list', async (req, res) => {
  try {
    const authors = await Author.find({ isdelete: false }).sort({ order: 1 });
    res.render('authors', { authors }); // render HTML thay vì trả về JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // Read all products for a specific author
router.get('/:authorId/products', async (req, res) => {
    try {
      const products = await Product.find({ author: req.params.authorId, isdelete: false });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  router.post('/list', async (req, res) => {
    try {
      const authors = await Author.find({ isdelete: false }).sort({ order: -1 });
  
    //   let newOrder = 1; // Giá trị mặc định nếu không có author nào trong danh sách
    //   if (authors && authors.length > 0) {
    //     newOrder = authors[0].order + 1;
    //   }
  
      const newAuthor = await Author.create({
        name: req.body.name,
        biography: req.body.biography,
        birthDate: req.body.birthDate,
      });
  
      res.status(201).json(newAuthor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



  // UPDATE
router.patch('/:id', async (req, res) => {
  try {
    const updateAuthor = await Author.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { $set: { biography: req.body.biography } },
      { $set: { birthDate: req.body.birthDate } },
      { new: true }
    );

    res.json(updateAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
    try {
      await Author.findByIdAndDelete(req.params.id);
      res.json({ message: 'Author deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });




  router.get('/add', (req, res) => {
    res.render('addAuthor');
  });
  
  //                THÊM MỚI TÁC GIẢ
  // Thay đổi route từ '/' thành '/list' để tránh xung đột với route '/add'
  router.post('/add', async (req, res) => {
    try {
      // Tạo một giá trị mặc định cho trường order nếu không được cung cấp
      const { name, biography, birthDate } = req.body;
  
      const newAuthor = await Author.create({
        name,
        biography,
        birthDate,
      });
  
      res.redirect('/authors/list'); // Đổi thành '/authors/list'
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  //            CẬP NHẬT TÁC GIẢ
  router.get('/update/:id', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      res.render('updateAuthor', { author });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Cập nhật thông tin author
  router.post('/update/:id', async (req, res) => {
    try {
      const updateAuthor = await Author.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name } },
        { $set: { biography: req.body.biography } },
        { $set: { birthDate: req.body.birthDate } },
        { new: true }
      );
  
      res.redirect('/authors/list');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  


  
//              XÓA TÁC GIẢ

  // Thêm route để hiển thị thông báo xác nhận xóa author
  router.get('/delete/:id', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      res.render('deleteAuthor', { author });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Xác nhận xóa author
  router.post('/delete/:id', async (req, res) => {
    try {
      await Author.findByIdAndDelete(req.params.id);
      res.redirect('/authors/list');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  


module.exports = router;
