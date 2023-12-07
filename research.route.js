const express = require('express');
const { asyncErrorHandler } = require('../middleware/error.middleware');
const researchController = require('../controllers/research.controller');
const caseStudyController = require('../controllers/case-study.controller');
const journalController = require('../controllers/journal-paper.controller');

const router = express.Router();

router.get('/', asyncErrorHandler(researchController.renderResearch));

//journal paper 
router.get('/journal-paper', asyncErrorHandler(journalController.renderJournalPaper));
router.post('/journal-paper/create', asyncErrorHandler(journalController.createJournalPaper));
router.post('/journal-paper/update', asyncErrorHandler(journalController.updateJournalPaper));
router.post('/journal-paper/delete', asyncErrorHandler(journalController.delJournalPaper));
router.post('/research/journal-paper/view' , asyncErrorHandler(journalController.viewJournalPaper));


//case studies
router.get('/case-study', caseStudyController.renderCaseStudy );


module.exports = router;
