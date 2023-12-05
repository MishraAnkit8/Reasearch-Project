const journalPaperModel = require('../models/journal-paper.models');

module.exports.renderJournalPaper = async () => {
    let result = await journalPaperModel.fetchJournalPaper(); 
    return result.rows  
};

module.exports.insertJournalPapper = async (body) => {
    const {journalDetails} =  body;
    console.log('journalDetails>>> ', body);

    const newJournalPaper = await journalPaperModel.createJournalPaper({journalDetails});
    return newJournalPaper ;

};

module.exports.deleteJournalPaper = async (taskId) => {
    const result = await journalPaperModel.deleteJournalPaper({ taskId });
    if(result.rowCount ===1){
        return {
            success : true ,
            massage : 'row is deleted successfully'
        };
    }
    else{
        return {
            success : fasle ,
            massage : 'could not delete any thing'
        }
    }
  
};
