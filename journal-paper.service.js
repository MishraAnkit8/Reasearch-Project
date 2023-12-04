const journalPaperModel = require('../models/journal-paper.models');

module.exports.renderJournalPaper = async () => {
    let result = await journalPaperModel.fetchJournalPaper(); 
    return result.rows  
};

module.exports.insertJournalPapper = async (body) => {
    const {journalDetails} =  body;
    console.log('journalDetails>>> ', journalDetails);

    const newJournalPaper = await journalPaperModel.createJournalPaper({journalDetails});
    return newJournalPaper ;

};
