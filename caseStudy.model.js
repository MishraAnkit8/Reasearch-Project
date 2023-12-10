const { autoriders_read_db, autoriders_write_db } = require('../../config/db-configs');
const dbPoolManager = require('../../config/db-pool-manager');
const moment = require('moment');

const autoDbR = dbPoolManager.get('autoDbR', autoriders_read_db);
const autoDbW = dbPoolManager.get('autoDbW', autoriders_write_db);

module.exports.fetchCaseStudy = async() =>{
    const sql = {
        text : `SELECT id, author_first_name, author_last_name, title_of_case_study, edition, volume_number, publisher_name, publication_year   from case_studies  ORDER BY id`,

    }
    return autoDbR.query(sql);
};

module.exports.insertDataIntoCaseStudies = ({caseStudyData}) => {
    const {author_first_name, author_last_name, title_of_case_study, edition, volume_number, publisher_name, publication_year , page_number , url_of_case_study ,
        number_of_nmims_authors , nmims_authors , nmims_campus_authors , nmims_school_authors } = caseStudyData ;
    let sql = {
        text : `INSERT INTO case_studies (author_first_name, author_last_name, title_of_case_study, edition, volume_number, publisher_name, publication_year , page_number , url_of_case_study ,
                number_of_nmims_authors , nmims_authors , nmims_campus_authors , nmims_school_authors) 
                VALUES ($1, $2 , $3 ,$4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id` ,
        values : [author_first_name, author_last_name, title_of_case_study, edition, volume_number, publisher_name, publication_year , page_number , url_of_case_study ,
                 number_of_nmims_authors , nmims_authors , nmims_campus_authors , nmims_school_authors]
    }
    return autoDbW.query(sql);
}
