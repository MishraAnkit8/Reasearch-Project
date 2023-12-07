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
    if(result.rowCount === 1){
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
    console.log('ROW count ', updateJournalData.rowCount);
    if(updateJournalData.rowCount == 1){
        return {
            'status' : 'done' ,
            massage : 'data updated successfully'
        };
    }
    else{
        return {
            'status' : 'failed' ,
            massage : 'data is not updating'
        }
    };
}

// service for view
module.exports.viewJournalPaper = async ({taskId}) => {
    const viewJournalPaperData = await journalPaperModel.viewJournalPaperData({taskId});
    if(viewJournalPaperData.rowCount === 1){
        return  viewJournalPaperData.rows;
    } 
    else{
        return {
            status : 'failed',
            masssage : 'error to fetching'
        }

    }
}
