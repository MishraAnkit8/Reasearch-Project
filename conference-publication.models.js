const { autoriders_read_db, autoriders_write_db } = require('../../config/db-configs');
const dbPoolManager = require('../../config/db-pool-manager');
const moment = require('moment');

const autoDbR = dbPoolManager.get('autoDbR', autoriders_read_db);
const autoDbW = dbPoolManager.get('autoDbW', autoriders_write_db);

module.exports.fetchConferencePublication = async() => {
    let sql = {
        text : `SELECT * FROM  conference_publications ORDER BY id `
    }
    return autoDbR.query(sql);
}

module.exports.viewConferenceData = async(conferenceId) => {
    let sql = {
        text : `SELECT * FROM conference_publications WHERE id = $1`,
        values : [conferenceId]
    }
    return autoDbW.query(sql);
};

module.exports.insertConferencePublication = async({conferencePublications}) => {
    const {title_of_paper,  name_and_place, proceedings_detail, publisher_category, is_presenter, author_type, publication_details, 
         vol_and_issue_no, issn_isbn_no, doi_weblink, upload_files, award_for_presentation, upload_proof} = conferencePublications;

    let sql = {
                text : `INSERT INTO conference_publications(title_of_paper,  name_and_place, proceedings_detail, publisher_category, is_presenter, author_type, publication_details, 
                       vol_and_issue_no, issn_isbn_no, doi_weblink, upload_files, award_for_presentation, upload_proof)
                       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id `,
                values : [title_of_paper,  name_and_place, proceedings_detail, publisher_category, is_presenter, author_type, publication_details, 
                         vol_and_issue_no, issn_isbn_no, doi_weblink, upload_files, award_for_presentation, upload_proof]

           }
    return autoDbW.query(sql);
};

module.exports.DeleteConference = async({conferenceId}) => {
    let sql = {
        text : `DELETE FROM conference_publications WHERE id =$1`,
        values : [conferenceId]
    }
    return autoDbW.query(sql);
}
