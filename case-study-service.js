const caseStudyModel = require('../models/case-study.models');
module.exports.createCaseStudy = async () => {
    const caseStudyFetchData = await caseStudyModel.fetchCaseStudy();
    console.log(caseStudyFetchData.rows);
    return caseStudyFetchData.rows;
}

module.exports.insertCaseStudies = async (body) => {
    const {caseStudyData} = body;
    console.log('inserted data in service ==>>', body);
    const createCaseStudies = await caseStudyModel.insertDataIntoCaseStudies({caseStudyData});
    return createCaseStudies ;
}
