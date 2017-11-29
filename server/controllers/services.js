'use strict';
const Service = require('../models/services');

module.exports = {
    getAllServices: (req, res) => {
        Service.find((err, services) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    services: services
                });
            }
        });
    },
    addService: (req, res) => {
        let service = new Service();
        service.title = req.body.title;
        service.description = req.body.description;
        service.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Service successfully added',
                    service: service

                });
            }
        });
    },
    updateService: (req, res) => {
        Service.findById(req.params.serviceId, (err, service) => {
            if (!err) {
                if (req.body.title) {
                    service.title = req.body.title;
                }
                if (req.body.description) {
                    service.description = req.body.description;
                }

                service.save((err) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        success: true,
                        message: 'Service successfully updated'
                    });
                });
            } else {
                res.send(err);
            }
        });

    },
    deleteService: (req, res) => {
        Service.remove({
            _id: req.params.serviceId
        }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Service successfully deleted'
                });
            }
        });
    }
};