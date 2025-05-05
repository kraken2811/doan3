var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.route');
var hocvienRouter = require('./routes/hocvien.route');
var giaovienRouter = require('./routes/giao_vien.route');
var bai_hocRouter = require('./routes/bai_hoc.route');
var binh_luan_bai_hocRouter = require('./routes/binh_luan_bai_hoc.route');
var chung_nhanRouter = require('./routes/chung_nhan.route');
var dang_ky_khoa_hocRouter = require('./routes/dang_ky_khoa_hoc.route');
var danh_giaRouter = require('./routes/danh_gia.route');
var don_hangRouter = require('./routes/don_hang.route');
var khoa_hocRouter = require('./routes/khoa_hoc.route');
var lich_su_hocRouter = require('./routes/lich_su_hoc.route');
var quizRouter = require('./routes/quiz.route');
var storeprocedure=require('./routes/procedure.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình CORS: Cho phép request từ http://localhost:3001 (nơi chạy front-end)
app.use(cors({ origin: 'http://localhost:3001' }));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/giaoviens', giaovienRouter);
app.use('/hocviens', hocvienRouter);
app.use('/baihocs', bai_hocRouter);
app.use('/binhluans', binh_luan_bai_hocRouter);
app.use('/chungnhans', chung_nhanRouter);
app.use('/dangkykhoahocs', dang_ky_khoa_hocRouter);
app.use('/danhgias', danh_giaRouter);
app.use('/donhangs', don_hangRouter);
app.use('/khoahocs', khoa_hocRouter);
app.use('/lichsuhocs', lich_su_hocRouter);
app.use('/quizs', quizRouter);
app.use('/storeprocedure', storeprocedure);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.get("/baihocs/:id", (req, res) => {
  const courseId = req.params.id;  // Lấy khóa học ID từ URL params
  Bai_hoc.getByCourseId(courseId, (err, result) => {
    if (err) return res.status(500).json({ error: "Lỗi khi lấy bài học" });
    if (result.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy bài học cho khóa học này" });
    }
    res.json(result);  // Trả về bài học của khóa học
  });
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
