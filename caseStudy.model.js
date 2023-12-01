const { pgPool } = require('../../config/db.config');

module.exports.fetchAll = async () => {
  return pgPool.query('SELECT id, fname, lname, title_of_case_study, edition, volume, publisher_name, publication_year FROM case_studies ORDER BY id;');
};

module.exports.createCaseStudy = (data) => {
    console.log("Big DATA is>>>>>", data);
  const {
    fname,
    lname,
    title_of_case_study,
    edition,
    volume,
    publisher_name,
    publication_year,
  } = data;

  const sql = {
    text: 'INSERT INTO case_studies (fname, lname, title_of_case_study, edition, volume, publisher_name, publication_year) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    values: [fname, lname, title_of_case_study, edition, volume, publisher_name, publication_year],
  };
  console.log('SQL object:', sql.text);
  console.log('Row Id:', sql.values);

  return pgPool.query(sql.text, sql.values);
};


