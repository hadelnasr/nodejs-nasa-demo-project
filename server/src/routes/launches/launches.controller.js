const launchesModel = require('../../models/launches.model');

async function getAllLaunches(req, res) {
    return res.status(200).json(await launchesModel.getAllLaunches());
}

function addNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    launchesModel.addNewLaunch(launch);
    return res.status(201).json(launch);
}

function abortLaunch(req, res) {
    const launchId = +req.params.id;
    if (!launchesModel.existsLaunchWithId(launchId)) {
        res.status(404).json({
            error: "Launch not found"
        })
    }

    const aborted = launchesModel.abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch
};