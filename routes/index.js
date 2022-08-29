var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('home', {page:"home"});
});

router.get('/about', function(req, res, next) {
  res.render('about', {page:"about"});
});

router.get('/services', function(req, res, next) {
  res.render('services', {page:"services"});
});

router.get('/portfolio', function(req, res, next) {
  res.render('portfolio', {page:"portfolio"});
});

router.get('/portfolio-detail', function(req, res, next) {
  res.render('portfolio-detail', {page:"portfolio-detail"});
});

router.get('/enquiry', function(req, res, next) {
  res.render('enquiry', {page:"enquiry",url:"http://localhost:8080/api/enquiry"});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {page:"contact"});
});

module.exports = router;
