const project = require('../models/projects'),
    team = require('../models/team'),
    testimonials = require('../models/testimonials'),
    why_nijel = require('../models/why-nijel'),
    fast_csv = require('fast-csv'),
    mongoose = require('mongoose'),
    TEAM_HEADERS = ['bio', 'fullname', 'position'],
    PROJECTS_HEADERS = ['client', 'coverPhoto', 'linkToLiveSite', 'name', 'relevantSDG', 'year'],
    TESTIMONIAL_HEADERS = ['company', 'position', 'reviewer', 'testimonial'],
    WHYNIJEL_HEADERS = ['coverPhoto', 'text', 'title'],
    configs = require('../../common/config_loader'),
    path = require("path"),
    mongoose_connector = require('../../common/mogoose_connect');

/**
 * Imports csv data into our mongodb collections
 * @param local_file_path -  String representing local path to csv
 * @param headers - Array representing column headers of csv
 * @param model - Mongoose model object
 * @param model_label - String representing the mongoose model
 */
function import_csv_data(local_file_path, headers, model, model_label) {
    console.info('Importing ' + model_label + ' data');
    let data = [];
    fast_csv.fromPath(path.join(path.resolve(__dirname),local_file_path), {headers: headers}).on("data", function (row) {
        row['_id'] = new mongoose.Types.ObjectId();
        data.push(row);
    }).on("end", function () {
        model.remove({}, function (err) {
            if (err) throw err;
        });
        model.create(data, function (err) {
            if (err) throw err;
        });
        console.info('Successfully imported ' + data.length + ' ' + model_label);
    });
}

/**
 * Runs import for the various csvs'
 */
function run_data_import() {
    console.log(configs.DATABASE_URL);
    mongoose_connector.connect(configs.DATABASE_URL);
    import_csv_data("teams.csv", TEAM_HEADERS, team, 'Teams');
    import_csv_data("projects.csv", PROJECTS_HEADERS, project, 'Projects');
    import_csv_data("whynijels.csv", WHYNIJEL_HEADERS, why_nijel, 'Why Nijel');
    import_csv_data("testimonials.csv", TESTIMONIAL_HEADERS, testimonials, 'Testimonials');
    mongoose_connector.close();
}


module.exports = {
    run_data_import: run_data_import
};

