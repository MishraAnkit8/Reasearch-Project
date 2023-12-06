const journalPaperModel = require('../models/journal-paper.models');
// service for fetch
module.exports.renderJournalPaper = async () => {
    let result = await journalPaperModel.fetchJournalPaper(); 
    return result.rows  
};

// service for insert
module.exports.insertJournalPapper = async (body) => {
    const {journalDetails} =  body;
    console.log('journalDetails>>> ', body);

    const newJournalPaper = await journalPaperModel.createJournalPaper({journalDetails});
    return newJournalPaper ;
};

// service for delete
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
            success : false ,
            massage : 'could not delete any thing'
        }
    }
};

// service for update
module.exports.updateJournalPaper = async ({taskId, updateJournalDetails}) => {
    const updateJournalData = await journalPaperModel.updateJournalPaperData({taskId, updateJournalDetails});
    console.log('id updation in service', taskId);
    if(updateJournalData.rowCount === 1){
        return {
            success : true ,
            massage : 'data updated successfully'
        };
    }
    else{
        return {
            success : false ,
            massage : 'data is not updating'
        }
    };
}
