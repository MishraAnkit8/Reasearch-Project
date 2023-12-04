const router = require('express').Router();
const caseStudyController = require('../controller/case-study-con');

router.get('/' ,  caseStudyController.renderData);

 router.post('/insert',  caseStudyController.insertTask);

module.exports = router ;
