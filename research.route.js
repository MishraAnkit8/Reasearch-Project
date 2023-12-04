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
// router.post('/journal-paper/edit', asyncErrorHandler(journalPaperController.renderJournalPaper));
// router.post('/journal-paper/delete', asyncErrorHandler(journalPaperController.renderJournalPaper));


//case studies
router.get('/case-study', caseStudyController.renderCaseStudy );


module.exports = router;
