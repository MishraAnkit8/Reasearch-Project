const journalPaperModel = require('../models/journal-paper.models');

module.exports.renderJournalPaper = async () => {
    let result = await journalPaperModel.fetchJournalPaper(); 
    return result.rows  
};

module.exports.insertJournalPapper = async (journalData) => {
    console.log(journalData);
    const newJournalPaper = await journalPaperModel.createJournalPaper(journalData);
    return newJournalPaper ;

};
