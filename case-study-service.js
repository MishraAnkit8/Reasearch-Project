const caseStudyModel = require('../models/case-study.model');

module.exports.fetchCaseStudy = async() => {
    const caseStudiesData = await caseStudyModel.renderCaseStudy();
    return caseStudiesData;
};

module.exports.insertCaseStudyData = async (body) => {
    const {caseStudyData} = body;
    console.log('caseStudies  ::', body);
    const caseStudiesData = await caseStudyModel.createCaseStudy({caseStudyData});
    return caseStudiesData ;
}

module.exports.deleteCaseStudyData = async (caseStudyId) => {
    const caseStudyData = await caseStudyModel.deleteCaseStudy({caseStudyId});
    if(caseStudyData.rowCount ==1){
        return {
            status : 'done',
            massage : ' data deleted successfully'
        }
    }
    else{
        return {
            status : 'failed',
            massage : 'failed to delete'
        }
    }
}

module.exports.updateCaseStudies = async ({caseStudyId , updatedCaseStudyData}) => {
    const updatedCaseStudy = await caseStudyModel.UpdateCaseStudyData({caseStudyId , updatedCaseStudyData});
    console.log('id For Udation service' , caseStudyId);
    console.log('updated Data Service ==>', updatedCaseStudyData);
    if(updatedCaseStudy.rowCount === 1){
        return {
            status : 'done' ,
            massage : 'data updated successfully',
        }
    }
    else{
        return {
            status : 'failed' ,
            massage : 'error data is not updated'
        }
    }
}
