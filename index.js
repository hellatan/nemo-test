/**
 * User: hella
 * Date: 1/17/15
 * Time: 4:00 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

'use strict';
var _ = require('lodash');
var Nemo = require('nemo');
var nemo = {};
var plugins = require('./config/nemo-plugins.json');

// require('../config/setups').fooSpec;
var setup = {
    'view': ['selectBox']
};
var config = {
    nemoData: {
        autoBaseDir: __dirname,
        targetBrowser: "firefox",
        serverProps: {
            "port": 4444
        },
        seleniumJar: "/usr/local/bin/selenium-server-standalone.jar",
        targetBaseUrl: "https://stage.1stdibs.com"
    }
};

config = _.cloneDeep(config, plugins);

function TBD() {}

_.assign(TBD.prototype, {
    createInstance: function (conf, setupConf) {
        setupConf = _.cloneDeep(setup, setupConf || {});
        conf = _.cloneDeep(config, conf || {});
        return (new Nemo(conf)).setup();
    }
});

var tbd = new TBD();

(tbd.createInstance().then(function (_nemo) {
    nemo = _nemo;
    /***
     * nemo.wd is a reference to selenium-webdriver commonjs module
     * nemo.driver is a reference to the active WebDriver instance
     * nemo.view will contain views and addView method (if using nemo-view)
     * nemo.props contains any properties defined in the nemoData ENV variable
     **/
    nemo.driver.get(nemo.props.targetBaseUrl);
    nemo.driver.sleep(5000)
        .then(function() {
            console.info("Nemo was successful!!");
            nemo.driver.quit();
        });
}));