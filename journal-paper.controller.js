const journalPaperService = require('../services/journal-paper.service');

module.exports.renderJournalPaper = async (req, res, next) => {
    const journalList = await journalPaperService.renderJournalPaper();
    res.render('journal-paper', {
        journalData : journalList
    })
}

module.exports.createJournalPaper = async (req, res, next) => {
    const journalData = req.body ;
    
   

}
