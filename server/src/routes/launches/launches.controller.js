const launchesModel = require('../../models/launches.model');

async function getAllLaunches(req, res) {
    return res.status(200).json(await launchesModel.getAllLaunches());
}

async function addNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    // launchesModel.addNewLaunch(launch);
    await launchesModel.scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function abortLaunch(req, res) {
    const launchId = +req.params.id;
    const existsLaunch = await launchesModel.existsLaunchWithId(launchId);
    if (!existsLaunch) {
        res.status(404).json({
            error: "Launch not found"
        })
    }

    const aborted = await launchesModel.abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        });
    }
    return res.status(200).json({
        ok: true
    });
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch
};